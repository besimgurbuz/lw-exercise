import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { HOUR_VALUES } from '../models/hour';
import { colors, unit } from '../styles';
import TodayLine from './today-line';

interface IDayColumnProps {
  day: string;
  date: number;
  isToday?: boolean;
  startHour?: number;
  endHour?: number;
  head?: boolean;
  tail?: boolean;
}

const DayColumn = ({
  day,
  date,
  isToday,
  startHour,
  endHour,
  head,
  tail,
}: IDayColumnProps) => {
  let [borderRadius, setBorderRadius] = useState<number[]>([]);
  let [currentHour, setCurrentHour] = useState(
    new Date().getHours() + new Date().getMinutes() / 60
  );
  let hoursChangedInterval: number;
  const hours = HOUR_VALUES;

  useEffect(() => {
    if (!borderRadius.length) {
      if (head) {
        setBorderRadius([5, 0, 0, 5]);
      } else if (tail) {
        setBorderRadius([0, 5, 5, 0]);
      }
    }
    if (!hoursChangedInterval) {
      hoursChangedInterval = setInterval(() => {
        const now = new Date();
        setCurrentHour(now.getHours() + now.getMinutes() / 60);
        console.log(currentHour);
      }, 1000 * 60 * 5);
    }
  });

  return (
    <DayColumnContainer>
      <DayColumnHeader active={isToday}>
        <h5>{day}</h5>
        <h3>{date}</h3>
      </DayColumnHeader>
      <DayColumnBody
        borderRadius={borderRadius}
        head={head || false}
        tail={tail || false}
      >
        {startHour && endHour && (
          <OpenRange startHour={startHour} endHour={endHour} />
        )}
        {isToday && <TodayLine hour={currentHour} />}
        {hours.map((hour, index) => (
          <HoursLine key={index} top={hour * 20} />
        ))}
      </DayColumnBody>
    </DayColumnContainer>
  );
};

const DayColumnContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const DayColumnHeader = styled.div(({ active }: { active?: boolean }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: active ? `${unit}px` : '',
  border: active ? `2px dotted ${colors.accent}` : '',
  marginBottom: active ? `${unit - 4}px` : `${unit}px`,
}));

const DayColumnBody = styled.div(
  ({
    borderRadius,
    head,
    tail,
  }: {
    borderRadius: number[];
    head: boolean;
    tail: boolean;
  }) => ({
    width: '150px',
    height: '480px',
    background: colors.grey,
    position: 'relative',
    borderTopLeftRadius: `${borderRadius[0] || 0}px`,
    borderTopRightRadius: `${borderRadius[1] || 0}px`,
    borderBottomRightRadius: `${borderRadius[2] || 0}px`,
    borderBottomLeftRadius: `${borderRadius[3] || 0}px`,
    borderRight: head || !tail ? '1px solid #E5E5E5' : '',
  })
);

const HoursLine = styled.div(({ top }: { top: number }) => ({
  position: 'absolute',
  top: `${top}px`,
  width: '100%',
  height: '2px',
  backgroundColor: '#f1eded',
  '&:hover': {
    backgroundColor: colors.secondary,
  },
}));

const OpenRange = styled.div(
  ({ startHour, endHour }: { startHour: number; endHour: number }) => ({
    position: 'absolute',
    background: 'rgba(134, 166, 223, 0.5)',
    width: '100%',
    top: `${startHour * 20}px`,
    height: `${endHour * 20 - startHour * 20}px`,
    zIndex: 9,
  })
);

export default DayColumn;
