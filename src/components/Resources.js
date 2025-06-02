import React, { useState } from 'react';

const Resources = () => {
  const [showCrisisInfo, setShowCrisisInfo] = useState(false);
  const [breathingExercise, setBreathingExercise] = useState({
    isActive: false,
    phase: 'inhale',
    count: 4,
    cycle: 0
  });

  const selfCareTips = [
    "Practice gratitude by writing down three things you're thankful for each day",
    "Maintain a consistent sleep schedule and aim for 7-9 hours of rest",
    "Engage in regular physical activity, even if it's just a 10-minute walk",
    "Connect with supportive friends and family members regularly",
    "Set healthy boundaries and learn to say no when overwhelmed",
    "Practice mindfulness through meditation or deep breathing exercises"
  ];

  const mindfulnessTips = [
    "Start with just 5 minutes of meditation daily",
    "Practice the 5-4-3-2-1 grounding technique when feeling anxious",
    "Take mindful walks and notice your surroundings",
    "Use breathing exercises to center yourself during stressful moments",
    "Practice body scan meditation before sleep",
    "Try mindful eating by focusing on taste, texture, and smell"
  ];

  const professionalResources = [
    {
      name: "Psychology Today",
      description: "Find therapists, counselors, and support groups in your area",
      phone: null,
      website: "https://www.psychologytoday.com",
      available247: false
    },
    {
      name: "BetterHelp",
      description: "Online therapy with licensed mental health professionals",
      phone: null,
      website: "https://www.betterhelp.com",
      available247: false
    },
    {
      name: "National Alliance on Mental Illness (NAMI)",
      description: "Education, support, and advocacy for mental health",
      phone: "1-800-950-6264",
      website: "https://www.nami.org",
      available247: false
    },
    {
      name: "Mental Health America",
      description: "Resources, screening tools, and advocacy",
      phone: null,
      website: "https://www.mhanational.org",
      available247: false
    }
  ];

  const startBreathingExercise = () => {
    setBreathingExercise({
      isActive: true,
      phase: 'inhale',
      count: 4,
      cycle: 0
    });
    
    const runExercise = () => {
      let currentPhase = 'inhale';
      let currentCount = 4;
      let currentCycle = 0;
      
      const interval = setInterval(() => {
        if (currentCount > 1) {
          currentCount--;
          setBreathingExercise(prev => ({ ...prev, count: currentCount }));
        } else {
          // Move to next phase
          if (currentPhase === 'inhale') {
            currentPhase = 'hold';
            currentCount = 7;
          } else if (currentPhase === 'hold') {
            currentPhase = 'exhale';
            currentCount = 8;
          } else {
            currentPhase = 'inhale';
            currentCount = 4;
            currentCycle++;
            
            if (currentCycle >= 4) {
              clearInterval(interval);
              setBreathingExercise({
                isActive: false,
                phase: 'inhale',
                count: 4,
                cycle: 0
              });
              return;
            }
          }
          
          setBreathingExercise(prev => ({
            ...prev,
            phase: currentPhase,
            count: currentCount,
            cycle: currentCycle
          }));
        }
      }, 1000);
      
      // Store interval ID for cleanup
      window.breathingInterval = interval;
    };
    
    runExercise();
  };

  const stopBreathingExercise = () => {
    if (window.breathingInterval) {
      clearInterval(window.breathingInterval);
    }
    setBreathingExercise({
      isActive: false,
      phase: 'inhale',
      count: 4,
      cycle: 0
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">Resources</h1>
        <p className="text-neutral-600 dark:text-neutral-300">Tools and information to support your mental health journey</p>
      </div>

      {/* Quick Actions */}
      <div className="resources-card">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Need immediate support?</h2>
          <p className="text-white text-lg mb-6">If you're experiencing a mental health crisis</p>
          <button 
            onClick={() => setShowCrisisInfo(true)}
            className="bg-white text-coral-600 dark:text-coral-800 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-100 transition-colors duration-200 border border-black dark:border-neutral-700"
          >
            Get Crisis Support
          </button>
        </div>
      </div>

      {/* Mental Health Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Self-Care Tips</h3>
          </div>
          <div className="space-y-3">
            {selfCareTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Mindfulness</h3>
          </div>
          <div className="space-y-3">
            {mindfulnessTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Breathing Exercise */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-accent-100 dark:bg-accent-900/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">4-7-8 Breathing Exercise</h3>
        </div>
        
        <div className="text-center">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-accent-100 dark:bg-accent-900/20 rounded-full flex items-center justify-center mb-4">
              <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">
                {breathingExercise.phase === 'inhale' && '↑'}
                {breathingExercise.phase === 'hold' && '●'}
                {breathingExercise.phase === 'exhale' && '↓'}
              </div>
            </div>
            <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">{breathingExercise.count}</div>
            <div className="text-lg text-neutral-600 dark:text-neutral-300 capitalize">{breathingExercise.phase}</div>
          </div>
          
          <button
            onClick={breathingExercise.isActive ? stopBreathingExercise : startBreathingExercise}
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              breathingExercise.isActive 
                ? 'bg-red-500 dark:bg-red-600 text-white hover:bg-red-600 dark:hover:bg-red-700' 
                : 'btn-primary'
            }`}
          >
            {breathingExercise.isActive ? 'Stop Exercise' : 'Start Breathing Exercise'}
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-accent-50 dark:bg-accent-900/10 rounded-lg">
          <h4 className="font-semibold text-accent-800 dark:text-accent-200 mb-2">How it works:</h4>
          <ul className="text-accent-700 dark:text-accent-300 text-sm space-y-1">
            <li>• Inhale through your nose for 4 counts</li>
            <li>• Hold your breath for 7 counts</li>
            <li>• Exhale through your mouth for 8 counts</li>
            <li>• Repeat this cycle 3-4 times</li>
          </ul>
        </div>
      </div>

      {/* Professional Resources */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Professional Resources</h3>
        <div className="space-y-4">
          {professionalResources.map((resource, index) => (
            <div key={index} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-1">{resource.name}</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-2">{resource.description}</p>
                  <div className="flex items-center space-x-4">
                    {resource.phone && (
                      <a 
                        href={`tel:${resource.phone}`}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors duration-200"
                      >
                        📞 {resource.phone}
                      </a>
                    )}
                    {resource.website && (
                      <a 
                        href={resource.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors duration-200"
                      >
                        🌐 Website
                      </a>
                    )}
                  </div>
                </div>
                {resource.available247 && (
                  <span className="bg-secondary-100 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-300 text-xs px-2 py-1 rounded-full font-medium">
                    24/7
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crisis Support Modal */}
      {showCrisisInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 max-w-md w-full border border-black dark:border-neutral-700">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">Crisis Support</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2">National Suicide Prevention Lifeline</h4>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-2">24/7 crisis support</p>
                <a href="tel:988" className="text-lg font-bold text-red-600 dark:text-red-400">📞 988</a>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Crisis Text Line</h4>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-2">Text HOME to connect with a crisis counselor</p>
                <p className="text-lg font-bold text-red-600 dark:text-red-400">📱 741741</p>
              </div>
              <div className="mt-6">
                <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4">
                  If you're in immediate danger, please call 911 or go to your nearest emergency room.
                </p>
                <button
                  onClick={() => setShowCrisisInfo(false)}
                  className="w-full btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources; 