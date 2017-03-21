"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCriterion_1 = require("./AbstractCriterion");
/**
 * This criterion allows you to decide on your own if the value is matching.
 * Simply uses callback function returning true or false.
 */
class CustomCriterion extends AbstractCriterion_1.AbstractCriterion {
    constructor(callback) {
        super();
        this.callback = callback;
    }
    check(data) {
        let result;
        try {
            result = this.callback(data);
        }
        catch (e) {
            throw new Error('Callback failed\n' + e.message);
        }
        if (result !== true && result !== false)
            throw new Error('Callback result is not of boolean type');
        return result;
    }
}
exports.CustomCriterion = CustomCriterion;
