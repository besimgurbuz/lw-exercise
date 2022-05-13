import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import HeartIcon from '../icons/heart';
import { breakpoints, colors, mq, unit } from '../styles';
import Thumbnail from './thumbnail';

interface IRestaurantItemProps {
  id: string;
  name: string;
  address: string;
  rating: string;
  thumbnailUrl: string;
}

const RestaurantItem = ({
  id,
  name,
  address,
  rating,
  thumbnailUrl,
}: IRestaurantItemProps) => {
  return (
    <OpeningLink to={`/openings/${id}`}>
      <ItemContainer>
        <ItemTextsContainer>
          <h4>{name}</h4>
          <p>{address}</p>
          <RatingContainer>
            <HeartIcon color={colors.accent} />
            {rating}
          </RatingContainer>
        </ItemTextsContainer>
        <ThumbnailContainer>
          <Thumbnail width={90} height={90} url={thumbnailUrl} />
        </ThumbnailContainer>
      </ItemContainer>
    </OpeningLink>
  );
};

const ItemContainer = styled.div(() => ({
  display: 'flex',
  height: '120px',
  backgroundColor: colors.grey,
  width: '1140px',
  padding: `${unit * 2}px`,
  borderRadius: '5px',
  cursor: 'pointer',
  '&:active': {
    outline: `2px dotted ${colors.secondary}`,
  },
  ...mq.reduce((allQueries, mediaQuery, i) => {
    allQueries[mediaQuery] = {
      width: `${breakpoints[i] - 60}px`,
    };

    return allQueries;
  }, {} as Record<string, Record<string, string>>),
}));

const OpeningLink = styled(Link)({
  textDecoration: 'none',
  color: colors.accent,
});

const ItemTextsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: `${unit}px`,
});

const RatingContainer = styled.div({
  display: 'flex',
  marginTop: 'auto',
  color: colors.accent,
  alignItems: 'center',
});

const ThumbnailContainer = styled.div({
  marginLeft: 'auto',
});

export default RestaurantItem;
