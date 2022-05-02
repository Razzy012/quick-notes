<script lang="ts">
    import { removePopup } from '$lib/stores/popUpStore'

    let bg: HTMLElement;

    const click = (e: Event) => {
        if (e.target === bg)
            removePopup();
    }
</script>

<div bind:this={bg} on:click={click} class='z-50 flex fixed top-0 left-0 bg-black/20 min-h-screen w-screen items-center justify-center md:h-screen'>
    <slot></slot>
</div>