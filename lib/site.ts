export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://chem-ai-solver.woodsy-bison-3513.chatgpt.site';

export const SITE_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const sitePath = (path: string) => `${SITE_BASE_PATH}${path}`;

export const APP_STORE_URL =
  'https://apps.apple.com/us/app/chem-ai-chemistry-solver/id6739063555';

export const DEVELOPER_URL =
  'https://apps.apple.com/us/developer/%E6%A0%91%E9%91%AB-%E8%B5%96/id1680833127';
