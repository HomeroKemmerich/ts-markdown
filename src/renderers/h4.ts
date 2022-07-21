import { getMarkdownString } from '../rendering';
import { getOptionalHeaderIdText } from './header';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

export type H4Entry = {
  h4: InlineTypes;
  id?: string;
  append?: string;
} & MarkdownEntry;

export const h4Renderer: MarkdownRenderer = (
  entry: H4Entry,
  options: RenderOptions
) => {
  if ('h4' in entry) {
    return `#### ${getMarkdownString(
      entry.h4,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;
  }

  throw new Error('Entry is not an h4 entry. Unable to render.');
};
