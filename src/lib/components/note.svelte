<script lang="ts">
    import TextareaAutoheight from "./textareaAutoheight.svelte";
    import Xmark from "$lib/icons/xmark.svelte";
    import Bin from '$lib/icons/bin.svelte';
    import { removePopup, beforeRemove } from '$lib/stores/popUpStore';
    import type { note } from '$lib/stores/notesStore';
    import { addNote, updateNote, deleteNote } from '$lib/stores/notesStore';
    import { onMount } from "svelte";

    export let props: {note:note|{}} = {note:{}};

    let title = props.note.id ? props.note.title : '';
    let note = props.note.id ? props.note.note : '';

    let windowWidth: number;

    const saveNoteCheck = async () => {
        document.body.style.height = '100%';
        document.body.style.overflowY = 'auto';
        if(title || note){
            if (!props.note.id) {
                addNote(title, note);
            } else {
                updateNote({id: props.note.id, title: title, note: note});
            }
        }
    }

    beforeRemove.set(saveNoteCheck);

    const deleteNoteCheck = async () => {
        if(props.note.id){
            await deleteNote(props.note.id);
        }
        close();
    }

    const close = async () => {
        await removePopup();
    }


    onMount(() => {
        if (windowWidth < 768) {
            document.body.style.height = '100vh';
            document.body.style.overflowY = 'hidden';
        }
    })

    
</script>

<svelte:window bind:innerWidth={windowWidth}></svelte:window>


<div class="rounded bg-white overflow-hidden w-full md:w-[670px]">
    <div class="relative h-screen max-h-screen p-5 md:min-h-[400px] md:max-h-[calc(100vh-2rem)] md:h-min overflow-y-scroll" class:height={'3000px'}>
        <div on:click={close} class="absolute top-5 right-5 w-5 cursor-pointer"><Xmark/></div>
        <div on:click={deleteNoteCheck} class="absolute top-5 left-5 w-5 cursor-pointer"><Bin/></div>
        <input type="text" bind:value={title} placeholder="Title" class="w-full text-center outline-none text-4xl font-bold mb-2">
        <TextareaAutoheight css='resize-none outline-none text-lg h-[320px]' placeholder='Note' bind:value={note}/>
    </div>
</div>