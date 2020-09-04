import React from 'react';
import './ExploreContainer.css';
import Map from './Map';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <Map></Map>
  );
};

export default ExploreContainer;
