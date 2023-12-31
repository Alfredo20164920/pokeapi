import { useParams } from "react-router-dom";

import { CardsContainer, Container } from "./styled";
import { pokeball } from "../../assets";
import { PokemonResult } from "../../types/data";
import { ButtonHome, Loading, MainInformation, NotFound, StatsInformation } from "../../components";
import { useApi } from "../../hooks/useApi";

const Pokemon = () => {
  const { pokemon } = useParams();
  const { data, isLoading, error } = useApi<PokemonResult>(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, 'get');
  
  if (isLoading) return <Loading />
  if (error) return <NotFound />

  return (
    <Container>
      <CardsContainer>
        <MainInformation
          weightPokemon={data?.weight ?? 0}
          heighPokemon={data?.height ?? 0}
          experience={data?.base_experience ?? 0}
          image={data?.sprites.front_default ?? pokeball}
          types={data?.types ?? []}
        />
        <StatsInformation
          abilities={data?.abilities}
          stats={data?.stats}
        />
      </CardsContainer>
      <ButtonHome>Home</ButtonHome>
    </Container>
  )
}

export default Pokemon