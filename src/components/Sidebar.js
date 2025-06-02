import React from 'react';

const Sidebar = ({ isOpen, currentView, setCurrentView, setSidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'mood-tracker', label: 'Mood Tracker', icon: 'target' },
    { id: 'journal', label: 'Journal', icon: 'notebook' },
    { id: 'resources', label: 'Resources', icon: 'folder' },
    { id: 'settings', label: 'Settings', icon: 'gear' },
    { id: 'crisis-support', label: 'Crisis Support', icon: 'warning', special: true }
  ];

  const handleMenuClick = (viewId) => {
    setCurrentView(viewId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const renderIcon = (iconType, isSpecial = false) => {
    const iconClass = `w-5 h-5 ${isSpecial ? 'text-danger-500' : 'text-neutral-500 group-hover:text-primary-600'}`;
    
    switch (iconType) {
      case 'home':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'target':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'notebook':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'folder':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        );
      case 'gear':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-neutral-50 shadow-lg border-r border-black transform transition-transform duration-300 ease-in-out min-h-screen ${
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      <div className="flex flex-col h-screen lg:h-full min-h-screen">
        <div className="p-6 border-b border-black flex-shrink-0">
          <h2 className="text-lg font-semibold text-neutral-800">Menu</h2>
        </div>
        
        <nav className="flex-1 px-4 pb-4 space-y-2 mt-4 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`group w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 border border-black ${
                currentView === item.id
                  ? 'bg-primary-100 text-primary-700'
                  : item.special
                  ? 'text-danger-600 hover:bg-danger-50 bg-neutral-50'
                  : 'text-neutral-700 hover:bg-neutral-100 bg-neutral-50'
              }`}
            >
              <span className="mr-3">
                {renderIcon(item.icon, item.special)}
              </span>
              <span className={item.special ? 'text-danger-600' : ''}>{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-black flex-shrink-0">
          <p className="text-xs text-neutral-500 text-center">
            MoodLink v1.0.0
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 