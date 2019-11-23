import Schema from './schema'

export interface ObjectShape {
  [key: string]: Schema<any, any>
}

export type ObjectSchemaType = { [key: string]: string[] } | string[]

export default class ObjectSchema extends Schema<object, string> {
  constructor(public shape: ObjectShape) {
    super()

    this.addRule(input => {
      if(input === undefined || input === null) {
        return
      }
      if(typeof input !== "object") {
        return `Expected typeof \`object\` not \`${typeof input}\``
      }
    })
  }

  required(message = 'This field is required') {
    return this.addRule(input => {
      if(input === undefined || input === null) {
        return message
      }
    })
  }

  strict(message?: string) {
    return this.addRule(input => {
      const invalidKeys = Object.keys(input!).filter(key => !(key in this.shape))
      if(invalidKeys.length > 0) {
        return message || `Keys \`${invalidKeys.join(', ')}\` do not match the shape.`
      }
    })
  }

  validate<T extends object>(input: T | undefined): ObjectSchemaType {
    const errors = this.validationRules
      .map(rule => rule(input))
      .filter(res => res !== undefined) as string[]

    if(errors.length > 0) {
      return errors
    }

    if(input === undefined) {
      return []
    }

    const errorMap = Object.entries(this.shape)
      // .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => [key, value.validate(Reflect.get(input, key))])
      .filter(([key, value]) => !(Array.isArray(value) && value.length === 0))
      .filter(([key, value]) => value !== undefined)

    if(errorMap.length === 0) {
      return []
    } else {
      return [Object.fromEntries(errorMap)]
    }
  }
}
