/**
 * Formal Foundations Bootstrap
 * ZANISTARAST AI Native Model
 */

const path = require("path");

const formalRegistry =
    require("../loader/formal_registry");

const verificationPipeline =
    require("../verifier/verification_pipeline");

class Bootstrap {

    constructor() {

        this.loaded = false;

        this.registry = null;

        this.paths = {};
    }

    initialize(config = {}) {

        this.paths = {
            spec:
                config.specPath ||
                path.resolve(__dirname, "../../../zanistarast-formal-foundations/spec"),

            lean:
                config.leanPath ||
                path.resolve(__dirname, "../../../zanistarast-formal-foundations/lean"),

            coq:
                config.coqPath ||
                path.resolve(__dirname, "../../../zanistarast-formal-foundations/coq"),

            isabelle:
                config.isabellePath ||
                path.resolve(__dirname, "../../../zanistarast-formal-foundations/isabelle"),

            agda:
                config.agdaPath ||
                path.resolve(__dirname, "../../../zanistarast-formal-foundations/agda")
        };

        this.registry = formalRegistry.getAll();

        this.registry.specification.load(this.paths.spec);
        this.registry.lean.load(this.paths.lean);
        this.registry.coq.load(this.paths.coq);
        this.registry.isabelle.load(this.paths.isabelle);
        this.registry.agda.load(this.paths.agda);

        this.loaded = true;

        return {
            loaded: this.loaded,
            paths: this.paths,
            systems: Object.keys(this.registry),
            initializedAt: new Date().toISOString()
        };
    }

    verify(input) {

        if (!this.loaded) {
            throw new Error("Bootstrap must be initialized before verification.");
        }

        return verificationPipeline.run(input);
    }

    status() {

        return {
            loaded: this.loaded,
            systems: this.registry ? Object.keys(this.registry) : [],
            paths: this.paths
        };
    }
}

module.exports =
    new Bootstrap();



