export interface ITask {
    id: string;
    name: string;
    description?: string;
    // выполнена чинет
    is_completed: boolean;
    // крайний срок
    deadline?: string;
    // в какой колонке
    status_id: string;
    // позиция в колонке
    position_id: number;
    // на ком задача висит
    user_id?: number;
}

export interface IColumn {
    id: string;
    name: string;
    description?: string;
    // позиция в строке
    position_id: number;
}