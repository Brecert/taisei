import Schema from './schema'

export default class PrimativeSchema<T> extends Schema<T, string> {

  required(message = 'This field is required') {
    return this.addRule(input => {
      if(input === undefined || input === null) {
        return message
      }
    })
  }

  validate(input: T | undefined): string[] {
    return this.validationRules.map(rule => {
      const error = rule(input)

      return error
    }).filter(res => res !== undefined) as string[]
  }
}
