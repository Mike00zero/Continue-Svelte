<script>
// @ts-nocheck
  import TextboxComponent from '@/common/TextboxComponent.svelte';
  import ResponseTerminal from '@/common/ResponseTerminal.svelte';
  import { commonNames, uncommonNames, SET_PLAYER_NAME, SET_QUESTION_KEY } from '@/constants';
  import { gameStore } from '@/stores/gameStore';

  export let questionTitle = '';
  export let textboxPlaceholderText = '';
  /**
   * @type {{ nextQuestionKey: any; }[]}
   */
   export let questions = [];

  let showBtn = false;
  let name = '';
  let response = '';
  let keepTrackOfName = 1;
  let disableTextbox = false;
  let showContinueBtn = false;
  /**
   * @type {number | undefined}
   */
  let inputTimer;

  function getRandomName() {
    const allNames = [...commonNames, ...uncommonNames];
    const randomIndex = Math.floor(Math.random() * allNames.length);
    return allNames[randomIndex];
  }

  /**
   * @param {{ currentTarget: { value: string; }; }} event
   */
  function handleInput(event) {
    name = event.currentTarget.value;
    window.clearTimeout(inputTimer);

    inputTimer = window.setTimeout(() => {
      if (name.length > 0) {
        showBtn = true;

        if (keepTrackOfName === 1) {
          response = 'is that really your name?';
        } else if (keepTrackOfName === 3) {
          response = 'why do you keep changing your name? Did you forget it?';
        } else if (keepTrackOfName === 5) {
          response = "I'm starting to think you don't have a real name.";
        } else if (keepTrackOfName >= 6) {
          const randomName = getRandomName();
          disableTextbox = true;
          keepTrackOfName = 7;
          response = `Ok you know what...this was supposed to be an easy question. I'm just gonna call you ${randomName} and move on.`;
          showContinueBtn = true;
          showBtn = false;
          gameStore.dispatch({ type: SET_PLAYER_NAME, payload: randomName });
        }
      }
    }, 500);
  }

  function handleYesBtn() {
    const shouldUseRealName = Math.random() < 0.5;
    const playerName = shouldUseRealName ? name : getRandomName();

    response = `Great! I'll call you ${playerName} from now on.`;
    keepTrackOfName = 999;
    disableTextbox = true;
    showContinueBtn = true;
    showBtn = false;
    gameStore.dispatch({ type: SET_PLAYER_NAME, payload: playerName });
  }

  function handleContinue() {
    console.log('Continuing...');
    const nextQuestionKey = questions?.[0]?.nextQuestionKey;

    if (nextQuestionKey) {
      gameStore.dispatch({ type: SET_QUESTION_KEY, payload: nextQuestionKey });
    }
  }

  function handleNoBtn() {
    const inputElement = document.getElementById('playerAnswer');

    inputElement.value = '';
    inputElement.focus();

    keepTrackOfName += 1;
  }
</script>

<TextboxComponent
  {questionTitle}
  {textboxPlaceholderText}
  {disableTextbox}
  on:input={handleInput}
/>

<ResponseTerminal {response} />

<div class="responseLayout">
  {#if showBtn && !showContinueBtn}
    <div class="choices" id="choices">
      <button type="button" on:click={handleYesBtn}>Yes</button>
      <button type="button" class="secondary" on:click={handleNoBtn}>No</button>
    </div>
  {/if}

  {#if showContinueBtn}
    <div class="choices">
      <button type="button" on:click={handleContinue}>Continue</button>
    </div>
  {/if}
</div>
