import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from '../components/calendar';
import Layout from '../components/layout';
import { OPENINGS } from '../data/userData';
import { WEEK_DAYS } from '../models/week-day';
import { unit } from '../styles';

interface IOpeningsProps {}

const Openings = ({}: IOpeningsProps) => {
  const { restaurantId } = useParams();
  const { restaurant, plan } = OPENINGS[restaurantId as string];
  const [openStatus, setOpenStatus] = useState(false);

  useEffect(() => {
    const today = new Date();
    const dayIndexOfToday = today.getDay();
    const currentSecond =
      today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();
    const planForToday = plan[WEEK_DAYS[dayIndexOfToday]];

    if (planForToday?.start && planForToday.end) {
      setOpenStatus(
        planForToday?.start < currentSecond && planForToday?.end > currentSecond
      );
    }
  }, [restaurantId]);

  return (
    <Layout grid fullWidth>
      <OpeningsContainer>
        <OpeningsHeader>
          <h3>openings of {restaurant.name}</h3>
          <OpenStatus isOpen={openStatus}>
            {openStatus ? 'open' : 'closed'}
          </OpenStatus>
        </OpeningsHeader>
        <Calendar plan={plan} />
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

const OpenStatus = styled.p(({ isOpen }: { isOpen: boolean }) => ({
  color: isOpen ? '#17b978' : '#ff5959',
}));

export default Openings;
