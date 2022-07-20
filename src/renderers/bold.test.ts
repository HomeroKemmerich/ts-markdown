import { renderMarkdown } from '../rendering';
import { BoldEntry } from './bold';

describe('given a bold entry', () => {
  describe('with a string value', () => {
    const boldEntry: BoldEntry = {
      bold: 'Hello, world!',
    };

    test('renders a bolded markdown line with the specified string as text', () => {
      expect(renderMarkdown([boldEntry])).toBe(`**${boldEntry.bold}**`);
    });
  });

  describe('with an underscore indicator', () => {
    const boldEntry: BoldEntry = {
      bold: 'test',
      indicator: '_',
    };

    test('renders a bolded markdown line indicated with an underscore', () => {
      expect(renderMarkdown([boldEntry])).toBe(`__test__`);
    });
  });

  describe('with a document-level underscore indicator', () => {
    const boldEntry: BoldEntry = {
      bold: 'test',
    };

    test('renders a bolded markdown line indicated with an underscore', () => {
      expect(renderMarkdown([boldEntry], { boldIndicator: '_' })).toBe(
        `__test__`
      );
    });
  });

  describe('with a document-level underscore indicator and local asterisk indicator', () => {
    const boldEntry: BoldEntry = {
      bold: 'test',
      indicator: '*'
    };

    test('favors local indicator', () => {
      expect(renderMarkdown([boldEntry], { boldIndicator: '_' })).toBe(
        `**test**`
      );
    });
  });
});
