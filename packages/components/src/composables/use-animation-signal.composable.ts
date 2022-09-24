export enum EasingEnum {
    STANDARD = "cubic-bezier(0.2, 0, 0, 1)"
}

export interface IAnimationSignal {
    start(): AbortSignal;
    finish(): void;
}

// See https://github.com/material-components/material-web/blob/master/motion/animation.ts#L66
export function useAnimationSignal(): IAnimationSignal {
    let _animationAbortController: AbortController | null = null;

    return {
        start() {
            _animationAbortController?.abort();
            _animationAbortController = new AbortController();
            return _animationAbortController.signal;
        },
        finish() {
            _animationAbortController = null;
        }
    };
}
