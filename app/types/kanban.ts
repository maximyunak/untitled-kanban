export interface ITask {
    id: string;
    name: string;
    description?: string;
    isCompleted: boolean;
    deadline?: string;
    columnId: string;
    position: number;
    creatorId: string,
    assigneeId: string,
    createdAt: string,
    updatedAt: string
}

export interface IColumn {
    id: number;
    name: string;
    position: number;
    tasks?: ITask[];
    createdAt: string,
    updatedAt: string
}


export type BoardDataType = {
    id: number,
    name: string,
    description: string,
    columns: IColumn[],

}
