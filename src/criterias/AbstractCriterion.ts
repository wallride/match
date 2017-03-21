import {ICriterion} from "./ICriterion";

export abstract class AbstractCriterion implements ICriterion {
    abstract check(data: any): boolean;
}