"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCriterion_1 = require("./criterias/AbstractCriterion");
exports.AbstractCriterion = AbstractCriterion_1.AbstractCriterion;
const CustomCriterion_1 = require("./criterias/CustomCriterion");
exports.criteria = {
    custom: (callback) => { return new CustomCriterion_1.CustomCriterion(callback); }
};
/**
 * Returns true if the target object matches filter pattern
 *
 * @param target Object to be checked.
 * @param filter Object to be used as a pattern. For instance {age: 34, sex: 'M'}
 */
function check(target, filter) {
    for (let property of Object.getOwnPropertyNames(filter)) {
        let matched = checker(target[property], filter[property]);
        if (!matched)
            return false;
    }
    return true;
}
exports.check = check;
/**
 * Selects matching objects from specified array and returns them
 * @param targets array of objects to be filtered
 * @param filter Object to be used as a pattern.
 * @returns {O[]}
 */
function filter(targets, filter) {
    let result = [];
    for (let object of targets)
        if (check(object, filter))
            result.push(object);
    return result;
}
exports.filter = filter;
let checker = (value, pattern, depth = 0) => {
    if (depth > 20)
        throw new Error('Mathing has gone too deep. Limit is 20 levels');
    if (value === pattern)
        return true; // that was easy!
    if (value === undefined)
        return pattern === undefined; // ok. both are undefined. Or not...
    if (value === null)
        return pattern === null; // ok. both are null. Or not...
    if (Array.isArray(value)) {
        // @todo: handle it somehow later
    }
    if (pattern instanceof AbstractCriterion_1.AbstractCriterion)
        return pattern.check(value); // If it's a Criterion let it decide if the value is matching
    if (pattern instanceof Object) {
        if (!(value instanceof Object))
            return false; // oly objects are filtered this way
        for (let property of Object.getOwnPropertyNames(pattern)) {
            let matched = checker(value[property], pattern[property], depth + 1);
            if (!matched)
                return false; // bad object!
        }
        return true; // a good one :)
    }
    return false;
};
