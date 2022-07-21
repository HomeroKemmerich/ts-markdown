import { getMarkdownString } from '../rendering';
import { RenderOptions } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

export type TaskListEntry = {
  tasks: (InlineTypes | TaskEntry)[];
  append?: string;
} & MarkdownEntry;

export type TaskEntry = {
  task: InlineTypes;
  completed?: boolean;
};

export const tasksRenderer = (entry: TaskListEntry, options: RenderOptions) => {
  if ('tasks' in entry) {
    return entry.tasks
      .map((taskEntry) => {
        let completed = false;
        let taskText = '';

        if (typeof taskEntry === 'string') {
          taskText = taskEntry;
        } else if ('task' in taskEntry) {
          completed = taskEntry.completed === true;
          let result = getMarkdownString(taskEntry.task, options);
          if (typeof result === 'string') {
            taskText = result;
          } else {
            throw new Error(
              'Unexpected rendering scenario encountered. A task list item cannot have multi-line content.'
            );
          }
        } else {
          let result = getMarkdownString(taskEntry, options);
          if (typeof result === 'string') {
            taskText = result;
          } else {
            throw new Error(
              'Unexpected rendering scenario encountered. A task list item cannot have multi-line content.'
            );
          }
        }

        return `- [${completed ? 'x' : ' '}] ${taskText}`;
      })
      .join('\n');
  }

  throw new Error('Entry is not a tasks entry. Unable to render.');
};
