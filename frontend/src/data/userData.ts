import { WeekDay } from '../models/week-day';

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: string;
  thumbnailUrl: string;
}

export type Opening = Partial<Record<WeekDay, { start: number; end: number }>>;

export const RESTAURANT_LIST: Restaurant[] = [
  {
    id: '1',
    name: 'Ego Mediterranean Restaurant & Bar, Sheffield',
    address:
      '88 Surrey St, Sheffield City Centre, Sheffield S1 2LH, United Kingdom',
    rating: '4.5',
    thumbnailUrl: '/ego_thumb.jpg',
  },
  {
    id: '2',
    name: 'Grazie',
    address:
      '1-3 Leopold St, Sheffield City Centre, Sheffield S1 2GY, United Kingdom',
    rating: '4.8',
    thumbnailUrl: '/grazie_thumb.jpg',
  },
  {
    id: '3',
    name: 'Domo Restaurant',
    address:
      'Eagle Works, 34-36 Cotton Mill Walk, Little Kelham St, Sheffield S3 8DH, United Kingdom',
    rating: '4.7',
    thumbnailUrl: '/domo_thumb.jpg',
  },
  {
    id: '4',
    name: 'Marmaris Turkish Restaurant',
    address: '276-278 London Rd, Highfield, Sheffield S2 4NA, United Kingdom',
    rating: '4.7',
    thumbnailUrl: '/marmaris_thumb.jpg',
  },
];

export const OPENINGS: Record<
  string,
  {
    restaurant: Restaurant;
    plan: Opening;
  }
> = {
  '1': {
    restaurant: RESTAURANT_LIST[0],
    plan: {
      mon: {
        start: 4000,
        end: 8000,
      },
      tue: {
        start: 4000,
        end: 8000,
      },
      wed: {
        start: 4000,
        end: 8000,
      },
      thu: {
        start: 4000,
        end: 8000,
      },
      fri: {
        start: 4000,
        end: 8000,
      },
      sat: {
        start: 4000,
        end: 8000,
      },
    },
  },
  '2': {
    restaurant: RESTAURANT_LIST[1],
    plan: {
      mon: {
        start: 4000,
        end: 8000,
      },
      tue: {
        start: 4000,
        end: 8000,
      },
      wed: {
        start: 4000,
        end: 8000,
      },
      thu: {
        start: 4000,
        end: 8000,
      },
      fri: {
        start: 4000,
        end: 8000,
      },
      sat: {
        start: 4000,
        end: 8000,
      },
    },
  },
  '3': {
    restaurant: RESTAURANT_LIST[2],
    plan: {
      mon: {
        start: 4000,
        end: 8000,
      },
      tue: {
        start: 4000,
        end: 8000,
      },
      wed: {
        start: 4000,
        end: 8000,
      },
      thu: {
        start: 4000,
        end: 8000,
      },
      fri: {
        start: 4000,
        end: 8000,
      },
      sat: {
        start: 4000,
        end: 8000,
      },
    },
  },
  '4': {
    restaurant: RESTAURANT_LIST[3],
    plan: {
      mon: {
        start: 4000,
        end: 8000,
      },
      tue: {
        start: 4000,
        end: 8000,
      },
      wed: {
        start: 4000,
        end: 8000,
      },
      thu: {
        start: 4000,
        end: 8000,
      },
      fri: {
        start: 4000,
        end: 8000,
      },
      sat: {
        start: 4000,
        end: 8000,
      },
    },
  },
};
