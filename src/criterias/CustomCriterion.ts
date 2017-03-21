import {AbstractCriterion} from "./AbstractCriterion";

/**
 * This criterion allows you to decide on your own if the value is matching.
 * Simply uses callback function returning true or false.
 */
export class CustomCriterion extends AbstractCriterion {
    constructor(protected callback: {(value:any):boolean}){ super(); }

    check(data: any): boolean {
        let result: boolean;
        try{
            result = this.callback(data);
        } catch(e){ throw new Error('Callback failed\n'+e.message); }

        if (result !== true && result !== false) throw new Error('Callback result is not of boolean type');

        return result;
    }
}