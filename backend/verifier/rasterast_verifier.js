/**
 * Rasterast Verification Engine
 * ZANISTARAST AI Native Model
 */

const coreRules =
    require("../../schema/zanistarast_core_rules.json");

class RasterastVerifier {

    verify(context) {

        const report = {

            hebun: this.checkHebun(context),

            zanabun: this.checkZanabun(context),

            mabun: this.checkMabun(context),

            rabun: this.checkRabun(context),

            rasterast: false,

            verified: false
        };

        report.rasterast =
            report.hebun &&
            report.zanabun &&
            report.mabun &&
            report.rabun;

        report.verified = report.rasterast;

        return report;
    }

    checkHebun(context){

        return context.ontology === true;
    }

    checkZanabun(context){

        return context.consistent === true;
    }

    checkMabun(context){

        return context.optimized === true;
    }

    checkRabun(context){

        return context.coordinated === true;
    }

}

module.exports =
    new RasterastVerifier();







