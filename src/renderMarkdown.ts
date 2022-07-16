import { blockquoteRenderer } from './renderers/blockquote';
import { boldRenderer } from './renderers/bold';
import { codeRenderer } from './renderers/code';
import { codeblockRenderer } from './renderers/codeblock';
import { dlRenderer } from './renderers/dl';
import { emojiRenderer } from './renderers/emoji';
import { footnoteRenderer } from './renderers/footnote';
import { h1Renderer } from './renderers/h1';
import { h2Renderer } from './renderers/h2';
import { h3Renderer } from './renderers/h3';
import { h4Renderer } from './renderers/h4';
import { h5Renderer } from './renderers/h5';
import { h6Renderer } from './renderers/h6';
import { highlightRenderer } from './renderers/highlight';
import { hrRenderer } from './renderers/hr';
import { imgRenderer } from './renderers/img';
import { italicRenderer } from './renderers/italic';
import { linkRenderer } from './renderers/link';
import { olRenderer } from './renderers/ol';
import { pRenderer } from './renderers/p';
import { strikethroughRenderer } from './renderers/strikethrough';
import { stringRenderer } from './renderers/string';
import { subRenderer } from './renderers/sub';
import { supRenderer } from './renderers/sup';
import { tableRenderer } from './renderers/table';
import { tasksRenderer } from './renderers/tasks';
import { textRenderer } from './renderers/text';
import { ulRenderer } from './renderers/ul';

export function renderMarkdown(
  data: DataDrivenMarkdownEntry[],
  options?: DataDrivenMarkdownOptions
) {
  let document = renderEntries(data, options);

  let footnotes = getFootnotes(data);

  if (footnotes.length > 0) {
    document +=
      '\n\n' +
      footnotes
        .map((entry) => {
          let content = Array.isArray(entry.footnote.content)
            ? entry.footnote.content
            : [entry.footnote.content];
          return renderEntries(content, options)
            .split('\n')
            .map((line, index) => {
              let prefix = index === 0 ? `[^${entry.footnote.id}]: ` : '    ';
              return prefix + line;
            })
            .join('\n');
        })
        .join('\n\n');
  }

  return document;
}

export function renderEntries(
  data: DataDrivenMarkdownEntry[],
  options: DataDrivenMarkdownOptions
) {
  options ??= {
    unorderedListItemIndicator: '-',
    prefix: '',
  };

  let prefix = options.prefix ?? '';

  let textStack = '';
  for (const [index, entry] of data.entries()) {
    let entryPrefix = renderPrefix(prefix, index, entry);

    const result = getMarkdownString(entry, options);
    const newText =
      typeof result === 'string'
        ? result.split('\n')
        : result.reduce((prev, curr) => [...prev, ...curr.split('\n')], []);
    textStack += newText.map((text) => entryPrefix + text).join('\n');

    if (index < data.length - 1) {
      textStack += '\n';

      if (requiresAdditionalNewline(entry)) {
        textStack += entryPrefix;
        textStack += '\n';
      }
    }
  }
  return textStack;
}

function requiresAdditionalNewline(entry: DataDrivenMarkdownEntry) {
  if (typeof entry === 'string') {
    return false;
  }
  return Object.keys(entry).find((x) => newlineAroundEntries.has(x));
}

const newlineAroundEntries = new Set<string>([
  'p',
  'blockquote',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'table',
  'ul',
  'ol',
  'dl',
]);

const renderers = new Map<string, MarkdownRenderer>([
  ['string', stringRenderer],
  ['h1', h1Renderer],
  ['h2', h2Renderer],
  ['h3', h3Renderer],
  ['h4', h4Renderer],
  ['h5', h5Renderer],
  ['h6', h6Renderer],
  ['blockquote', blockquoteRenderer],
  ['bold', boldRenderer],
  ['code', codeRenderer],
  ['codeblock', codeblockRenderer],
  ['dl', dlRenderer],
  ['emoji', emojiRenderer],
  ['footnote', footnoteRenderer],
  ['highlight', highlightRenderer],
  ['hr', hrRenderer],
  ['img', imgRenderer],
  ['italic', italicRenderer],
  ['link', linkRenderer],
  ['ol', olRenderer],
  ['p', pRenderer],
  ['strikethrough', strikethroughRenderer],
  ['sub', subRenderer],
  ['sup', supRenderer],
  ['table', tableRenderer],
  ['tasks', tasksRenderer],
  ['text', textRenderer],
  ['ul', ulRenderer],
]);

export function getMarkdownString(
  entry: DataDrivenMarkdownEntry | string,
  options: DataDrivenMarkdownOptions
): string | string[] {
  if (entry === null || entry === undefined) {
    return '';
  }

  if (typeof entry === 'string') {
    return renderers.get('string')(entry, options);
  }

  for (let key in entry) {
    let renderer = renderers.get(key);
    if (renderer) {
      return renderer(entry, options);
    }
  }

  return '';
}

export function getOptionalHeaderIdText(
  entry: Partial<Identifiable>,
  prefix: string = ''
) {
  if (entry.id === undefined) {
    return '';
  }

  return `${prefix}{#${entry.id}}`;
}

export function join(
  value: string | string[],
  delimiter: string,
  prefix: MarkdownRenderPrefix = ''
) {
  return typeof value === 'string'
    ? renderPrefix(prefix, 0) + value
    : value.map((x, index) => renderPrefix(prefix, index) + x).join(delimiter);
}

function renderPrefix(
  prefix: MarkdownRenderPrefix,
  index: number,
  entry?: DataDrivenMarkdownEntry
) {
  if (typeof prefix === 'string') {
    return prefix;
  }

  return prefix(index);
}
function getFootnotes(data: unknown): FootnoteEntry[] {
  if (Array.isArray(data)) {
    return data.reduce((prev, curr) => [...prev, ...getFootnotes(curr)], []);
  }

  if (typeof data === 'object' && 'footnote' in data) {
    return [data as FootnoteEntry];
  }

  if (typeof data === 'object') {
    return Object.keys(data).reduce(
      (prev, key) => [...prev, ...getFootnotes(data[key])],
      []
    );
  }

  return [];
}
