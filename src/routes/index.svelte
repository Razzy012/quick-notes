<script lang="ts">
    import Bin from '$lib/icons/bin.svelte';
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { setPopup } from '$lib/stores/popUpStore';
    import Note from '$lib/components/note.svelte';
    import { notes, deleteNote, getNotesFromDB } from '$lib/stores/notesStore';
    import type { note } from '$lib/stores/notesStore';
    import { goto } from '$app/navigation';
    import Logout from '$lib/icons/logout.svelte'
    import { logout } from '$lib/stores/authStore';

    let bin: HTMLElement;

    (async () => {
        try {
            await getNotesFromDB();
        } catch (e) {
            // in __layout.svelte -> goto('/login')
        }
        
    })();

    const logoutButton = async () => {
        await logout();
        goto('/login');
    }

    const showNote = (event: Event, note:note|{}) => {
        if (event.target != bin) {
            setPopup(Note, {note:note});
        }
    }
</script>

<svelte:head >
    <title>Quick notes.</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-green-500 to-cyan-500">
    <div class="relative flex flex-col justify-start gap-6 p-3 max-w-screen-md m-auto">
        <div class="absolute top-2 right-2 rounded-full bg-white w-9 p-2 cursor-pointer" on:click={logoutButton}><Logout /></div>
        <div class="mt-4 text-8xl text-white text-center">Quick<br>notes.</div>
        <div class="">
            <div on:click={(event) => showNote(event, {})} class="flex items-center w-full p-3 bg-white rounded mt-3 cursor-pointer">
                <span class="text-xl">Add new...</span>
            </div>
            {#each $notes as note (note)}
                <div on:click={(event) => showNote(event, note)} transition:fade|local animate:flip class="flex justify-between items-center w-full p-3 bg-white rounded mt-3 cursor-pointer">
                    <span class="text-xl">{note.title}</span>
                    <div on:click={() => deleteNote(note.id)} class="w-5" bind:this={bin}><Bin /></div>
                </div>
            {/each}
        </div>
    </div>
</div>
