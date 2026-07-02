/**
 * Concept Resolver
 * ZANISTARAST AI Native Model
 */

const ontology =
    require("./ontology_loader");

class ConceptResolver {

    resolve(name) {

        const graph =
            ontology.getAll();

        for (const file in graph) {

            const concepts = graph[file];

            if (!Array.isArray(concepts))
                continue;

            const found =
                concepts.find(c => c.name === name);

            if (found)
                return found;

        }

        return null;

    }

    exists(name) {

        return this.resolve(name) !== null;

    }

    related(name) {

        const concept =
            this.resolve(name);

        if (!concept)
            return [];

        return concept.related || [];

    }

}

module.exports =
    new ConceptResolver();



