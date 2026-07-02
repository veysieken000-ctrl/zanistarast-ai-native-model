/**
 * Formal Registry
 * ZANISTARAST AI Native Model
 */

const specLoader =
    require("./spec_loader");

const leanLoader =
    require("./lean_loader");

const coqLoader =
    require("./coq_loader");

const isabelleLoader =
    require("./isabelle_loader");

const agdaLoader =
    require("./agda_loader");

class FormalRegistry {

    constructor() {

        this.registry = {

            specification: specLoader,

            lean: leanLoader,

            coq: coqLoader,

            isabelle: isabelleLoader,

            agda: agdaLoader

        };

    }

    get(system) {

        return this.registry[system];

    }

    getAll() {

        return this.registry;

    }

    has(system) {

        return system in this.registry;

    }

}

module.exports =
    new FormalRegistry();



