const pdf = require('./pdf');

// const pdfPath = process.argv[2] || '../../web/compressed.tracemonkey-pldi-09.pdf';
const pdfPath = process.argv[2] || '/Users/kris/code/h8pdf/lib/pdf.fields.test.pdf';

pdf.getFields(pdfPath);


