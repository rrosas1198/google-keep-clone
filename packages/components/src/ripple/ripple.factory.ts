// Based on https://github.com/material-components/material-web/blob/master/ripple/lib/ripple.ts
import { computed, Ref, ref, watch } from "vue";
import { EasingEnum, useAnimationSignal } from "../composables";
import { coerce } from "../utils";
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
    const hovered = ref(false);
    const focused = ref(false);
    const pressed = ref(false);
    const pressAnimationSignal = useAnimationSignal();

    const isDisabled = computed(() => coerce(props.disabled ?? false));
    const isUnbounded = computed(() => coerce(props.unbounded ?? false));

    let _rippleSize = "";
    let _rippleScale = "";
    let _initialSize = 0;
    let _delayedEndPressHandle: number | null = null;
    let _growAnimation: Animation | null = null;

    const classList = computed(() => ({
        "mdc-ripple-surface": true,
        "mdc-ripple--hovered": hovered.value,
        "mdc-ripple--focused": focused.value,
        "mdc-ripple--pressed": pressed.value,
        "mdc-ripple--unbounded": isUnbounded.value
    }));

    const beginHover = (hoverEvent?: Event) => {
        if ((hoverEvent as PointerEvent)?.pointerType !== "touch") {
            hovered.value = true;
        }
    };

    const endHover = () => {
        hovered.value = false;
    };

    const beginFocus = () => {
        focused.value = true;
    };

    const endFocus = () => {
        focused.value = false;
    };

    const beginPress = (positionEvent?: Event | null) => {
        pressed.value = true;

        if (_delayedEndPressHandle !== null) {
            window.clearTimeout(_delayedEndPressHandle);
            _delayedEndPressHandle = null;
        }

        _startPressAnimation(positionEvent);
    };

    const endPress = () => {
        const pressAnimationPlayState = _growAnimation?.currentTime ?? Infinity;

        if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
            pressed.value = false;
        } else {
            _delayedEndPressHandle = window.setTimeout(() => {
                pressed.value = false;
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

    const _getNormalizedPointerEventCoords = (pointerEvent: PointerEvent) => {
        const { scrollX, scrollY } = window;
        const { left, top } = _getComputeBoundingRect();
        const documentX = scrollX + left;
        const documentY = scrollY + top;
        const { pageX, pageY } = pointerEvent;
        return { x: pageX - documentX, y: pageY - documentY };
    };

    const _getTranslationCoordinates = (positionEvent?: Event | null) => {
        const { height, width } = _getComputeBoundingRect();
        // end in the center
        const endPoint = {
            x: (width - _initialSize) / 2,
            y: (height - _initialSize) / 2
        };

        let startPoint;

        if (positionEvent instanceof PointerEvent) {
            startPoint = _getNormalizedPointerEventCoords(positionEvent);
        } else {
            startPoint = {
                x: width / 2,
                y: height / 2
            };
        }

        // center around start point
        startPoint = {
            x: startPoint.x - _initialSize / 2,
            y: startPoint.y - _initialSize / 2
        };

        return { startPoint, endPoint };
    };

    const _startPressAnimation = (positionEvent?: Event | null) => {
        _determineRippleSize();

        const { startPoint, endPoint } = _getTranslationCoordinates(positionEvent);
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
        if (value) {
            endHover();
            endFocus();
            endPress();
        }
    });

    return { classList, listeners };
}
