import React from 'react';
import TestAdmin from './admin/TestAdmin';

function AppSimple() {
  // Try both pathname and hash routing
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  
  console.log('Current path:', currentPath);
  console.log('Current hash:', currentHash);
  
  // Check both /admin and #admin
  if (currentPath === '/admin' || currentHash === '#admin') {
    console.log('Rendering TestAdmin');
    return <TestAdmin />;
  }
  
  console.log('Rendering Portfolio');
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Portfolio Site</h1>
      <p className="text-xl mb-8">This is the main portfolio site.</p>
      
      <div className="fixed bottom-4 left-4 flex gap-4">
        <a
          href="/admin"
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Go to Admin (Path)
        </a>
        <a
          href="#admin"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go to Admin (Hash)
        </a>
      </div>
    </div>
  );
}

export default AppSimple;