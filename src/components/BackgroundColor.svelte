<script>
  // @ts-nocheck
  import randomColor from 'randomcolor';
  import {onMount} from 'svelte';
  import ResponseTerminal from '@/common/ResponseTerminal.svelte';
  import * as C from '@/constants';
  import { gameStore } from '@/stores/gameStore';
  import TitleComponent from '@/common/TitleComponent.svelte';

  export let clickColorCounter = 0;

  let state = null
  let currentQuestionProps = [];
  let questionTitle = '';
  let response = '';
  let showContinueBtn = false;
  let showBtns = true;
  let lightDarkColorCount = 0;
  let continueCount = 1;

  console.log('$gameStore', $gameStore)

  onMount(() => {
    state = $gameStore;
    // @ts-ignore
    currentQuestionProps = state?.questions[state?.nextQuestionKey];
    questionTitle = `So ${state.playerName}, ${currentQuestionProps?.questionTitle}`;
    response = currentQuestionProps?.response || '';

    const navigationEntry = performance.getEntriesByType('navigation')[0];

    console.log(navigationEntry.type);

    if (navigationEntry.type === 'reload') {
        gameStore.dispatch({ type: C.SET_RESPONSE, payload: "No..." });
        gameStore.dispatch({ type: C.SET_REFRESH_COUNT, payload: state?.refreshCount + 1 });
    }
  });

  const handleLightBtn = () => {
    showContinueBtn = true;
    lightDarkColorCount++
    gameStore.dispatch({ type: C.SET_BG_COLOR, payload: '#fff' });
  }

  const handleDarkBtn = () => {
    showContinueBtn = true;
    lightDarkColorCount++
    gameStore.dispatch({ type: C.SET_BG_COLOR, payload: '#000' });
  }

  const handleContinue = () => {
    showBtns = false;


    if (!state.forceHideBtns &&continueCount === 1 && lightDarkColorCount < 5) {
        gameStore.dispatch({ type: C.SET_COLOR_CHANGE_OPTION, payload: state.bgColor});
        response = "If you would like to change the background color, just click the button in the top right corner. Go on, give it a try.";    
    }

    if(state.forceHideBtns || continueCount === 2) {
        gameStore.dispatch({ type: C.SET_QUESTION_KEY, payload: currentQuestionProps.nextQuestionKey });
        return;
    }

    continueCount++;
  }

  $: if(clickColorCounter === 2 && lightDarkColorCount < 5) {
    response = "Listen, I said you can change the color; I never said what color you could change it to. Just pick one and let's move on.";
  }

  $: if(lightDarkColorCount === 5) {
    response = "Alright, I see you like changing colors. I was trying to be nice but since you are being too difficult, I took away the option of allowing you to change it. Hope you enjoy being stuck with the random color. Let's just move on to the next question.";
    showBtns = false;
    gameStore.dispatch({ type: C.SET_BG_COLOR, payload: randomColor() });
    gameStore.dispatch({ type: C.SET_COLOR_CHANGE_OPTION, payload: null });
    gameStore.dispatch({ type: C.SET_FORCE_HIDE_BTNS, payload: true });
    gameStore.dispatch({ type: C.SET_RESPONSE, payload: "Don't try refreshing. You had your chance. Lets move on." });
  }

  $: if (state?.overrideResponse) {
        response = state.overrideResponse;
    }
</script>

<TitleComponent {questionTitle} />

<ResponseTerminal {response} />

<div class="responseLayout">
    {#if !state?.forceHideBtns}
        {#if showBtns}
            <div class="choices" id="choices">
                <button type="button" on:click={handleLightBtn}>Light?</button>
                <button type="button" class="secondary" on:click={handleDarkBtn}>Dark?</button>
            </div>
        {/if}
    {/if}

    {#if state?.forceHideBtns || showContinueBtn}
        <div class="choices choices--small-gap">
            <button type="button" on:click={handleContinue}>Continue</button>
        </div>
     {/if}
</div>