import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { colors, unit } from '../styles';

interface ITodayLineProps {
  hour: number;
}

const TodayLine = ({ hour }: ITodayLineProps) => {
  const [isHoursShown, setIsHoursShown] = useState(false);
  let [formattedHour, setFormattedHour] = useState('');

  useEffect(() => {
    setFormattedHour(
      Intl.DateTimeFormat('GB', { timeStyle: 'medium' }).format(new Date())
    );
  }, [isHoursShown]);

  return (
    <>
      {isHoursShown && (
        <TodayHourHoverBox hour={hour}>
          <p>{formattedHour}</p>
        </TodayHourHoverBox>
      )}
      <TodayLineContainer
        hour={hour}
        onMouseEnter={() => setIsHoursShown(true)}
        onMouseLeave={() => setIsHoursShown(false)}
      >
        <Circle />
        <Line />
      </TodayLineContainer>
    </>
  );
};

const TodayLineContainer = styled.div(({ hour }: { hour: number }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  top: `${hour * 20 - 3}px`,
  left: '-3px',
  width: 'calc(100% + 3px)',
  zIndex: 10,
}));

const TodayHourHoverBox = styled.div(({ hour }: { hour: number }) => ({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  top: `${hour * 20 - 12}px`,
  left: 0,
  right: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  width: `${unit * 8}px`,
  height: '12px',
  borderRadius: '2px',
  backgroundColor: colors.primary,
  color: colors.textSecondary,
  zIndex: 10,
  fontSize: '10px',
}));

const Line = styled.div({
  width: '100%',
  height: '2px',
  backgroundColor: colors.primary,
});

const Circle = styled.div({
  width: '6px',
  height: '6px',
  borderRadius: '3px',
  backgroundColor: colors.primary,
});

export default TodayLine;
