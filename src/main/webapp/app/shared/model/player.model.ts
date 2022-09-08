import dayjs from 'dayjs';
import { ITeam } from 'app/shared/model/team.model';

export interface IPlayer {
  id?: number;
  name?: string | null;
  birthDate?: string | null;
  height?: number | null;
  weight?: number | null;
  baskets?: number | null;
  assists?: number | null;
  team?: ITeam | null;
}

export const defaultValue: Readonly<IPlayer> = {};
