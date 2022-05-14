import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

interface ILoadingSpinnerProps {
  size: number;
}

const LoadingSpinner = ({ size }: ILoadingSpinnerProps) => {
  return (
    <SpinnerContainer size={size}>
      <Spinner size={size} />
    </SpinnerContainer>
  );
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div(({ size }: { size: number }) => ({
  display: 'grid',
  justifyContent: 'center',
  alignItems: 'center',
  height: `${size}px`,
}));

const Spinner = styled.div(({ size }: { size: number }) => ({
  width: `${size}px`,
  height: `${size}px`,
  border: '10px solid #f3f3f3',
  borderTop: '10px solid #383636',
  borderRadius: '50%',
  animation: `${spin} 1.5s linear infinite`,
}));

export default LoadingSpinner;
