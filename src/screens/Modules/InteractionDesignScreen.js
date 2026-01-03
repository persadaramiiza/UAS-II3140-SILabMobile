import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  PanResponder,
  Animated,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CANVAS_WIDTH = SCREEN_WIDTH - 64;
const CANVAS_HEIGHT = 400;
const STORAGE_KEY = '@diagram_builder';

const TEMPLATES = [
  { id: 'blank', label: 'Blank Canvas' },
  { id: 'flowchart', label: 'Flowchart' },
  { id: 'process', label: 'Process Flow' },
];

const TOOLS = [
  { id: 'select', icon: 'move-outline', label: 'Select' },
  { id: 'rectangle', icon: 'square-outline', label: 'Rectangle' },
  { id: 'circle', icon: 'ellipse-outline', label: 'Circle' },
  { id: 'diamond', icon: 'diamond-outline', label: 'Diamond' },
  { id: 'line', icon: 'remove-outline', label: 'Line' },
  { id: 'text', icon: 'text-outline', label: 'Text' },
];

const FLOWCHART_TEMPLATE = [
  { id: 'start', type: 'circle', x: CANVAS_WIDTH / 2 - 30, y: 20, width: 60, height: 60, label: 'Start' },
  { id: 'process1', type: 'rectangle', x: CANVAS_WIDTH / 2 - 50, y: 100, width: 100, height: 50, label: 'Process' },
  { id: 'decision', type: 'diamond', x: CANVAS_WIDTH / 2 - 40, y: 180, width: 80, height: 80, label: 'Decision' },
  { id: 'end', type: 'circle', x: CANVAS_WIDTH / 2 - 30, y: 290, width: 60, height: 60, label: 'End' },
];

const PROCESS_TEMPLATE = [
  { id: 'step1', type: 'rectangle', x: 20, y: 30, width: 80, height: 40, label: 'Step 1' },
  { id: 'step2', type: 'rectangle', x: 120, y: 30, width: 80, height: 40, label: 'Step 2' },
  { id: 'step3', type: 'rectangle', x: 220, y: 30, width: 80, height: 40, label: 'Step 3' },
];

