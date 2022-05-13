import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { HOUR_VALUES } from '../models/hour';
import { colors, unit } from '../styles';

interface IDayColumnProps {
  day: string;
  date: number;
  isToday?: boolean;
  head?: boolean;
  tail?: boolean;
}

const DayColumn = ({ day, date, isToday, head, tail }: IDayColumnProps) => {
  let [borderRadius, setBorderRadius] = useState<number[]>([]);
  const hours = HOUR_VALUES;

  useEffect(() => {
    if (!borderRadius.length) {
      if (head) {
        setBorderRadius([5, 0, 0, 5]);
      } else if (tail) {
        setBorderRadius([0, 5, 5, 0]);
      }
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
        {hours.map((hour) => (
          <HoursLine top={hour * 20} />
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

export default DayColumn;
