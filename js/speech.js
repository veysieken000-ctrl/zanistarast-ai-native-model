async function sendMessage(message) {

    const payload = {

        ontology: true,

        consistent: true,

        optimized: true,

        coordinated: true,

        text: message

    };

    const response =
        await verifyWithZanistarast(payload);

    return response;

}



