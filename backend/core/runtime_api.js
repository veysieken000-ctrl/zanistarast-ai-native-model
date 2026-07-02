/**
 * Runtime API
 * ZANISTARAST AI Native Model
 */

const runtime =
    require("./runtime");

class RuntimeAPI {

    async initialize(config = {}) {

        return runtime.start(config);

    }

    async process(request) {

        return runtime.process(request);

    }

    status() {

        return runtime.getStatus();

    }

    async health() {

        const status =
            runtime.getStatus();

        return {

            service: "zanistarast-ai-native-model",

            status:
                status.started
                    ? "UP"
                    : "DOWN",

            runtime: status

        };

    }

}

module.exports =
    new RuntimeAPI();


