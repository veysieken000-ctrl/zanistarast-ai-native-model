const http=require("http");
const PORT=Number(process.env.PORT??3000);
const origins=new Set(String(process.env.ALLOWED_ORIGINS||"http://localhost:8080").split(",").map(x=>x.trim()).filter(Boolean));
function send(res,status,body,origin){if(origin&&origins.has(origin))res.setHeader("Access-Control-Allow-Origin",origin);res.setHeader("Vary","Origin");res.setHeader("Content-Type","application/json; charset=utf-8");res.setHeader("Cache-Control","no-store");res.writeHead(status);res.end(JSON.stringify(body))}
const server=http.createServer((req,res)=>{const origin=req.headers.origin;if(req.method==="OPTIONS"){if(origin&&origins.has(origin)){res.setHeader("Access-Control-Allow-Origin",origin);res.setHeader("Access-Control-Allow-Methods","GET,OPTIONS");res.setHeader("Access-Control-Allow-Headers","Content-Type");res.writeHead(204);return res.end()}return send(res,403,{error:"origin_not_allowed"})}
 if(req.method!=="GET")return send(res,405,{error:"method_not_allowed"},origin);
 if(req.url==="/health")return send(res,200,{ok:true,service:"zanistarast-com-api"},origin);
 if(req.url==="/readiness")return send(res,200,{ok:true,mode:"pre-domain",publication:"fail-closed"},origin);
 return send(res,404,{error:"not_found"},origin)});
server.listen(PORT,"0.0.0.0",()=>console.log("zanistarast-com-api listening"));module.exports=server;
