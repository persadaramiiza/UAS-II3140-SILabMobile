import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  SafeAreaView,
  Dimensions,
  BackHandler
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { listQuizQuestions, getQuizTopic } from '../../services/quizApi';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function QuizRoomScreen({ route, navigation }) {
  const { topicId, title } = route.params;
  const { user, userProfile } = useAuth();
  
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState({}); // { questionId: optionKey }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [quizTopic, setQuizTopic] = useState(null);
  
  const timerRef = useRef(null);

  useEffect(() => {
    loadQuizData();
    
    // Prevent back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert(
        'Exit Quiz?',
        'Your progress will be lost if you exit now.',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => {} },
          { text: 'Exit', style: 'destructive', onPress: () => navigation.goBack() },
        ]
      );
      return true;
    });

    return () => {
      backHandler.remove();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const loadQuizData = async () => {
    try {
      setLoading(true);
      
      // Load Topic Details (for duration)
      const topicData = await getQuizTopic(topicId, { includeQuestions: false });
      setQuizTopic(topicData);
      
      // Set Timer
      if (topicData.duration) {
        setTimeLeft(topicData.duration * 60);
        startTimer();
      }

      // Load Questions
      const questionsData = await listQuizQuestions(topicId);
      // Sort by order_index if available
      const sortedQuestions = (questionsData || []).sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
      setQuestions(sortedQuestions);
      
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to load quiz data.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAutoSubmit = () => {
    Alert.alert('Time Up!', 'Your quiz will be submitted automatically.', [
      { text: 'OK', onPress: () => submitQuiz() }
    ]);
    submitQuiz();
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (questionId, optionKey) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const confirmSubmit = () => {
    const answeredCount = Object.keys(answers).length;
    const totalCount = questions.length;
    
    Alert.alert(
      'Submit Quiz?',
      `You have answered ${answeredCount} of ${totalCount} questions.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Submit', onPress: submitQuiz }
      ]
    );
  };

  const submitQuiz = async () => {
    if (submitting) return;
    setSubmitting(true);
    if (timerRef.current) clearInterval(timerRef.current);

    try {
      // Calculate Score
      let correctCount = 0;
      let totalPoints = 0;
      let earnedPoints = 0;

      questions.forEach(q => {
        const correctOption = q.correct?.answer || 'A'; // Handle structure { answer: 'A', points: 10 } or just 'A'
        const points = q.correct?.points || 10;
        
        totalPoints += points;
        
        if (answers[q.id] === correctOption) {
          correctCount++;
          earnedPoints += points;
        }
      });

      const finalScore = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

      // Save to Supabase
      const submissionData = {
        assignment_id: topicId, // Using topicId as assignment_id for quizzes
        student_id: user.id,
        student_name: userProfile?.name || 'Student',
        submitted_at: new Date().toISOString(),
        grade: {
          score: finalScore,
          correct: correctCount,
          total: questions.length,
          earnedPoints,
          totalPoints,
          answers: answers // Save user answers
        },
        notes: 'Quiz Submission'
      };

      const { error } = await supabase
        .from('submissions')
        .insert(submissionData);

      if (error) {
        // Handle FK violation: If assignment record is missing, create it and retry
        if (error.code === '23503') {
          console.log('Missing assignment record for quiz, creating one...');
          await supabase.from('assignments').upsert({
            id: topicId,
            title: title || 'Quiz',
            description: 'Quiz Topic',
            focus: 'quiz'
          });

          // Retry submission
          const { error: retryError } = await supabase
            .from('submissions')
            .insert(submissionData);
            
          if (retryError) throw retryError;
        } else {
          throw error;
        }
      }

      // Navigate to Result or Back
      Alert.alert(
        'Quiz Submitted!',
        `You scored ${finalScore}%`,
        [{ 
          text: 'OK', 
          onPress: () => navigation.navigate('MainTabs', { 
            screen: 'Quiz', 
            params: { refresh: true } 
          }) 
        }]
      );

    } catch (error) {
      console.error('Submit error:', error);
      Alert.alert('Error', 'Failed to submit quiz. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0F2A71" />
        <Text style={styles.loadingText}>Loading Quiz...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.timerContainer}>
          <Ionicons name="time-outline" size={20} color="#0F2A71" />
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
        <Text style={styles.progressText}>
          Question {currentIndex + 1} of {questions.length}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Question Card */}
        <View style={styles.questionCard}>
          <View style={styles.questionBadge}>
            <Text style={styles.questionBadgeText}>Q{currentIndex + 1}</Text>
          </View>
          
          <Text style={styles.questionText}>
            {currentQuestion?.question}
          </Text>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {['A', 'B', 'C', 'D'].map((optionKey) => {
              const optionText = currentQuestion?.options?.[optionKey];
              if (!optionText) return null;
              
              const isSelected = answers[currentQuestion.id] === optionKey;

              return (
                <TouchableOpacity
                  key={optionKey}
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionButtonSelected
                  ]}
                  onPress={() => handleSelectOption(currentQuestion.id, optionKey)}
                  activeOpacity={0.8}
                >
                  <View style={[
                    styles.radioCircle,
                    isSelected && styles.radioCircleSelected
                  ]}>
                    {isSelected && <View style={styles.radioInnerCircle} />}
                  </View>
                  <Text style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected
                  ]}>
                    {optionText}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, styles.prevButton, currentIndex === 0 && styles.disabledButton]}
          onPress={handlePrev}
          disabled={currentIndex === 0}
        >
          <Ionicons name="chevron-back" size={20} color={currentIndex === 0 ? "#9CA3AF" : "#374151"} />
          <Text style={[styles.navButtonText, styles.prevButtonText, currentIndex === 0 && styles.disabledButtonText]}>
            Previous
          </Text>
        </TouchableOpacity>

        {currentIndex === questions.length - 1 ? (
          <TouchableOpacity
            style={[styles.navButton, styles.submitButton]}
            onPress={confirmSubmit}
            disabled={submitting}
          >
            <Text style={styles.submitButtonText}>
              {submitting ? 'Submitting...' : 'Submit Quiz'}
            </Text>
            {!submitting && <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={handleNext}
          >
            <Text style={styles.navButtonText, styles.nextButtonText}>Next</Text>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#6B7280',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F2A71',
    fontVariant: ['tabular-nums'],
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#E5E7EB',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0F2A71',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  questionCard: {
    marginBottom: 24,
  },
  questionBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0F2A71',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  questionBadgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 28,
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    gap: 12,
  },
  optionButtonSelected: {
    backgroundColor: '#0F2A71',
    borderColor: '#0F2A71',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: '#FFFFFF',
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  optionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  prevButton: {
    backgroundColor: '#F3F4F6',
  },
  nextButton: {
    backgroundColor: '#0F2A71',
  },
  submitButton: {
    backgroundColor: '#10B981',
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  prevButtonText: {
    color: '#374151',
  },
  nextButtonText: {
    color: '#FFFFFF',
  },
  submitButtonText: {
    color: '#FFFFFF',
  },
  disabledButtonText: {
    color: '#9CA3AF',
  },
});