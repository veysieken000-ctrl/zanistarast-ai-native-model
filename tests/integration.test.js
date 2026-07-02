/**
 * End-to-End Integration Test
 */

const runtime =
    require("../backend/core/runtime_api");

test("complete Zanistarast workflow", async () => {

    await runtime.initialize();

    const result =
        await runtime.process({

            ontology: true,

            consistent: true,

            optimized: true,

            coordinated: true,

            text: "Integration Test",

            concept: "Hebun"

        });

    expect(result.success).toBe(true);

    expect(result.verification).toBeDefined();

    expect(result.reasoning).toBeDefined();

    expect(result.planning).toBeDefined();

    expect(result.decision).toBeDefined();

    expect(result.simulation).toBeDefined();

});



