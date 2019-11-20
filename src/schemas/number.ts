import PrimativeSchema from './primative'

export default class NumberSchema extends PrimativeSchema<number> {
  constructor() {
    super()

    this.addRule(input => {
      if(input === undefined || input === null) {
        return
      }
      if(typeof input !== "number") {
        return `Expected typeof \`number\` not \`${typeof input}\``
      }
    })
  }
}
