/**
 * Bootstrap Entry Point
 * ZANISTARAST AI Native Model
 */

const bootstrap =
    require("./bootstrap");

function initializeZanistarast(config = {}) {

    return bootstrap.initialize(config);
}

function reviewWithZanistarast(input) {

    return bootstrap.review(input);
}

function getZanistarastStatus() {

    return bootstrap.status();
}

module.exports = {
    initializeZanistarast,
    reviewWithZanistarast,
    verifyWithZanistarast: reviewWithZanistarast,
    getZanistarastStatus
};


