import React from 'react';

const CrisisSupport = () => {
  const crisisResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 free and confidential support',
      type: 'call'
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free, 24/7 crisis support via text',
      type: 'text'
    },
    {
      name: 'National Domestic Violence Hotline',
      number: '1-800-799-7233',
      description: '24/7 confidential support',
      type: 'call'
    },
    {
      name: 'SAMHSA National Helpline',
      number: '1-800-662-HELP (4357)',
      description: 'Treatment referral and information service',
      type: 'call'
    }
  ];

  const emergencySteps = [
    {
      title: 'Call 911',
      description: 'If you are in immediate danger or having a medical emergency',
      icon: 'phone'
    },
    {
      title: 'Go to Emergency Room',
      description: 'Visit your nearest hospital emergency department',
      icon: 'hospital'
    },
    {
      title: 'Call Crisis Line',
      description: 'Speak with a trained crisis counselor immediately',
      icon: 'support'
    }
  ];

  const renderIcon = (iconType) => {
    const iconClass = "w-6 h-6";
    
    switch (iconType) {
      case 'phone':
        return (
          <svg className={`${iconClass} text-red-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'hospital':
        return (
          <svg className={`${iconClass} text-red-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        );
      case 'support':
        return (
          <svg className={`${iconClass} text-red-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-danger-600 dark:text-danger-400 mb-2">Crisis Support</h1>
        <p className="text-neutral-600 dark:text-neutral-300">Immediate help and resources when you need them most</p>
      </div>

      {/* Emergency Alert */}
      <div className="bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-700 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-danger-600 dark:text-danger-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-danger-800 dark:text-danger-200 mb-2">If you're in immediate danger</h3>
            <p className="text-danger-700 dark:text-danger-300 mb-4">
              Please call 911 or go to your nearest emergency room immediately. Your safety is the top priority.
            </p>
            <a
              href="tel:911"
              className="inline-flex items-center px-4 py-2 bg-danger-600 dark:bg-danger-700 text-white rounded-lg font-medium hover:bg-danger-700 dark:hover:bg-danger-800 transition-colors duration-200"
            >
              📞 Call 911
            </a>
          </div>
        </div>
      </div>

      {/* Emergency Steps */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">In an Emergency</h3>
        <div className="space-y-4">
          {emergencySteps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  {renderIcon(step.icon)}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100">{step.title}</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crisis Resources */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">24/7 Crisis Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {crisisResources.map((resource, index) => (
            <div key={index} className="card hover:shadow-md transition-shadow duration-200">
              <div className="space-y-3">
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100">{resource.name}</h4>
                <div className="text-lg font-bold text-primary-600">{resource.number}</div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">{resource.description}</p>
                {resource.type === 'call' ? (
                  <a href={`tel:${resource.number.replace(/\D/g, '')}`} className="btn-primary text-sm w-full text-center block">
                    Call Now
                  </a>
                ) : (
                  <button className="btn-secondary text-sm w-full">
                    Text Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="card bg-neutral-50 dark:bg-neutral-800">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Additional Support</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium text-neutral-800 dark:text-neutral-100">Find a therapist or counselor in your area</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">Psychology Today, BetterHelp, or contact your insurance provider</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium text-neutral-800 dark:text-neutral-100">Local emergency services</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">Call 911 for immediate medical emergencies</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium text-neutral-800 dark:text-neutral-100">Trusted friend or family member</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">Reach out to someone you trust for support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Note */}
      <div className="card bg-primary-50 dark:bg-primary-800 border-primary-200 dark:border-primary-700">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-primary-600 dark:text-primary-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-primary-800 dark:text-primary-200 mb-2">Remember</h4>
            <p className="text-primary-700 dark:text-primary-300 text-sm">
              Seeking help is a sign of strength, not weakness. Your life has value and meaning. 
              There are people who want to help you through this difficult time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisSupport; 