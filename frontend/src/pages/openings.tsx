import React from 'react';
import { useParams } from 'react-router-dom';

interface IOpeningsProps {}

const Openings = ({}: IOpeningsProps) => {
  const { restaurantId } = useParams();
  return <h1>Openings Works! {restaurantId}</h1>;
};

export default Openings;
