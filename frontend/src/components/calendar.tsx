import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { HOUR_TEXTS } from '../models/hour';
import { WeekDayWithDate, WEEK_DAYS } from '../models/week-day';
import { unit } from '../styles';
import DayColumn from './day-column';

const Calendar = () => {
  let [weekDaysWithDate, setWeekDaysWithDate] = useState<WeekDayWithDate[]>([]);
  const hoursText = HOUR_TEXTS;

  useEffect(() => {
    const today = new Date();
    const dayIndexOfToday = today.getDay();
    const dateOfToday = today.getDate();

    if (!weekDaysWithDate.length) {
      setWeekDaysWithDate(
        WEEK_DAYS.map<WeekDayWithDate>((day, index) => ({
          date: dateOfToday - (dayIndexOfToday - index),
          day,
          isToday: dayIndexOfToday === index,
        }))
      );
    }
  });

  return (
    <CalendarContainer>
      <HoursContainer>
        {hoursText.map((hour, i) => (
          <HourLabel key={i} positionIndex={i + 1}>
            {hour}
          </HourLabel>
        ))}
      </HoursContainer>
      {weekDaysWithDate.map(({ date, day, isToday }, index) => (
        <DayColumn
          key={index}
          day={day}
          date={date}
          isToday={isToday}
          head={index === 0}
          tail={index === weekDaysWithDate.length - 1}
        />
      ))}
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div({
  display: 'flex',
  position: 'relative',
});

const HoursContainer = styled.div({
  width: `${unit * 5}px`,
  height: '480px',
  textAlign: 'right',
  alignSelf: 'flex-end',
  position: 'relative',
});

const HourLabel = styled.h4(({ positionIndex }: { positionIndex: number }) => ({
  fontSize: '10px',
  position: 'absolute',
  top: `${positionIndex * 20 - 5}px`,
  right: `${unit}px`,
}));

export default Calendar;
