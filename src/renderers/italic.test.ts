import { renderMarkdown } from '../rendering';

describe('given an italic entry', () => {
  describe('with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        italic: 'Hello, world!',
      },
    ];

    test('renders a italicized markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`*${data[0]['italic']}*`);
    });
  });
  
  describe('with an underscore indicator', () => {
    const italicEntry: ItalicEntry = {
      italic: 'test',
      indicator: '_',
    };

    test('renders an italic markdown line indicated with an underscore', () => {
      expect(renderMarkdown([italicEntry])).toBe(`_test_`);
    });
  });
});
