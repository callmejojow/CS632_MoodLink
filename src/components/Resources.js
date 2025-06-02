import React from 'react';

const Resources = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Resources</h1>
        <p className="text-neutral-600">Tools and techniques to support your mental health journey</p>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="resources-card hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-neutral-50 border border-black rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">Breathing Exercises</h3>
              <p className="text-neutral-700 text-sm mb-4">Simple techniques to help you relax and reduce anxiety</p>
              <ul className="space-y-1">
                <li className="text-sm text-neutral-800 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                  4-7-8 breathing technique
                </li>
                <li className="text-sm text-neutral-800 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                  Box breathing
                </li>
                <li className="text-sm text-neutral-800 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                  Progressive muscle relaxation
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="resources-card hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-neutral-50 border border-black rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">Mindfulness & Meditation</h3>
              <p className="text-neutral-700 text-sm mb-4">Practice mindfulness to stay present and centered</p>
              <ul className="space-y-1">
                <li className="text-sm text-neutral-800 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                  5-minute meditation
                </li>
                <li className="text-sm text-neutral-800 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                  Body scan exercise
                </li>
                <li className="text-sm text-neutral-800 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                  Mindful walking
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="resources-card hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-neutral-50 border border-black rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">Positive Coping Strategies</h3>
              <p className="text-neutral-700 text-sm mb-4">Healthy ways to manage difficult emotions</p>
              <ul className="space-y-1">
                <li className="text-sm text-neutral-800 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                  Journaling prompts
                </li>
                <li className="text-sm text-neutral-800 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                  Gratitude practice
                </li>
                <li className="text-sm text-neutral-800 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                  Creative expression
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="resources-card hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-neutral-50 border border-black rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">Self-Care Activities</h3>
              <p className="text-neutral-700 text-sm mb-4">Take care of your physical and mental well-being</p>
              <ul className="space-y-1">
                <li className="text-sm text-neutral-800 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                  Exercise routine
                </li>
                <li className="text-sm text-neutral-800 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                  Healthy sleep habits
                </li>
                <li className="text-sm text-neutral-800 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                  Nutrition tips
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Help */}
      <div className="card">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-warning-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-warning-800 mb-2">When to Seek Professional Help</h4>
            <p className="text-warning-700 text-sm mb-3">
              If you're experiencing persistent sadness, anxiety, or thoughts of self-harm, please reach out to a mental health professional.
            </p>
            <button className="btn-secondary text-sm">Find a Therapist</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources; 