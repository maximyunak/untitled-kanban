export interface ITask {
    id: string;
    name: string;
    description?: string;
    is_completed: boolean;
    deadline?: string;
    status_id: string;
    position: number;
    creator_id: string,
    assignee_id: string,
    created_at: string,
    updated_at: string
}

export interface IColumn {
    id: string;
    name: string;
    description?: string;
    position: number;
    tasks?: ITask[];
}