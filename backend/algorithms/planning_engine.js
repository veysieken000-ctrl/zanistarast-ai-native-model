/**
 * Planning Engine
 * ZANISTARAST AI Native Model
 */

class PlanningEngine {

    create(reasoning) {

        return {

            intent:
                reasoning.intent,

            concepts:
                reasoning.concepts,

            steps: [

                "ontology",

                "formal_verification",

                "reasoning",

                "response"

            ]

        };

    }

    validate(plan) {

        return Array.isArray(plan.steps)
            && plan.steps.length > 0;

    }

}

module.exports =
    new PlanningEngine();


