import { useState } from 'react';
import { motion } from 'framer-motion'
import { CheckCircle, Target, Bell, Award, Heart, Brain, BookOpen, Moon, Wind, Smile, Trash2, Edit2, Calendar, Play, Pause, RotateCcw, ExternalLink } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  category: string;
  progress: number;
  milestones: number;
  completedMilestones: number;
  reminderEnabled: boolean;
  dailyAim: string;
  dailyProgress: number;
}

type PracticeType = 'breathing' | 'meditation' | 'journaling' | 'mindfulness' | 'stress' | 'sleep' | null;

export default function Resources() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', title: 'Daily Meditation Practice', category: 'Mindfulness', progress: 65, milestones: 4, completedMilestones: 2, reminderEnabled: true, dailyAim: '10 minutes of meditation', dailyProgress: 60 },
    { id: '2', title: 'Improve Sleep Schedule', category: 'Wellness', progress: 40, milestones: 5, completedMilestones: 2, reminderEnabled: true, dailyAim: 'Sleep by 11 PM', dailyProgress: 30 },
    { id: '3', title: 'Stress Management', category: 'Mental Health', progress: 75, milestones: 3, completedMilestones: 2, reminderEnabled: false, dailyAim: 'Practice breathing exercises', dailyProgress: 80 },
  ]);

  const [activeTab, setActiveTab] = useState<'goals' | 'practices'>('goals');
  const [activePractice, setActivePractice] = useState<PracticeType>(null);
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [breathingTimer, setBreathingTimer] = useState<number>(0);
  const [breathingPhase, setBreathingPhase] = useState<string>('Ready');
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);

  const updateGoalProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, progress: newProgress } : goal
    ));
  };

  const updateDailyProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, dailyProgress: newProgress } : goal
    ));
  };

  const toggleReminder = (goalId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, reminderEnabled: !goal.reminderEnabled } : goal
    ));
  };

  const deleteGoal = (goalId: string) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      setGoals(goals.filter(goal => goal.id !== goalId));
    }
  };

  const updateGoalDetails = (goalId: string, field: keyof Goal, value: string | number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, [field]: value } : goal
    ));
  };

  const addNewGoal = () => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: 'New Goal',
      category: 'Wellness',
      progress: 0,
      milestones: 3,
      completedMilestones: 0,
      reminderEnabled: false,
      dailyAim: 'Set your daily target',
      dailyProgress: 0
    };
    setGoals([...goals, newGoal]);
  };

  // Breathing Exercise Component
  const BreathingExercise = () => {
    const exercises = [
      {
        name: '4-7-8 Breathing',
        description: 'A calming breath technique to reduce anxiety and promote relaxation',
        steps: [
          'Sit comfortably with your back straight',
          'Place the tip of your tongue against the ridge behind your upper front teeth',
          'Exhale completely through your mouth, making a whoosh sound',
          'Close your mouth and inhale quietly through your nose for 4 counts',
          'Hold your breath for 7 counts',
          'Exhale completely through your mouth for 8 counts',
          'Repeat this cycle 3-4 times'
        ],
        benefits: ['Reduces anxiety', 'Helps with sleep', 'Manages stress responses']
      },
      {
        name: 'Box Breathing',
        description: 'Used by Navy SEALs to stay calm and focused under pressure',
        steps: [
          'Sit upright in a comfortable position',
          'Slowly exhale all of your air out',
          'Slowly inhale through your nose for 4 counts',
          'Hold your breath for 4 counts',
          'Slowly exhale through your mouth for 4 counts',
          'Hold your breath for 4 counts',
          'Repeat for 5 minutes or until you feel calm'
        ],
        benefits: ['Improves focus', 'Reduces stress', 'Enhances performance under pressure']
      },
      {
        name: 'Diaphragmatic Breathing',
        description: 'Deep belly breathing that engages the diaphragm',
        steps: [
          'Lie on your back or sit comfortably',
          'Place one hand on your chest and the other on your belly',
          'Breathe in slowly through your nose, feeling your belly rise',
          'Your chest should remain relatively still',
          'Exhale slowly through pursed lips',
          'Practice for 5-10 minutes',
          'Try to make your exhale longer than your inhale'
        ],
        benefits: ['Lowers heart rate', 'Reduces blood pressure', 'Improves core stability']
      }
    ];

    return (
      <div className="space-y-6">
        {exercises.map((exercise, idx) => (
          <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{exercise.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{exercise.description}</p>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Steps:</h4>
              <ol className="list-decimal list-inside space-y-2">
                {exercise.steps.map((step, stepIdx) => (
                  <li key={stepIdx} className="text-sm text-gray-700 dark:text-gray-300">{step}</li>
                ))}
              </ol>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Benefits:</h4>
              <ul className="list-disc list-inside space-y-1">
                {exercise.benefits.map((benefit, benefitIdx) => (
                  <li key={benefitIdx} className="text-sm text-green-600 dark:text-green-400">{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Meditation Guides Component
  const MeditationGuides = () => {
    const meditations = [
      {
        name: 'Mindfulness Meditation',
        duration: '5-10 minutes',
        description: 'Focus on the present moment and observe your thoughts without judgment',
        guide: [
          'Find a quiet, comfortable place to sit',
          'Set a timer for your desired duration',
          'Close your eyes and take three deep breaths',
          'Focus your attention on your breath - the sensation of air entering and leaving',
          'When your mind wanders (and it will), gently bring your attention back to your breath',
          'Notice sounds, sensations, and thoughts without engaging with them',
          'When the timer ends, slowly open your eyes and take a moment before moving'
        ],
        tips: ['Start with just 5 minutes', 'Practice daily for best results', 'Be patient with yourself']
      },
      {
        name: 'Body Scan Meditation',
        duration: '10-20 minutes',
        description: 'Progressive relaxation by focusing attention on different parts of your body',
        guide: [
          'Lie down in a comfortable position',
          'Close your eyes and take several deep breaths',
          'Start by focusing on your toes - notice any sensations',
          'Gradually move your attention up through your feet, ankles, calves',
          'Continue scanning through each body part: legs, hips, abdomen, chest',
          'Move through arms, hands, neck, and head',
          'If you notice tension, breathe into that area and imagine it releasing',
          'Take a few moments at the end to notice how your whole body feels'
        ],
        tips: ['Great for before sleep', 'Helps identify tension', 'Promotes deep relaxation']
      },
      {
        name: 'Loving-Kindness Meditation',
        duration: '10-15 minutes',
        description: 'Cultivate feelings of compassion and goodwill toward yourself and others',
        guide: [
          'Sit comfortably and close your eyes',
          'Take a few deep breaths to center yourself',
          'Start by directing kindness toward yourself: "May I be happy, may I be healthy, may I be safe"',
          'Picture someone you love and direct these wishes to them',
          'Extend these feelings to a neutral person (someone you don\'t know well)',
          'Challenge yourself to include someone difficult in your life',
          'Finally, extend loving-kindness to all beings everywhere',
          'End by sitting quietly and noticing how you feel'
        ],
        tips: ['Increases positive emotions', 'Reduces self-criticism', 'Improves relationships']
      }
    ];

    return (
      <div className="space-y-6">
        {meditations.map((meditation, idx) => (
          <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">{meditation.name}</h3>
              <span className="text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full">
                {meditation.duration}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{meditation.description}</p>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Guided Steps:</h4>
              <ol className="list-decimal list-inside space-y-2">
                {meditation.guide.map((step, stepIdx) => (
                  <li key={stepIdx} className="text-sm text-gray-700 dark:text-gray-300">{step}</li>
                ))}
              </ol>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Tips:</h4>
              <ul className="list-disc list-inside space-y-1">
                {meditation.tips.map((tip, tipIdx) => (
                  <li key={tipIdx} className="text-sm text-purple-700 dark:text-purple-300">{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Journaling Prompts Component
  const JournalingPrompts = () => {
    const categories = [
      {
        name: 'Gratitude Journaling',
        description: 'Shift focus to positive aspects of life',
        prompts: [
          'What are three things you\'re grateful for today?',
          'Who made a positive impact on your life recently?',
          'What\'s a small moment that brought you joy this week?',
          'What\'s something about your body you\'re thankful for?',
          'What\'s a challenge you\'re grateful to have overcome?',
          'What\'s a skill or talent you appreciate about yourself?',
          'What\'s something in nature that you find beautiful?'
        ],
        howTo: 'Write for 5-10 minutes each day, preferably in the morning or before bed. Be specific and focus on why you\'re grateful.'
      },
      {
        name: 'Emotion Tracking',
        description: 'Understand and process your feelings',
        prompts: [
          'What emotion am I feeling right now? Where do I feel it in my body?',
          'What triggered this emotion?',
          'On a scale of 1-10, how intense is this feeling?',
          'What do I need right now to feel better?',
          'Have I felt this way before? What helped then?',
          'What would I say to a friend feeling this way?',
          'What can I learn from this emotion?'
        ],
        howTo: 'Check in with yourself 2-3 times daily. Name the emotion, describe it, and explore it without judgment.'
      },
      {
        name: 'Goal Reflection',
        description: 'Review progress and set intentions',
        prompts: [
          'What progress have I made toward my goals this week?',
          'What obstacles did I face and how did I handle them?',
          'What\'s one thing I can do tomorrow to move closer to my goal?',
          'What would achieving this goal mean for my life?',
          'What strengths can I use to reach this goal?',
          'What do I need to let go of to make progress?',
          'How will I celebrate when I reach this milestone?'
        ],
        howTo: 'Review weekly, be honest about challenges, celebrate small wins, and adjust goals as needed.'
      }
    ];

    return (
      <div className="space-y-6">
        {categories.map((category, idx) => (
          <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Prompts to explore:</h4>
              <ul className="space-y-2">
                {category.prompts.map((prompt, promptIdx) => (
                  <li key={promptIdx} className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{prompt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-1">How to use:</h4>
              <p className="text-sm text-green-700 dark:text-green-300">{category.howTo}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Mindfulness Activities Component
  const MindfulnessActivities = () => {
    const activities = [
      {
        name: '5-4-3-2-1 Grounding',
        description: 'A sensory awareness technique to anchor you in the present moment',
        duration: '3-5 minutes',
        instructions: [
          'Find a comfortable position and take a few deep breaths',
          'Look around and identify 5 things you can SEE',
          'Notice 4 things you can TOUCH (texture, temperature)',
          'Listen for 3 things you can HEAR',
          'Identify 2 things you can SMELL',
          'Notice 1 thing you can TASTE',
          'Take a final deep breath and notice how you feel'
        ],
        whenToUse: 'During anxiety, panic attacks, or when feeling overwhelmed'
      },
      {
        name: 'Mindful Walking',
        description: 'Turn a simple walk into a meditation practice',
        duration: '10-20 minutes',
        instructions: [
          'Choose a quiet place where you can walk slowly',
          'Start walking at a natural, comfortable pace',
          'Pay attention to the sensation of your feet touching the ground',
          'Notice the movement of your legs and the shifting of your weight',
          'Observe your surroundings without labeling or judging',
          'If your mind wanders, gently return focus to the physical sensations of walking',
          'Breathe naturally and stay present with each step'
        ],
        whenToUse: 'When you need to clear your mind or as a daily practice'
      },
      {
        name: 'Mindful Eating',
        description: 'Experience your food with full awareness',
        duration: '15-30 minutes',
        instructions: [
          'Sit down at a table without distractions (no phone, TV, or reading)',
          'Look at your food - notice colors, shapes, and arrangement',
          'Smell your food and notice how your body responds',
          'Take a small bite and hold it in your mouth before chewing',
          'Chew slowly, noticing flavors and textures',
          'Pay attention to the sensation of swallowing',
          'Pause between bites and check in with your hunger level',
          'Express gratitude for your meal'
        ],
        whenToUse: 'At least once daily to improve digestion and eating habits'
      }
    ];

    return (
      <div className="space-y-6">
        {activities.map((activity, idx) => (
          <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">{activity.name}</h3>
              <span className="text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full">
                {activity.duration}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{activity.description}</p>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Instructions:</h4>
              <ol className="list-decimal list-inside space-y-2">
                {activity.instructions.map((instruction, instrIdx) => (
                  <li key={instrIdx} className="text-sm text-gray-700 dark:text-gray-300">{instruction}</li>
                ))}
              </ol>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-1">When to use:</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">{activity.whenToUse}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Stress Management Component
  const StressManagement = () => {
    const techniques = [
      {
        name: 'Progressive Muscle Relaxation (PMR)',
        description: 'Systematically tense and relax muscle groups to release physical tension',
        duration: '10-15 minutes',
        steps: [
          'Find a quiet place and lie down or sit comfortably',
          'Start with your feet - tense the muscles for 5 seconds, then release',
          'Move to your calves - tense and release',
          'Continue through: thighs, buttocks, abdomen, chest',
          'Tense and release your hands, forearms, upper arms',
          'Move to shoulders, neck, and face',
          'Finish by tensing your whole body, then completely relaxing',
          'Breathe deeply and notice the difference between tension and relaxation'
        ],
        benefits: ['Reduces physical tension', 'Improves body awareness', 'Helps with insomnia']
      },
      {
        name: 'Pomodoro Technique for Time Management',
        description: 'Break work into focused intervals to reduce stress and improve productivity',
        duration: '25 minutes work + 5 minutes break',
        steps: [
          'Choose a task to work on',
          'Set a timer for 25 minutes',
          'Work on the task with full focus until the timer rings',
          'Take a 5-minute break (stretch, walk, hydrate)',
          'After 4 pomodoros, take a longer 15-30 minute break',
          'Use breaks to truly rest - avoid screens',
          'Track completed pomodoros to measure progress'
        ],
        benefits: ['Reduces overwhelm', 'Increases focus', 'Prevents burnout']
      },
      {
        name: 'Physical Exercise for Stress Relief',
        description: 'Movement to release tension and boost mood',
        duration: '20-30 minutes daily',
        steps: [
          'Choose an activity you enjoy (walking, dancing, yoga, sports)',
          'Start with a 5-minute warm-up',
          'Gradually increase intensity to moderate level',
          'Focus on how your body feels during movement',
          'Aim for activities that elevate your heart rate',
          'Cool down for 5 minutes',
          'Stretch major muscle groups',
          'Consistency is more important than intensity'
        ],
        benefits: ['Releases endorphins', 'Improves sleep', 'Boosts energy levels']
      }
    ];

    return (
      <div className="space-y-6">
        {techniques.map((technique, idx) => (
          <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">{technique.name}</h3>
              <span className="text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full">
                {technique.duration}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{technique.description}</p>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-2">How to practice:</h4>
              <ol className="list-decimal list-inside space-y-2">
                {technique.steps.map((step, stepIdx) => (
                  <li key={stepIdx} className="text-sm text-gray-700 dark:text-gray-300">{step}</li>
                ))}
              </ol>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Benefits:</h4>
              <ul className="list-disc list-inside space-y-1">
                {technique.benefits.map((benefit, benefitIdx) => (
                  <li key={benefitIdx} className="text-sm text-red-700 dark:text-red-300">{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Sleep Hygiene Component
  const SleepHygiene = () => {
    const tips = [
      {
        name: 'Consistent Sleep Schedule',
        description: 'Regulate your body\'s internal clock',
        practices: [
          'Go to bed and wake up at the same time every day (including weekends)',
          'Aim for 7-9 hours of sleep per night',
          'If you can\'t fall asleep within 20 minutes, get up and do a calming activity',
          'Avoid napping after 3 PM',
          'If you must nap, limit it to 20-30 minutes',
          'Be patient - it takes 2-3 weeks to establish a new sleep routine'
        ],
        impact: 'Improves sleep quality and helps you fall asleep faster'
      },
      {
        name: 'Screen Time Management',
        description: 'Reduce blue light exposure before bedtime',
        practices: [
          'Stop using electronic devices 1-2 hours before bed',
          'Use blue light filters on devices if you must use them',
          'Keep phones and tablets out of the bedroom',
          'Read a physical book instead of using e-readers',
          'Use an old-fashioned alarm clock instead of your phone',
          'If you watch TV, keep it dim and at least 6 feet away'
        ],
        impact: 'Allows natural melatonin production for better sleep'
      },
      {
        name: 'Relaxation Routine',
        description: 'Wind-down activities to signal your body it\'s time for sleep',
        practices: [
          'Take a warm bath or shower 1-2 hours before bed',
          'Practice gentle stretching or yoga',
          'Read something calming (not work-related or stimulating)',
          'Listen to calm music or nature sounds',
          'Practice deep breathing or meditation',
          'Write in a journal to clear your mind',
          'Keep your bedroom cool (60-67°F is ideal)',
          'Use your bed only for sleep - not work or watching TV'
        ],
        impact: 'Creates strong sleep associations and reduces sleep anxiety'
      }
    ];

    return (
      <div className="space-y-6">
        {tips.map((tip, idx) => (
          <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{tip.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{tip.description}</p>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Recommended practices:</h4>
              <ul className="space-y-2">
                {tip.practices.map((practice, practiceIdx) => (
                  <li key={practiceIdx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-1">Impact:</h4>
              <p className="text-sm text-indigo-700 dark:text-indigo-300">{tip.impact}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderPracticeContent = () => {
    switch (activePractice) {
      case 'breathing':
        return <BreathingExercise />;
      case 'meditation':
        return <MeditationGuides />;
      case 'journaling':
        return <JournalingPrompts />;
      case 'mindfulness':
        return <MindfulnessActivities />;
      case 'stress':
        return <StressManagement />;
      case 'sleep':
        return <SleepHygiene />;
      default:
        return null;
    }
  };
  
  // Learning Hub data
  type LearningType = 'all' | 'article' | 'blog' | 'video';
  const [learningFilter, setLearningFilter] = useState<LearningType>('all');
  const learningItems: Array<{
    title: string;
    type: 'article' | 'blog' | 'video';
    source: string;
    url: string;
    summary: string;
    tags: string[];
    duration?: string;
  }> = [
    // Articles
    {
      title: 'Understanding Stress',
      type: 'article',
      source: 'Mind (UK)',
      url: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/stress/',
      summary: 'Causes, symptoms, and practical strategies for managing stress.',
      tags: ['stress', 'education', 'coping']
    },
    {
      title: 'Grounding Techniques',
      type: 'article',
      source: 'Healthline',
      url: 'https://www.healthline.com/health/grounding-techniques',
      summary: 'Simple methods to reduce anxiety by reconnecting with the present.',
      tags: ['anxiety', 'mindfulness']
    },
    {
      title: 'Meditation for Beginners',
      type: 'article',
      source: 'Headspace',
      url: 'https://www.headspace.com/meditation/meditation-for-beginners',
      summary: 'Start meditating with step-by-step guidance and tips.',
      tags: ['meditation', 'mindfulness']
    },
    // Blogs
    {
      title: 'How to Build a Study Rhythm (Pomodoro)',
      type: 'blog',
      source: 'Todoist Blog',
      url: 'https://todoist.com/productivity-methods/pomodoro-technique',
      summary: 'Use focused intervals and breaks to reduce overwhelm.',
      tags: ['study', 'productivity']
    },
    {
      title: 'Sleep Hygiene for Students',
      type: 'blog',
      source: 'Sleep Foundation',
      url: 'https://www.sleepfoundation.org/sleep-hygiene',
      summary: 'Improve sleep quality with science-backed practices.',
      tags: ['sleep', 'wellness']
    },
    {
      title: 'Daily Mindfulness: Small Steps, Big Impact',
      type: 'blog',
      source: 'Mindful.org',
      url: 'https://www.mindful.org/meditation/mindfulness-getting-started/',
      summary: 'Accessible ways to add mindfulness to your day.',
      tags: ['mindfulness', 'habits']
    },
    // Videos
    {
      title: '4-7-8 Breathing Technique',
      type: 'video',
      source: 'Andrew Weil, M.D. (YouTube)',
      url: 'https://www.youtube.com/watch?v=gz4G31LGyog',
      summary: 'A quick, calming practice to reduce stress and aid sleep.',
      tags: ['breathing', 'calm'],
      duration: '3 min'
    },
    {
      title: 'Box Breathing Guide',
      type: 'video',
      source: 'VA Whole Health (YouTube)',
      url: 'https://www.youtube.com/watch?v=tEmt1Znux58',
      summary: 'Steady four-part breath to reduce anxiety and refocus.',
      tags: ['breathing', 'anxiety'],
      duration: '5 min'
    },
    {
      title: 'Mindful Walking Practice',
      type: 'video',
      source: 'UCLA Mindful (YouTube)',
      url: 'https://www.youtube.com/watch?v=R2bO1QFrb8U',
      summary: 'Guided mindful walk to reconnect with your senses.',
      tags: ['mindfulness', 'movement'],
      duration: '12 min'
    }
  ];
  const filteredItems = learningFilter === 'all' 
    ? learningItems 
    : learningItems.filter(i => i.type === learningFilter);
  return (
    <div className="space-y-6">
      <motion.section 
        className="card"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold">Resources</h1>
        <p className="subtitle">Goal-based modules and integrated mental health practices for holistic well-being</p>
      </motion.section>

      <motion.section 
        className="card"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between gap-2 mb-3">
          <div>
            <h2 className="text-xl font-semibold">Learning Hub</h2>
            <p className="subtitle">Curated reads and videos for focused, credible learning</p>
          </div>
          <div className="hidden md:flex gap-2">
            {(['all','article','blog','video'] as LearningType[]).map((t) => (
              <button
                key={t}
                onClick={() => setLearningFilter(t)}
                className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
                  learningFilter === t ? 'bg-primary text-white border-primary' : 'border-border text-gray-600 dark:text-gray-300 hover:bg-primary/10'
                }`}
              >
                {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1) + (t === 'video' ? 's' : 's')}
              </button>
            ))}
          </div>
        </div>
        {/* Mobile filter */}
        <div className="md:hidden mb-3">
          <select 
            value={learningFilter} 
            onChange={(e)=>setLearningFilter(e.target.value as LearningType)} 
          >
            <option value="all">All</option>
            <option value="article">Articles</option>
            <option value="blog">Blogs</option>
            <option value="video">Videos</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item, idx) => (
            <motion.a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener"
              className="block group border border-border rounded-lg p-4 bg-white/90 dark:bg-card hover:shadow-card transition-all"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.03 }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                      item.type === 'video' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700' :
                      item.type === 'blog' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700' :
                      'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 border-indigo-200 dark:border-indigo-700'
                    }`}>
                      {item.type === 'video' ? 'Video' : item.type === 'blog' ? 'Blog' : 'Article'}
                    </span>
                    {item.duration && (
                      <span className="text-xs text-gray-600 dark:text-gray-400">{item.duration}</span>
                    )}
                  </div>
                  <h3 className="font-semibold leading-snug group-hover:underline">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.source}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary mt-1" />
              </div>
              <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{item.summary}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {item.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">#{tag}</span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </motion.section>

      
      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => { setActiveTab('goals'); setActivePractice(null); }}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'goals'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Goal Tracker
          </div>
        </button>
        <button
          onClick={() => { setActiveTab('practices'); setActivePractice(null); }}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'practices'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Mental Health Practices
          </div>
        </button>
      </div>

      
      {activeTab === 'goals' && (
        <div className="space-y-6">
          <section className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Goals</h2>
              <button
                onClick={addNewGoal}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Add New Goal
              </button>
            </div>
            
            <div className="space-y-4">
              {goals.map(goal => (
                <div key={goal.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      {editingGoal === goal.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={goal.title}
                            onChange={(e) => updateGoalDetails(goal.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            placeholder="Goal title"
                          />
                          <input
                            type="text"
                            value={goal.category}
                            onChange={(e) => updateGoalDetails(goal.id, 'category', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                            placeholder="Category"
                          />
                        </div>
                      ) : (
                        <>
                          <h3 className="font-semibold text-lg">{goal.title}</h3>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{goal.category}</span>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingGoal(editingGoal === goal.id ? null : goal.id)}
                        className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                        title="Edit goal"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleReminder(goal.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          goal.reminderEnabled
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                        title={goal.reminderEnabled ? 'Reminders enabled' : 'Enable reminders'}
                      >
                        <Bell className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        title="Delete goal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Daily Aim Section */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">Today's Aim</span>
                    </div>
                    {editingGoal === goal.id ? (
                      <input
                        type="text"
                        value={goal.dailyAim}
                        onChange={(e) => updateGoalDetails(goal.id, 'dailyAim', e.target.value)}
                        className="w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                        placeholder="Set your daily target"
                      />
                    ) : (
                      <p className="text-sm text-blue-800 dark:text-blue-200">{goal.dailyAim}</p>
                    )}
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-blue-700 dark:text-blue-300">Daily Progress</span>
                        <span className="font-semibold text-blue-900 dark:text-blue-100">{goal.dailyProgress}%</span>
                      </div>
                      <div className="w-full bg-blue-200 dark:bg-blue-900/40 rounded-full h-2">
                        <div
                          className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${goal.dailyProgress}%` }}
                        ></div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => updateDailyProgress(goal.id, Math.min(goal.dailyProgress + 25, 100))}
                          className="flex-1 px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                        >
                          +25%
                        </button>
                        <button
                          onClick={() => updateDailyProgress(goal.id, 0)}
                          className="px-2 py-1 bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 rounded text-xs font-medium hover:bg-blue-300 dark:hover:bg-blue-700 transition-colors"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Overall Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Progress</span>
                      <span className="font-semibold">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">
                        Milestones: {goal.completedMilestones}/{goal.milestones}
                      </span>
                    </div>
                    {goal.progress === 100 && (
                      <div className="flex items-center gap-1 text-green-500 text-sm font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        Completed!
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateGoalProgress(goal.id, Math.min(goal.progress + 10, 100))}
                      className="flex-1 px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                    >
                      +10% Progress
                    </button>
                    <button
                      onClick={() => updateGoalProgress(goal.id, Math.max(goal.progress - 10, 0))}
                      className="flex-1 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    >
                      -10% Progress
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <section className="card bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <Award className="w-8 h-8 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Milestone Celebrations 🎉</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Celebrate your achievements! You've completed {goals.reduce((acc, g) => acc + g.completedMilestones, 0)} milestones so far.
                </p>
                <div className="space-y-2">
                  {goals.filter(g => g.progress === 100).map(goal => (
                    <div key={goal.id} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-medium">{goal.title}</span>
                      <span className="text-gray-600 dark:text-gray-400">- Completed!</span>
                    </div>
                  ))}
                  {goals.filter(g => g.progress === 100).length === 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Keep working on your goals to see celebrations here!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      
      {activeTab === 'practices' && (
        <div className="space-y-6">
          {!activePractice ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                onClick={() => setActivePractice('breathing')}
                className="card hover:shadow-lg transition-shadow text-left"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start gap-3">
                  <Wind className="w-8 h-8 text-blue-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Breathing Exercises</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Calm your mind with guided breathing techniques</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                onClick={() => setActivePractice('meditation')}
                className="card hover:shadow-lg transition-shadow text-left"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start gap-3">
                  <Brain className="w-8 h-8 text-purple-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Meditation Guides</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Structured meditation practices for mental clarity</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                onClick={() => setActivePractice('journaling')}
                className="card hover:shadow-lg transition-shadow text-left"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start gap-3">
                  <BookOpen className="w-8 h-8 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Journaling Prompts</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Reflective writing for emotional processing</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                onClick={() => setActivePractice('mindfulness')}
                className="card hover:shadow-lg transition-shadow text-left"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start gap-3">
                  <Smile className="w-8 h-8 text-yellow-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Mindfulness Activities</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Present-moment awareness exercises</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                onClick={() => setActivePractice('stress')}
                className="card hover:shadow-lg transition-shadow text-left"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start gap-3">
                  <Heart className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Stress Management</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Effective techniques to reduce stress</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                onClick={() => setActivePractice('sleep')}
                className="card hover:shadow-lg transition-shadow text-left"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start gap-3">
                  <Moon className="w-8 h-8 text-indigo-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Sleep Hygiene Tips</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Improve your sleep quality and routine</p>
                  </div>
                </div>
            </motion.button>
          </div>
          ) : (
            <>
              <button
                onClick={() => setActivePractice(null)}
                className="text-primary hover:underline flex items-center gap-2"
              >
                ← Back to all practices
              </button>
              {renderPracticeContent()}
            </>
          )}
        </div>
      )}

      {/* Removed legacy link-only sections per request */}
    </div>
  );
}