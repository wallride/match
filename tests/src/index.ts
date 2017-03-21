import * as match from '../../build/index'
import {expect} from 'chai'

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

describe('Simple cases', ()=>{
    it('Stupid', ()=>{
        expect(match.check(obj, obj)).to.eq(true);
        expect(match.check(obj, {})).to.eq(true);
        expect(match.check(obj, {country:'China'})).to.eq(true);
        expect(match.check(obj, {country:'Brazil'})).to.eq(false);
        expect(match.check(obj, {country:'china'})).to.eq(false);
        expect(match.check(obj, {foo:1})).to.eq(false);
        expect(match.check(obj, {foo:undefined})).to.eq(true);
    });

    it('Nested', ()=>{
        expect(match.check(obj, {user:{}})).to.eq(true, 'case 0');
        expect(match.check(obj, {user:{age:34}})).to.eq(true, 'case 1');
        expect(match.check(obj, {user:{name:'john'}})).to.eq(true, 'case 2');
        expect(match.check(obj, {user:{name:'john'}, country:'China'})).to.eq(true, 'case 3');
        expect(match.check(obj, {user:{name:'john'}, country:'Brazil'})).to.eq(false, 'case 4');
        expect(match.check(obj, {jobs:{current:{title:'Senior software developer'}}})).to.eq(true, 'case 5');
        expect(match.check(obj, {jobs:{wished:null}})).to.eq(true, 'case 6');
        expect(match.check(obj, {jobs:{nonexistent:null}})).to.eq(false, 'case 7');
    });
});

describe('Criterion cases', ()=>{
    it('Custom', ()=>{
        expect(match.check(obj, {
            jobs: match.criteria.custom( value => {return value.wished == null} )
        })).to.eq(true, 'case 1');
    });
});