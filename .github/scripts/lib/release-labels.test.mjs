import { describe, expect, it } from 'vitest';

import {
  getMissingLabels,
  getReleaseTypeFromVersionLabel,
  getSingleVersionLabel,
  getVersionLabels,
} from './release-labels.mjs';

describe('release label helpers', () => {
  it('returns version labels from GitHub label objects', () => {
    expect(getVersionLabels([{ name: 'version:minor' }, { name: 'type:release' }])).toEqual([
      'version:minor',
    ]);
  });

  it('requires exactly one version label', () => {
    expect(getSingleVersionLabel([{ name: 'version:patch' }])).toBe('version:patch');
    expect(() => getSingleVersionLabel([])).toThrow('Expected exactly one version label');
    expect(() => getSingleVersionLabel(['version:patch', 'version:minor'])).toThrow(
      'Expected exactly one version label',
    );
  });

  it('maps version labels to release types', () => {
    expect(getReleaseTypeFromVersionLabel('version:major')).toBe('major');
  });

  it('returns missing required labels', () => {
    expect(getMissingLabels(['type:release'], ['type:release', 'status:in-review'])).toEqual([
      'status:in-review',
    ]);
  });
});
