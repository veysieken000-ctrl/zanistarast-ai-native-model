/**
 * Bootstrap Entry Point
 * ZANISTARAST AI Native Model
 */

const bootstrap =
    require("./bootstrap");

function initializeZanistarast(config = {}) {

    return bootstrap.initialize(config);
}

function verifyWithZanistarast(input) {

    return bootstrap.verify(input);
}

function getZanistarastStatus() {

    return bootstrap.status();
}

module.exports = {
    initializeZanistarast,
    verifyWithZanistarast,
    getZanistarastStatus
};


