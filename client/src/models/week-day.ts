export type WeekDay = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export const WEEK_DAYS: WeekDay[] = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
];

export type DailyOpeningDetail = {
  day: WeekDay;
  date: number;
  isToday?: boolean;
  startHour?: number;
  endHour?: number;
};
