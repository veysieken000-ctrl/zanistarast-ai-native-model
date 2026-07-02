/**
 * Zanistarast Formal Gateway
 * Connects API requests to Formal Foundations
 */

const {
    initializeZanistarast,
    verifyWithZanistarast,
    getZanistarastStatus
} = require("../backend/bootstrap");

class ZanistarastFormalGateway {

    constructor() {

        this.initialized = false;

    }

    initialize(config = {}) {

        if (this.initialized)
            return getZanistarastStatus();

        const result =
            initializeZanistarast(config);

        this.initialized = true;

        return result;

    }

    verify(request) {

        if (!this.initialized) {

            this.initialize();

        }

        return verifyWithZanistarast(request);

    }

    status() {

        return getZanistarastStatus();

    }

}

module.exports =
    new ZanistarastFormalGateway();



