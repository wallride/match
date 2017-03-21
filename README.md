# wallride-match

Simple and powerful tool for checking if an object matches a pattern.
TypeScript module definitions are already provided inside this package.

---

[![NPM](http://img.shields.io/npm/v/js-match.svg?style=flat)](https://npmjs.org/package/wallride-match)
[![License](http://img.shields.io/npm/l/js-match.svg?style=flat)](https://github.com/wallride/match)

[![Build Status](http://img.shields.io/travis/wallride/match.svg?style=flat)](http://travis-ci.org/wallride/match)
[![Dependencies](http://img.shields.io/david/wallride/match.svg?style=flat)](https://david-dm.org/wallride/match)
[![Dev dependencies](http://img.shields.io/david/dev/wallride/match.svg?style=flat)](https://david-dm.org/wallride/match)


## Basic usage
```
npm install wallride-match --save
```

```typescript
import * as match from 'wallride-match'

const object = {
    id: 1,
    name: 'Foo'
};

match.check(object, {name:'Foo', id:1});
// returns true - Perfect match!

match.check(object, {id:1});
// returns true - Only id is matching

match.check(object, {name:'Foo'});
// returns true - Yes, this name fits too

match.check(object, {nonexistent:undefined});
// returns true - Yes, even so. This property is undefined in the provided object

match.check(object, {name:'Bar'});
// returns false - Oh no, that property doesn't match. Bad object!
```


## Going deeper

The filtering object may have nested object that will be matched too.

```typescript
const object = {
    id: 1,
    name: {first:'John', last:'Doe'}
};

match.check(object, {name:{}});
// returns true - Indeed. Formally name is an object... :)

match.check(object, {name:{first:'John'}});
// returns true - That guy suits us

match.check(object, {id:1, name:{first:'John', last:'Doe'}});
// returns true - That's the perfect match!

match.check(object, {name:{first:'John', last:'Smith'}});
// returns false - No, he is a stranger
```


## Criteria matchers

Foy your convenience there are special objects (criteria) to determine if a value matches a pattern.
They are in development right now, but you can use one universal criterion right away. Just see the following section.


## Going more complex

Take a look at `CustomCriterion` that uses your function to check values:

```typescript
const object = {
    id: 1,
    name: {first:'John', last:'Doe'}
};

match.check(object, {
    name: match.criteria.custom( value => {
        if (value instanceof Object){
            return !!(value.first && value.last)
        }
        return false;
    } )
});
// returns true - Yes. Both first and last names are present. No matter what they are

```

---

Want more examples? Take a look into (tests/src/index.ts)


