/**
 * Execution Planner
 * ZANISTARAST AI Native Model
 */

const registry =
    require("../loader/formal_registry");

class ExecutionPlanner {

    constructor() {

        this.pipeline = [

            "specification",

            "lean",

            "coq",

            "isabelle",

            "agda"

        ];

    }

    createPlan(request) {

        return {

            request,

            pipeline: [...this.pipeline],

            registry: registry.getAll(),

            createdAt:
                new Date().toISOString()

        };

    }

    validatePlan(plan) {

        return plan.pipeline.every(

            system => registry.has(system)

        );

    }

}

module.exports =
    new ExecutionPlanner();


