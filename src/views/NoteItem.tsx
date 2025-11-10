import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Note } from '../models/Note';
import { formatTimestamp } from '../services/dateHelper';

interface NoteItemProps {
  note: Note;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(note.text);

  const handleSave = (): void => {
    if (editText.trim() && editText !== note.text) {
      onUpdate(note.id, editText);
    }
    setIsEditing(false);
  };

  const handleCancel = (): void => {
    setEditText(note.text);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editText}
            onChangeText={setEditText}
            onSubmitEditing={handleSave}
            autoFocus
            multiline
          />
        ) : (
          <>
            <Text style={styles.text}>{note.text}</Text>
            <Text style={styles.timestamp}>{formatTimestamp(note.timestamp)}</Text>
          </>
        )}
      </View>
      <View style={styles.actions}>
        {isEditing ? (
          <>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.7}
            >
              <Text style={styles.saveText}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelText}>✕</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.editText}>📝</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDelete(note.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  input: {
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#10B981',
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#fff',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  editButton: {
    padding: 8,
    marginRight: 4,
  },
  editText: {
    fontSize: 18,
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    fontSize: 20,
  },
  saveButton: {
    padding: 8,
    marginRight: 4,
    backgroundColor: '#10B981',
    borderRadius: 4,
    minWidth: 32,
    alignItems: 'center',
  },
  saveText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 8,
    backgroundColor: '#FF3B30',
    borderRadius: 4,
    minWidth: 32,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

