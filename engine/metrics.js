/**
 * Simulation Metrics
 * ZANISTARAST Simulation Framework
 */

class Metrics {

    evaluate(simulation) {

        return {

            completed:
                simulation.result.executed,

            verified:
                simulation.result.verified,

            duration:
                0,

            score:
                this.calculateScore(simulation)

        };

    }

    calculateScore(simulation) {

        if (
            simulation.result.executed &&
            simulation.result.verified
        ) {
            return 1.0;
        }

        return 0.0;

    }

}

module.exports =
    new Metrics();



