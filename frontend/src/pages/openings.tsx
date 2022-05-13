import styled from '@emotion/styled';
import React from 'react';
import { useParams } from 'react-router-dom';
import Calendar from '../components/calendar';
import Layout from '../components/layout';
import { OPENINGS } from '../data/userData';
import { unit } from '../styles';

interface IOpeningsProps {}

const Openings = ({}: IOpeningsProps) => {
  const { restaurantId } = useParams();
  const { restaurant, plan } = OPENINGS[restaurantId as string];
  return (
    <Layout grid fullWidth>
      <OpeningsContainer>
        <OpeningsHeader>
          <h3>openings of {restaurant.name}</h3>
        </OpeningsHeader>
        <Calendar />
      </OpeningsContainer>
    </Layout>
  );
};

const OpeningsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: `${unit * 10}px`,
});

const OpeningsHeader = styled.div({
  width: '80%',
});

export default Openings;
