import type { BoardType } from './board';

export interface IInvite {
  id: number;
  userId: number;
  boardId: number;
  status: InviteStatus;
  createdAt: Date;
  updatedAt: Date;
  board: BoardType;
}

export enum InviteStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}
