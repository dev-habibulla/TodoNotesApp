import { useState, useCallback, useEffect } from 'react';
import { Note } from '../models/Note';
import { addItem, removeItemById, updateItem } from '../services/arrayHelpers';
import { saveNotes, loadNotes } from '../services/storageService';

export class NotesViewModel {
  static addNote(currentNotes: Note[], text: string): Note[] {
    if (!text.trim()) {
      return currentNotes;
    }

    const newNote: Note = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 11),
      text: text.trim(),
      timestamp: Date.now(),
    };

    return addItem(currentNotes, newNote);
  }

  static updateNote(currentNotes: Note[], id: string, text: string): Note[] {
    if (!text.trim()) {
      return currentNotes;
    }

    return updateItem(
      currentNotes,
      (note) => note.id === id,
      (note) => ({ ...note, text: text.trim() })
    );
  }

  static deleteNote(currentNotes: Note[], id: string): Note[] {
    return removeItemById(currentNotes, id);
  }
}

export function useNotesViewModel() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      const loadedNotes = await loadNotes();
      setNotes(loadedNotes);
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveNotes(notes);
    }
  }, [notes, isLoading]);

  const addNote = useCallback((text: string) => {
    setNotes((currentNotes: Note[]) => NotesViewModel.addNote(currentNotes, text));
  }, []);

  const updateNote = useCallback((id: string, text: string) => {
    setNotes((currentNotes: Note[]) => NotesViewModel.updateNote(currentNotes, id, text));
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((currentNotes: Note[]) => NotesViewModel.deleteNote(currentNotes, id));
  }, []);

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    isLoading,
  };
}

