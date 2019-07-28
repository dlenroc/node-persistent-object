const fs = require('fs');
const path = require('path');
const interceptor = require('./interceptor');

const dataBases = {};

module.exports = function (filename, defaultValue = {}) {
    const dbFile = path.resolve(filename);

    if (dataBases[dbFile])
        return dataBases[dbFile];

    return dataBases[dbFile] = interceptor({
            onInit() {
                if (fs.existsSync(filename)) {
                    let content = fs.readFileSync(filename, {encoding: 'utf-8'});
                    return content ? JSON.parse(content) : defaultValue;
                }

                return defaultValue;
            },

            onSave(data, sync) {
                const json = JSON.stringify(data, null, 2);

                if (sync)
                    return fs.writeFileSync(filename, json);

                return new Promise((resolve, reject) => {
                    fs.writeFile(filename, json, err => err ? reject(err) : resolve())
                })
            },
        }
    )
};
