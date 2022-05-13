import styled from '@emotion/styled';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import Layout from '../components/layout';
import RestaurantItem from '../components/restaurant-item';
import { RESTAURANT_LIST } from '../data/userData';
import { unit } from '../styles';

interface IListProps extends RouteComponentProps {}

const List = (_: IListProps) => {
  const restaurants = RESTAURANT_LIST;

  return (
    <Layout>
      <ListContainer>
        <h1>restaurants</h1>
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

export default List;
