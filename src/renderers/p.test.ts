import { tsMarkdown } from '../rendering';
import { ParagraphEntry } from './p';

describe('given a paragraph entry', () => {
  describe('with a single string', () => {
    const pEntry: ParagraphEntry = {
      p: 'Hello, world!',
    };

    test('renders a paragraph line with the specified string', () => {
      expect(tsMarkdown([pEntry])).toBe(pEntry.p);
    });
  });

  describe('with rich text', () => {
    const pEntry: ParagraphEntry = {
      p: { text: [{ bold: 'Hello,' }, ' ', { italic: 'world!' }] },
    };

    test('renders a paragraph line with the specified string and rich text formatting', () => {
      expect(tsMarkdown([pEntry])).toBe('**Hello,** *world!*');
    });
  });

  /**
   * Based on this recommendation: https://www.markdownguide.org/basic-syntax/#paragraph-best-practices
   * Also, a paragraph with 4 spaces creates a code block.
   */
  describe('with a single string element having 4 spaces of indentation', () => {
    const pEntry = {
      p: '    Hello, world!',
    };

    test('renders a paragraph line with the specified string and without indentation', () => {
      expect(tsMarkdown([pEntry])).toBe(pEntry.p.trim());
    });
  });

  /**
   * Based on this recommendation: https://www.markdownguide.org/basic-syntax/#paragraph-best-practices
   */
  describe('with a single string element having 2 tabs of indentation', () => {
    const pEntry = {
      p: '\t\tHello, world!',
    };

    test('renders a paragraph line with the specified string and without indentation', () => {
      expect(tsMarkdown([pEntry])).toBe('Hello, world!');
    });
  });

  describe('with a single string and an Obsidian-esque identifier appended', () => {
    const pEntry: ParagraphEntry = {
      p: 'Hello, world!',
      append: '^an-id',
    };

    test('renders a paragraph line with the specified string and an identifier just below', () => {
      expect(tsMarkdown([pEntry])).toBe(`${pEntry.p}
^an-id`);
    });
  });
});
