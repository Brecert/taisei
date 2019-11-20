import PrimativeSchema from './primative';
export default class BooleanSchema extends PrimativeSchema {
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
//# sourceMappingURL=boolean.js.map