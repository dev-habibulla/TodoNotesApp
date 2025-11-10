import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../models/Note';

const STORAGE_KEY = '@todonotesapp:notes';

export async function saveNotes(notes: Note[]): Promise<void> {
  try {
    const jsonValue = JSON.stringify(notes);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving notes:', error);
  }
}

export async function loadNotes(): Promise<Note[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue == null) {
      return [];
    }
    
    const notes = JSON.parse(jsonValue);
    
    return notes.map((note: any) => ({
      ...note,
      timestamp: note.timestamp || Date.now(),
    }));
  } catch (error) {
    console.error('Error loading notes:', error);
    return [];
  }
}

