<script>
  console.log('App.svelte loaded');

  import * as C from '@/constants';
  import { gameStore } from '@/stores/gameStore';
  import WhatsYourNameComponent from '@/components/WhatsYourNameComponent.svelte';
  import MultipleChoice from '@/common/MultipleChoice.svelte';

  console.log('gameStore', $gameStore);

  $: state = $gameStore;
  // @ts-ignore
  $: currentQuestionProps = state.questions[state.nextQuestionKey];
  $: questionTypeKey = currentQuestionProps?.questionType;
</script>

<main class="game">
  <div id="screen" class="screen">
    {#if questionTypeKey === C.WHATS_YOUR_NAME}
      <WhatsYourNameComponent {...currentQuestionProps} />
    {:else if questionTypeKey === C.MULTIPLE_CHOICE}
      <MultipleChoice {...currentQuestionProps} />
    {:else}
      <p>Question type not found.</p>
    {/if}
  </div>

  <div class="footerNote">There is definitely an ending. Probably. Maybe.</div>
</main>
