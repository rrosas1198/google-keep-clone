import { ValueObjectProps } from "src/interfaces";

export abstract class ValueObject<T> {
    protected readonly props: ValueObjectProps<T>;

    constructor(props: ValueObjectProps<T>) {
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
