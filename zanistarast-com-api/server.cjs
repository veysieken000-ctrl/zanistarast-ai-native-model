const http=require("http");
const PORT=Number(process.env.PORT??3000);
const origins=new Set(String(process.env.ALLOWED_ORIGINS||"http://localhost:8080").split(",").map(x=>x.trim()).filter(Boolean));
const BUILD_SHA=process.env.RENDER_GIT_COMMIT||process.env.BUILD_SHA||null;
function cors(res,origin){if(origin&&origins.has(origin))res.setHeader("Access-Control-Allow-Origin",origin);res.setHeader("Vary","Origin")}
function send(res,status,body,origin){cors(res,origin);res.setHeader("Content-Type","application/json; charset=utf-8");res.setHeader("Cache-Control","no-store");res.setHeader("X-Content-Type-Options","nosniff");res.writeHead(status);res.end(JSON.stringify(body))}
const server=http.createServer((req,res)=>{const origin=req.headers.origin;
 if(req.method==="OPTIONS"){if(origin&&origins.has(origin)){cors(res,origin);res.setHeader("Access-Control-Allow-Methods","GET,OPTIONS");res.setHeader("Access-Control-Allow-Headers","Content-Type");res.setHeader("Access-Control-Max-Age","600");res.writeHead(204);return res.end()}return send(res,403,{error:"origin_not_allowed"})}
 if(req.method!=="GET")return send(res,405,{error:"method_not_allowed"},origin);
 if(req.url==="/health")return send(res,200,{ok:true,service:"zanistarast-com-api",build:BUILD_SHA},origin);
 if(req.url==="/readiness")return send(res,200,{ok:true,service:"zanistarast-com-api",mode:"pre-domain",publication:"fail-closed",build:BUILD_SHA,checks:{http:true,corsConfigured:origins.size>0,persistentStorage:false,orgDiscoveryFeed:false,domain:false}},origin);
 return send(res,404,{error:"not_found"},origin)});
server.listen(PORT,"0.0.0.0",()=>console.log("zanistarast-com-api listening"));module.exports=server;
