import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

const GET_POKEMON_TYPE_INFO = (typeId: string) => {
  return gql`
  query MyQuery {
    pokemon_v2_pokemon(where: {pokemon_v2_pokemontypes: {type_id: {_eq: ${Number(typeId)}}}}) {
      name
      id
    }
  }
`}

const PokemonType = (): JSX.Element => {

  const { type } = useParams();

  const { data, loading, error } = useQuery(GET_POKEMON_TYPE_INFO(type))

  if (loading) return <>Loading...</>
  if (!data) return <>No Data</>
  if (error) return <>An error has ocurred</>

  return (
    <>
      <h1 className="text-5xl my-4">Pokemon Type</h1>
      <code>display all the pokemon of the given type</code>
      <hr />
      <Link to="/">
        <button className="px-4 py-2 bg-blue-500 rounded-2xl text-white hover:text-black">
          Go home
        </button>
      </Link>
      <ul className="pl-4">
        {data.pokemon_v2_pokemon.map(type => (
          <li key={type.id}>
            <Link to={`/pokemon/${type.id}`}>{type.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PokemonType;
