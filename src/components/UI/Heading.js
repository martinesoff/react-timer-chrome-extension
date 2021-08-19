import React from 'react';
import styled from 'styled-components';

import './Heading.css';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  margin: 0px;
  font-family: Staatliches;
`;

const Heading = props => {
  return <Title>{props.children}</Title>;
};

export default Heading;
