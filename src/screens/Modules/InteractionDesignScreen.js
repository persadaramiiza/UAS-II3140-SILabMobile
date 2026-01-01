import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Dimensions,
  PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@wireframe_design';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CANVAS_WIDTH = SCREEN_WIDTH - 40;

const COMPONENTS = [
  { id: 'button', label: 'Button', icon: 'square-outline', width: 120, height: 40 },
  { id: 'input', label: 'Input', icon: 'create-outline', width: 160, height: 40 },
  { id: 'text', label: 'Text', icon: 'text-outline', width: 100, height: 24 },
  { id: 'image', label: 'Image', icon: 'image-outline', width: 100, height: 100 },
  { id: 'card', label: 'Card', icon: 'document-outline', width: 140, height: 120 },
  { id: 'nav', label: 'Navbar', icon: 'menu-outline', width: CANVAS_WIDTH - 20, height: 50 },
];

export default function InteractionDesignScreen() {
  const [elements, setElements] = useState([]);
  const [showToolbox, setShowToolbox] = useState(true);
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    loadDesign();
  }, []);

  const loadDesign = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setElements(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading design:', error);
    }
  };

  const saveDesign = async (els) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(els));
      setElements(els);
    } catch (error) {
      console.error('Error saving design:', error);
    }
  };

  const addElement = (component) => {
    const element = {
      id: `${component.id}-${Date.now()}`,
      type: component.id,
      label: component.label,
      icon: component.icon,
      x: 20,
      y: 100 + elements.length * 20,
      width: component.width,
      height: component.height,
    };
    saveDesign([...elements, element]);
    setShowToolbox(false);
  };

  const updateElementPosition = (id, x, y) => {
    const updated = elements.map((el) =>
      el.id === id ? { ...el, x, y } : el
    );
    saveDesign(updated);
  };

  const deleteElement = (id) => {
    Alert.alert('Delete Element', 'Remove this element?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updated = elements.filter((el) => el.id !== id);
          saveDesign(updated);
          setSelectedElement(null);
        },
      },
    ]);
  };

  const clearCanvas = () => {
    Alert.alert('Clear Canvas', 'Remove all elements?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => saveDesign([]),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Interaction Design</Text>
        <Text style={styles.subtitle}>Wireframe Playground</Text>
      </View>

      <View style={styles.toolbar}>
        <TouchableOpacity
          style={[styles.toolButton, showToolbox && styles.toolButtonActive]}
          onPress={() => setShowToolbox(!showToolbox)}
        >
          <Ionicons
            name="construct"
            size={18}
            color={showToolbox ? '#000' : '#fff'}
          />
          <Text
            style={[
              styles.toolButtonText,
              showToolbox && styles.toolButtonTextActive,
            ]}
          >
            Components
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolButton} onPress={clearCanvas}>
          <Ionicons name="trash-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {showToolbox && (
        <View style={styles.toolbox}>
          <Text style={styles.toolboxTitle}>Add Component:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.components}>
              {COMPONENTS.map((comp) => (
                <TouchableOpacity
                  key={comp.id}
                  style={styles.component}
                  onPress={() => addElement(comp)}
                >
                  <Ionicons name={comp.icon} size={24} color="#3b82f6" />
                  <Text style={styles.componentLabel}>{comp.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      <ScrollView style={styles.canvasScroll}>
        <View style={[styles.canvas, { width: CANVAS_WIDTH }]}>
          {elements.map((element) => (
            <DraggableElement
              key={element.id}
              element={element}
              selected={selectedElement?.id === element.id}
              onSelect={() => setSelectedElement(element)}
              onMove={(x, y) => updateElementPosition(element.id, x, y)}
              onDelete={() => deleteElement(element.id)}
            />
          ))}

          {elements.length === 0 && (
            <View style={styles.emptyCanvas}>
              <Ionicons name="phone-portrait-outline" size={64} color="#374151" />
              <Text style={styles.emptyText}>Empty Canvas</Text>
              <Text style={styles.emptyHint}>
                Tap "Components" to start designing
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {selectedElement && (
        <View style={styles.inspector}>
          <View style={styles.inspectorHeader}>
            <Text style={styles.inspectorTitle}>{selectedElement.label}</Text>
            <TouchableOpacity onPress={() => setSelectedElement(null)}>
              <Ionicons name="close" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
          <View style={styles.inspectorContent}>
            <Text style={styles.inspectorLabel}>
              Position: ({Math.round(selectedElement.x)}, {Math.round(selectedElement.y)})
            </Text>
            <Text style={styles.inspectorLabel}>
              Size: {selectedElement.width} × {selectedElement.height}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

function DraggableElement({ element, selected, onSelect, onMove, onDelete }) {
  const [position, setPosition] = useState({ x: element.x, y: element.y });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      onSelect();
    },
    onPanResponderMove: (_, gesture) => {
      const newX = Math.max(0, Math.min(CANVAS_WIDTH - element.width, element.x + gesture.dx));
      const newY = Math.max(0, element.y + gesture.dy);
      setPosition({ x: newX, y: newY });
    },
    onPanResponderRelease: (_, gesture) => {
      const newX = Math.max(0, Math.min(CANVAS_WIDTH - element.width, element.x + gesture.dx));
      const newY = Math.max(0, element.y + gesture.dy);
      onMove(newX, newY);
    },
  });

  const getElementStyle = () => {
    const baseStyle = {
      position: 'absolute',
      left: position.x,
      top: position.y,
      width: element.width,
      height: element.height,
    };

    switch (element.type) {
      case 'button':
        return {
          ...baseStyle,
          backgroundColor: '#3b82f6',
          borderRadius: 6,
          justifyContent: 'center',
          alignItems: 'center',
        };
      case 'input':
        return {
          ...baseStyle,
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#d1d5db',
          borderRadius: 6,
          paddingHorizontal: 8,
          justifyContent: 'center',
        };
      case 'text':
        return {
          ...baseStyle,
          justifyContent: 'center',
        };
      case 'image':
        return {
          ...baseStyle,
          backgroundColor: '#e5e7eb',
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
        };
      case 'card':
        return {
          ...baseStyle,
          backgroundColor: '#fff',
          borderRadius: 8,
          padding: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        };
      case 'nav':
        return {
          ...baseStyle,
          backgroundColor: '#1f2937',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
        };
      default:
        return baseStyle;
    }
  };

  const renderElementContent = () => {
    switch (element.type) {
      case 'button':
        return <Text style={{ color: '#fff', fontSize: 14 }}>Button</Text>;
      case 'input':
        return <Text style={{ color: '#9ca3af', fontSize: 13 }}>Input field</Text>;
      case 'text':
        return <Text style={{ color: '#111827', fontSize: 14 }}>Lorem ipsum</Text>;
      case 'image':
        return <Ionicons name="image-outline" size={32} color="#9ca3af" />;
      case 'card':
        return (
          <>
            <View
              style={{
                width: '100%',
                height: 8,
                backgroundColor: '#e5e7eb',
                borderRadius: 4,
                marginBottom: 8,
              }}
            />
            <View
              style={{
                width: '80%',
                height: 8,
                backgroundColor: '#e5e7eb',
                borderRadius: 4,
                marginBottom: 4,
              }}
            />
            <View
              style={{
                width: '60%',
                height: 8,
                backgroundColor: '#e5e7eb',
                borderRadius: 4,
              }}
            />
          </>
        );
      case 'nav':
        return (
          <>
            <Ionicons name="menu" size={24} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 16, marginLeft: 16 }}>App Name</Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View
      {...panResponder.panHandlers}
      style={[
        getElementStyle(),
        selected && styles.selectedElement,
      ]}
    >
      {renderElementContent()}
      {selected && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
        >
          <Ionicons name="close-circle" size={20} color="#ef4444" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#1f2937' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#9ca3af' },
  toolbar: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  toolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#111827',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  toolButtonActive: {
    backgroundColor: '#facc15',
    borderColor: '#facc15',
  },
  toolButtonText: { color: '#fff', fontSize: 14, fontWeight: '500' },
  toolButtonTextActive: { color: '#000' },
  toolbox: {
    backgroundColor: '#111827',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  toolboxTitle: { color: '#9ca3af', fontSize: 12, marginBottom: 12 },
  components: { flexDirection: 'row', gap: 12 },
  component: {
    alignItems: 'center',
    backgroundColor: '#0a0f1e',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
    minWidth: 80,
  },
  componentLabel: { color: '#d1d5db', fontSize: 11, marginTop: 6 },
  canvasScroll: { flex: 1 },
  canvas: {
    minHeight: 800,
    backgroundColor: '#f3f4f6',
    margin: 20,
    borderRadius: 12,
    position: 'relative',
    padding: 10,
  },
  emptyCanvas: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: { color: '#6b7280', fontSize: 18, marginTop: 16, fontWeight: '500' },
  emptyHint: { color: '#9ca3af', fontSize: 14, marginTop: 8 },
  selectedElement: {
    borderWidth: 2,
    borderColor: '#facc15',
    borderStyle: 'dashed',
  },
  deleteButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  inspector: {
    backgroundColor: '#111827',
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  inspectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  inspectorTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  inspectorContent: { padding: 16 },
  inspectorLabel: { color: '#9ca3af', fontSize: 13, marginBottom: 8 },
});
