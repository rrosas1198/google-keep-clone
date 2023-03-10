export type IValueOfMap<T extends Map<unknown, unknown>> = T extends Map<unknown, infer I>
    ? I
    : never;
