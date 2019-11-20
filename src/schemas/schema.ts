import { Rule } from '../rule'

export default abstract class Schema<T, U> {
  protected validationRules: Rule<T | undefined, U>[] = []

  addRule(rule: Rule<T | undefined, U>) {
    this.validationRules.push(rule);
    return this;
  }

  abstract required(message: string): this

  abstract validate(entry: T | undefined): any
}
