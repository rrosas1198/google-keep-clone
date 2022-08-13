import { Observable } from "rxjs";

export interface IUseCase<T, V> {
    execute(params: T): Observable<V>;
}
