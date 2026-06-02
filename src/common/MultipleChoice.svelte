<script>
  /**
   * @type {any[] | null | undefined}
   */
   export let questions = [];
   export let onClick = () => {};
</script>

<div class="choices">
  {#each questions as question}
    <button type="button">{question.text}</button>
  {/each}
</div>
