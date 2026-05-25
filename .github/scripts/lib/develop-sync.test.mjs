import { describe, expect, it } from 'vitest';

import {
  packageJsonDiffersOnlyByVersion,
  resolvePackageJsonForDevelopSync,
  stringifyPackageJson,
} from './develop-sync.mjs';

const basePackageJson = {
  name: 'website',
  version: '0.3.0',
  private: true,
  dependencies: {
    next: '16.2.6',
    react: '19.2.6',
  },
};

describe('develop sync helpers', () => {
  it('detects package.json conflicts that only change the release version', () => {
    expect(
      packageJsonDiffersOnlyByVersion(basePackageJson, {
        ...basePackageJson,
        version: '0.3.1',
      }),
    ).toBe(true);
  });

  it('resolves the sync package.json conflict by preserving develop and adopting the main version', () => {
    expect(
      resolvePackageJsonForDevelopSync(basePackageJson, {
        ...basePackageJson,
        version: '0.3.1',
      }),
    ).toEqual({
      ...basePackageJson,
      version: '0.3.1',
    });
  });

  it('rejects package.json conflicts that include dependency changes', () => {
    expect(() =>
      resolvePackageJsonForDevelopSync(basePackageJson, {
        ...basePackageJson,
        dependencies: {
          next: '16.2.6',
          react: '19.2.7',
        },
        version: '0.3.1',
      }),
    ).toThrow('package.json has conflicts beyond the release version');
  });

  it('keeps package.json formatting stable', () => {
    expect(stringifyPackageJson({ name: 'website', version: '0.3.1' })).toBe(
      '{\n  "name": "website",\n  "version": "0.3.1"\n}\n',
    );
  });
});
