export interface IUseCase<T, V> {
    execute(params: T): Promise<V>;
}
