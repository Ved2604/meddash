import { useEffect } from 'react';
import { useNotificationStore } from '@/stores/notificationStore';

export function useNotification() {
  const { addNotification, requestPermission, permission } = useNotificationStore();

  useEffect(() => {
    // Register service worker on mount
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('Service Worker registered:', reg.scope))
        .catch((err) => console.log('SW registration failed:', err));
    }

    // Request notification permission
    requestPermission();
  }, [requestPermission]);

  const notify = (title: string, body: string, type?: 'info' | 'warning' | 'critical' | 'success') => {
    addNotification(title, body, type);
  };

  return { notify, permission };
}
