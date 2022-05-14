import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from '../components/calendar';
import ErrorBox from '../components/error-box';
import Layout from '../components/layout';
import LoadingSpinner from '../components/loading-spinner';
import { OpeningDetail } from '../models/opening';
import { WEEK_DAYS } from '../models/week-day';
import { unit } from '../styles';

interface IOpeningsProps {}

const Openings = ({}: IOpeningsProps) => {
  const { restaurantId } = useParams();
  const [openingDetail, setOpeningDetail] = useState<OpeningDetail>(
    {} as OpeningDetail
  );
  const [openingsLoading, setOpeningsLoading] = useState(false);
  const [openingsError, setOpeningsError] = useState('');
  const [openStatus, setOpenStatus] = useState(false);

  const fetchOpenings = async () => {
    try {
      setOpeningsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/openings/${restaurantId}`
      );

      if (response.ok) {
        const openingDetails = (await response?.json()) as OpeningDetail;
        setOpeningDetail(openingDetails);
        setOpeningsLoading(false);
      } else {
        const error = (await response.json()) as { message: string };
        setOpeningsError(error.message);
        setOpeningsLoading(false);
      }
    } catch (err) {
      setOpeningsError((err as Error).message);
      setOpeningsLoading(false);
    }
  };

  useEffect(() => {
    fetchOpenings();
  }, [restaurantId]);

  useEffect(() => {
    const today = new Date();
    const dayIndexOfToday = today.getDay();
    const currentSecond =
      today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();
    const planForToday = openingDetail?.openings?.[WEEK_DAYS[dayIndexOfToday]];

    if (planForToday?.start && planForToday.end) {
      setOpenStatus(
        planForToday?.start < currentSecond && planForToday?.end > currentSecond
      );
    }
  }, [openingDetail]);

  return (
    <Layout grid fullWidth>
      <OpeningsContainer>
        {openingsLoading && <LoadingSpinner size={100} />}
        {!!openingsError && (
          <ErrorContainer>
            <ErrorBox width={350}>{openingsError}</ErrorBox>
          </ErrorContainer>
        )}
        {openingDetail?.openings && (
          <>
            <OpeningsHeader>
              <h3>openings of {openingDetail?.restaurant?.name}</h3>
              <OpenStatus isOpen={openStatus}>
                {openStatus ? 'open' : 'closed'}
              </OpenStatus>
            </OpeningsHeader>
            <Calendar plan={openingDetail.openings} />{' '}
          </>
        )}
      </OpeningsContainer>
    </Layout>
  );
};

const OpeningsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: `${unit * 10}px`,
});

const ErrorContainer = styled.div({
  alignSelf: 'center',
});

const OpeningsHeader = styled.div({
  width: '80%',
});

const OpenStatus = styled.p(({ isOpen }: { isOpen: boolean }) => ({
  color: isOpen ? '#17b978' : '#ff5959',
}));

export default Openings;
