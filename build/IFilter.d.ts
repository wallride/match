import { ICriterion } from "./criterias/ICriterion";
export interface IFilter {
    [index: string]: number | boolean | string | null | undefined | IFilter | ICriterion;
}
