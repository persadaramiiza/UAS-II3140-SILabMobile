import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getQuizTopic } from '../../services/quizApi';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function QuizReviewScreen({ navigation, route }) {
  const { topicId, title } = route.params;
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    loadReviewData();
  }, []);

  const loadReviewData = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch Quiz Questions
      const topicData = await getQuizTopic(topicId);
      const parsedQuestions = (topicData.quiz_questions || []).map(q => {
        let parsedOptions = q.options;
        // Parse JSON if string
        if (typeof parsedOptions === 'string') {
          try {
            parsedOptions = JSON.parse(parsedOptions);
          } catch (e) {
            console.warn('Failed to parse options:', e);
            parsedOptions = {};
          }
        }

        // Normalize to array of objects { id, text }
        let optionsArray = [];
        if (Array.isArray(parsedOptions)) {
          optionsArray = parsedOptions;
        } else if (parsedOptions && typeof parsedOptions === 'object') {
          // Convert object { A: "Text" } to [{ id: "A", text: "Text" }]
          optionsArray = Object.keys(parsedOptions).map(key => ({
            id: key,
            text: parsedOptions[key]
          }));
        }

        return {
          ...q,
          options: optionsArray,
          correct: typeof q.correct === 'string' ? JSON.parse(q.correct) : q.correct
        };
      });
      setQuestions(parsedQuestions);

      // 2. Fetch User Submission
      const { data: submission, error } = await supabase
        .from('submissions')
        .select('grade')
        .eq('assignment_id', topicId)
        .eq('student_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (submission?.grade?.answers) {
        setUserAnswers(submission.grade.answers);
      }
      if (submission?.grade?.score) {
        setScore(submission.grade.score);
      }

    } catch (error) {
      console.error('Error loading review:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderQuestion = (question, index) => {
    const userAnswer = userAnswers[question.id];
    const correctAnswer = question.correct?.answer || 'A';
    const isCorrect = userAnswer === correctAnswer;

    return (
      <View key={question.id} style={styles.questionCard}>
        <View style={styles.questionHeader}>
          <Text style={styles.questionNumber}>Question {index + 1}</Text>
          <View style={[styles.statusBadge, isCorrect ? styles.correctBadge : styles.wrongBadge]}>
            <Ionicons 
              name={isCorrect ? "checkmark-circle" : "close-circle"} 
              size={16} 
              color={isCorrect ? "#10B981" : "#EF4444"} 
            />
            <Text style={[styles.statusText, { color: isCorrect ? "#10B981" : "#EF4444" }]}>
              {isCorrect ? 'Correct' : 'Incorrect'}
            </Text>
          </View>
        </View>

        <Text style={styles.questionText}>{question.question}</Text>

        <View style={styles.optionsContainer}>
          {question.options.map((option) => {
            const isSelected = userAnswer === option.id;
            const isTheCorrectAnswer = correctAnswer === option.id;
            
            let optionStyle = styles.option;
            let textStyle = styles.optionText;
            let icon = null;

            if (isTheCorrectAnswer) {
              optionStyle = styles.optionCorrect;
              textStyle = styles.optionTextCorrect;
              icon = "checkmark-circle";
            } else if (isSelected && !isCorrect) {
              optionStyle = styles.optionWrong;
              textStyle = styles.optionTextWrong;
              icon = "close-circle";
            } else if (isSelected) {
               // Selected and correct (handled by first case usually, but for clarity)
               optionStyle = styles.optionCorrect;
            }

            return (
              <View key={option.id} style={[styles.optionWrapper, optionStyle]}>
                <Text style={textStyle}>{option.id}. {option.text}</Text>
                {icon && (
                  <Ionicons 
                    name={icon} 
                    size={20} 
                    color={isTheCorrectAnswer ? "#10B981" : "#EF4444"} 
                  />
                )}
              </View>
            );
          })}
        </View>
        
        {!isCorrect && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationLabel}>Correct Answer:</Text>
            <Text style={styles.explanationText}>
              Option {correctAnswer}
            </Text>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0F2A71" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Review: {title}</Text>
        <View style={styles.scoreBadge}>
          <Text style={styles.scoreText}>Score: {score}%</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {questions.map((q, i) => renderQuestion(q, i))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeButtonText}>Close Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  scoreBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  scoreText: {
    color: '#1D4ED8',
    fontWeight: '700',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  correctBadge: {
    backgroundColor: '#ECFDF5',
  },
  wrongBadge: {
    backgroundColor: '#FEF2F2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  questionText: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 8,
  },
  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  optionCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  optionWrong: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  optionText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  optionTextCorrect: {
    color: '#065F46',
    fontWeight: '500',
  },
  optionTextWrong: {
    color: '#991B1B',
  },
  explanationContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  explanationLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 14,
    color: '#111827',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  closeButton: {
    backgroundColor: '#0F2A71',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
