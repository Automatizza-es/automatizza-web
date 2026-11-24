// Exercise the real published branch in a disposable copy; never alter editorial files.
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, symlinkSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import matter from "gray-matter";
import { getArticles, articlePath, imagePath } from "../src/lib/blog/content.ts";
const fixture = mkdtempSync(join(tmpdir(),"automatizza-blog-publication-"));
let server;
try {
  for (const name of ["src", "content", "package.json", "package-lock.json", "next.config.ts", "next-env.d.ts", "tsconfig.json", "postcss.config.mjs"]) cpSync(name,join(fixture,name),{recursive:true});
  symlinkSync(resolve("node_modules"),join(fixture,"node_modules"),"dir");
  symlinkSync(resolve("public"),join(fixture,"public"),"dir");
  const articles = getArticles();
  const crm = articles.find(a=>a.slug==="crm-conectado-seguimiento-comercial");
  // Normalize the fixture so this test remains useful after later editorial releases.
  for (const a of articles) {
    const filename=join(fixture,"content/blog",a.kind,`${a.slug}.md`);
    const parsed=matter(readFileSync(filename,"utf8"));
    writeFileSync(filename,matter.stringify(parsed.content,{...parsed.data,draft:a.slug!==crm.slug,published:a.slug===crm.slug,publishedAt:a.slug===crm.slug?"2026-11-24":null}));
  }
  const env={...process.env,VERCEL_ENV:"production",BLOG_REVIEW_ENABLED:"true",ANALYTICS_ENABLED:"false",CONTACT_FORM_ENABLED:"false"};
  const build=spawn(process.execPath,["node_modules/next/dist/bin/next","build","--webpack"],{cwd:fixture,env,stdio:"inherit"});
  assert.equal((await once(build,"exit"))[0],0);
  const socket=createServer();socket.listen(0,"127.0.0.1");await once(socket,"listening");const port=socket.address().port;await new Promise(r=>socket.close(r));
  server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--hostname","127.0.0.1","--port",String(port)],{cwd:fixture,env,stdio:["ignore","pipe","inherit"]});
  await new Promise((done,reject)=>{server.stdout.on("data",b=>{if(b.toString().includes("Ready"))done()});server.on("exit",()=>reject(new Error("Server stopped")))});
  const base=`http://127.0.0.1:${port}`;
  const index=await(await fetch(base+"/blog")).text();assert.ok(index.includes(crm.titulo));
  const r=await fetch(base+articlePath(crm));assert.equal(r.status,200);const html=await r.text();
  const ld=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(ld["@type"],"BlogPosting");assert.equal(ld.datePublished,"2026-11-24");assert.equal(ld.author.name,"María José López");assert.equal(ld.url,"https://automatizza.es"+articlePath(crm));assert.ok(html.includes('property="og:image"'));
  assert.equal((await fetch(base+imagePath(crm))).status,200);
  const optimized=await fetch(base+"/_next/image?url="+encodeURIComponent(imagePath(crm))+"&w=750&q=75");assert.equal(optimized.status,200);
  const sitemap=await(await fetch(base+"/sitemap.xml")).text();assert.ok(sitemap.includes(articlePath(crm)));
  for(const a of articles.filter(a=>a.slug!==crm.slug)){assert.equal((await fetch(base+articlePath(a))).status,404);assert.ok(!sitemap.includes(articlePath(a)));assert.ok(!index.includes(a.titulo));}
  assert.equal((await fetch(base+"/revision-blog")).status,404);
  console.log("Publicación aislada: CRM 200, imagen optimizada 200, fecha real, SEO y BlogPosting correctos; otros 18 artículos 404, excluidos del índice y sitemap; revisión 404 en producción.");
} finally {
  if(server && server.exitCode===null){const ended=once(server,"exit");server.kill("SIGTERM");await ended;}
  rmSync(fixture,{recursive:true,force:true});
}
