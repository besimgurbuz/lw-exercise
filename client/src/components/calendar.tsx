import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { DailyOpening, WeeklyOpening } from '../data/userData';
import { HOUR_TEXTS } from '../models/hour';
import { DailyOpeningDetail, WEEK_DAYS } from '../models/week-day';
import { unit } from '../styles';
import DayColumn from './day-column';

interface ICalendarProps {
  plan: WeeklyOpening;
}

const Calendar = ({ plan }: ICalendarProps) => {
  let [weekDaysWithDate, setWeekDaysWithDate] = useState<DailyOpeningDetail[]>(
    []
  );
  const hoursText = HOUR_TEXTS;

  useEffect(() => {
    const today = new Date();
    const dayIndexOfToday = today.getDay();
    const dateOfToday = today.getDate();

    if (!weekDaysWithDate.length) {
      setWeekDaysWithDate(
        WEEK_DAYS.map<DailyOpeningDetail>((day, index) => ({
          date: dateOfToday - (dayIndexOfToday - index),
          day,
          isToday: dayIndexOfToday === index,
          startHour: plan[day]?.start
            ? (plan[day] as DailyOpening).start / 3600
            : undefined,
          endHour: plan[day]?.end
            ? (plan[day] as DailyOpening).end / 3600
            : undefined,
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
      {weekDaysWithDate.map(
        ({ date, day, isToday, startHour, endHour }, index) => (
          <DayColumn
            key={index}
            day={day}
            date={date}
            isToday={isToday}
            startHour={startHour}
            endHour={endHour}
            head={index === 0}
            tail={index === weekDaysWithDate.length - 1}
          />
        )
      )}
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
