import Schema from './schema';
export default class PrimativeSchema extends Schema {
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
//# sourceMappingURL=primative.js.map