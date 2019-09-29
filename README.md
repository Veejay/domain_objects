# NOTES


## class pattern

it's obvious looking at the static finders inside of the `Decision` class that we need to access information that pertains to the mapper itself, forcing us to shoehorn the 'Decision' string in there, this is not elegant at all

the class pattern isn't really suited here, we need a factory to build objects, allowing us to deliver *static* and *instance* functions all at once without having to jump through hoops to get to the relations/table/fields information

something like:

```js
class Decision {
  static new(record) {

  }

  static async findOne() {
    ...
  }

  static async findAll() {

  }
}
```

as an alternative, investigate [class expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class)

## configuration

objects are a nice fit but maybe JSON would also work, investigate that

## Massive data mapper

this seems like a natural fit, it can do the job with the {table, criteria, fields} object as a parameter

## aliases

we need aliases in the configuration objects, since the table names can be ugly and we don't want to be depending on that as far as data objects are involved
