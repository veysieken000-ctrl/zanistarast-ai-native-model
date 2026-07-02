/**
 * Specification Test
 */

const specLoader =
    require("../backend/loader/spec_loader");

test("loads formal specification files", () => {

    const result =
        specLoader.load("../zanistarast-formal-foundations/spec");

    expect(result).toBeDefined();

    expect(Object.keys(result).length).toBeGreaterThan(0);

});


