/**
 * Ontology Inference Engine
 * ZANISTARAST AI Native Model
 */

const relationEngine =
    require("./relation_engine");

class InferenceEngine {

    infer(concept) {

        const neighborhood =
            relationEngine.buildNeighborhood(concept);

        return {
            concept,
            inferredRelations: neighborhood.relations,
            hasOntologyContext: neighborhood.relations.length > 0
        };
    }

    validateConceptPair(a, b) {

        return relationEngine.hasRelation(a, b);
    }

    explain(concept) {

        const result =
            this.infer(concept);

        return {
            concept,
            explanation:
                result.hasOntologyContext
                    ? `${concept} has ontology-linked relations.`
                    : `${concept} has no known ontology relations.`,
            relations: result.inferredRelations
        };
    }
}

module.exports =
    new InferenceEngine();



