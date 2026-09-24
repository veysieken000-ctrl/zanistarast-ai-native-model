/**
 * Specification Artifact Checker
 */

const specLoader =
    require("../loader/spec_loader");

class SpecVerifier {

    check() {

        const specs =
            specLoader.getAll();

        return {

            files:
                Object.keys(specs),

            count:
                Object.keys(specs).length,

            specifications_present:
                Object.keys(specs).length > 0,

            epistemic_status: "UNVERIFIED",
            canonical_authority: false,
            scientific_proof: false

        };

    }

}

module.exports =
    new SpecVerifier();



