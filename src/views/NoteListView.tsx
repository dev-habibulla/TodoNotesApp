import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { Note } from '../models/Note';
import { NoteItem } from './NoteItem';

interface NoteListViewProps {
  notes: Note[];
  onUpdateNote: (id: string, text: string) => void;
  onDeleteNote: (id: string) => void;
}

export const NoteListView: React.FC<NoteListViewProps> = ({
  notes,
  onUpdateNote,
  onDeleteNote,
}) => {
  if (notes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No notes yet. Add one above!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NoteItem note={item} onUpdate={onUpdateNote} onDelete={onDeleteNote} />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
});

