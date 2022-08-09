import { Observable } from "rxjs";

export interface UseCase<T, V> {
    execute(params: T): Observable<V>;
}
