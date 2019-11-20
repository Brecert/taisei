# taisei
> library for input validation, but not really I don't recommend using this

## Example usage
```ts
import * as Schemas from 'taisei'

const ABC = Schemas.Object({
	a: new Schemas.Number().required(),
	// b is not required
	b: new Schemas.Object({
		c: new Schemas.String().required()
	})
})

assert.deepEqual(ABC.validate({}), [{ a: [ 'This field is required' ]}])

assert.deepEqual(ABC.validate({
	a: 3,
	b: {
		c: "hello!"
	}
}), [])
```
