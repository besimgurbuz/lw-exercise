import styled from '@emotion/styled';
import React from 'react';

interface IThumbnailProps {
  width: number;
  height: number;
  url: string;
}

const Thumbnail = ({ height, width, url }: IThumbnailProps) => {
  return <ThumbnailImg height={height} width={width} src={url} />;
};

const ThumbnailImg = styled.img(
  ({ height, width }: Pick<IThumbnailProps, 'height' | 'width'>) => ({
    borderRadius: '5px',
    height: `${height}px`,
    width: `${width}px`,
  })
);

export default Thumbnail;
