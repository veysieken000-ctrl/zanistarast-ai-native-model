/**
 * Runtime API Tests
 */

const runtime =
    require("../backend/core/runtime_api");

test("runtime initializes successfully", async () => {

    const result =
        await runtime.initialize();

    expect(result).toBeDefined();

});

test("runtime processes a request", async () => {

    const result =
        await runtime.process({

            ontology: true,

            consistent: true,

            optimized: true,

            coordinated: true,

            text: "Hello Zanistarast"

        });

    expect(result.success).toBe(true);

});

test("runtime health endpoint", async () => {

    const health =
        await runtime.health();

    expect(health.status).toBe("UP");

});




