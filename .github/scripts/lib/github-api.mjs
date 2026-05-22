export function getRepository(env = process.env) {
  const repository = env.GITHUB_REPOSITORY;

  if (!repository) {
    throw new Error('GITHUB_REPOSITORY is required.');
  }

  const [owner, repo] = repository.split('/');

  if (!owner || !repo) {
    throw new Error(`Invalid GITHUB_REPOSITORY value: ${repository}`);
  }

  return { owner, repo };
}

export async function githubRequest(path, options = {}) {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error('GITHUB_TOKEN is required.');
  }

  const method = options.method ?? 'GET';
  const url = path.startsWith('https://') ? path : `https://api.github.com${path}`;
  const response = await fetch(url, {
    method,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...options.headers,
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  const text = await response.text();
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = text.length > 0 && isJson ? JSON.parse(text) : text;

  if (!response.ok) {
    const detail = typeof data === 'string' ? data : JSON.stringify(data);
    throw new Error(`${method} ${url} failed with ${response.status}: ${detail}`);
  }

  return data;
}

export async function githubRequestOrNull(path, options = {}) {
  try {
    return await githubRequest(path, options);
  } catch (error) {
    if (String(error.message).includes(' failed with 404:')) {
      return null;
    }

    throw error;
  }
}

export async function githubPaginate(path) {
  const results = [];
  let page = 1;

  while (true) {
    const separator = path.includes('?') ? '&' : '?';
    const pageResults = await githubRequest(`${path}${separator}per_page=100&page=${page}`);

    if (!Array.isArray(pageResults) || pageResults.length === 0) {
      break;
    }

    results.push(...pageResults);
    page += 1;
  }

  return results;
}
