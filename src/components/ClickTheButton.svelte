<script>
  // @ts-nocheck
  import randomColor from 'randomcolor';
  import {onMount} from 'svelte';
  import ResponseTerminal from '@/common/ResponseTerminal.svelte';
  import * as C from '@/constants';
  import { gameStore } from '@/stores/gameStore';
  import TitleComponent from '@/common/TitleComponent.svelte';

  let { questionTitle = '' } = $props();
  let response = '';
</script>

<TitleComponent {questionTitle} />

<ResponseTerminal {response} />

<div class="responseLayout">
  <div class="choices" id="choices">
    <button type="button" on:click={() => {}}>Click Me!</button>
  </div>
</div>