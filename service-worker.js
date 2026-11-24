"use strict";

const CACHE_NAME = "sa-tender-planner-shell-v2";
const APP_SHELL = ["/", "/about.html", "/contact.html", "/privacy.html", "/terms.html", "/favicon.svg", "/robots.txt", "/sitemap.xml"];
const TAILWIND_URL = "https://cdn.tailwindcss.com/";

self.addEventListener("install", function(event) {
  event.waitUntil((async function() {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    const request = new Request(TAILWIND_URL, { mode: "no-cors" });
    const response = await fetch(request);
    if (!response.ok && response.type !== "opaque") {
      throw new Error("Could not cache Tailwind CSS for offline use.");
    }
    await cache.put(request, response);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", function(event) {
  event.waitUntil((async function() {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.filter(function(name) {
      return name.indexOf("sa-tender-planner-shell-") === 0 && name !== CACHE_NAME;
    }).map(function(name) {
      return caches.delete(name);
    }));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", function(event) {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin === self.location.origin && request.mode === "navigate") {
    event.respondWith((async function() {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put("/", response.clone());
        }
        return response;
      } catch (error) {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(request) || await cache.match("/");
        if (cached) return cached;
        throw error;
      }
    })());
    return;
  }

  if (url.origin === "https://cdn.tailwindcss.com") {
    const cachePromise = caches.open(CACHE_NAME);
    const cachedPromise = cachePromise.then(function(cache) {
      return cache.match(TAILWIND_URL);
    });
    const refreshPromise = cachePromise.then(async function(cache) {
      const response = await fetch(request);
      if (response.ok || response.type === "opaque") {
        await cache.put(TAILWIND_URL, response.clone());
      }
      return response;
    });
    event.waitUntil(refreshPromise.then(function() {}, function(error) {
      console.warn("Could not refresh the cached Tailwind CSS:", error);
    }));
    event.respondWith(cachedPromise.then(function(cached) {
      return cached || refreshPromise;
    }));
    return;
  }

  if (url.origin === self.location.origin && request.destination !== "") {
    event.respondWith((async function() {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    })());
  }
});
