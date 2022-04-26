import validateType from '../src';

describe('validateType', () => {
    it('validate string', () => {
        expect(() => validateType('s', 'string')).not.toThrowError();
        expect(() => validateType('s', 'number')).toThrowError(
            new Error('expected type is number, but received string.')
        );
        expect(() => validateType('ss', { type: 'string', length: 2 })).not.toThrowError();
        expect(() => validateType('ss', { type: 'string', length: 1 })).toThrowError(
            new Error('expected length 1, got value length 2.')
        );
        expect(() => validateType('ss', { type: 'string', maxLen: 2 })).not.toThrowError();
        expect(() => validateType('ss', { type: 'string', maxLen: 1 })).toThrowError(
            new Error('expected maximum length 1, got value length 2.')
        );
        expect(() => validateType('ss', { type: 'string', minLen: 2 })).not.toThrowError();
        expect(() => validateType('ss', { type: 'string', minLen: 3 })).toThrowError(
            new Error('expected minimum length 3, got value length 2.')
        );
        expect(() => validateType('ss', { type: 'string', format: /[a-z]+/ })).not.toThrowError();
        expect(() => validateType('11', { type: 'string', format: /[a-z]+/ })).toThrowError(
            new Error('expected format /[a-z]+/, got mismatched value 11.')
        );
    });
    it('validate number', () => {
        expect(() => validateType(1, 'number')).not.toThrowError();
        expect(() => validateType(1, 'string')).toThrowError(
            new Error('expected type is string, but received number.')
        );
        expect(() => validateType(1.1, { type: 'number', float: true })).not.toThrowError();
        expect(() => validateType(1, { type: 'number', float: true })).toThrowError(
            new Error('value 1 is not fload number.')
        );
        expect(() => validateType(1, { type: 'number', max: 1 })).not.toThrowError();
        expect(() => validateType(2, { type: 'number', max: 1 })).toThrowError(
            new Error('value 2 is bigger than maximum value 1.')
        );
        expect(() => validateType(1, { type: 'number', min: 1 })).not.toThrowError();
        expect(() => validateType(1, { type: 'number', min: 2 })).toThrowError(
            new Error('value 1 is smaller than minimum value 2.')
        );
    });
    it('validate boolean', () => {
        expect(() => validateType(true, 'boolean')).not.toThrowError();
        expect(() => validateType(1, 'boolean')).toThrowError(
            new Error('expected type is boolean, but received number.')
        );
    });
    it('validate undefined', () => {
        expect(() => validateType(undefined, 'undefined')).not.toThrowError();
        expect(() => validateType(1, 'undefined')).toThrowError(
            new Error('expected type is undefined, but received number.')
        );
        expect(() => validateType(1, { type: 'undefined' })).toThrowError(
            new Error('expected type is undefined, but received number.')
        );
        expect(() => validateType(1, { type: 'aaa' as any })).toThrowError(
            new Error('expected type is aaa, but received number.')
        );
    });
    it('validate object', () => {
        expect(() => validateType({}, 'object')).not.toThrowError();
        expect(() => validateType({ name: 'test' }, { name: 'string' })).not.toThrowError();
        expect(() => validateType(1, 'object')).toThrowError(
            new Error('expected type is object, but received number.')
        );
        expect(() => validateType({ name: 'test' }, { age: 'string' } as any)).toThrowError(
            new Error('parameter age expected type is string, but received undefined.')
        );
        expect(() =>
            validateType(
                {
                    name: 'test',
                    age: 18,
                    isSingle: false,
                    children: undefined,
                    info: { device: 'xxx', available: true, model: 'xxx', token: undefined },
                    abilities: {},
                },
                {
                    name: 'string',
                    age: 'number',
                    isSingle: 'boolean',
                    children: 'undefined',
                    info: {
                        type: 'object',
                        values: {
                            device: {
                                type: 'string',
                            },
                            available: { type: 'boolean' },
                            model: 'string',
                            token: { type: 'undefined' },
                        },
                    },
                    abilities: { type: 'object' },
                }
            )
        ).not.toThrowError();
        expect(() =>
            validateType(
                { name: 'test', info: { device: 'xxx' } },
                {
                    name: 'string',
                    info: {
                        type: 'object',
                        values: {
                            device: {
                                type: 'array',
                                each: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                }
            )
        ).toThrowError(new Error('parameter device expected type is array, but received string.'));
        expect(() =>
            validateType(
                { name: 'test', devices: [] },
                {
                    name: 'string',
                    devices: 'string',
                }
            )
        ).toThrowError(new Error('parameter devices expected type is string, but received array.'));
        expect(() =>
            validateType(
                { name: 'test', device: {} },
                {
                    name: 'string',
                    device: { type: 'undefined' },
                }
            )
        ).toThrowError(new Error('parameter device expected type is undefined, but received object.'));
        expect(() => validateType({ name: 'test' }, { name: { type: 'aaa' as any } })).toThrowError(
            new Error('parameter name expected type is aaa, but received string.')
        );
        expect(() => validateType({ name: 'test' }, { name: { type: 'string', length: 2 } })).toThrowError(
            new Error('parameter name expected length 2, got value length 4.')
        );
        expect(() => validateType({ name: 'test' }, { name: { type: 'string', maxLen: 2 } })).toThrowError(
            new Error('parameter name expected maximum length 2, got value length 4.')
        );
        expect(() => validateType({ name: 'test' }, { name: { type: 'string', minLen: 5 } })).toThrowError(
            new Error('parameter name expected minimum length 5, got value length 4.')
        );
        expect(() => validateType({ name: 'test' }, { name: { type: 'string', format: /d+/ } })).toThrowError(
            new Error('parameter name expected format /d+/, got mismatched value test.')
        );
        expect(() => validateType({ age: 18 }, { age: 'number' })).not.toThrowError();
        expect(() => validateType({ age: 18 }, { age: 'string' })).toThrowError(
            new Error('parameter age expected type is string, but received number.')
        );
        expect(() => validateType({ age: 18.1 }, { age: { type: 'number', float: true } })).not.toThrowError();
        expect(() => validateType({ age: 18 }, { age: { type: 'number', float: true } })).toThrowError(
            new Error('parameter age value 18 is not fload number.')
        );
        expect(() => validateType({ age: 18 }, { age: { type: 'number', max: 20 } })).not.toThrowError();
        expect(() => validateType({ age: 18 }, { age: { type: 'number', max: 16 } })).toThrowError(
            new Error('parameter age value 18 is bigger than maximum value 16.')
        );
        expect(() => validateType({ age: 18 }, { age: { type: 'number', min: 16 } })).not.toThrowError();
        expect(() => validateType({ age: 16 }, { age: { type: 'number', min: 18 } })).toThrowError(
            new Error('parameter age value 16 is smaller than minimum value 18.')
        );

        expect(() => validateType({ devices: [1] }, { devices: 'array' })).not.toThrowError();
        expect(() => validateType({ devices: 1 }, { devices: 'array' })).toThrowError(
            new Error('parameter devices expected type is array, but received number.')
        );
        expect(() => validateType({ devices: [1] }, { devices: { type: 'array', length: 1 } })).not.toThrowError();
        expect(() => validateType({ devices: [1] }, { devices: { type: 'array', length: 2 } })).toThrowError(
            new Error('parameter devices expected length 2, got value length 1.')
        );
        expect(() => validateType({ devices: [1] }, { devices: { type: 'array', each: 'number' } })).not.toThrowError();
        expect(() =>
            validateType({ devices: [1] }, { devices: { type: 'array', each: { type: 'number' } } })
        ).not.toThrowError();
        expect(() =>
            validateType({ devices: [1] }, { devices: { type: 'array', each: { type: 'string' } } })
        ).toThrowError(new Error('parameter devices expected type is string, but received number.'));

        expect(() => validateType({ devices: [1] }, { devices: { type: 'array', maxLen: 1 } })).not.toThrowError();
        expect(() => validateType({ devices: [1, 2] }, { devices: { type: 'array', maxLen: 1 } })).toThrowError(
            new Error('parameter devices expected maximum length 1, got value length 2.')
        );
        expect(() => validateType({ devices: [1] }, { devices: { type: 'array', minLen: 1 } })).not.toThrowError();
        expect(() => validateType({ devices: [1] }, { devices: { type: 'array', minLen: 2 } })).toThrowError(
            new Error('parameter devices expected minimum length 2, got value length 1.')
        );
    });
    it('validate array', () => {
        expect(() => validateType(1, 'array')).toThrowError(new Error('expected type is array, but received number.'));
        expect(() => validateType([], 'array')).not.toThrowError();
        expect(() => validateType([], 'string')).toThrowError(
            new Error('expected type is string, but received array.')
        );
        expect(() => validateType([1], { type: 'array', length: 1 })).not.toThrowError();
        expect(() => validateType([1], { type: 'array', length: 2 })).toThrowError(
            new Error('expected length 2, got value length 1.')
        );
        expect(() => validateType([1], { type: 'array', each: 'number' })).not.toThrowError();
        expect(() => validateType([1], { type: 'array', each: { type: 'number' } })).not.toThrowError();
        expect(() => validateType([1], { type: 'array', each: { type: 'string' } })).toThrowError(
            new Error('expected type is string, but received number.')
        );
        expect(() => validateType([1, 2], { type: 'array', length: 2 })).not.toThrowError();
        expect(() => validateType([1, 2], { type: 'array', length: 1 })).toThrowError(
            new Error('expected length 1, got value length 2.')
        );
        expect(() => validateType([1, 2], { type: 'array', maxLen: 2 })).not.toThrowError();
        expect(() => validateType([1, 2], { type: 'array', maxLen: 1 })).toThrowError(
            new Error('expected maximum length 1, got value length 2.')
        );
        expect(() => validateType([1, 2], { type: 'array', minLen: 2 })).not.toThrowError();
        expect(() => validateType([1], { type: 'array', minLen: 2 })).toThrowError(
            new Error('expected minimum length 2, got value length 1.')
        );
    });
});
