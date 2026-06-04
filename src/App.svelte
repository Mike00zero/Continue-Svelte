<script>
  import randomColor from 'randomcolor';
  import { TinyColor } from '@ctrl/tinycolor';
  import * as C from '@/constants';
  import { gameStore } from '@/stores/gameStore';
  import WhatsYourNameComponent from '@/components/WhatsYourNameComponent.svelte';
  import BackgroundColor from '@/components/BackgroundColor.svelte';

  let clickColorCounter = 0

  $: state = $gameStore;
  // @ts-ignore
  $: currentQuestionProps = state.questions[state.nextQuestionKey];
  $: questionTypeKey = currentQuestionProps?.questionType;

  $: backgroundColor = state?.bgColor || '#000 ';

  $: textColor = new TinyColor(backgroundColor).isLight()
        ? '#000'
        : '#fff';
 
  $: {
    document?.body?.style.setProperty('background', backgroundColor);
    document?.body?.style.setProperty('color', textColor);
  }

  const handleChangeColor = () => {
      const color = randomColor();
    
      clickColorCounter++;
      gameStore.dispatch({ type: C.SET_BG_COLOR, payload: color });
  }
</script>

<main class="game">
  <div id="screen" class="screen">
    {#if questionTypeKey === C.WHATS_YOUR_NAME}
      <WhatsYourNameComponent {...currentQuestionProps} />
    {:else if questionTypeKey === C.MULTIPLE_CHOICE}
      <BackgroundColor {clickColorCounter} />
    {:else}
      <p>Question type not found.</p>
    {/if}
  </div>

  <div class="footerNote" style="color: {textColor};">There is definitely an ending. Probably. Maybe.</div>
</main> 

{#if state.colorChangeOption}
  <button class="colorButton" on:click={handleChangeColor}>
    <span class="colorButton__swatch"></span>
    <span>Change color</span>
  </button>
{/if}

<style>
  .colorButton {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10;

    display: flex;
    align-items: center;
    gap: 8px;

    padding: 10px 14px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 999px;

    background: rgba(255, 255, 255, 0.14);
    color: inherit;

    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    backdrop-filter: blur(10px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);

    transition:
        transform 0.2s ease,
        background 0.2s ease,
        box-shadow 0.2s ease;
  }

  .colorButton:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.22);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  }

  .colorButton:active {
    transform: translateY(0);
  }

  .colorButton__swatch {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff4ecd, #4facfe, #43e97b);
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.65);
  }
</style>