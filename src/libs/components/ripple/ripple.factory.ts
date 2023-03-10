import { computed, reactive, unref, watch } from "vue";
import { useAnimationSignal } from "../composables";
import { EasingEnum } from "../enums";
import type { IMaybeRef } from "../interfaces";
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
import type { IRippleProps } from "./ripple.interface";

export function useRipple(proxy: IMaybeRef<HTMLElement>, props: IRippleProps) {
    let _rippleSize = "";
    let _rippleScale = "";
    let _initialSize = 0;
    let _delayedEndPressHandle: number | null = null;
    let _growAnimation: Animation | null = null;

    const pressAnimationSignal = useAnimationSignal();

    const states = reactive({
        hovered: false,
        focused: false,
        pressed: false
    });

    const isDisabled = computed(() => unref(props.disabled) ?? false);
    const isUnbounded = computed(() => unref(props.unbounded) ?? false);

    const classList = computed(() => ({
        "mdc-ripple": true,
        "mdc-ripple--hovered": states.hovered,
        "mdc-ripple--focused": states.focused,
        "mdc-ripple--pressed": states.pressed,
        "mdc-ripple--unbounded": isUnbounded.value
    }));

    const beginHover = (ev?: Event) => {
        if (isDisabled.value) return;
        if ((ev as PointerEvent)?.pointerType === "touch") return;
        states.hovered = true;
    };

    const endHover = () => {
        if (isDisabled.value) return;
        states.hovered = false;
    };

    const beginFocus = () => {
        if (isDisabled.value) return;
        states.focused = true;
    };

    const endFocus = () => {
        if (isDisabled.value) return;
        states.focused = false;
    };

    const beginPress = (ev?: Event | null) => {
        if (isDisabled.value) return;

        states.pressed = true;

        if (_delayedEndPressHandle !== null) {
            window.clearTimeout(_delayedEndPressHandle);
            _delayedEndPressHandle = null;
        }

        _startPressAnimation(ev);
    };

    const endPress = () => {
        if (isDisabled.value) return;

        const pressAnimationPlayState = _growAnimation?.currentTime ?? Infinity;

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
        const rootRect = _getComputeBoundingRect();
        const maxDim = Math.max(rootRect.height, rootRect.width);
        const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);

        let maxRadius = maxDim;
        let initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);

        const hypotenuse = Math.sqrt(Math.pow(rootRect.width, 2) + Math.pow(rootRect.height, 2));
        maxRadius = hypotenuse + PADDING;

        if (isUnbounded.value) {
            initialSize = initialSize - (initialSize % 2);
        }

        _initialSize = initialSize;
        _rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`;
        _rippleSize = `${_initialSize}px`;
    };

    // TODO: Verify touch events
    const _getNormalizedPointerEventCoords = (ev: MouseEvent | PointerEvent) => {
        const rootRect = _getComputeBoundingRect();
        const documentX = window.scrollX + rootRect.left;
        const documentY = window.scrollY + rootRect.top;
        return { x: ev.pageX - documentX, y: ev.pageY - documentY };
    };

    const _getTranslationCoordinates = (ev?: Event | null) => {
        const rootRect = _getComputeBoundingRect();

        const startPoint = {
            x: Number.NaN,
            y: Number.NaN
        };

        const endPoint = {
            x: (rootRect.width - _initialSize) / 2,
            y: (rootRect.height - _initialSize) / 2
        };

        if (!isUnbounded.value && (ev instanceof MouseEvent || ev instanceof PointerEvent)) {
            Object.assign(startPoint, _getNormalizedPointerEventCoords(ev));
        } else {
            Object.assign(startPoint, {
                x: rootRect.width / 2,
                y: rootRect.height / 2
            });
        }

        Object.assign(startPoint, {
            x: startPoint.x - _initialSize / 2,
            y: startPoint.y - _initialSize / 2
        });

        return [startPoint, endPoint];
    };

    const _startPressAnimation = (ev?: Event | null) => {
        _determineRippleSize();

        const [startPoint, endPoint] = _getTranslationCoordinates(ev);
        const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
        const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;

        const signal = pressAnimationSignal.create();

        const unwrapped = unref(proxy);
        const growAnimation = unwrapped.animate(
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
            pressAnimationSignal.cleanup();
            _growAnimation = null;
        });

        signal.addEventListener("abort", () => {
            growAnimation.cancel();
            _growAnimation = null;
        });

        _growAnimation = growAnimation;
    };

    const _getComputeBoundingRect = () => {
        const unwrapped = unref(proxy);
        const element = unwrapped.parentElement ?? unwrapped;
        return element.getBoundingClientRect();
    };

    // TODO: Remove 'on' prefix and use with toHandlers
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
