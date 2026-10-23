import { test } from "node:test";
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
const compiled = path => import(pathToFileURL(join(process.env.I18N_TEST_BUILD,path)));
const {locales,languageInfo,indexableRoutes,equivalents,resolveRoute,localizeHref}=await compiled("lib/i18n/routes.js");
const {translator}=await compiled("lib/i18n/translate.js");
const {default:messageModule}=await compiled("lib/i18n/messages.js");
const messages=messageModule.default ?? messageModule;
const {legalTranslator}=await compiled("lib/i18n/legal.js");
const {default:legalModule}=await compiled("lib/i18n/legalMessages.js");
const legalMessages=legalModule.default ?? legalModule;

test("published commercial routes resolve directly to their own language",()=>{
 const all=[];
 for(const id of indexableRoutes) for(const [locale,path] of Object.entries(equivalents(id))){assert.ok(path);all.push(path);assert.deepEqual(resolveRoute(path),{id,locale});}
 assert.equal(all.length,21);assert.equal(new Set(all).size,21);
 assert.equal(equivalents("home").es,"/");assert.equal(languageInfo.pt.tag,"pt-PT");
 for(const path of ["/es","/en/contacto","/fr/contacto","/pt/contact","/en/services","/en/unknown","/fr/contact?email=private@example.test"])assert.equal(resolveRoute(path),null);
});
test("the first service has only its complete Spanish equivalent",()=>{
 assert.deepEqual(equivalents("process-automation"),{es:"/servicios/automatizacion-de-procesos"});
 for(const locale of ["en","fr","pt"])assert.equal(resolveRoute(`/${locale}/servicios/automatizacion-de-procesos`),null);
 assert.equal(resolveRoute("/es/servicios/automatizacion-de-procesos"),null);
});
test("internal links preserve the selected language and the same project",()=>{
 for(const [locale,project,contact] of [["en","/en/projects/apc","/en/contact"],["fr","/fr/projets/apc","/fr/contact"],["pt","/pt/projetos/apc","/pt/contacto"]]){
  assert.equal(localizeHref("/proyectos/apc",locale),project);assert.equal(localizeHref("/contacto",locale),contact);
  assert.equal(localizeHref("/#proyectos",locale),`/${locale}#proyectos`);assert.equal(localizeHref("#servicios",locale),"#servicios");
  assert.equal(localizeHref("mailto:info@automatizza.es",locale),"mailto:info@automatizza.es");
 }
});
test("all twelve legal equivalents are available for review but excluded from indexable routes",()=>{
 for(const id of ["legal","privacy","cookies"]){
  const paths=equivalents(id);assert.deepEqual(Object.keys(paths),locales);assert.ok(!indexableRoutes.includes(id));
  for(const locale of locales){assert.deepEqual(resolveRoute(paths[locale]),{id,locale});assert.equal(localizeHref(paths.es,locale),paths[locale]);}
 }
 assert.equal(localizeHref("/politica-de-privacidad","en"),"/en/privacy-policy");
 assert.equal(localizeHref("/politica-de-privacidad","fr"),"/fr/politique-de-confidentialite");
 assert.equal(localizeHref("/politica-de-privacidad","pt"),"/pt/politica-de-privacidade");
});
test("legal translations are complete and preserve the approved Spanish copy and provider data",async()=>{
 for(const [source,values] of Object.entries(legalMessages)){
  assert.equal(legalTranslator("es")(source),source);assert.equal(values.length,3);
  for(const [i,locale] of ["en","fr","pt"].entries()) {assert.ok(values[i].trim());assert.equal(legalTranslator(locale)(source),values[i]);}
 }
 const {privacyPolicy}=await compiled("content/privacy.js");
 for(const field of ["address","registry","retention","processors","transfers"]) {
  const source=privacyPolicy[field];assert.ok(legalMessages[source],`Missing approved policy field: ${field}`);
  for(const locale of ["en","fr","pt"])assert.notEqual(legalTranslator(locale)(source),source,field);
 }
 for(const locale of locales){
  const t=legalTranslator(locale);
  for(const key of ["legalName","taxId","rightsEmail"])assert.equal(t(privacyPolicy[key]),privacyPolicy[key]);
  for(const [field,identifiers] of [["retention",["12"]],["processors",["Vercel Inc.","Resend","Plus Five Five, Inc.","Abbas","info@automatizza.es","Córdoba"]],["registry",["CO-45659","2946","21"]]])for(const identifier of identifiers)assert.ok(t(privacyPolicy[field]).includes(identifier),`${locale} ${field}: ${identifier}`);
 }
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
    const catalog=file.includes("/legal/")?legalMessages:messages;
    assert.ok(catalog[message]||neutral.has(message),`Missing translated message in ${file}: ${message}`);
   }
   ts.forEachChild(node,visit);
  }
  visit(source);
 }
});
