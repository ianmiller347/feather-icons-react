/**
 * Tests that the built package renders icons correctly for both
 * default import (FeatherIcon with icon prop) and named import (e.g. X).
 */
import { describe, it, expect } from 'vitest';
import TestRenderer from 'react-test-renderer';
// Use built package (same as package main) so we test what consumers get
import FeatherIcon, { X } from '../build/index.js';

function getSvg(instance) {
  return instance.findByType('svg');
}

describe('default import (FeatherIcon)', () => {
  it('renders an SVG for a given icon name', () => {
    const renderer = TestRenderer.create(<FeatherIcon icon="x" />);
    const svg = getSvg(renderer.root);
    expect(svg).not.toBeNull();
    expect(svg.props.viewBox).toBe('0 0 24 24');
    expect(svg.props.width).toBe(24);
    expect(svg.props.height).toBe(24);
    expect(svg.props.className).toContain('feather');
    expect(svg.props.className).toContain('feather-x');
    const g = svg.findByType('g');
    expect(g).not.toBeNull();
    // Default import uses IconInner (dangerouslySetInnerHTML); inner markup is not exposed as React tree
  });

  it('accepts size and applies it to width/height', () => {
    const renderer = TestRenderer.create(<FeatherIcon icon="x" size={32} />);
    const svg = getSvg(renderer.root);
    expect(svg.props.width).toBe(32);
    expect(svg.props.height).toBe(32);
  });

  it('returns null when icon is not provided', () => {
    const renderer = TestRenderer.create(<FeatherIcon />);
    expect(renderer.toJSON()).toBeNull();
  });
});

describe('named import (e.g. X)', () => {
  it('renders the same icon as default import with icon="x"', () => {
    const renderer = TestRenderer.create(<X />);
    const svg = getSvg(renderer.root);
    expect(svg).not.toBeNull();
    expect(svg.props.viewBox).toBe('0 0 24 24');
    expect(svg.props.className).toContain('feather-x');
    const g = svg.findByType('g');
    expect(g).not.toBeNull();
    // Named component renders real React elements (two lines for X icon)
    const lines = svg.findAllByType('line');
    expect(lines.length).toBe(2);
  });

  it('accepts size prop', () => {
    const renderer = TestRenderer.create(<X size={48} />);
    const svg = getSvg(renderer.root);
    expect(svg.props.width).toBe(48);
    expect(svg.props.height).toBe(48);
  });
});
