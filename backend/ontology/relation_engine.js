/**
 * Semantic Relation Engine
 * ZANISTARAST AI Native Model
 */

const resolver =
    require("./concept_resolver");

class RelationEngine {

    getRelations(concept) {

        return resolver.related(concept);

    }

    hasRelation(a, b) {

        const relations =
            resolver.related(a);

        return relations.includes(b);

    }

    buildNeighborhood(concept) {

        return {

            concept,

            relations:

                resolver.related(concept)

        };

    }

}

module.exports =
    new RelationEngine();



