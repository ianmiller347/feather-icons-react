import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { ArrowDown, Activity, Heart } from 'feather-icons-react';

/**
 * JavaScript Demo Page
 *
 * This demo verifies that:
 * 1. Default import works: import FeatherIcon from 'feather-icons-react'
 * 2. Named imports work: import { ArrowDown } from 'feather-icons-react'
 * 3. Runtime behavior works correctly in JavaScript
 */

const JSDemo = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>JavaScript Demo - feather-icons-react</h1>
      <p>This page verifies runtime behavior without TypeScript.</p>

      <section style={{ marginTop: '2rem' }}>
        <h2>1. Default Import (FeatherIcon)</h2>
        <p>
          Using:{' '}
          <code>import FeatherIcon from &apos;feather-icons-react&apos;</code>
        </p>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <FeatherIcon icon="arrow-down" size={24} />
          <FeatherIcon icon="activity" size={32} className="custom-class" />
          <FeatherIcon icon="heart" size={40} fill="red" strokeWidth={1} />
          <FeatherIcon
            icon="star"
            size={28}
            className="test-icon"
            onClick={() => alert('Icon clicked!')}
          />
        </div>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
          ✓ Default import works correctly
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>2. Named Imports (Individual Icons)</h2>
        <p>
          Using:{' '}
          <code>
            import {'{'} ArrowDown, Activity, Heart {'}'} from
            &apos;feather-icons-react&apos;
          </code>
        </p>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <ArrowDown size={24} />
          <Activity size={32} className="custom-class" />
          <Heart size={40} fill="red" strokeWidth={1} />
          <ArrowDown
            size={28}
            className="test-icon"
            onClick={() => alert('ArrowDown clicked!')}
          />
        </div>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
          ✓ Named imports work correctly
        </p>
      </section>

      <section
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
        }}
      >
        <h3>Runtime Verification</h3>
        <p>
          If you see the icons rendered correctly, the runtime behavior is
          working!
        </p>
        <ul>
          <li>✓ Default export works at runtime</li>
          <li>✓ Named exports work at runtime</li>
          <li>✓ Props are passed correctly</li>
          <li>✓ Event handlers work (try clicking the icons above)</li>
        </ul>
      </section>
    </div>
  );
};

export default JSDemo;
