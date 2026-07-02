/**
 * Ontology Module
 * ZANISTARAST AI Native Model
 */

const ontologyLoader =
    require("./ontology_loader");

const conceptResolver =
    require("./concept_resolver");

const relationEngine =
    require("./relation_engine");

const inferenceEngine =
    require("./inference_engine");

module.exports = {

    ontologyLoader,

    conceptResolver,

    relationEngine,

    inferenceEngine

};


