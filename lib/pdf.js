const pdfjsLib = require('pdfjs-dist');
const R = require('ramda');
// const isButton = annotation => 'Btn' == annotation.fieldType;
// const isCheckbox = annotation => true == annotation.checkBox;

const isWriteable = R.propEq('readOnly', false);
const isButton = R.propEq('fieldType', 'Btn');
const isCheckbox = R.propEq('checkBox', true);
const isWriteableButtonCheckbox = R.allPass([isWriteable, isButton, isCheckbox]);

const isText = R.propEq('fieldType', 'Tx');
const isPaymentAccount = R.propEq('fieldName', 'PaymentAccount');
const isTestTextField = R.allPass([isWriteable, isText, isPaymentAccount]);

module.exports.getFields = (filePath) => {
    return pdfjsLib.getDocument(filePath)
        .then(getPages)
        .then(getPageAnnotations)
        .then(flatten)
        .then(fields)
        .then(editFields)
        .then(print);
};

function editFields(fields) {
    fields.forEach((field) => {
        field.fieldValue = 'boo hoo';
    });
    return fields;
}

function fields(annotations) {
    return R.filter(isTestTextField, annotations);
}

function print(items) {
    R.forEach((item) => console.log(item), items);
    console.log('length', items.length);
}

function flatten(pageAnnotations) {
    return R.flatten(pageAnnotations);
}

function getPageAnnotations(pages) {
    const annotationPromises = [];
    pages.forEach((page) => {
        annotationPromises.push(page.getAnnotations());
    });
    return Promise.all(annotationPromises);
}

function getPages(doc) {
    const numPages = doc.numPages;
    console.log(`Number of pages: ${numPages}`);
    const pagePromises = [];
    for (let i = 1; i <= doc.numPages; i++) {
        pagePromises.push(doc.getPage(i));
    }
    return Promise.all(pagePromises);
}


