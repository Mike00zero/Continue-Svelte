<script>
  // @ts-nocheck
  import {onMount} from 'svelte';
  import ResponseTerminal from '@/common/ResponseTerminal.svelte';
  import { SET_BG_COLOR, SET_QUESTION_KEY } from '@/constants';
  import { gameStore } from '@/stores/gameStore';
  import TitleComponent from '@/common/TitleComponent.svelte';

  let state = null
  let currentQuestionProps = [];
  let questionTitle = '';
  let response = '';
  let showContinueBtn = false;

  onMount(() => {
    state = $gameStore;
    // @ts-ignore
    currentQuestionProps = state.questions[state.nextQuestionKey];
    questionTitle = `So ${state.playerName}, ${currentQuestionProps?.questionTitle}`;
    response = currentQuestionProps?.response || '';
  });

  const handleLightBtn = () => {
    showContinueBtn = true;
    gameStore.dispatch({ type: SET_BG_COLOR, payload: '#fff' });
  }

  const handleDarkBtn = () => {
    showContinueBtn = true;
    gameStore.dispatch({ type: SET_BG_COLOR, payload: '#000' });
  }
</script>

<TitleComponent {questionTitle} />

<ResponseTerminal {response} />

<div class="responseLayout">
    <div class="choices" id="choices">
        <button type="button" on:click={handleLightBtn}>Light?</button>
        <button type="button" class="secondary" on:click={handleDarkBtn}>Dark?</button>
    </div>

    {#if showContinueBtn}
        <div class="choices choices--small-gap">
            <button type="button" on:click={() => {}}>Continue</button>
        </div>
     {/if}
</div>

