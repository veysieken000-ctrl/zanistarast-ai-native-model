/**
 * Specification Verifier
 */

const specLoader =
    require("../loader/spec_loader");

class SpecVerifier {

    verify() {

        const specs =
            specLoader.getAll();

        return {

            files:
                Object.keys(specs),

            count:
                Object.keys(specs).length,

            valid:
                Object.keys(specs).length > 0

        };

    }

}

module.exports =
    new SpecVerifier();



