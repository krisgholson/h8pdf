const pdf = require('./pdf');

test('extracts field data from test/LoadAgreement.pdf', () => {
    expect(pdf.getFields(1, 2)).toBe(3);
});