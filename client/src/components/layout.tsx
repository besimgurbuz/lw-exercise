import styled from '@emotion/styled';
import React from 'react';
import { unit, widths } from '../styles';

interface ILayoutProps {
  fullWidth?: boolean;
  children?: any;
  grid?: boolean;
}

const Layout = ({ fullWidth, children, grid }: ILayoutProps) => {
  return (
    <>
      <PageContainer fullWidth={fullWidth} grid={grid}>
        {children}
      </PageContainer>
      <Signature>created with love by Besim Gurbuz</Signature>
    </>
  );
};

const PageContainer = styled.div(
  (props: Pick<ILayoutProps, 'fullWidth' | 'grid'>) => ({
    display: 'flex',
    justifyContent: props.grid ? 'center' : 'top',
    flexDirection: props.grid ? 'row' : 'column',
    flexWrap: 'wrap',
    alignSelf: 'center',
    flexGrow: 1,
    maxWidth: props.fullWidth ? '' : `${widths.regulerPageWidth}px`,
    width: '100%',
    padding: props.fullWidth ? 0 : unit * 2,
    paddingBottom: unit * 5,
    paddingTop: unit * 15,
  })
);

const Signature = styled.p({
  alignSelf: 'center',
  paddingBottom: '2px',
});

export default Layout;
