import{runtimeConfig}from"./runtime-config.js";
import{createBridgeIndex}from"./discovery-bridge.js";

export async function loadOrgDiscovery({source=globalThis,fetchImpl=globalThis.fetch}={}){
 const cfg=runtimeConfig(source);
 if(!cfg.orgDiscoveryBase)return Object.freeze({configured:false,available:false,records:Object.freeze([]),index:createBridgeIndex([]),reason:"NOT_CONFIGURED"});
 if(typeof fetchImpl!=="function")return Object.freeze({configured:true,available:false,records:Object.freeze([]),index:createBridgeIndex([]),reason:"FETCH_UNAVAILABLE"});
 try{
  const res=await fetchImpl(cfg.orgDiscoveryBase,{method:"GET",headers:{accept:"application/json"},cache:"no-store",credentials:"omit"});
  if(!res?.ok)return Object.freeze({configured:true,available:false,records:Object.freeze([]),index:createBridgeIndex([]),reason:"HTTP_"+(res?.status??"ERROR")});
  const body=await res.json(),records=Array.isArray(body)?body:Array.isArray(body?.records)?body.records:[];
  const index=createBridgeIndex(records),eligible=index.list();
  return Object.freeze({configured:true,available:true,records:Object.freeze(eligible),index,reason:null});
 }catch{
  return Object.freeze({configured:true,available:false,records:Object.freeze([]),index:createBridgeIndex([]),reason:"FETCH_FAILED"});
 }
}
