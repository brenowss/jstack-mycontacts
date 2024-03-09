import EventManager from '../lib/EventManager';

export const toastEventManager = new EventManager();

export default function toast({ text, type }) {
  toastEventManager.emit('toast', { text, type });
}
