import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { ArrowDown, Activity, Heart } from 'feather-icons-react';
import type { FeatherIconProps } from 'feather-icons-react';

/**
 * TypeScript Demo Page
 *
 * This demo verifies that:
 * 1. Default import works: import FeatherIcon from 'feather-icons-react'
 * 2. Named imports work: import { ArrowDown } from 'feather-icons-react'
 * 3. TypeScript types are properly exported and work
 */

const TSDemo: React.FC = () => {
  // Test default import with TypeScript types
  const defaultIconProps: FeatherIconProps = {
    icon: 'arrow-down',
    size: 32,
    className: 'test-icon',
    fill: 'none',
    strokeWidth: 2,
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>TypeScript Demo - feather-icons-react</h1>
      <p>This page verifies TypeScript type checking and runtime behavior.</p>

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
          <FeatherIcon {...defaultIconProps} />
        </div>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
          ✓ TypeScript types are working - no type errors
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
        </div>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
          ✓ Named imports work correctly with TypeScript
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
        <h3>Type Checking Verification</h3>
        <p>
          If you see this page without TypeScript errors, the types are working
          correctly!
        </p>
        <ul>
          <li>✓ Default export types are correct</li>
          <li>✓ Named export types are correct</li>
          <li>✓ Props interfaces are properly exported</li>
          <li>✓ Icon names are type-safe</li>
        </ul>
      </section>
    </div>
  );
};

export default TSDemo;
