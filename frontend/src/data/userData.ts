export interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: string;
  thumbnailUrl: string;
}

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
