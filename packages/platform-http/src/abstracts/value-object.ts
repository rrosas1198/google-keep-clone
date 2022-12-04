import type { IValueObjectProps } from "src/interfaces";

export abstract class ValueObject<T> {
    protected readonly props: IValueObjectProps<T>;

    constructor(props: IValueObjectProps<T>) {
        this.props = props;
    }

    public equals(valueObject?: ValueObject<T>) {
        if (valueObject === null || valueObject === undefined) {
            return false;
        }
        if (valueObject.props === undefined) {
            return false;
        }
        return JSON.stringify(this.props) === JSON.stringify(valueObject.props);
    }
}
