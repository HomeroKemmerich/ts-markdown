import { getMarkdownString } from '../rendering';
import { getOptionalHeaderIdText } from './header';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

export type H3Entry = {
  h3: InlineTypes;
  id?: string;
  append?: string;
} & MarkdownEntry;

export const h3Renderer: MarkdownRenderer = (
  entry: H3Entry,
  options: RenderOptions
) => {
  if ('h3' in entry) {
    return `### ${getMarkdownString(
      entry.h3,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;
  }

  throw new Error('Entry is not an h3 entry. Unable to render.');
};
