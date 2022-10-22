export function useAnimation(animation: Animation) {
    const { start, finish } = useAnimationSignal();

    const signal = start();

    animation.addEventListener("finish", () => finish());
    signal.addEventListener("abort", () => animation.cancel());

    return animation;
}

export function useAnimationSignal() {
    let _abortController: AbortController | null = null;

    const start = () => {
        _abortController?.abort();
        _abortController = new AbortController();
        return _abortController.signal;
    };

    const finish = () => {
        _abortController = null;
    };

    return { start, finish };
}
