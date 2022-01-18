const populateData = require('./populate-data');
const createDataEntry = require('./create-data-entry');
const getDataEntries = require('./getDataEntries');
const getDataEntry = require('./getDataEntry');
const deleteDataEntry = require('./deleteDataEntry');
const exportData = require('./export-data');
const readImportFile = require('./import-file');
const importDataEntries = require('./import-data-entries');

const controller = {
    populateData,
    createDataEntry,
    getDataEntries,
    getDataEntry,
    deleteDataEntry,
    exportData,
    readImportFile,
    importDataEntries
}

module.exports = controller;