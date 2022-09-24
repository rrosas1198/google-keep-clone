export type IValueObjectPrimitiveValue = string | number | boolean;

export interface IValueObjectPrimitive<T extends IValueObjectPrimitiveValue | Date> {
    value: T;
}

export type IValueObjectProps<T> = T extends IValueObjectPrimitiveValue | Date
    ? IValueObjectPrimitive<T>
    : T;
