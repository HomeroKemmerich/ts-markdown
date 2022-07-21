import { tsMarkdown } from '../rendering';
import { HorizontalRuleEntry } from './hr';

describe('given a horizontal rule entry', () => {
  describe('with any value', () => {
    const hrEntry: HorizontalRuleEntry = {
      hr: '',
    };

    test('renders a horizontal rule', () => {
      expect(tsMarkdown([hrEntry])).toBe(`---`);
    });
  });

  describe('with an Obsidian-esque identifier appended', () => {
    const hrEntry: HorizontalRuleEntry = {
      hr: '',
      append: '^heyo',
    };

    test('renders a horizontal rule with identifier below', () => {
      expect(tsMarkdown([hrEntry])).toBe(`---
^heyo`);
    });
  });

  describe('with asterisk indicator', () => {
    const hrEntry: HorizontalRuleEntry = {
      hr: '',
      indicator: '*',
    };

    test('renders a horizontal rule with asterisk indicator', () => {
      expect(tsMarkdown([hrEntry])).toBe(`***`);
    });
  });

  describe('with hyphen indicator', () => {
    const hrEntry: HorizontalRuleEntry = {
      hr: '',
      indicator: '-',
    };

    test('renders a horizontal rule with hyphen indicator', () => {
      expect(tsMarkdown([hrEntry])).toBe(`---`);
    });
  });

  describe('with underscore indicator', () => {
    const hrEntry: HorizontalRuleEntry = {
      hr: '',
      indicator: '_',
    };

    test('renders a horizontal rule with underscore indicator', () => {
      expect(tsMarkdown([hrEntry])).toBe(`___`);
    });
  });
});
