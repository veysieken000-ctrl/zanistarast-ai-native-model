/**
 * Coq Loader
 * ZANISTARAST AI Native Model
 */

const fs = require("fs");
const path = require("path");

class CoqLoader {

    constructor() {
        this.files = {};
    }

    load(directory) {

        const files = fs.readdirSync(directory);

        for (const file of files) {

            if (!file.endsWith(".v"))
                continue;

            const fullPath = path.join(directory, file);

            this.files[file] =
                fs.readFileSync(fullPath, "utf8");
        }

        return this.files;
    }

    get(fileName) {
        return this.files[fileName];
    }

    getAll() {
        return this.files;
    }

    exists(fileName) {
        return fileName in this.files;
    }
}

module.exports =
    new CoqLoader();


