/**
 * Learning Engine
 * ZANISTARAST AI Native Model
 */

class LearningEngine {

    constructor(){

        this.history=[];

    }

    record(session){

        this.history.push({

            timestamp:new Date().toISOString(),

            session

        });

    }

    getHistory(){

        return this.history;

    }

    clear(){

        this.history=[];

    }

}

module.exports =
    new LearningEngine();




