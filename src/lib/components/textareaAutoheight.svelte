<script lang="ts">
	import { onMount } from "svelte";

	export let value = '';
	export let css = '';
	export let placeholder = '';

	let minClientHeight: number;
	let textarea: HTMLTextAreaElement;

	onMount(() => {
		textarea.style.height = textarea.offsetHeight + 'px';
		minClientHeight = parseInt(textarea.style.height, 10);
		autoGrow();
	})

	const autoGrow = () => {
		textarea.style.height = minClientHeight + 'px';
		if (minClientHeight < textarea.scrollHeight) {
			textarea.style.height = `calc(${textarea.scrollHeight}px + 2px)`;
		}
    }
	</script>

<textarea bind:this={textarea} bind:value on:input={autoGrow} class={`overflow-hidden w-full ${css}`} wrap="soft" rows="1" placeholder={placeholder}></textarea>
