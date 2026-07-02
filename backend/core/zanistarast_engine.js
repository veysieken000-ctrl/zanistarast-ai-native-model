/**
 * ZANISTARAST Engine
 * Unified AI Native Core
 */

const planner =
    require("../execution/planner");

const executor =
    require("../execution/executor");

const responseBuilder =
    require("../execution/response_builder");

const ontology =
    require("../ontology");

class ZanistarastEngine {

    async process(request) {

        const plan =
            planner.createPlan(request);

        const execution =
            executor.execute(plan);

        const response =
            responseBuilder.build(execution);

        return {

            success: response.success,

            verification:
                response.verificationReport,

            ontology:

                ontology.inferenceEngine.explain(
                    request.concept || ""
                ),

            response:
                response.response

        };

    }

}

module.exports =
    new ZanistarastEngine();



