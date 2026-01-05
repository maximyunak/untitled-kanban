import type {IColumn, ITask} from "~/types/kanban";

export const useKanbanStore = defineStore('kanbanStore', () => {
    const tasks: Ref<ITask[]> = ref([
        {
            id: "1",
            name: "Подготовить презентацию",
            description: "Сделать слайды для встречи с клиентом",
            is_completed: false,
            deadline: "2025-11-10T12:00:00Z",
            status_id: 'asd',
            position_id: 1,
            user_id: 101
        },
        {
            id: "2",
            name: "Обновить документацию",
            description: "Добавить новый раздел про API",
            is_completed: true,
            deadline: "2025-11-05T18:00:00Z",
            status_id: 'asd',
            position_id: 2,
            user_id: 102
        },
        {
            id: "3",
            name: "Тестирование новой функции",
            description: "Проверить работу формы регистрации",
            is_completed: false,
            deadline: "2025-11-12T15:00:00Z",
            status_id: 'fds',
            position_id: 2,
            user_id: 103
        },
        {
            id: "4",
            name: "Сверстать лендинг",
            description: "Верстка главной страницы сайта",
            is_completed: false,
            deadline: "2025-11-15T20:00:00Z",
            status_id: 'fds',
            position_id: 1
        },
        {
            id: "5",
            name: "Провести митинг с командой ыва ыв ыва ыв аыввывааыв ыва вывыавыаавывыаыва выы ыава",
            description: "Обсудить прогресс и блокеры",
            is_completed: false,
            deadline: "2025-11-08T10:00:00Z",
            status_id: 'asfwq',
            position_id: 2,
            user_id: 104
        }
    ])
    const columns: Ref<IColumn[]> = ref([
        {
            id: 'asd',
            name: 'ToDo',
            position_id: 0
        },
        {
            id: 'fds',
            name: 'in Proccess',
            position_id: 1
        }, {
            id: 'asfwq',
            name: 'Completed ывавыаыавыавыавыы ываыв авы авыыва   ',
            position_id: 2
        },
    ])

    const data = ref({
        "id": 22,
        "name": "new board",
        "description": null,
        "user_id": 1,
        "created_at": "2025-11-29T12:49:26.000000Z",
        "updated_at": "2025-11-29T12:49:26.000000Z",
        "users": [
            {
                "id": 1,
                "email": "ivan.petrov@example.com",
                "first_name": "Ivan",
                "last_name": "Petrov",
                "patronymic": "Ivanovich",
                "created_at": "2025-11-15T12:55:58.000000Z",
                "updated_at": "2026-01-05T18:24:00.000000Z",
                "pivot": {
                    "board_id": 22,
                    "user_id": 1
                }
            }
        ],
        "columns": [
            {
                "id": 3,
                "name": "col 1",
                "position": 2,
                "board_id": 22,
                "created_at": "2025-11-29T12:50:42.000000Z",
                "updated_at": "2025-11-29T20:38:52.000000Z",
                "tasks": [
                    {
                        "id": 2,
                        "name": "make 1",
                        "description": "asdsadsada",
                        "is_completed": 1,
                        "position": 1,
                        "deadline": null,
                        "creator_id": 1,
                        "assignee_id": null,
                        "column_id": 3,
                        "created_at": "2025-11-29T13:16:55.000000Z",
                        "updated_at": "2025-11-30T18:09:53.000000Z"
                    },
                    {
                        "id": 3,
                        "name": "make 2",
                        "description": null,
                        "is_completed": 0,
                        "position": 2,
                        "deadline": null,
                        "creator_id": 1,
                        "assignee_id": null,
                        "column_id": 3,
                        "created_at": "2025-11-29T13:17:22.000000Z",
                        "updated_at": "2025-11-29T20:10:16.000000Z"
                    },
                    {
                        "id": 4,
                        "name": "make 3",
                        "description": null,
                        "is_completed": 0,
                        "position": 1,
                        "deadline": null,
                        "creator_id": 1,
                        "assignee_id": null,
                        "column_id": 3,
                        "created_at": "2026-01-05T18:24:54.000000Z",
                        "updated_at": "2026-01-05T18:24:54.000000Z"
                    }
                ]
            },
            {
                "id": 4,
                "name": "col 2",
                "position": 1,
                "board_id": 22,
                "created_at": "2025-11-29T19:52:17.000000Z",
                "updated_at": "2025-11-29T20:38:52.000000Z",
                "tasks": [
                    {
                        "id": 1,
                        "name": "make 4",
                        "description": null,
                        "is_completed": 0,
                        "position": 1,
                        "deadline": null,
                        "creator_id": 1,
                        "assignee_id": null,
                        "column_id": 4,
                        "created_at": "2025-11-29T13:14:16.000000Z",
                        "updated_at": "2025-11-29T20:10:16.000000Z"
                    },
                    {
                        "id": 2,
                        "name": "make 5",
                        "description": null,
                        "is_completed": 0,
                        "position": 1,
                        "deadline": null,
                        "creator_id": 1,
                        "assignee_id": null,
                        "column_id": 4,
                        "created_at": "2025-11-29T13:14:16.000000Z",
                        "updated_at": "2025-11-29T20:10:16.000000Z"
                    }
                ]
            }
        ]
    })

    // utils

    /**
     * Пересчитывает позиции задач внутри колонки.
     *
     * Присваивает каждой задаче `position_id`, равный её индексу в переданном списке.
     * Используется после перемещения задач, чтобы обновить их порядок.
     *
     * @param list  - Массив задач в одной колонке.
     */
    const reindexTasks = (list: ITask[]): void => {
        list.forEach((task: ITask, index: number) => {
            task.position_id = index;
        })
    }

    /**
     * Обновляет список задач в указанной колонке.
     *
     * Заменяет все задачи с данным `statusId` на новый список `list`.
     * Используется после перемещения или сортировки задач внутри колонки.
     *
     * @param statusId - колонка в которой будет обновляться.
     * @param list - новые данные для колонки.
     */
    const updateColumnTasks = (statusId: string, list: ITask[]) => {
        tasks.value = [
            ...tasks.value.filter((task: ITask) => task.status_id !== statusId),
            ...list,
        ]
    }

    // getters

    /**
     * Возвращает все задачи в указанной колонке.
     *
     * @param column_id - `status_id` в колонке.
     */
    const sortedTasks = (column_id: string): ITask[] => {
        return tasks.value.filter((el: ITask) => el.status_id === column_id).sort((a, b) => a.position_id - b.position_id)
    }

    /**
     * Возвращает отсортированный массив со всеми колонками.
     */
    const sortedColumns = computed(() => {
        return columns.value.sort((a, b) => a.position_id - b.position_id);
    });

    // main functions


    /**
     * Двигает задачи в колонке.
     *
     * Обновляет порядок задач и их `position_id` после перемещения.
     * Если задача переносится в другую колонку - обновляет ей `status_id`.
     *
     * @param taskId - таска на которую перетаскиваю.
     * @param movedTaskId - таска которую перетаскиваю.
     */
    const moveTask = (taskId: string, movedTaskId: string) => {
        const hoveredTask = tasks.value.find((task: ITask) => task.id === taskId);
        const draggedTask = tasks.value.find((task: ITask) => task.id === movedTaskId);

        if (!draggedTask || !hoveredTask || hoveredTask.id === draggedTask.id) return

        const columnTasks = sortedTasks(hoveredTask.status_id);
        const hoveredIndex = columnTasks.indexOf(hoveredTask);

        if (draggedTask.status_id === hoveredTask.status_id) {
            columnTasks.splice(columnTasks.indexOf(draggedTask), 1);
        } else {
            tasks.value.splice(tasks.value.indexOf(draggedTask), 1);
            draggedTask.status_id = hoveredTask.status_id;
        }

        columnTasks.splice(hoveredIndex, 0, draggedTask);
        reindexTasks(columnTasks);
        updateColumnTasks(hoveredTask.status_id, columnTasks);
    };

    /**
     * Перемещает задачу в указанную колонку.
     *
     * Меняет `status_id` в указанной задаче и перемещает ее в начало списка.
     *
     * @param taskId - айди задачи, которую перемещают.
     * @param toStatusId - айди колонки в которую перетягивают.
     */
    const moveTaskToColumn = (taskId: string, toStatusId: string): void => {
        const task = tasks.value.find((task: ITask) => task.id === taskId);
        if (!task) return

        tasks.value.splice(tasks.value.indexOf(task), 1);

        task.status_id = toStatusId;
        const columnTasks = sortedTasks(toStatusId);
        columnTasks.splice(0, 0, task);

        reindexTasks(columnTasks);
        updateColumnTasks(toStatusId, columnTasks);
    }

    const moveColumn = (columnId: string, toId: string): void => {
        const toColumn = columns.value.find((column: IColumn) => column.id === columnId);
        const movedColumn = columns.value.find((column: IColumn) => column.id === toId);

        if (!toColumn || !movedColumn) {
            return
        }
        const toPosition = toColumn.position_id;
        toColumn.position_id = movedColumn.position_id;

        movedColumn.position_id = toPosition
    }

    // создание

    const addTask = (task: ITask) => tasks.value.push(task);
    const addColumn = (column: IColumn) => columns.value.push(column);


    return {
        data,
        tasks,
        columns,
        sortedColumns,
        sortedTasks,
        addTask,
        addColumn,
        moveTask,
        moveTaskToColumn,
        moveColumn
    };
})