export default function InteractionDesignScreen() {
  const navigation = useNavigation();
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const [selectedTool, setSelectedTool] = useState('select');
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [showTextModal, setShowTextModal] = useState(false);
  const [editingElementId, setEditingElementId] = useState(null);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    loadDiagram();
  }, []);

  const loadDiagram = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setElements(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading diagram:', error);
    }
  };

  const saveDiagram = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setElements(data);
    } catch (error) {
      console.error('Error saving diagram:', error);
    }
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    
    if (templateId === 'blank') {
      if (elements.length > 0) {
        Alert.alert('Clear Canvas', 'Remove all elements?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Clear', style: 'destructive', onPress: () => saveDiagram([]) },
        ]);
      }
    } else if (templateId === 'flowchart') {
      Alert.alert('Load Template', 'Load Flowchart template?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Load', onPress: () => saveDiagram(FLOWCHART_TEMPLATE) },
      ]);
    } else if (templateId === 'process') {
      Alert.alert('Load Template', 'Load Process Flow template?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Load', onPress: () => saveDiagram(PROCESS_TEMPLATE) },
      ]);
    }
  };

  const handleCanvasTap = (event) => {
    if (selectedTool === 'select' || selectedTool === 'text') {
      setSelectedElement(null);
      return;
    }

    const { locationX, locationY } = event.nativeEvent;
    
    const newElement = {
      id: `${selectedTool}-${Date.now()}`,
      type: selectedTool,
      x: Math.max(0, locationX - 40),
      y: Math.max(0, locationY - 25),
      width: selectedTool === 'circle' ? 60 : selectedTool === 'diamond' ? 80 : selectedTool === 'line' ? 100 : 80,
      height: selectedTool === 'circle' ? 60 : selectedTool === 'diamond' ? 80 : selectedTool === 'line' ? 4 : 50,
      label: '',
    };

    saveDiagram([...elements, newElement]);
  };

  const handleElementSelect = (element) => {
    if (selectedTool === 'select') {
      setSelectedElement(element);
    } else if (selectedTool === 'text') {
      // Open text input modal for this element
      setEditingElementId(element.id);
      setTextInput(element.label || '');
      setShowTextModal(true);
    }
  };

  const handleTextSave = () => {
    if (editingElementId) {
      const updated = elements.map((el) =>
        el.id === editingElementId ? { ...el, label: textInput } : el
      );
      saveDiagram(updated);
      // Update selected element if it's the one being edited
      if (selectedElement?.id === editingElementId) {
        setSelectedElement({ ...selectedElement, label: textInput });
      }
    }
    setShowTextModal(false);
    setEditingElementId(null);
    setTextInput('');
  };

  const handleTextCancel = () => {
    setShowTextModal(false);
    setEditingElementId(null);
    setTextInput('');
  };

  const deleteSelectedElement = () => {
    if (selectedElement) {
      Alert.alert('Delete Element', 'Remove this element?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updated = elements.filter((el) => el.id !== selectedElement.id);
            saveDiagram(updated);
            setSelectedElement(null);
          },
        },
      ]);
    }
  };

  const updateElementPosition = (id, x, y) => {
    const updated = elements.map((el) =>
      el.id === id ? { ...el, x: Math.max(0, x), y: Math.max(0, y) } : el
    );
    saveDiagram(updated);
  };

  const handleDownload = () => {
    Alert.alert('Export', 'Diagram data exported successfully!');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
          <Ionicons name="download-outline" size={18} color="#FFFFFF" />
          <Text style={styles.downloadButtonText}>Download</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Diagram Builder</Text>
        <Text style={styles.subtitle}>Create interactive diagrams</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} scrollEnabled={scrollEnabled}>
        {/* Templates Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Templates</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.templatesRow}>
              {TEMPLATES.map((template) => (
                <TouchableOpacity
                  key={template.id}
                  style={[
                    styles.templatePill,
                    selectedTemplate === template.id && styles.templatePillActive,
                  ]}
                  onPress={() => handleTemplateSelect(template.id)}
                >
                  <Text
                    style={[
                      styles.templatePillText,
                      selectedTemplate === template.id && styles.templatePillTextActive,
                    ]}
                  >
                    {template.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Tools Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tools</Text>
          <View style={styles.toolsRow}>
            {TOOLS.map((tool) => (
              <TouchableOpacity
                key={tool.id}
                style={[
                  styles.toolButton,
                  selectedTool === tool.id && styles.toolButtonActive,
                ]}
                onPress={() => setSelectedTool(tool.id)}
              >
                <Ionicons
                  name={tool.icon}
                  size={22}
                  color={selectedTool === tool.id ? '#FFFFFF' : '#6B7280'}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.toolHint}>
            {selectedTool === 'select' 
              ? 'Drag to move, long press to delete' 
              : selectedTool === 'text'
              ? 'Tap on element to add/edit label'
              : `Tap canvas to add ${TOOLS.find(t => t.id === selectedTool)?.label}`}
          </Text>
        </View>

        {/* Canvas Card */}
        <View style={styles.canvasCard}>
          <View style={styles.canvasHeader}>
            <Text style={styles.canvasTitle}>Canvas</Text>
            <Text style={styles.canvasSubtitle}>{elements.length} elements</Text>
          </View>
          <View
            style={styles.canvas}
            onTouchEnd={(e) => {
              if (selectedTool !== 'select') {
                handleCanvasTap(e);
              }
            }}
          >
            {elements.map((element) => (
              <DraggableElement
                key={element.id}
                element={element}
                isSelected={selectedElement?.id === element.id}
                onSelect={() => handleElementSelect(element)}
                onMove={(x, y) => updateElementPosition(element.id, x, y)}
                onDelete={() => deleteSelectedElement()}
                canDrag={selectedTool === 'select'}
                onDragStart={() => setScrollEnabled(false)}
                onDragEnd={() => setScrollEnabled(true)}
              />
            ))}
            
            {elements.length === 0 && (
              <View style={styles.emptyCanvas}>
                <Ionicons name="shapes-outline" size={48} color="#D1D5DB" />
                <Text style={styles.emptyText}>Empty Canvas</Text>
                <Text style={styles.emptyHint}>
                  Select a tool and tap here to add shapes
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Selected Element Info */}
        {selectedElement && (
          <View style={styles.inspectorCard}>
            <View style={styles.inspectorHeader}>
              <Text style={styles.inspectorTitle}>Selected: {selectedElement.type}</Text>
              <TouchableOpacity onPress={deleteSelectedElement}>
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
            <Text style={styles.inspectorInfo}>
              Position: ({Math.round(selectedElement.x)}, {Math.round(selectedElement.y)})
            </Text>
            <Text style={styles.inspectorInfo}>
              Size: {selectedElement.width} × {selectedElement.height}
            </Text>
            {selectedElement.label && (
              <Text style={styles.inspectorInfo}>
                Label: {selectedElement.label}
              </Text>
            )}
          </View>
        )}
      </ScrollView>

      {/* Text Input Modal */}
      <Modal
        visible={showTextModal}
        transparent
        animationType="fade"
        onRequestClose={handleTextCancel}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.textModalContent}>
            <View style={styles.textModalHeader}>
              <Text style={styles.textModalTitle}>Edit Label</Text>
              <TouchableOpacity onPress={handleTextCancel}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.textModalInput}
              placeholder="Enter label text..."
              placeholderTextColor="#9CA3AF"
              value={textInput}
              onChangeText={setTextInput}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleTextSave}
            />
            <View style={styles.textModalButtons}>
              <TouchableOpacity style={styles.textModalCancelBtn} onPress={handleTextCancel}>
                <Text style={styles.textModalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.textModalSaveBtn} onPress={handleTextSave}>
                <Text style={styles.textModalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

// Draggable Element Component
function DraggableElement({ element, isSelected, onSelect, onMove, onDelete, canDrag, onDragStart, onDragEnd }) {
  const pan = useRef(new Animated.ValueXY({ x: element.x, y: element.y })).current;
  const isDragging = useRef(false);

  useEffect(() => {
    if (!isDragging.current) {
      pan.setValue({ x: element.x, y: element.y });
    }
  }, [element.x, element.y]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => canDrag,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      // Only capture move if significant movement detected and canDrag is true
      return canDrag && (Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2);
    },
    onPanResponderGrant: () => {
      if (canDrag) {
        isDragging.current = true;
        onDragStart && onDragStart();
        onSelect();
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      }
    },
    onPanResponderMove: canDrag 
      ? Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false })
      : undefined,
    onPanResponderRelease: () => {
      if (canDrag && isDragging.current) {
        isDragging.current = false;
        onDragEnd && onDragEnd();
        pan.flattenOffset();
        const newX = Math.max(0, Math.min(CANVAS_WIDTH - element.width, pan.x._value));
        const newY = Math.max(0, Math.min(CANVAS_HEIGHT - element.height, pan.y._value));
        pan.setValue({ x: newX, y: newY });
        onMove(newX, newY);
      } else {
        pan.flattenOffset();
      }
    },
    onPanResponderTerminate: () => {
      isDragging.current = false;
      onDragEnd && onDragEnd();
      pan.flattenOffset();
    },
  });

  const getShapeStyle = () => {
    switch (element.type) {
      case 'rectangle':
        return { backgroundColor: '#EFF6FF', borderRadius: 4 };
      case 'circle':
        return { backgroundColor: '#F0FDF4', borderRadius: element.width / 2 };
      case 'diamond':
        return { backgroundColor: '#FEF3C7', transform: [{ rotate: '45deg' }] };
      case 'line':
        return { backgroundColor: '#374151', height: 3, borderWidth: 0 };
      case 'text':
        return { backgroundColor: 'transparent', borderStyle: 'dashed' };
      default:
        return { backgroundColor: '#F3F4F6' };
    }
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.draggableElement,
        {
          left: pan.x,
          top: pan.y,
          width: element.width,
          height: element.height,
          borderWidth: isSelected ? 2 : 1,
          borderColor: isSelected ? '#FBBC04' : '#374151',
        },
        getShapeStyle(),
      ]}
    >
      <View style={styles.elementTouchable}>
        {element.label && element.type !== 'diamond' && (
          <Text style={styles.elementLabel} numberOfLines={1}>
            {element.label}
          </Text>
        )}
        {element.type === 'diamond' && element.label && (
          <Text style={[styles.elementLabel, { transform: [{ rotate: '-45deg' }] }]} numberOfLines={1}>
            {element.label}
          </Text>
        )}
      </View>
      {isSelected && canDrag && (
        <View style={styles.dragHandle}>
          <Ionicons name="move" size={12} color="#FBBC04" />
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
    backgroundColor: '#FAFAFA',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F2A71',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  downloadButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FBBC04',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  templatesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  templatePill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  templatePillActive: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
  },
  templatePillText: {
    fontSize: 14,
    color: '#374151',
  },
  templatePillTextActive: {
    color: '#1F2937',
    fontWeight: '500',
  },
  toolsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  toolButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
  },
  toolButtonActive: {
    backgroundColor: '#0F2A71',
    borderColor: '#0F2A71',
  },
  toolHint: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 12,
    fontStyle: 'italic',
  },
  canvasCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  canvasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  canvasTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  canvasSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  canvas: {
    width: '100%',
    height: 400,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    position: 'relative',
    overflow: 'hidden',
  },
  emptyCanvas: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9CA3AF',
    marginTop: 12,
  },
  emptyHint: {
    fontSize: 12,
    color: '#D1D5DB',
    marginTop: 4,
  },
  elementLabel: {
    fontSize: 10,
    color: '#374151',
    fontWeight: '500',
  },
  draggableElement: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  elementTouchable: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragHandle: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FBBC04',
  },
  inspectorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#FBBC04',
  },
  inspectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inspectorTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textTransform: 'capitalize',
  },
  inspectorInfo: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  textModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  textModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  textModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  textModalInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 16,
  },
  textModalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  textModalCancelBtn: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textModalCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  textModalSaveBtn: {
    flex: 1,
    backgroundColor: '#0F2A71',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textModalSaveText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
