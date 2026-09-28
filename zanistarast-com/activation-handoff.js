export function nextActivationAction(handoff,resolvedIds=[]){
 const resolved=new Set(resolvedIds);
 for(const action of handoff?.nextActions??[]){
  if(resolved.has(action.checkId))continue;
  const deps=action.dependsOn??[];
  if(deps.every(id=>resolved.has(id)))return Object.freeze({...action});
 }
 return null;
}
