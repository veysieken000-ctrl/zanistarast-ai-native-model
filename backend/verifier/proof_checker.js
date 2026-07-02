/**
 * Proof Checker
 * ZANISTARAST AI Native Model
 */

class ProofChecker {

    constructor() {

        this.requiredProofs = [
            "lean",
            "coq",
            "isabelle",
            "agda"
        ];

    }

    check(context) {

        const report = {

            lean:
                context.lean === true,

            coq:
                context.coq === true,

            isabelle:
                context.isabelle === true,

            agda:
                context.agda === true
        };

        report.complete =
            Object.values(report).every(Boolean);

        return report;

    }

    verifyFormalizations(formalizations) {

        if (!formalizations)
            return false;

        return this.requiredProofs.every(
            system => formalizations.includes(system)
        );

    }

}

module.exports =
    new ProofChecker();




