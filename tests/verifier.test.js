/**
 * Rasterast Verifier Test
 */

const verificationPipeline =
    require("../backend/verifier/verification_pipeline");

test("accepts fully valid Zanistarast context", () => {

    const result =
        verificationPipeline.run({
            ontology: true,
            consistent: true,
            optimized: true,
            coordinated: true,
            text: "Zanistarast verification test"
        });

    expect(result.accepted).toBe(true);

    expect(result.report.verified).toBe(true);

    expect(result.report.rasterast).toBe(true);

});




