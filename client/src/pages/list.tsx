import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import ErrorBox from '../components/error-box';
import Layout from '../components/layout';
import LoadingSpinner from '../components/loading-spinner';
import RestaurantItem from '../components/restaurant-item';
import { Restaurant } from '../models/restaurant';
import { unit } from '../styles';

interface IListProps {}

const List = (_: IListProps) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [restaurantsLoading, setRestaurantsLoading] = useState(false);
  const [restaurantsError, setRestaurantsError] = useState('');

  const fetchRestaurants = async () => {
    try {
      setRestaurantsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/restaurants`
      );
      const restaurants = (await response.json()) as Restaurant[];

      setRestaurants(restaurants);
      setRestaurantsLoading(false);
    } catch (err) {
      setRestaurantsError((err as Error).message);
      setRestaurantsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <Layout grid fullWidth>
      <ListContainer>
        <h1>restaurants</h1>
        {restaurantsLoading && <LoadingSpinner size={100} />}
        {!!restaurantsError && (
          <ErrorContainer>
            <ErrorBox>{restaurantsError}</ErrorBox>
          </ErrorContainer>
        )}
        <ItemsContainer>
          {restaurants.map((restaurant) => (
            <RestaurantItem {...restaurant} key={restaurant.id} />
          ))}
        </ItemsContainer>
      </ListContainer>
    </Layout>
  );
};

const ListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: `${unit * 5}px`,
});

const ItemsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: `${unit * 3}px`,
});

const ErrorContainer = styled.div({
  alignSelf: 'center',
});

export default List;
