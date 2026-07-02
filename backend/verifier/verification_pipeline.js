/**
 * Canonical Verification Pipeline
 * Hebûn → Zanabûn → Mabûn → Rabûn → Rasterast
 */

const rasterastVerifier =
    require("./rasterast_verifier");

class VerificationPipeline {

    run(input) {

        const context = this.buildContext(input);

        const report =
            rasterastVerifier.verify(context);

        return {
            input,
            context,
            report,
            accepted: report.verified === true
        };
    }

    buildContext(input) {

        return {
            ontology: Boolean(input.ontology),
            consistent: Boolean(input.consistent),
            optimized: Boolean(input.optimized),
            coordinated: Boolean(input.coordinated),
            text: input.text || ""
        };
    }
}

module.exports =
    new VerificationPipeline();



