/**
 * Runtime Gateway
 */

const runtime =
    require("../backend/core/runtime_api");

class RuntimeGateway {

    async initialize(req, res) {

        try {

            const result =
                await runtime.initialize(req.body);

            res.json(result);

        } catch (err) {

            res.status(500).json({

                success:false,

                error:err.message

            });

        }

    }

    async process(req,res){

        try{

            const result=
                await runtime.process(req.body);

            res.json(result);

        }catch(err){

            res.status(500).json({

                success:false,

                error:err.message

            });

        }

    }

    async health(req,res){

        res.json(

            await runtime.health()

        );

    }

}

module.exports=
    new RuntimeGateway();



