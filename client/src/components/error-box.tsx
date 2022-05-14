import styled from '@emotion/styled';
import React from 'react';
import { colors, unit } from '../styles';

interface IErrorBoxProps {
  width?: number;
  height?: number;
  children: string;
}

const ErrorBox = ({ width, height, children }: IErrorBoxProps) => {
  return (
    <ErrorBoxContainer width={width || 200} height={height || 50}>
      {children}
    </ErrorBoxContainer>
  );
};

const ErrorBoxContainer = styled.div(
  ({ width, height }: { width: number; height: number }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: `${height}px`,
    width: `${width}px`,
    borderRadius: `${unit}px`,
    backgroundColor: colors.warn,
    color: colors.text,
  })
);

export default ErrorBox;
