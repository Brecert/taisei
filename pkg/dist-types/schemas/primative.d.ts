import Schema from './schema';
export default class PrimativeSchema<T> extends Schema<T, string> {
    required(message?: string): this;
    validate(input: T | undefined): string[];
}
//# sourceMappingURL=primative.d.ts.map