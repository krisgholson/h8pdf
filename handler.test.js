const handler = require('./handler');

test('adds 1 + 2 to equal 3', () => {
    expect(handler.hello(1, 2)).toBe(3);
});