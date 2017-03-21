import { AbstractCriterion } from "./AbstractCriterion";
/**
 * This criterion allows you to decide on your own if the value is matching.
 * Simply uses callback function returning true or false.
 */
export declare class CustomCriterion extends AbstractCriterion {
    protected callback: {
        (value: any): boolean;
    };
    constructor(callback: {
        (value: any): boolean;
    });
    check(data: any): boolean;
}
