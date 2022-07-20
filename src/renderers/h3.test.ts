import { renderMarkdown } from '../rendering';

describe('given a header 3 entry', () => {
  describe('with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        h3: 'Hello, world!',
      },
    ];

    test('renders an h3 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`### ${data[0]['h3']}`);
    });
  });

  describe('with an id', () => {
    const headerEntry: H3Entry = {
      h3: 'Test',
      id: 'test-id',
    };

    test('renders an h3 with the specified text and id', () => {
      expect(renderMarkdown([headerEntry])).toBe(
        `### ${headerEntry.h3} {#${headerEntry.id}}`
      );
    });
  });

  describe('with a text entry containing rich text', () => {
    const h3Entry: H3Entry = {
      h3: {
        text: [
          {
            highlight: 'Totally',
          },
          ' ',
          {
            bold: { italic: 'awesome' },
          },
          ' ',
          {
            strikethrough: 'd00d',
          },
        ],
      },
    };

    test('renders h3 with rich text', () => {
      expect(renderMarkdown([h3Entry])).toBe(
        '### ==Totally== ***awesome*** ~~d00d~~'
      );
    });
  });

  describe('with rich text', () => {
    const h3Entry: H3Entry = {
      h3: { bold: { italic: { highlight: 'PER MY PREVIOUS EMAIL' } } },
    };

    test('renders h3 with rich text', () => {
      expect(renderMarkdown([h3Entry])).toBe(
        '### ***==PER MY PREVIOUS EMAIL==***'
      );
    });
  });

  describe('with link and image', () => {
    const h3Entry: H3Entry = {
      h3: {
        text: [
          'The magnificent power of ',
          {
            link: {
              source: 'https://www.google.com',
              text: 'Googling Placeholders',
            },
          },
          ' like ',
          {
            img: {
              href: 'https://via.placeholder.com/25',
              alt: 'A 25x25 placeholder image',
              title: 'Here is a handy placeholder image',
            },
          },
        ],
      },
    };

    test('renders h3 with link and image', () => {
      expect(renderMarkdown([h3Entry])).toBe(
        '### The magnificent power of [Googling Placeholders](https://www.google.com) like ![A 25x25 placeholder image](https://via.placeholder.com/25 "Here is a handy placeholder image")'
      );
    });
  });

  describe('with a string value and appended with an Obsidianesque identifier', () => {
    const entry: H3Entry = {
      h3: 'Hello, world!',
      append: '^la-dee-da',
    };

    test('renders an h3 markdown line with the specified string as text', () => {
      expect(renderMarkdown([entry])).toBe(
        `### ${entry.h3}
^la-dee-da`
      );
    });
  });
});