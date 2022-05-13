import { RouteComponentProps } from '@reach/router';
import React from 'react';

interface IOpeningsProps extends RouteComponentProps {
  restaurantId?: string;
}

const Openings = ({ restaurantId }: IOpeningsProps) => {
  return <h1>Openings Works! {restaurantId}</h1>;
};

export default Openings;
