// Deterministic 4-letter short code generator for wiki pages.
// Uses a simple hash of the slug to produce a human-friendly code
// (excluding I, O, 0, 1 to avoid confusion for kids).

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function generateShortCode(slug: string): string {
  let h = hashString(slug);
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += CHARS[h % CHARS.length];
    h = Math.floor(h / CHARS.length);
  }
  return code;
}

export function getShortCodeUrl(slug: string): string {
  const code = generateShortCode(slug);
  return `easyloops.app/go/${code}`;
}
