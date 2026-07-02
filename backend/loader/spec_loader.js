/**
 * Specification Loader
 * ZANISTARAST AI Native Model
 */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

class SpecLoader {

    constructor() {

        this.spec = {};

    }

    load(directory) {

        const files =
            fs.readdirSync(directory);

        for (const file of files) {

            if (!file.endsWith(".yaml"))
                continue;

            const fullPath =
                path.join(directory, file);

            const content =
                fs.readFileSync(fullPath, "utf8");

            this.spec[file] =
                yaml.load(content);
        }

        return this.spec;
    }

    get(name) {

        return this.spec[name];

    }

    getAll() {

        return this.spec;

    }

}

module.exports =
    new SpecLoader();



