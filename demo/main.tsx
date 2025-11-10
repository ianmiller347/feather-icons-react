import React from 'react';
import ReactDOM from 'react-dom/client';
import TSDemo from './ts-demo';
import JSDemo from './js-demo';

// Simple router to switch between demos
const App = () => {
  const [currentDemo, setCurrentDemo] = React.useState<'ts' | 'js'>('ts');

  React.useEffect(() => {
    const tsLink = document.getElementById('ts-link');
    const jsLink = document.getElementById('js-link');

    const handleTSClick = (e: Event) => {
      e.preventDefault();
      setCurrentDemo('ts');
    };

    const handleJSClick = (e: Event) => {
      e.preventDefault();
      setCurrentDemo('js');
    };

    tsLink?.addEventListener('click', handleTSClick);
    jsLink?.addEventListener('click', handleJSClick);

    return () => {
      tsLink?.removeEventListener('click', handleTSClick);
      jsLink?.removeEventListener('click', handleJSClick);
    };
  }, []);

  React.useEffect(() => {
    const tsLink = document.getElementById('ts-link');
    const jsLink = document.getElementById('js-link');

    if (currentDemo === 'ts') {
      tsLink?.classList.add('active');
      jsLink?.classList.remove('active');
    } else {
      jsLink?.classList.add('active');
      tsLink?.classList.remove('active');
    }
  }, [currentDemo]);

  return <div>{currentDemo === 'ts' ? <TSDemo /> : <JSDemo />}</div>;
};

const root = ReactDOM.createRoot(document.getElementById('app')!);
root.render(<App />);
