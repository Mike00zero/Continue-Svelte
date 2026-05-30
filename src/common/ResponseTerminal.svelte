<script>
  import { tick } from 'svelte';

  export let response = '';

  let typedResponse = '';
  let animationId = 0;

  $: typeResponse(response);

  async function typeResponse(text = '') {
    const currentId = ++animationId;
    typedResponse = '';
    await tick();

    for (let index = 0; index < text.length; index += 1) {
      if (currentId !== animationId) return;
      typedResponse += text[index];
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
  }
</script>

<div class="terminal">
  <div class="terminal__header">
    <span class="terminal__headerBtns red"></span>
    <span class="terminal__headerBtns yellow"></span>
    <span class="terminal__headerBtns green"></span>
  </div>

  <div class="terminal__body">
    {typedResponse}
  </div>
</div>

<style lang="scss">
  .terminal {
    border: 1px solid #b9b9b9;
    border-radius: 0 0 10px 10px;
    color: #53b236;
    height: 150px;
    margin: 50px 0;
    padding: 27px 15px;
    position: relative;
    width: 94%;
  }

  .terminal__body {
    position: absolute;
  }

  .terminal__header {
    height: 30px;
    width: 100%;
    background-color: #2a2a28;
    display: flex;
    position: absolute;
    top: -25px;
    left: -1px;
    border: 1px solid #b9b9b9;
    border-bottom: 0;
    border-radius: 10px 10px 0 0;
  }

  .terminal__headerBtns {
    border-radius: 50%;
    height: 12px;
    margin-top: 10px;
    margin-left: 12px;
    width: 12px;

    &.red {
      background: red;
    }

    &.yellow {
      background: yellow;
    }

    &.green {
      background: green;
    }
  }
</style>
