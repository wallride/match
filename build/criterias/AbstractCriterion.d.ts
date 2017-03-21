import { ICriterion } from "./ICriterion";
export declare abstract class AbstractCriterion implements ICriterion {
    abstract check(data: any): boolean;
}
