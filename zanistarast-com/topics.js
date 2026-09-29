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
