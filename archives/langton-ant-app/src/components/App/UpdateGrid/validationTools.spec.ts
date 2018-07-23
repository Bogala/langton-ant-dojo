import { isValidNumber } from './validationTools';

class Test {

    @isValidNumber(
        (n) => n > 5,
        (n) => 'error'    
    )
    numericValue: number = 6;
}

describe('validation tools', () => {
    test('return value if on pattern ', () => {
        const tst = new Test();
        tst.numericValue = 7;

        expect(tst.numericValue).toBe(7);
    });

    test('error if not ', () => {
        const tst = new Test();

        expect(() => {
            tst.numericValue = 0;
        }).toThrow();
    });
});