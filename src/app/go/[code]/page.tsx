import { wikiSlugs } from '@/constants/wikiSlugs';
import { generateShortCode } from '@/shared/lib/shortCodes';
import { redirect } from 'next/navigation';
import Link from 'next/link';

// Build code-to-slug mapping at build time
const codeToSlug: Record<string, string> = {};
for (const slug of wikiSlugs) {
  const code = generateShortCode(slug);
  codeToSlug[code] = slug;
}

export function generateStaticParams() {
  return Object.keys(codeToSlug).map((code) => ({ code }));
}

export default async function GoRedirectPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const slug = codeToSlug[code.toUpperCase()];

  if (slug) {
    redirect(`/wiki/${slug}`);
  }

  return (
    <div
      style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}
    >
      <h1>Code not found</h1>
      <p>
        The code <strong>{code.toUpperCase()}</strong> does not match any page.
      </p>
      <p>Double-check the 4-letter code and try again.</p>
      <Link href="/" style={{ color: '#2563eb' }}>
        Go to easyloops.app
      </Link>
    </div>
  );
}
