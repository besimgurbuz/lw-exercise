import { WeekDay } from './week-day';

export type DailyOpening = { start: number; end: number };

export type WeeklyOpening = Partial<Record<WeekDay, DailyOpening>>;
