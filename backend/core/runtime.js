/**
 * ZANISTARAST Runtime Manager
 * AI Native Model
 */

const {
    initializeZanistarast,
    getZanistarastStatus
} = require("../bootstrap");

const orchestrator =
    require("./orchestrator");

class Runtime {

    constructor() {
        this.started = false;
        this.status = null;
    }

    start(config = {}) {

        if (this.started) {
            return this.status;
        }

        this.status =
            initializeZanistarast(config);

        this.started = true;

        return this.status;
    }

    async process(request) {

        if (!this.started) {
            this.start();
        }

        return await orchestrator.execute(request);
    }

    getStatus() {

        if (!this.started) {
            return {
                started: false,
                bootstrap: null
            };
        }

        return {
            started: true,
            bootstrap: getZanistarastStatus()
        };
    }
}

module.exports =
    new Runtime();



