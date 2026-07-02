/**
 * Ontology Loader
 * ZANISTARAST AI Native Model
 */

const fs = require("fs");
const path = require("path");

class OntologyLoader {

    constructor() {

        this.ontology = {};

    }

    load(directory) {

        const files = fs.readdirSync(directory);

        for (const file of files) {

            if (!file.endsWith(".json"))
                continue;

            const fullPath =
                path.join(directory, file);

            this.ontology[file] =
                JSON.parse(
                    fs.readFileSync(fullPath, "utf8")
                );
        }

        return this.ontology;
    }

    get(name) {

        return this.ontology[name];

    }

    getAll() {

        return this.ontology;

    }

}

module.exports =
    new OntologyLoader();



