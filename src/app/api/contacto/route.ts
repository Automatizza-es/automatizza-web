import "server-only";
import { createContactHandler } from "@/lib/contact/server";

export const runtime = "nodejs";
export const maxDuration = 20;
export const POST = createContactHandler();
