export type ValueObjectPrimitiveValue = string | number | boolean;

export interface ValueObjectPrimitive<T extends ValueObjectPrimitiveValue | Date> {
    value: T;
}

export type ValueObjectProps<T> = T extends ValueObjectPrimitiveValue | Date
    ? ValueObjectPrimitive<T>
    : T;
