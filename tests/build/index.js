"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const match = require("../../build/index");
const chai_1 = require("chai");
let obj = {
    user: {
        name: 'john',
        age: 34
    },
    country: 'China',
    jobs: {
        current: {
            title: 'Senior software developer'
        },
        previous: {
            title: 'Junior software developer'
        },
        wished: null
    }
};
describe('Simple cases', () => {
    it('Stupid', () => {
        chai_1.expect(match.check(obj, obj)).to.eq(true);
        chai_1.expect(match.check(obj, {})).to.eq(true);
        chai_1.expect(match.check(obj, { country: 'China' })).to.eq(true);
        chai_1.expect(match.check(obj, { country: 'Brazil' })).to.eq(false);
        chai_1.expect(match.check(obj, { country: 'china' })).to.eq(false);
        chai_1.expect(match.check(obj, { foo: 1 })).to.eq(false);
        chai_1.expect(match.check(obj, { foo: undefined })).to.eq(true);
    });
    it('Nested', () => {
        chai_1.expect(match.check(obj, { user: {} })).to.eq(true, 'case 0');
        chai_1.expect(match.check(obj, { user: { age: 34 } })).to.eq(true, 'case 1');
        chai_1.expect(match.check(obj, { user: { name: 'john' } })).to.eq(true, 'case 2');
        chai_1.expect(match.check(obj, { user: { name: 'john' }, country: 'China' })).to.eq(true, 'case 3');
        chai_1.expect(match.check(obj, { user: { name: 'john' }, country: 'Brazil' })).to.eq(false, 'case 4');
        chai_1.expect(match.check(obj, { jobs: { current: { title: 'Senior software developer' } } })).to.eq(true, 'case 5');
        chai_1.expect(match.check(obj, { jobs: { wished: null } })).to.eq(true, 'case 6');
        chai_1.expect(match.check(obj, { jobs: { nonexistent: null } })).to.eq(false, 'case 7');
    });
});
describe('Criterion cases', () => {
    it('Custom', () => {
        chai_1.expect(match.check(obj, {
            jobs: match.criteria.custom(value => { return value.wished == null; })
        })).to.eq(true, 'case 1');
    });
});
describe('Filtering cases', () => {
    it('Simple', () => {
        let objects = [
            {},
            { id: 1 },
            { id: 2 }
        ];
        chai_1.expect(match.filter(objects, { id: 1 }).length).to.eq(1, 'case 1');
    });
});
