const pdfjsLib = require('pdfjs-dist');
const R = require('ramda');
// const isButton = annotation => 'Btn' == annotation.fieldType;
// const isCheckbox = annotation => true == annotation.checkBox;

var isWriteable = R.propEq('readOnly', false);
var isButton = R.propEq('fieldType', 'Btn');
var isCheckbox = R.propEq('checkBox', true);
var isWriteableButtonCheckbox = R.allPass([isWriteable, isButton, isCheckbox]);

module.exports.getFields = (filePath) => {
    return pdfjsLib.getDocument(filePath)
        .then(getPages)
        .then(getPageAnnotations)
        .then(flatten)
        .then(fields)
        .then(print);
};

function fields(annotations) {
    return R.filter(isWriteableButtonCheckbox, annotations);
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


