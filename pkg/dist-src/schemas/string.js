import PrimativeSchema from './primative';
export default class StringSchema extends PrimativeSchema {
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
//# sourceMappingURL=string.js.map