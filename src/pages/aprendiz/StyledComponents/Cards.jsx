import React from 'react';
import { string, func } from 'prop-types';
import expand from '../../../assets/expand.png';

import Span from './Span';
import Border from './Border';
import TituloCard from './TituloCard';
import ContainerCard from './ContainerCards';
import Img from './Img';

const cards = ({ color, description, onClick }) => (
  <Border>
    <Span style={{ background: `${color}` }} />
    <ContainerCard>
      <TituloCard>
        {description}
      </TituloCard>
      <Img src={expand} alt="Button" onClick={onClick} />
    </ContainerCard>
  </Border>
);

cards.propTypes = {
  color: string.isRequired,
  description: string.isRequired,
  onClick: func,
};

cards.defaultProps = {
  descricao: string,
  tipo: string,
};

export default cards;
