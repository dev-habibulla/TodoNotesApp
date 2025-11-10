import React from 'react';
import { StyleSheet, View, Text, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNotesViewModel } from './src/viewmodels/NotesViewModel';
import { AddNoteView } from './src/views/AddNoteView';
import { NoteListView } from './src/views/NoteListView';

export default function App() {
  const { notes, addNote, updateNote, deleteNote, isLoading } = useNotesViewModel();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Text style={styles.title}>Todo Notes App</Text>
        </View>
        <AddNoteView onAddNote={addNote} />
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#10B981" />
          </View>
        ) : (
          <NoteListView notes={notes} onUpdateNote={updateNote} onDeleteNote={deleteNote} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

