/**
 * Simulation Report
 */

class Report {

    generate(simulation, evaluation) {

        return {

            timestamp:
                new Date().toISOString(),

            scenario:
                simulation.scenario,

            result:
                simulation.result,

            evaluation

        };

    }

}

module.exports =
    new Report();



