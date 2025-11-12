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

    const sortedTasks = (column_id: string): ITask[] => {
        return tasks.value.filter((el: ITask) => el.status_id === column_id)
        // return tasks.value.filter((el: ITask) => el.status_id === column_id).sort((a, b) => a.position_id - b.position_id)
    }


    const sortedColumns = computed(() => {
        return columns.value.sort((a, b) => a.position_id - b.position_id);
    });

    const moveTask = (taskId: string, movedTaskId: string) => {
        const hoveredTask = tasks.value.find((task: ITask) => task.id === taskId);
        const draggedTask = tasks.value.find((task: ITask) => task.id === movedTaskId);


        if (!draggedTask || !hoveredTask) {
            console.log('нет тасок');
            return
        }

        if (hoveredTask.id === draggedTask.id) {
            console.log('индексы одинаковы');
            return
        }

        if (draggedTask.status_id === hoveredTask.status_id) {
            const columnTasks = tasks.value.filter((task: ITask) => task.status_id === hoveredTask.status_id);
            const draggedIndex = columnTasks.indexOf(draggedTask);
            const hoveredIndex = columnTasks.indexOf(hoveredTask);

            columnTasks.splice(draggedIndex, 1);

            columnTasks.splice(hoveredIndex, 0, draggedTask);

            tasks.value = [
                ...tasks.value.filter((task: ITask) => task.status_id !== hoveredTask.status_id),
                ...columnTasks
            ];
        }
    };

    const moveTaskToColumn = (taskId: string, toStatusId: string): void => {
        const task = tasks.value.find((task: ITask) => task.id === taskId);

        if (!task) {
            console.log('таска не найдена')
            return
        }

        tasks.value.splice(tasks.value.indexOf(task), 1);

        if (!task) {
            return
        }

        task.status_id = toStatusId;
        const columnTasks = sortedTasks(toStatusId);
        columnTasks.splice(0, 0, task);
        tasks.value = [
            ...tasks.value.filter((task: ITask) => task.status_id !== toStatusId),
            ...columnTasks
        ]
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

    const addTask = (task: ITask) => {
        tasks.value.push(task);
    }

    const addColumn = (column: IColumn) => {
        columns.value.push(column);
    }

    return {tasks, columns, sortedTasks, sortedColumns, addTask, addColumn, moveTask, moveTaskToColumn, moveColumn};
})