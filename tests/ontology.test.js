/**
 * Ontology Integration Test
 */

const ontology =
    require("../backend/ontology");

test("ontology module loads successfully", () => {

    expect(
        ontology
    ).toBeDefined();

});

test("concept resolver returns null for unknown concept", () => {

    const result =
        ontology.conceptResolver.resolve(
            "UnknownConcept"
        );

    expect(result).toBeNull();

});

test("relation engine returns an array", () => {

    const relations =
        ontology.relationEngine.getRelations(
            "Hebun"
        );

    expect(
        Array.isArray(relations)
    ).toBe(true);

});

test("inference engine returns explanation", () => {

    const result =
        ontology.inferenceEngine.explain(
            "Hebun"
        );

    expect(result).toHaveProperty("concept");

    expect(result).toHaveProperty("relations");

    expect(result).toHaveProperty("explanation");

});



