<script>
  export let data;

  import { invalidateAll } from '$app/navigation';
</script>


<div class="center">
  <img src="{data.dogURL}" alt="dog" height="300"/>
</div>

<div class="center">
  {#await data.stream.openaiResponse}
    loading...
    {:then response}
    {@const choice = response.choices[0]}
    <p class="desc">{choice.message.content}</p>
    {:catch error}
    <p>{error.message}</p>
  {/await}
</div>

<div class="center">
  <button on:click={invalidateAll}>Relead</button>
</div>

<style>
  .center {
    display: grid;
    place-items: center;
  }

  .desc {
    margin-top: 20px;
    width: 300px;
  }

  button {
    width: 100px;
  }
</style>
