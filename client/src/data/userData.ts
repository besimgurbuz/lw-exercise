import { WeeklyOpening } from '../models/opening';
import { Restaurant } from '../models/restaurant';

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
  {
    id: '5',
    name: 'VeroGusto',
    address:
      '12 Norfolk Row, Sheffield City Centre, Sheffield S1 2PA, United Kingdom',
    rating: '4.7',
    thumbnailUrl: '/gusto_thumb.jpg',
  },
];

export const OPENINGS: Record<
  string,
  {
    restaurant: Restaurant;
    plan: WeeklyOpening;
  }
> = {
  '1': {
    restaurant: RESTAURANT_LIST[0],
    plan: {
      mon: {
        start: 39600,
        end: 82800,
      },
      tue: {
        start: 39600,
        end: 82800,
      },
      wed: {
        start: 39600,
        end: 82800,
      },
      thu: {
        start: 39600,
        end: 82800,
      },
      fri: {
        start: 39600,
        end: 82800,
      },
      sat: {
        start: 39600,
        end: 82800,
      },
      sun: {
        start: 39600,
        end: 82800,
      },
    },
  },
  '2': {
    restaurant: RESTAURANT_LIST[1],
    plan: {
      mon: {
        start: 43200,
        end: 76680,
      },
      tue: {
        start: 43200,
        end: 76680,
      },
      wed: {
        start: 43200,
        end: 76680,
      },
      thu: {
        start: 43200,
        end: 76680,
      },
      fri: {
        start: 43200,
        end: 79200,
      },
      sat: {
        start: 43200,
        end: 79200,
      },
    },
  },
  '3': {
    restaurant: RESTAURANT_LIST[2],
    plan: {
      mon: {
        start: 43200,
        end: 75600,
      },
      tue: {
        start: 43200,
        end: 75600,
      },
      wed: {
        start: 43200,
        end: 75600,
      },
      thu: {
        start: 43200,
        end: 75600,
      },
      fri: {
        start: 54000,
        end: 79200,
      },
      sat: {
        start: 36000,
        end: 79200,
      },
      sun: {
        start: 36000,
        end: 72000,
      },
    },
  },
  '4': {
    restaurant: RESTAURANT_LIST[3],
    plan: {
      mon: {
        start: 43200,
        end: 82800,
      },
      tue: {
        start: 43200,
        end: 82800,
      },
      wed: {
        start: 43200,
        end: 82800,
      },
      thu: {
        start: 43200,
        end: 82800,
      },
      fri: {
        start: 43200,
        end: 82800,
      },
      sat: {
        start: 43200,
        end: 82800,
      },
      sun: {
        start: 43200,
        end: 82800,
      },
    },
  },
  '5': {
    restaurant: RESTAURANT_LIST[4],
    plan: {
      mon: {
        start: 3600,
        end: 82800,
      },
      tue: {
        start: 3600,
        end: 82800,
      },
      wed: {
        start: 43200,
        end: 82800,
      },
      thu: {
        start: 3600,
        end: 82800,
      },
      fri: {
        start: 3600,
        end: 82800,
      },
      sat: {
        start: 3600,
        end: 82800,
      },
      sun: {
        start: 3600,
        end: 82800,
      },
    },
  },
};
