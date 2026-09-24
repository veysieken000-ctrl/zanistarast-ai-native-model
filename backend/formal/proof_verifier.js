/**
 * Formal Proof Artifact Checker
 *
 * This module checks repository formalization coverage. It does not convert
 * technical completeness into scientific or canonical verification.
 */

const formalEngine =
    require("./formal_engine");

const specVerifier =
    require("./spec_verifier");

class ProofVerifier {

    verify() {

        const formal =
            formalEngine.verify();

        const spec =
            specVerifier.check();

        return {
            formal,
            specification: spec,
            formal_checks_passed:
                formal.formal_artifacts_complete === true &&
                spec.specifications_present === true,
            epistemic_status: "UNVERIFIED",
            rasterast_status: "NOT_REVIEWED",
            canonical_authority: false,
            scientific_proof: false
        };

    }

}

module.exports =
    new ProofVerifier();
