const clean=v=>String(v??"").trim().toLocaleLowerCase("tr").normalize("NFKC");
const list=v=>Array.isArray(v)?v:[];

export function normalizeTopicMetadata(record={}){
 const topics=[...new Set([...list(record.topics),...list(record.tags),...list(record.values)].map(clean).filter(Boolean))];
 return Object.freeze({topics:Object.freeze(topics)});
}

export function topicOverlap(a,b){
 const left=new Set(normalizeTopicMetadata(a).topics);
 return normalizeTopicMetadata(b).topics.filter(x=>left.has(x)).length;
}

export function topicMatches(record,query){
 const q=clean(query);if(!q)return false;
 return normalizeTopicMetadata(record).topics.some(topic=>topic===q||topic.includes(q)||q.includes(topic));
}

export function topicFacets(records=[]){
 const counts=new Map();
 for(const record of list(records))for(const topic of normalizeTopicMetadata(record).topics)counts.set(topic,(counts.get(topic)??0)+1);
 return Object.freeze([...counts.entries()].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],"tr")).map(([topic,count])=>Object.freeze({topic,count})));
}

export function topicInterestProfile(searchInterests={},minimum=2){
 return Object.freeze(Object.entries(searchInterests??{}).map(([topic,count])=>[clean(topic),Math.max(0,Number(count)||0)]).filter(([topic,count])=>topic&&count>=minimum).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],"tr")).map(([topic,count])=>Object.freeze({topic,count:Math.min(20,count)})));
}
