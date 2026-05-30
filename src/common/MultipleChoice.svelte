<script>
  import TitleComponent from './TitleComponent.svelte';

  export let questionTitle = '';
  /**
   * @type {any[] | null | undefined}
   */
   export let questions = [];
</script>

<TitleComponent {questionTitle} />

<div class="choices">
  {#each questions as question}
    <button type="button">{question.text}</button>
  {/each}
</div>
