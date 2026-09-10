import type { NextConfig } from 'next';

const [repositoryOwner, repositoryName] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true';
const isUserOrOrganizationSite = repositoryName === `${repositoryOwner}.github.io`;
const basePath =
  isGitHubPagesBuild && repositoryName && !isUserOrOrganizationSite
    ? `/${repositoryName}`
    : '';

const nextConfig: NextConfig = {
  output: isGitHubPagesBuild ? 'export' : undefined,
  // GitHub Pages mounts the uploaded artifact below the repository path.
  // Keeping routes rooted in the artifact avoids a vinext export-time redirect
  // while asset and in-page URLs still include the public repository prefix.
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
