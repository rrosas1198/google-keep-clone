// Based on https://github.com/material-components/material-web/blob/master/ripple/lib/ripple.ts
import { useAnimationSignal } from "src/composables";
import { EasingEnum } from "src/enums";
import { coerce } from "src/utils";
import { computed, reactive, Ref, watch } from "vue";
import {
    ANIMATION_FILL,
    INITIAL_ORIGIN_SCALE,
    MINIMUM_PRESS_MS,
    PADDING,
    PRESS_GROW_MS,
    PRESS_PSEUDO,
    SOFT_EDGE_CONTAINER_RATIO,
    SOFT_EDGE_MINIMUM_SIZE
} from "./ripple.constants";
import { IRippleProps } from "./ripple.interface";

export function useRipple(proxy: Ref<HTMLElement>, props: IRippleProps) {
    const pressAnimationSignal = useAnimationSignal();

    const states = reactive({
        hovered: false,
        focused: false,
        pressed: false
    });

    const isDisabled = computed(() => coerce(props.disabled ?? false));
    const isUnbounded = computed(() => coerce(props.unbounded ?? false));

    let _rippleSize = "";
    let _rippleScale = "";
    let _initialSize = 0;
    let _delayedEndPressHandle: number | null = null;
    let _growAnimation: Animation | null = null;

    const classList = computed(() => ({
        "mdc-ripple-surface": true,
        "mdc-ripple--hovered": states.hovered,
        "mdc-ripple--focused": states.focused,
        "mdc-ripple--pressed": states.pressed,
        "mdc-ripple--unbounded": isUnbounded.value
    }));

    const beginHover = (hoverEvent?: Event) => {
        if ((hoverEvent as PointerEvent)?.pointerType !== "touch") {
            states.hovered = true;
        }
    };

    const endHover = () => {
        states.hovered = false;
    };

    const beginFocus = () => {
        states.focused = true;
    };

    const endFocus = () => {
        states.focused = false;
    };

    const beginPress = (ev?: Event | null) => {
        states.pressed = true;

        if (_delayedEndPressHandle !== null) {
            window.clearTimeout(_delayedEndPressHandle);
            _delayedEndPressHandle = null;
        }

        _startPressAnimation(ev);
    };

    const endPress = () => {
        const pressAnimationPlayState = _growAnimation?.currentTime ?? Number.POSITIVE_INFINITY;

        if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
            states.pressed = false;
        } else {
            _delayedEndPressHandle = window.setTimeout(() => {
                states.pressed = false;
                _delayedEndPressHandle = null;
            }, MINIMUM_PRESS_MS - pressAnimationPlayState);
        }
    };

    const _determineRippleSize = () => {
        const { height, width } = _getComputeBoundingRect();

        const maxDim = Math.max(height, width);
        const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);

        let maxRadius = maxDim;
        let initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);

        const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
        maxRadius = hypotenuse + PADDING;

        if (isUnbounded.value) {
            initialSize = initialSize - (initialSize % 2);
        }

        _initialSize = initialSize;
        _rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`;
        _rippleSize = `${_initialSize}px`;
    };

    const _getNormalizedPointerEventCoords = (ev: PointerEvent) => {
        const { left, top } = _getComputeBoundingRect();

        const documentX = window.scrollX + left;
        const documentY = window.scrollY + top;

        return { x: ev.pageX - documentX, y: ev.pageY - documentY };
    };

    const _getTranslationCoordinates = (ev?: Event | null) => {
        const { height, width } = _getComputeBoundingRect();

        const endPoint = {
            x: (width - _initialSize) / 2,
            y: (height - _initialSize) / 2
        };

        let startPoint;

        if (ev instanceof PointerEvent) {
            startPoint = _getNormalizedPointerEventCoords(ev);
        } else {
            startPoint = { x: width / 2, y: height / 2 };
        }

        // center around start point
        startPoint = {
            x: startPoint.x - _initialSize / 2,
            y: startPoint.y - _initialSize / 2
        };

        return { startPoint, endPoint };
    };

    const _startPressAnimation = (ev?: Event | null) => {
        _determineRippleSize();

        const { startPoint, endPoint } = _getTranslationCoordinates(ev);
        const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
        const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;

        const signal = pressAnimationSignal.start();

        const growAnimation = proxy.value.animate(
            {
                top: [0, 0],
                left: [0, 0],
                height: [_rippleSize, _rippleSize],
                width: [_rippleSize, _rippleSize],
                transform: [
                    `translate(${translateStart}) scale(1)`,
                    `translate(${translateEnd}) scale(${_rippleScale})`
                ]
            },
            {
                pseudoElement: PRESS_PSEUDO,
                duration: PRESS_GROW_MS,
                easing: EasingEnum.STANDARD,
                fill: ANIMATION_FILL
            }
        );

        growAnimation.addEventListener("finish", () => {
            pressAnimationSignal.finish();
            _growAnimation = null;
        });

        signal.addEventListener("abort", () => {
            growAnimation.cancel();
            _growAnimation = null;
        });

        _growAnimation = growAnimation;
    };

    const _getComputeBoundingRect = () => {
        const element = proxy.value.parentElement ?? proxy.value;
        return element.getBoundingClientRect();
    };

    const listeners = <Record<string, unknown>>{
        onTouchstart: beginHover,
        onPointerenter: beginHover,
        onPointerdown: beginPress,
        onMousedown: beginPress,
        onKeydown: beginPress,
        onFocusin: beginFocus,
        onFocusout: endFocus,
        onBlur: endPress,
        onKeyup: endPress,
        onTouchend: endHover,
        onPointerleave: endHover,
        onPointerup: endPress,
        onMouseup: endPress,
        onContextmenu: endPress,
        onClick: endPress
    };

    watch(isDisabled, value => {
        if (!value) return;
        endHover();
        endFocus();
        endPress();
    });

    return { classList, listeners };
}
