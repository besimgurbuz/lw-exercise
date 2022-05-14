import { Restaurant } from './restaurant';
import { WeekDay } from './week-day';

export type DailyOpening = { start: number; end: number };

export type WeeklyOpening = Partial<Record<WeekDay, DailyOpening>>;

export type OpeningDetail = {
  restaurant: Restaurant;
  openings: WeeklyOpening;
};
