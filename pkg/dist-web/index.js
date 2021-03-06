class Schema {
    constructor() {
        this.validationRules = [];
    }
    addRule(rule) {
        this.validationRules.push(rule);
        return this;
    }
}

class PrimativeSchema extends Schema {
    required(message = 'This field is required') {
        return this.addRule(input => {
            if (input === undefined || input === null) {
                return message;
            }
        });
    }
    validate(input) {
        return this.validationRules.map(rule => {
            const error = rule(input);
            return error;
        }).filter(res => res !== undefined);
    }
}

class StringSchema extends PrimativeSchema {
    constructor() {
        super();
        this.addRule(input => {
            if (input === undefined || input === null) {
                return;
            }
            if (typeof input !== "string") {
                return `Expected typeof \`string\` not \`${typeof input}\``;
            }
        });
    }
}

class ObjectSchema extends Schema {
    constructor(shape) {
        super();
        this.shape = shape;
        this.addRule(input => {
            if (input === undefined || input === null) {
                return;
            }
            if (typeof input !== "object") {
                return `Expected typeof \`object\` not \`${typeof input}\``;
            }
        });
    }
    required(message = 'This field is required') {
        return this.addRule(input => {
            if (input === undefined || input === null) {
                return message;
            }
        });
    }
    strict(message) {
        return this.addRule(input => {
            const invalidKeys = Object.keys(input).filter(key => !(key in this.shape));
            if (invalidKeys.length > 0) {
                return message || `Keys \`${invalidKeys.join(', ')}\` do not match the shape.`;
            }
        });
    }
    validate(input) {
        const errors = this.validationRules
            .map(rule => rule(input))
            .filter(res => res !== undefined);
        if (errors.length > 0) {
            return errors;
        }
        if (input === undefined) {
            return [];
        }
        const errorMap = Object.entries(this.shape)
            // .filter(([key, value]) => value !== undefined)
            .map(([key, value]) => [key, value.validate(Reflect.get(input, key))])
            .filter(([key, value]) => !(Array.isArray(value) && value.length === 0))
            .filter(([key, value]) => value !== undefined);
        if (errorMap.length === 0) {
            return [];
        }
        else {
            return [Object.fromEntries(errorMap)];
        }
    }
}

class ArraySchema extends PrimativeSchema {
    constructor() {
        super();
        this.addRule(input => {
            if (input === undefined || input === null) {
                return;
            }
            if (!Array.isArray(input)) {
                return `Expected input to be an Array`;
            }
        });
    }
}

class NumberSchema extends PrimativeSchema {
    constructor() {
        super();
        this.addRule(input => {
            if (input === undefined || input === null) {
                return;
            }
            if (typeof input !== "number") {
                return `Expected typeof \`number\` not \`${typeof input}\``;
            }
        });
    }
}

class BooleanSchema extends PrimativeSchema {
    constructor() {
        super();
        this.addRule(input => {
            if (input === undefined || input === null) {
                return;
            }
            if (typeof input !== "boolean") {
                return `Expected typeof \`boolean\` not \`${typeof input}\``;
            }
        });
    }
}

export { ArraySchema as Array, BooleanSchema as Boolean, NumberSchema as Number, ObjectSchema as Object, PrimativeSchema as Primative, Schema, StringSchema as String };
//# sourceMappingURL=index.js.map
