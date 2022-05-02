import { writable, get } from 'svelte/store';
import { addNoteFETCH, deleteNoteFETCH, updateNoteFETCH, getAllNotesFETCH } from '$lib/utils/server';
import { authUser, withAuthorizationRefresher } from '$lib/stores/authStore';

export interface note {
    id: number,
    title: string,
    note: string
};

export const notes = writable<note[]>([]);

export const getNotesFromDB = async () => {
    try {
        return await withAuthorizationRefresher(async () => {
            let notes2 = await getAllNotesFETCH(get(authUser).accessToken || '');
            notes.set(notes2.reverse()); 
        });
    } catch (error) {
        throw error;
    }
};

export const addNote = async (title: string, note: string) => {
    try {
        return await withAuthorizationRefresher(async () => {
            const newNote = await addNoteFETCH(title, note, get(authUser).accessToken || '');

            let notes_: note[] = get(notes);
    
            notes_ = notes_.reverse();
            notes_.push({id: newNote.id, title: title, note: note });
            notes_ = notes_.reverse();
            notes.set(notes_);
        });
    } catch (error) {
        throw error;
    }
};

export const updateNote = async (note: note) => {
    try {
        return await withAuthorizationRefresher(async () => {
            await updateNoteFETCH(note.id+'', note.title, note.note, get(authUser).accessToken || '');

            let notes_: note[] = get(notes);
    
            for (let i = 0; i < notes_.length; i++) {
                if (notes_[i].id === note.id) {
                    notes_[i].title = note.title;
                    notes_[i].note = note.note;
                    notes.set(notes_);
                    break;
                } 
            }
        });
    } catch (error) {
        throw error;
    }
};

export const deleteNote = async (id: number) => {
    try {
        return await withAuthorizationRefresher(async () => {
            await deleteNoteFETCH(id+'', get(authUser).accessToken || '');

            notes.set(
                get(notes).filter(n => n.id != id)
            );
        });
    } catch (error) {
        throw error;
    }
};