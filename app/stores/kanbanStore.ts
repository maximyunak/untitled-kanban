import type { BoardDataType, IColumn, ITask } from '~/types/kanban';

export const useKanbanStore = defineStore('kanbanStore', () => {
  const data = ref<BoardDataType>();
  const { $api, $io } = useNuxtApp();
  const {handleError} = useErrorHandler()

  const board = computed<BoardDataType>(() => {
    if (!data.value) throw new Error('Value is null');
    return data.value;
  });

  // получение данных о доске
  const getData = async (id: number) => {
    const res = await $api<{
      board: BoardDataType;
    }>(`/boards/${id}`);

    data.value = res.board;
  };

  // socket io client
  const socketConnect = (boardId: number) => {
    return $io.emit(
      'join',
      {
        boardId: +boardId,
      },
      (res: { room: string; users: number }) => console.log(res),
    );
  };

  // /** columns **/

  // создание колонки
  const createColumn = async (name: string) => {
   try {
     const res = await $api<{
       column: IColumn;
     }>(`/boards/${board.value.id}/columns`, {
       body: { name },
       method: 'POST',
     });
   } catch (error) {
     handleError(error);
   }
  };

  // удаление колонки
  const deleteColumn = async (id: number) => {
   try {
     await $api<{ column: IColumn }>(`/boards/${board.value.id}/columns/${id}`, {
       method: 'DELETE',
     });
   } catch (error) {
     handleError(error)
   }
  };

  // редактирование колонки
  const updateColumn = async (body: Partial<IColumn>) => {
    try {
      const res = await $api<{ column: IColumn }>(`/boards/${board.value.id}/columns/${body.id}`, {
        method: 'PATCH',
        body,
      });
      const column = board.value.columns.find((column) => column.id === body.id);
      if (!column) return;
      column.name = res.column.name;
    } catch (error) {
      handleError(error)
    }
  };

  // move column
  const moveColumn = async (id: number, toPosition: number) => {
    try {
      const res = await $api(`/boards/${board.value.id}/columns/${id}/move`, {
        method: 'PATCH',
        body: {
          toPosition,
        },
      });
    } catch (error) {
      handleError(error)
    }
  };

  // ws move column
  $io?.on('column:move', (res: IColumn[]) => {
    board.value.columns = res;
  });
  // ws delete column
  $io?.on('column:delete', (res: IColumn) => {
    const index = board.value.columns.findIndex((column) => column.id === res.id);

    if (index !== -1) board.value.columns.splice(index, 1);
  });
  // ws create column
  $io?.on('column:create', (res: IColumn) => {
    board.value.columns.push(res);
  });
  // ws update column
  $io?.on('column:update', (res: IColumn) => {
    const col = board.value.columns.find((col) => col.id === res.id);
    if (!col) return;
    col.name = res.name;
  });

  // /** tasks **/

  // создание таски
  const createTask = async (columnId: number, data: any) => {
    try {
      const res = await $api<{
        task: ITask;
      }>(`/boards/${board.value.id}/columns/${columnId}/tasks`, {
        method: 'POST',
        body: data,
      });
    } catch (error) {
      handleError(error)
    }
  };
  // ws create column
  $io?.on('task:create', (res: ITask) => {
    const column = board.value.columns.find((col) => col.id === res.columnId);
    if (!column?.tasks) return;
    column.tasks.push(res);
  });

  // delete task
  const deleteTask = async (taskId: number) => {
    try {
      await $api<{ task: ITask }>(`/boards/${board.value.id}/tasks/${taskId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      handleError(error)
    }
  };
  // ws delete task
  $io?.on('task:delete', (res: ITask) => {
    const column = board.value.columns.find((col) => col.id === res.columnId);
    if (!column) return;
    column.tasks = column.tasks.filter((task) => task.id !== res.id);
  });

  // update task
  const updateTask = async (taskId: number, data: Partial<ITask>) => {
    try {
      const res = await $api<{ task: ITask }>(`/boards/${board.value.id}/tasks/${taskId}`, {
        method: 'PATCH',
        body: data,
      });
    } catch (error) {
      handleError(error)
    }
  };

  $io?.on('task:update', (res: ITask) => {
    const column = board.value.columns.find((col) => col.id === res.columnId);
    if (!column) return;
    const index = column.tasks?.findIndex((task) => task.id === res.id);
    if (index === -1) return;
    column.tasks.splice(index, 1, res);
  });

  //   move task

  const moveTask = async (taskId: number, columnId: number, toPosition: number) => {
    try {
      const res = await $api(`/boards/${board.value.id}/tasks/${taskId}/move`, {
        method: 'patch',
        body: {
          toPosition,
          columnId,
        },
      });
    } catch (error) {
      handleError(error)
    }
  };

  $io?.on('task:move', (res: { columnId: number; tasks: ITask[] }) => {
    const column = board.value.columns.find((col) => col.id === res.columnId);
    if (!column) return;
    console.log(res);

    column.tasks = res.tasks;
  });

  const moveTaskToColumn = async (taskId: number, columnId: number, toPosition: number) => {
    try {
      const res = await $api(`/boards/${board.value.id}/tasks/${taskId}/move-to-column`, {
        method: 'patch',
        body: {
          toPosition,
          columnId,
        },
      });
    } catch (error) {
      handleError(error)
    }
  };

  $io?.on(
    'task:move-to-column',
    (res: {
      sourceTasks: ITask[];
      targetTasks: ITask[];
      sourceColumnId: number;
      targetColumnId: number;
    }) => {
      // перемещение в исходной колонке
      const sourceColumn = board.value.columns.find((col) => col.id === res.sourceColumnId);
      if (!sourceColumn) return;
      sourceColumn.tasks = res.sourceTasks;

      // перемещение в новой колонке
      const targetColumn = board.value.columns.find((col) => col.id === res.targetColumnId);
      if (!targetColumn) return;
      targetColumn.tasks = res.targetTasks;
    },
  );

  return {
    board,
    getData,
    socketConnect,

    // cols
    createColumn,
    deleteColumn,
    updateColumn,
    moveColumn,

    // tasks
    createTask,
    deleteTask,
    updateTask,
    moveTask,
    moveTaskToColumn,
  };
});
