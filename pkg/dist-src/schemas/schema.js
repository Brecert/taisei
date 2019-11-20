export default class Schema {
    constructor() {
        this.validationRules = [];
    }
    addRule(rule) {
        this.validationRules.push(rule);
        return this;
    }
}
//# sourceMappingURL=schema.js.map