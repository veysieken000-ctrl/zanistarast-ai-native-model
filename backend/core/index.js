/**
 * ZANISTARAST Core
 * Public API
 */

const engine =
    require("./zanistarast_engine");

module.exports = {

    process:
        (request) => engine.process(request),

    engine

};


