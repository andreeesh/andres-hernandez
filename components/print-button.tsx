"use client";
import type { Locale } from "@/data/locales";
import { ui } from "@/data/locales";

export function PrintButton({ locale = "en" }: { locale?: Locale }) { return <button type="button" className="print-button" onClick={() => window.print()}>{ui[locale].print}</button>; }
