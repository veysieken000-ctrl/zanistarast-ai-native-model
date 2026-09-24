/**
 * Zanistarast Formal Gateway
 * Connects API requests to Formal Foundations
 */

const {
    initializeZanistarast,
    reviewWithZanistarast,
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

    review(request) {

        if (!this.initialized) {

            this.initialize();

        }

        return reviewWithZanistarast(request);

    }

    status() {

        return getZanistarastStatus();

    }

}

module.exports =
    new ZanistarastFormalGateway();



