import {IFilter} from "./IFilter";
import {ICriterion} from "./criterias/ICriterion";
import {AbstractCriterion} from "./criterias/AbstractCriterion";
import {CustomCriterion} from "./criterias/CustomCriterion";

export const criteria = {
    custom: (callback: {(value:any):boolean}): CustomCriterion => { return new CustomCriterion(callback); }
};


/**
 * Returns true if the target object matches filter pattern
 *
 * @param target Object to be checked.
 * @param filter Object to be used as a pattern. For instance {age: 34, sex: 'M'}
 */
export function check(target:Object, filter:IFilter): boolean {
    for (let property of Object.getOwnPropertyNames(filter)){
        let matched = checker(target[property], filter[property]);
        if (!matched) return false;
    }

    return true;
}


let checker = (value: any, pattern: number|boolean|string|null|undefined|IFilter|ICriterion, depth:number = 0): boolean => {
    if (depth>20) throw new Error('Mathing has gone too deep. Limit is 20 levels');
    if (value === pattern) return true; // that was easy!
    if (value === undefined) return pattern === undefined; // ok. both are undefined. Or not...
    if (value === null) return pattern === null; // ok. both are null. Or not...

    if (Array.isArray(value)) {
        // @todo: handle it somehow later
    }

    if (pattern instanceof AbstractCriterion) return pattern.check(value); // If it's a Criterion let it decide if the value is matching

    if (pattern instanceof Object){ // Ok. Guess it's nested IFilter, therefore its not a Criteria
        if (!(value instanceof Object)) return false; // oly objects are filtered this way

        for (let property of Object.getOwnPropertyNames(pattern)){
            let matched = checker(value[property], pattern[property], depth+1);
            if (!matched) return false; // bad object!
        }

        return true; // a good one :)
    }


    return false;
};