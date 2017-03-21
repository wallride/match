import { IFilter } from "./IFilter";
import { AbstractCriterion } from "./criterias/AbstractCriterion";
import { CustomCriterion } from "./criterias/CustomCriterion";
export { AbstractCriterion };
export declare const criteria: {
    custom: (callback: (value: any) => boolean) => CustomCriterion;
};
/**
 * Returns true if the target object matches filter pattern
 *
 * @param target Object to be checked.
 * @param filter Object to be used as a pattern. For instance {age: 34, sex: 'M'}
 */
export declare function check(target: Object, filter: IFilter): boolean;
/**
 * Selects matching objects from specified array and returns them
 * @param targets array of objects to be filtered
 * @param filter Object to be used as a pattern.
 * @returns {O[]}
 */
export declare function filter<O extends Object>(targets: O[], filter: IFilter): O[];
