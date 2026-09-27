const fs=require("node:fs"),path=require("node:path");
const VERSION=1;
function safeId(id){if(typeof id!=="string"||!id||!/^[a-zA-Z0-9._:-]{1,160}$/.test(id))throw Error("INVALID_ID");return id}
function memoryAdapter(){const map=new Map();return Object.freeze({kind:"memory",persistent:false,async get(id){return map.get(safeId(id))??null},async put(id,value){map.set(safeId(id),structuredClone(value));return true},async remove(id){return map.delete(safeId(id))},async snapshot(){return Object.fromEntries(map)}})}
function fileAdapter(dir){fs.mkdirSync(dir,{recursive:true});const file=path.join(dir,"state-v1.json");const read=()=>{try{return JSON.parse(fs.readFileSync(file,"utf8"))}catch{return{version:VERSION,records:{}}}};const write=x=>{const tmp=file+".tmp";fs.writeFileSync(tmp,JSON.stringify(x));fs.renameSync(tmp,file)};return Object.freeze({kind:"file",persistent:true,async get(id){return read().records[safeId(id)]??null},async put(id,value){const x=read();x.records[safeId(id)]=value;write(x);return true},async remove(id){const x=read(),ok=Object.hasOwn(x.records,safeId(id));delete x.records[safeId(id)];write(x);return ok},async snapshot(){return read().records}})}
function createStorage(env=process.env){const dir=env.ZANISTARAST_STORAGE_DIR;return dir?fileAdapter(dir):memoryAdapter()}
module.exports={createStorage,memoryAdapter,fileAdapter};
