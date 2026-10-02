const fs = require('fs/promises');
const path = require('path');

const pathToFile = path.join(__dirname, '..', 'db.json');

async function readData() {
    let data = await fs.readFile(pathToFile, 'utf-8');
    return JSON.parse(data);
}

async function delayReadData() {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 1500);
    });
    return await readData();
}

async function writeData(data) {
    await fs.writeFile(pathToFile, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
    readData,
    delayReadData,
    writeData
};
