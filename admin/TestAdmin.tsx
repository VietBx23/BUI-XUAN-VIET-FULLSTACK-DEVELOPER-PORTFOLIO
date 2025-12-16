import React from 'react';

const TestAdmin: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard Test</h1>
        <p className="text-xl mb-8">This is a test admin page to verify routing works.</p>
        <div className="bg-emerald-500 text-white px-6 py-3 rounded-lg inline-block">
          ✅ Admin route is working!
        </div>
        <div className="mt-8">
          <a 
            href="/" 
            className="text-blue-400 hover:text-blue-300 underline"
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestAdmin;