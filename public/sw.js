// Install & activate
self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
  event.waitUntil(self.clients.claim());
});

// Handle push events
self.addEventListener("push", (event) => {
  console.log("Push event received", event);

  if (!event.data) {
    console.log("Push has no data");
    return;
  }

  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: "Notification", body: event.data.text() };
  }

  const options = {
    body: data.body,
    icon: "/icon-192x192.png",
    vibrate: [100, 50, 100],
    requireInteraction: true,
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
