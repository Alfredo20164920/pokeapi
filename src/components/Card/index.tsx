import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { PokemonResult, Result } from "../../types/data";
import { ReactTypes } from "../../types/utils";
import { StyledCard } from "./styled"
import { addImage } from '../../context/ImgCtx';
import { useApi } from '../../hooks/useApi';
import { pokeball } from '../../assets';

interface ICardProps extends ReactTypes {
  cardData: Result
}

const Card = ({ cardData }: ICardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, url } = cardData;

  const { data } = useApi<PokemonResult>(url, 'get');

  const handleClick = (e: MouseEvent) => {
    switch (e.detail) {
      case 1: {
        dispatch(addImage({ imageUrl: data?.sprites.front_default ?? pokeball }))
        break;
      }
      case 2: {
        navigate(`/${name}`, { state: { url } });
        break;
      }
      default: {
        break;
      }
    }
  }

  return (
    <StyledCard onClick={handleClick} data-testid="home--card" >
      {name}
    </StyledCard>
  )
}

export default Card;