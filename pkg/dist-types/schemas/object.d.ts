import Schema from './schema';
export interface ObjectShape {
    [key: string]: Schema<any, any>;
}
export declare type ObjectSchemaType = {
    [key: string]: string[];
} | string[];
export default class ObjectSchema extends Schema<object, string> {
    shape: ObjectShape;
    constructor(shape: ObjectShape);
    required(message?: string): this;
    strict(message?: string): this;
    validate<T extends object>(input: T | undefined): ObjectSchemaType;
}
//# sourceMappingURL=object.d.ts.map