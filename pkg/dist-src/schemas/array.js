import PrimativeSchema from './primative';
export default class ArraySchema extends PrimativeSchema {
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
//# sourceMappingURL=array.js.map