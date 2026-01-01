import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { listQuizQuestions } from '../../services/quizApi';

export default function QuizRoomScreen({ route, navigation }) {
  const { topicId, title } = route.params;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({}); // { questionId: optionIndex }
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const data = await listQuizQuestions(topicId);
        // Backend return { topic, questions: [...] }
        setQuestions(data || []);
      } catch (err) {
        Alert.alert('Error', 'Gagal memuat soal.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSelect = (qId, optionIdx) => {
    if (finished) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const finishQuiz = () => {
    Alert.alert('Selesai?', 'Yakin ingin mengumpulkan jawaban?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Ya, Kumpulkan',
        onPress: () => {
          let correctCount = 0;
          questions.forEach(q => {
            if (answers[q.id] === q.correct) {
              correctCount++;
            }
          });
          const finalScore = Math.round((correctCount / questions.length) * 100);
          setScore(finalScore);
          setFinished(true);
        }
      }
    ]);
  };

  if (loading) return <View style={styles.center}><ActivityIndicator color="#facc15" /></View>;

  if (finished) {
    return (
      <View style={styles.center}>
        <Text style={styles.resultTitle}>Hasil Quiz</Text>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.resultDesc}>Nilai Kamu untuk "{title}"</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>Kembali ke Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {questions.map((q, idx) => (
        <View key={q.id} style={styles.qCard}>
          <Text style={styles.qText}>{idx + 1}. {q.question}</Text>
          {q.options.map((opt, optIdx) => {
            const isSelected = answers[q.id] === optIdx;
            return (
              <TouchableOpacity
                key={optIdx}
                style={[styles.optBtn, isSelected && styles.optBtnSelected]}
                onPress={() => handleSelect(q.id, optIdx)}
              >
                <Text style={[styles.optText, isSelected && styles.optTextSelected]}>
                  {String.fromCharCode(65 + optIdx)}. {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
      
      <View style={{ padding: 20 }}>
        <TouchableOpacity style={styles.submitBtn} onPress={finishQuiz}>
          <Text style={styles.submitText}>Kumpulkan Jawaban</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  center: { flex: 1, backgroundColor: '#020617', alignItems: 'center', justifyContent: 'center', padding: 20 },
  qCard: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#1f2937' },
  qText: { color: '#fff', fontSize: 16, marginBottom: 12 },
  optBtn: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#374151', marginBottom: 8 },
  optBtnSelected: { backgroundColor: '#facc15', borderColor: '#facc15' },
  optText: { color: '#d1d5db' },
  optTextSelected: { color: '#000', fontWeight: 'bold' },
  submitBtn: { backgroundColor: '#2563eb', padding: 16, borderRadius: 12, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultTitle: { color: '#fff', fontSize: 24, marginBottom: 10 },
  score: { color: '#facc15', fontSize: 80, fontWeight: 'bold' },
  resultDesc: { color: '#9ca3af', marginBottom: 30 },
  btn: { backgroundColor: '#374151', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  btnText: { color: '#fff' }
});