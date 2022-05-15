import { WeekDay } from './week-day';

export type DailyOpening = { start: number; end: number };

export type WeeklyOpening = Partial<Record<WeekDay, DailyOpening>>;

export type OpeningDetail = {
  restaurant_id: number;
  restaurant_name: string;
  openings: WeeklyOpening;
};
