self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.notification.tag || '/home';
  e.waitUntil(self.clients.openWindow(`${url}`));
});

self.addEventListener('push', e => {
  const data = e.data.json();
  const { title, body, tag } = data;
  self.registration.showNotification(title, {
    body: body,
    icon: 'https://i.ibb.co/5k2ygmV/favicon.png',
    tag: tag,
  });
});
