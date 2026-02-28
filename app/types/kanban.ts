import type { IUser } from './user';

export interface ITask {
  id: number;
  name: string;
  description?: string;
  isCompleted: boolean;
  deadline?: Date;
  columnId: number;
  position: number;
  creatorId: number;
  assigneeId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskWithBoardId extends ITask {
  boardId: number;
  boardName: string;
}

export interface IColumn {
  id: number;
  name: string;
  position: number;
  tasks: ITask[];
  createdAt: string;
  updatedAt: string;
}

export type BoardDataType = {
  id: number;
  name: string;
  description: string;
  columns: IColumn[];
  users: IUser[];
};
