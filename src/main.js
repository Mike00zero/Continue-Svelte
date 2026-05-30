import { mount } from 'svelte';
import App from './App.svelte';
import '@/styles/main.scss';

console.log('main.js loaded');

const target = document.getElementById('app');

if (!target) {
  throw new Error('Could not find #app element');
}

mount(App, {
  target
});