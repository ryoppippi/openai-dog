<script>
	export let data;

	import { invalidateAll } from '$app/navigation';

	$: ({ openaiResponse } = data.stream);
</script>

<div class="center">
	<img src={data.dogURL} alt="dog" />
</div>

<div class="center">
	{#await openaiResponse then response}
		{@const choice = response.choices.at(0)}
		{#if choice != null}
			<p class="desc">{choice.message.content}</p>
		{/if}
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>

<div class="center" style="margin-top: 30px;">
	{#await openaiResponse}
		<button aria-busy={true} disabled />
	{:then}
		<button on:click={invalidateAll}>Relead</button>
	{/await}
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

	img {
		border-radius: 10px;
		height: 300px;
	}

	button {
		width: 100px;
	}
</style>
