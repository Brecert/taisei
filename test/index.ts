import test from 'tape'
import * as Schemas from 'taisei'

test("PrimativeSchema", t => {
  t.ok(Schemas.Primative)

  const schema = new Schemas.Primative<string>()

  t.deepEqual(schema.validate(undefined as any), [])

  schema.required()

  t.deepEqual(schema.validate(undefined as any),  ['This field is required'])

  schema.addRule(input => {
    return typeof input !== 'string' ? 'Input was not a string' : undefined
  })

  schema.addRule(input => {
    return input !== 'test_value' ? 'Input was not test_value' : undefined
  })

  t.deepEqual(schema.validate('hello!'), ['Input was not test_value'])
  t.deepEqual(schema.validate(0 as any), [ 'Input was not a string', 'Input was not test_value' ])
  t.deepEqual(schema.validate('test_value'), [])

  t.end()
})

test("StringSchema", t => {
  t.ok(Schemas.String)

  const schema = new Schemas.String()

  t.deepEqual(schema.validate('hello!'), [])
  t.deepEqual(schema.validate(0 as any), ['Expected typeof `string` not `number`'])

  t.end()
})

test("ObjectSchema", t => {
  t.ok(Schemas.Object)

  const schema = new Schemas.Object({
    a: new Schemas.String().required(),
    b: new Schemas.Object({
      c: new Schemas.String().required()
    })
  })

  t.deepEqual(schema.validate({
    a: 'abc',
    b: {
      c: 'abc'
    }
  }), [])

  t.deepEqual(schema.validate(0 as any), ['Expected typeof `object` not `number`'])

  t.test('required checks work with undefined values', t => {
    t.deepEqual(schema.validate({}), [ { a: [ 'This field is required' ] } ])

    t.end()
  })

  t.end()
})

test("ArraySchema", t => {
  t.ok(Schemas.Array)

  const schema = new Schemas.Array<any>()
  const schemaRequired = new Schemas.Array<any>().required()

  t.deepEqual(schema.validate(['a', 'b', 3]), [])
  t.deepEqual(schema.validate(0 as any), ['Expected input to be an Array'])
  t.deepEqual(schema.validate(undefined), [])
  t.deepEqual(schemaRequired.validate(undefined), ['This field is required'])

  t.end()
})

test("NumberSchema", t => {
  t.ok(Schemas.Number)

  const schema = new Schemas.Number()

  t.deepEqual(schema.validate(3), [])
  t.deepEqual(schema.validate('3' as any), ['Expected typeof `number` not `string`'])
  t.deepEqual(schema.validate(undefined), [])

  t.end()
})

test("BooleanSchema", t => {
  t.ok(Schemas.Boolean)

  const schema = new Schemas.Boolean()

  t.deepEqual(schema.validate(true), [])
  t.deepEqual(schema.validate(false), [])
  t.deepEqual(schema.validate('3' as any), ['Expected typeof `boolean` not `string`'])
  t.deepEqual(schema.validate(undefined), [])

  t.end()
})

