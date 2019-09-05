const hostUrl = self.location.host;
self.addEventListener('notificationclick', e => {
  const url = e.notification.tag || '/home';
  const title = e.notification.title;
  if(title === 'Reminder to approve pending requests'){
    e.waitUntil(self.clients.openWindow(`${hostUrl}${url}`));
  }
});

self.addEventListener('push', e => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: 'You have pending requests that require your approval',
    icon: 'https://i.ibb.co/5k2ygmV/favicon.png',
    tag: data.tag,
  });
});
