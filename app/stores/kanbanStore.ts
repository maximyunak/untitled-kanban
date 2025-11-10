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
            order: 0
        },
        {
            id: 'fds',
            name: 'in Proccess',
            order: 1
        }, {
            id: 'asfwq',
            name: 'Completed ывавыаыавыавыавыы ываыв авы авыыва   ',
            order: 2
        },
    ])

    const sortedTasks = (column_id: string): ITask[] => {
        return tasks.value.filter((el: ITask) => el.status_id === column_id).sort((a, b) => a.position_id - b.position_id)
    }

    const moveTask = (taskId: string, movedTaskId:string) => {
        const toTask = tasks.value.find((task: ITask) => task.id === taskId);
        const movedTask = tasks.value.find((task: ITask) => task.id === movedTaskId);

        if (!toTask || !movedTask) {
            return
        }

        const position_id = movedTask.position_id;
        const status_id = movedTask.status_id;

        movedTask.position_id = toTask.position_id;
        movedTask.status_id = toTask.status_id;

        toTask.position_id = position_id;
        toTask.status_id = status_id;

    }

    const moveTaskToColumn = (taskId: string, toStatusId: string): void => {

        const lastPosition = tasks.value.filter((task) => task.status_id === toStatusId)
            .reduce((max, current) => Math.max(max, current.position_id), 1);

        const task = tasks.value.find((task: ITask) => task.id === taskId);

        if (!task) {
            return
        }

        task.status_id = toStatusId
        task.position_id = lastPosition
    }

    const addTask = (task: ITask) => {
        tasks.value.push(task);
    }

    const addColumn = (column: IColumn) => {
        columns.value.push(column);
    }

    return {tasks, columns, sortedTasks, addTask, addColumn, moveTask, moveTaskToColumn};
})