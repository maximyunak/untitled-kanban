import type { BoardType } from './board';
import type { ITaskWithBoardId } from './kanban';

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  patronymic: string;
}

export interface IFullUser extends IUser {
  boards: BoardType[];
  assigneeTasks: ITaskWithBoardId[];
}
