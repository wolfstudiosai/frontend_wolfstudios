'use client';

import { useEffect } from 'react';

import { api } from '../../../../utils/api';
import { urlBase64ToUint8Array } from '../../../../utils/helper';
import { ChatView } from './chat-view';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

export default function page({ params }) {
  const subscribeUser = async () => {
    try {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        throw new Error('Push notifications are not supported');
      }

      if (Notification.permission === 'denied') {
        throw new Error('Notification permission denied');
      }

      if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          throw new Error('Notification permission not granted');
        }
      }

      // Keep existing registration if found
      let registration = await navigator.serviceWorker.getRegistration();
      if (!registration) {
        registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      }
      console.log('SW controller:', navigator.serviceWorker.controller);

      // Make sure service worker is activated
      const serviceWorker = registration.installing || registration.waiting || registration.active;
      if (serviceWorker && serviceWorker.state !== 'activated') {
        await new Promise((resolve) => {
          serviceWorker.addEventListener('statechange', () => {
            if (serviceWorker.state === 'activated') {
              resolve();
            }
          });
        });
      }

      // Reuse existing subscription if available
      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        });
      }

      const parsedSubscription = JSON.parse(JSON.stringify(subscription));
      const body = {
        subscription: {
          endpoint: parsedSubscription.endpoint,
          keys_p256dh: parsedSubscription.keys.p256dh,
          keys_auth: parsedSubscription.keys.auth,
        },
      };

      let authData = localStorage.getItem('auth');
      const userId = JSON.parse(authData).id;

      await api.patch(`/users/${userId}`, body);
    } catch (error) {
      console.error('Failed to subscribe the user:', error);
    }
  };

  useEffect(() => {
    subscribeUser();
  }, []);

  return <ChatView slug={params.slug} />;
}
