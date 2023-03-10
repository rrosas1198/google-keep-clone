/**
 * Creates element animation
 * @param {HTMLElement} element - Animation element
 * @param {Keyframe[] | PropertyIndexedKeyframes | null} keyframes - Animation keyframes
 * @param {number | KeyframeAnimationOptions} options - Animation options
 */
export function useAnimation(
    element: HTMLElement,
    keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
    options?: number | KeyframeAnimationOptions
) {
    const animation = element.animate(keyframes, options);

    const animationSignal = useAnimationSignal();

    const abortSignal = animationSignal.create();

    // When animation ends, AbortController reference should be cleaned
    animation.addEventListener("finish", () => animationSignal.cleanup());

    // When AbortSignal is called, animation should be canceled
    abortSignal.addEventListener("abort", () => animation.cancel());

    return animation;
}

/**
 * Creates AbortController to use with Animation instance
 */
export function useAnimationSignal() {
    let _abortController: AbortController | undefined = undefined;

    const create = () => {
        _abortController?.abort();
        _abortController = new AbortController();
        return _abortController.signal;
    };

    const cleanup = () => {
        _abortController = undefined;
    };

    return { create, cleanup };
}
