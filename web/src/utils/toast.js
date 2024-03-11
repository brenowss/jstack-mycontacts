import EventManager from '../lib/EventManager';

export const toastEventManager = new EventManager();

export default function toast({ text, type, time }) {
  toastEventManager.emit('toast', { text, type, time });
}
