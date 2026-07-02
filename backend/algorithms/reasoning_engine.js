/**
 * Deterministic Reasoning Engine
 * ZANISTARAST AI Native Model
 */

class ReasoningEngine {

    analyze(question) {

        return {

            input: question,

            intent:
                this.detectIntent(question),

            concepts:
                this.extractConcepts(question)

        };

    }

    detectIntent(question) {

        if (!question)
            return "unknown";

        return "analysis";

    }

    extractConcepts(question) {

        if (!question)
            return [];

        return question
            .split(/\s+/)
            .filter(Boolean);

    }

}

module.exports =
    new ReasoningEngine();


