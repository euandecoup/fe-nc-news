const { capitaliseFirstLetter } = require("../src/utils/capitaliseFirstLetter");

describe("capitaliseFirstLetter()", () => {
    test('should return a string', () => {
        const input = 'string'
        const actualOutput = capitaliseFirstLetter(input)
        expect(typeof actualOutput).toBe('string')
    });
    test('should return a string with the first letter capitalised', () => {
        const input = 'string'
        const actualOutput = capitaliseFirstLetter(input)
        const expectOutput = 'String'
        expect(actualOutput).toEqual(expectOutput)
    });
    test('should not mutate original input array of strings', () => {
        const input = 'string'
        capitaliseFirstLetter(input)
        expect(input).toEqual('string')
    });
})