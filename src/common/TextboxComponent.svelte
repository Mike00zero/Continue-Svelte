<script>
  import TitleComponent from './TitleComponent.svelte';

  export let questionTitle = '';
  export let textboxPlaceholderText = '';
  export let disableTextbox = false;
</script>

<div class="textbox-wrap">
  <TitleComponent {questionTitle} />

  <div class="textboxGroup">
    <input
      type="text"
      id="playerAnswer"
      class="textbox"
      placeholder={textboxPlaceholderText}
      on:input
      disabled={disableTextbox}
    />
  </div>
</div>

<style lang="scss">
  .textboxGroup {
    width: 100%;
  }

  .textbox {
    width: 100%;
    min-height: 55px;
    resize: vertical;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 18px;
    padding: 16px 18px;
    background: rgba(255, 255, 255, 0.08);
    color: #f5f6fa;
    font-size: 1rem;
    line-height: 1.5;
    outline: none;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
    transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;

    &:disabled {
      cursor: not-allowed;
      color: rgba(255, 255, 255, 0.2);
    }

    &::placeholder {
      color: rgba(215, 219, 242, 0.45);
    }

    &:focus {
      border-color: #e8dfa5;
      background: rgba(255, 255, 255, 0.11);
      box-shadow:
        0 0 0 4px rgba(232, 223, 165, 0.12),
        0 18px 40px rgba(0, 0, 0, 0.3);
    }
  }
</style>
