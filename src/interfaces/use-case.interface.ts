export interface IUseCase<T, V, E extends Error = Error> {
    execute(...params: T[]): Promise<[V, E]>;
}
