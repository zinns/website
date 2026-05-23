import { describe, expect, it } from 'vitest';

import {
  getReleaseTitle,
  getVersionFromReleaseTitle,
  incrementVersion,
  isReleaseTitle,
  parseVersion,
} from './semver.mjs';

describe('release version helpers', () => {
  it('parses semantic versions', () => {
    expect(parseVersion('1.2.3')).toEqual({ major: 1, minor: 2, patch: 3 });
  });

  it('increments patch, minor, and major versions', () => {
    expect(incrementVersion('1.2.3', 'patch')).toBe('1.2.4');
    expect(incrementVersion('1.2.3', 'minor')).toBe('1.3.0');
    expect(incrementVersion('1.2.3', 'major')).toBe('2.0.0');
  });

  it('extracts versions from production release titles', () => {
    expect(getReleaseTitle('1.2.3')).toBe('Release 📦 v1.2.3');
    expect(getVersionFromReleaseTitle('Release 📦 v1.2.3')).toBe('1.2.3');
    expect(isReleaseTitle('feat(repo): add workflow (#99)')).toBe(false);
  });
});
