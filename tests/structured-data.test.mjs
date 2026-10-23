import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const compiled = path => import(pathToFileURL(join(process.env.STRUCTURED_DATA_TEST_BUILD, path)));
const { siteIdentityStructuredData, siteIdentityIds, serializeStructuredData } = await compiled("lib/structured-data.js");
const { privacyPolicy } = await compiled("content/privacy.js");
const graph = siteIdentityStructuredData();
const entity = type => graph["@graph"].find(node => node["@type"] === type);

test("one website and legal organization describe one brand, with stable resolved IDs", () => {
  assert.equal(graph["@context"], "https://schema.org");
  assert.deepEqual(graph["@graph"].map(node => node["@type"]).sort(), ["Brand", "ImageObject", "Organization", "WebSite"]);
  const ids = graph["@graph"].map(node => node["@id"]);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^https:\/\/automatizza\.es\/#(?:website|organization|brand|logo)$/);
  function references(value) {
    if (!value || typeof value !== "object") return;
    if (value["@id"]) assert.ok(ids.includes(value["@id"]), `unresolved ID: ${value["@id"]}`);
    Object.values(value).forEach(references);
  }
  references(graph);
  assert.equal(entity("WebSite").publisher["@id"], entity("Organization")["@id"]);
  assert.equal(entity("WebSite").about["@id"], entity("Brand")["@id"]);
  assert.equal(entity("Organization").brand["@id"], entity("Brand")["@id"]);
  assert.equal(entity("Organization").logo["@id"], siteIdentityIds.logo);
  assert.equal(entity("Brand").logo["@id"], siteIdentityIds.logo);
  assert.equal(entity("WebSite").name, "Automatizza");
  assert.equal(entity("Brand").name, "Automatizza");
  assert.deepEqual(entity("WebSite").inLanguage, ["es", "en", "fr", "pt-PT"]);
  assert.deepEqual(siteIdentityStructuredData(), graph, "no per-language or request-dependent entities");
});

test("identity and registered office match the approved legal data without speculative claims", () => {
  const organization = entity("Organization");
  assert.equal(organization.name, privacyPolicy.legalName);
  assert.equal(organization.legalName, privacyPolicy.legalName);
  assert.equal(organization.email, privacyPolicy.rightsEmail);
  assert.equal(organization.taxID, privacyPolicy.taxId);
  const address = organization.address;
  assert.equal(address["@type"], "PostalAddress");
  assert.equal(address.addressCountry, "ES");
  assert.equal(`${address.streetAddress}, ${address.postalCode} ${address.addressLocality}, España.`, privacyPolicy.address);
  const disallowed = ["sameAs", "founder", "foundingDate", "employee", "numberOfEmployees", "review", "aggregateRating", "award", "parentOrganization", "subOrganization", "telephone", "vatID", "areaServed", "potentialAction"];
  function inspect(value) {
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) { assert.ok(!disallowed.includes(key), `unconfirmed property: ${key}`); inspect(child); }
  }
  inspect(graph);
});

test("the public logo is the existing PNG with its real dimensions", () => {
  const logo = entity("ImageObject");
  assert.equal(logo.url, "https://automatizza.es/brand/automatizza-logo.png");
  assert.equal(logo.contentUrl, logo.url);
  const png = readFileSync("public/brand/automatizza-logo.png");
  assert.equal(png.subarray(1, 4).toString(), "PNG");
  assert.equal(logo.width, png.readUInt32BE(16));
  assert.equal(logo.height, png.readUInt32BE(20));
  assert.ok(logo.width >= 112 && logo.height >= 112);
});

test("JSON-LD parses losslessly and cannot break out of its script element", () => {
  assert.deepEqual(JSON.parse(serializeStructuredData(graph)), graph);
  const input = { name: '</script><script>alert("test")</script><!--', note: "Córdoba & Automatizza" };
  const output = serializeStructuredData(input);
  assert.ok(!output.includes("<"));
  assert.deepEqual(JSON.parse(output), input);
});
