/**
 * Runtime Test
 */

const runtime =
    require("../backend/core/runtime_api");

test("runtime initializes", async () => {

    const result =
        await runtime.initialize();

    expect(result).toBeDefined();

});

test("runtime status is available", async () => {

    const status =
        runtime.status();

    expect(status).toBeDefined();

});

test("runtime health endpoint returns service status", async () => {

    const health =
        await runtime.health();

    expect(health.service)
        .toBe("zanistarast-ai-native-model");

});





