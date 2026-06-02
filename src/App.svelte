<script>
  import { TinyColor } from '@ctrl/tinycolor';
  import { onMount } from 'svelte';
  import * as C from '@/constants';
  import { gameStore } from '@/stores/gameStore';
  import WhatsYourNameComponent from '@/components/WhatsYourNameComponent.svelte';
  import BackgroundColor from '@/components/BackgroundColor.svelte';

  $: state = $gameStore;
  // @ts-ignore
  $: currentQuestionProps = state.questions[state.nextQuestionKey];
  $: questionTypeKey = currentQuestionProps?.questionType;

  $: backgroundColor = state?.bgColor || '#000 ';

  $: textColor = new TinyColor(backgroundColor).isLight()
        ? '#000'
        : '#fff';
 
  $: console.log('textColor', textColor);
  $: {
    document?.body?.style.setProperty('background', backgroundColor);
    document?.body?.style.setProperty('color', textColor);
  }
</script>

<main class="game">
  <div id="screen" class="screen">
    {#if questionTypeKey === C.WHATS_YOUR_NAME}
      <WhatsYourNameComponent {...currentQuestionProps} />
    {:else if questionTypeKey === C.MULTIPLE_CHOICE}
      <BackgroundColor />
    {:else}
      <p>Question type not found.</p>
    {/if}
  </div>

  <div class="footerNote" style="color: {textColor};">There is definitely an ending. Probably. Maybe.</div>
</main> 