import { create } from 'zustand';
import { AppNotification } from '@/types';
import { generateId } from '@/utils/helpers';

interface NotificationState {
  notifications: AppNotification[];
  permission: NotificationPermission;
  isOpen: boolean;

  addNotification: (title: string, body: string, type?: AppNotification['type']) => void;
  markAsRead: (id: string) => void;
  markAllRead: () => void;
  togglePanel: () => void;
  closePanel: () => void;
  requestPermission: () => Promise<void>;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  permission: typeof Notification !== 'undefined' ? Notification.permission : 'default',
  isOpen: false,

  addNotification: (title, body, type = 'info') => {
    const notification: AppNotification = {
      id: generateId(),
      title,
      body,
      timestamp: Date.now(),
      read: false,
      type,
    };

    set((state) => ({
      notifications: [notification, ...state.notifications],
    }));

    // Also fire browser notification if permitted
    if (get().permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.svg',
        });
      } catch {
        // Fallback silently — some browsers block this
      }
    }
  },

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  togglePanel: () => set((state) => ({ isOpen: !state.isOpen })),
  closePanel: () => set({ isOpen: false }),

  requestPermission: async () => {
    if (typeof Notification === 'undefined') return;
    if (Notification.permission === 'granted') {
      set({ permission: 'granted' });
      return;
    }
    if (Notification.permission !== 'denied') {
      const perm = await Notification.requestPermission();
      set({ permission: perm });
    }
  },

  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));
