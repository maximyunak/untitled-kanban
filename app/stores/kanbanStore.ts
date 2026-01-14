import type {IColumn, ITask} from "~/types/kanban";

export const useKanbanStore = defineStore('kanbanStore', () => {
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
                "id": "3",
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

    // создание

    const addTask = (task: Partial<ITask>, columnId: string) => {
        if (!task) return
        const column = data.value.columns.find((x) => x.id === columnId);
        // поменять на то что из запроса
        column?.tasks.push(task)
    };
    const addColumn = (column: Partial<IColumn>) => {
        data.value.columns.push({
            ...column,
            tasks: []
        })
        console.log(column)
    }

    return {
        data,
        addTask,
        addColumn,
    };
})