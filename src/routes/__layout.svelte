<script>
    import "../app.css";
    import { popup } from "$lib/stores/popUpStore";
    import PopUpBackground from "$lib/components/popUpBackground.svelte";
    import { authUser } from '$lib/stores/authStore'
    import { goto } from "$app/navigation";
    import { browser } from '$app/env';

    $: if (!$authUser.logged) {
         browser && goto('/login');
    }
</script>

<slot />

{#if $popup}
    <PopUpBackground>
        <svelte:component this={$popup.component} props={$popup.props} />
    </PopUpBackground>
{/if}