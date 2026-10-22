import { test } from "node:test";
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
const compiled = path => import(pathToFileURL(join(process.env.I18N_TEST_BUILD,path)));
const {locales,languageInfo,indexableRoutes,equivalents,resolveRoute,localizeHref}=await compiled("lib/i18n/routes.js");
const {translator}=await compiled("lib/i18n/translate.js");
const {default:messageModule}=await compiled("lib/i18n/messages.js");
const messages=messageModule.default ?? messageModule;

test("twenty unique commercial routes resolve directly to their own language",()=>{
 const all=[];
 for(const id of indexableRoutes) for(const locale of locales){const path=equivalents(id)[locale];assert.ok(path);all.push(path);assert.deepEqual(resolveRoute(path),{id,locale});}
 assert.equal(all.length,20);assert.equal(new Set(all).size,20);
 assert.equal(equivalents("home").es,"/");assert.equal(languageInfo.pt.tag,"pt-PT");
 for(const path of ["/es","/en/contacto","/fr/contacto","/pt/contact","/en/services","/en/unknown","/fr/contact?email=private@example.test"])assert.equal(resolveRoute(path),null);
});
test("internal links preserve the selected language and the same project",()=>{
 for(const [locale,project,contact] of [["en","/en/projects/apc","/en/contact"],["fr","/fr/projets/apc","/fr/contact"],["pt","/pt/projetos/apc","/pt/contacto"]]){
  assert.equal(localizeHref("/proyectos/apc",locale),project);assert.equal(localizeHref("/contacto",locale),contact);
  assert.equal(localizeHref("/#proyectos",locale),`/${locale}#proyectos`);assert.equal(localizeHref("#servicios",locale),"#servicios");
  assert.equal(localizeHref("mailto:info@automatizza.es",locale),"mailto:info@automatizza.es");
 }
});
test("unreviewed legal translations are not published equivalents",()=>{
 for(const id of ["legal","privacy","cookies"]){assert.deepEqual(Object.keys(equivalents(id)),["es"]);assert.ok(!indexableRoutes.includes(id));}
 for(const locale of locales)assert.equal(localizeHref("/politica-de-privacidad",locale),"/politica-de-privacidad");
});
test("Spanish source strings and whitespace remain exact; all translation triples are complete",()=>{
 for(const [source,values] of Object.entries(messages)){
  assert.equal(translator("es")(source),source);assert.equal(values.length,3);
  for(const [i,locale] of ["en","fr","pt"].entries()){assert.equal(typeof values[i],"string");assert.ok(values[i].trim());assert.equal(translator(locale)(source),values[i]);}
 }
 assert.equal(translator("es")(" Hablemos ")," Hablemos ");assert.equal(translator("en")(" Hablemos ")," Let's talk ");
 assert.equal(translator("fr")("Ver el recorrido de {project}",{project:"APC Europe"}),"Voir le parcours de APC Europe");
 assert.equal(translator("pt")("Usuarios"),"Utilizadores");
});

test("contact validation messages are translated without changing validation rules",async()=>{
 const {validateContact}=await compiled("lib/contact/validation.js");
 const invalid=validateContact({name:"",email:"invalid",message:"",privacy:false});
 assert.equal(invalid.value,undefined);
 for(const locale of ["en","fr","pt"])for(const field of ["name","email","message","privacy"])assert.notEqual(translator(locale)(invalid.errors[field]),invalid.errors[field]);
 assert.equal(translator("fr")(invalid.errors.email),"Indiquez une adresse e-mail valide.");
 assert.equal(translator("pt")(invalid.errors.name),"Introduza o seu nome (máximo de 100 caracteres).");
});

test("new literal UI messages cannot silently fall back to Spanish", async()=>{
 const {readFileSync,readdirSync}=await import("node:fs");
 const {default:ts}=await import("typescript");
 const neutral=new Set(["Google Analytics","FIXED","CRM","Granollers"]);
 function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(dir,e.name)):e.name.endsWith(".tsx")?[join(dir,e.name)]:[]);}
 for(const file of files("src/components")){
  const source=ts.createSourceFile(file,readFileSync(file,"utf8"),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  function visit(node){
   if(ts.isCallExpression(node)&&node.expression.getText(source)==="t"&&node.arguments[0]&&ts.isStringLiteral(node.arguments[0])){
    const message=node.arguments[0].text.trim().replace(/\s+/g," ");
    assert.ok(messages[message]||neutral.has(message),`Missing translated message in ${file}: ${message}`);
   }
   ts.forEachChild(node,visit);
  }
  visit(source);
 }
});
