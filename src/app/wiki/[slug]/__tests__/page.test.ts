import { generateMetadata } from '../page';

jest.mock('next/navigation', () => ({ notFound: jest.fn() }));
jest.mock('@/constants/wikiSlugs', () => ({ wikiSlugs: ['recursion', 'linear-maps', 'functions', 'arrays', 'data-types'] }));
jest.mock('@/shared/components/ClientHeader', () => () => null);
jest.mock('../WikiPageClient', () => () => null);
jest.mock('@/shared/lib/wikiLoader', () => ({ loadAllWikiLanguages: jest.fn() }));

async function getTitle(slug: string): Promise<string> {
  const metadata = await generateMetadata({
    params: Promise.resolve({ slug }),
  });
  return metadata.title as string;
}

describe('generateMetadata', () => {
  describe('slugToTitle conversion', () => {
    it('converts a single-word slug', async () => {
      expect(await getTitle('recursion')).toBe('Recursion | easyloops');
    });

    it('converts a two-word hyphenated slug', async () => {
      expect(await getTitle('linear-maps')).toBe('Linear Maps | easyloops');
    });

    it('converts a multi-word slug', async () => {
      expect(await getTitle('dynamic-programming')).toBe(
        'Dynamic Programming | easyloops'
      );
    });

    it('capitalises every word in the slug', async () => {
      expect(await getTitle('covariance-and-independence')).toBe(
        'Covariance And Independence | easyloops'
      );
    });

    it('handles slugs that contain numbers', async () => {
      expect(await getTitle('data-types-101')).toBe(
        'Data Types 101 | easyloops'
      );
    });
  });

  describe('title format', () => {
    it('appends "| easyloops" suffix to every title', async () => {
      const title = await getTitle('functions');
      expect(title).toMatch(/\| easyloops$/);
    });

    it('returns a string value for title', async () => {
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'arrays' }),
      });
      expect(typeof metadata.title).toBe('string');
    });

    it('does not include the raw slug in the title', async () => {
      const title = await getTitle('linear-maps');
      expect(title).not.toContain('linear-maps');
    });
  });
});
