/**
 * Scenario Evaluator
 */

const metrics =
    require("./metrics");

class Evaluator {

    evaluate(simulation) {

        const report =
            metrics.evaluate(simulation);

        return {

            success:
                report.verified,

            metrics:
                report

        };

    }

}

module.exports =
    new Evaluator();


