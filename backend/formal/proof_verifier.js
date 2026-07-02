/**
 * Proof Verifier
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
            specVerifier.verify();

        return {

            formal,

            specification: spec,

            verified:

                formal.verified &&

                spec.valid

        };

    }

}

module.exports =
    new ProofVerifier();



