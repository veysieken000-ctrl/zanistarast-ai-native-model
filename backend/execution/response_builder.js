/**
 * Verified Response Builder
 * ZANISTARAST AI Native Model
 */

const reportGenerator =
    require("../verifier/report_generator");

class ResponseBuilder {

    build(result) {

        const report =
            reportGenerator.generate({

                accepted:
                    result.success,

                report:
                    result.verification.report,

                invariants:
                    result.verification.invariants || null,

                theorems:
                    result.verification.theorems || null,

                proofs:
                    result.verification.proofs || null,

                yek:
                    result.verification.yek || null

            });

        return {

            success:
                result.success,

            timestamp:
                new Date().toISOString(),

            verificationReport:
                report,

            response:
                result.verification.context.text

        };

    }

}

module.exports =
    new ResponseBuilder();



