"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { translateSiteText, type SiteLanguage } from "@/lib/site-translations";

const languageStorageKey = "hub-afro-language";
const originalText = new WeakMap<Text, string>();
const renderedText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, { source: string; rendered: string }>>();
const translatedAttributes = ["aria-label", "placeholder", "title", "alt"];

function isExcluded(element: Element | null) {
  return !!element?.closest("[data-no-translate], .product-editor-shell, .blog-editor-page, script, style, code, pre");
}

function translateTextNode(node: Text, language: SiteLanguage) {
  if (isExcluded(node.parentElement)) return;
  const current = node.nodeValue ?? "";
  if (!originalText.has(node) || (renderedText.has(node) && current !== renderedText.get(node))) {
    originalText.set(node, current);
  }
  const source = originalText.get(node) ?? "";
  const translated = translateSiteText(source, language);
  if (node.nodeValue !== translated) node.nodeValue = translated;
  renderedText.set(node, translated);
}

function translateElementAttributes(element: Element, language: SiteLanguage) {
  if (isExcluded(element)) return;
  let values = originalAttributes.get(element);
  if (!values) {
    values = new Map();
    originalAttributes.set(element, values);
  }
  for (const attribute of translatedAttributes) {
    const current = element.getAttribute(attribute);
    if (current === null) continue;
    const saved = values.get(attribute);
    if (!saved || current !== saved.rendered) values.set(attribute, { source: current, rendered: current });
    const source = values.get(attribute)?.source ?? current;
    const translated = translateSiteText(source, language);
    if (current !== translated) element.setAttribute(attribute, translated);
    values.set(attribute, { source, rendered: translated });
  }
}

function translateTree(root: ParentNode, language: SiteLanguage) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    translateTextNode(node as Text, language);
    node = walker.nextNode();
  }
  if (root instanceof Element) translateElementAttributes(root, language);
  root.querySelectorAll?.("*").forEach(element => translateElementAttributes(element, language));
  document.documentElement.lang = language === "pt" ? "pt-BR" : language;
}

export function SiteTranslator() {
  const pathname = usePathname();
  const language = useSyncExternalStore(subscribeToSiteLanguage, getSavedSiteLanguage, getServerSiteLanguage);

  useEffect(() => {
    if (pathname.includes("/editar")) {
      document.documentElement.lang = "pt-BR";
      return;
    }
    translateTree(document.body, language);
    let scheduled = false;
    const observer = new MutationObserver(mutations => {
      if (scheduled) return;
      scheduled = true;
      queueMicrotask(() => {
        scheduled = false;
        for (const mutation of mutations) {
          if (mutation.type === "characterData") translateTextNode(mutation.target as Text, language);
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) translateTextNode(node as Text, language);
            if (node instanceof Element) translateTree(node, language);
          });
        }
      });
    });
    observer.observe(document.body, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, [language, pathname]);

  return null;
}

export function changeSiteLanguage(language: SiteLanguage) {
  window.localStorage.setItem(languageStorageKey, language);
  window.dispatchEvent(new CustomEvent<SiteLanguage>("hub-language-change", { detail: language }));
}

export function getSavedSiteLanguage(): SiteLanguage {
  const language = window.localStorage.getItem(languageStorageKey);
  return language === "en" || language === "es" ? language : "pt";
}

export function getServerSiteLanguage(): SiteLanguage {
  return "pt";
}

export function subscribeToSiteLanguage(onChange: () => void) {
  const handleChange = () => onChange();
  window.addEventListener("hub-language-change", handleChange);
  window.addEventListener("storage", handleChange);
  return () => {
    window.removeEventListener("hub-language-change", handleChange);
    window.removeEventListener("storage", handleChange);
  };
}
