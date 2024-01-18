import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_POKEMON_TYPES = gql`
  query PokemonType {
    pokemon_v2_type {
      name
      id
    }
}
`;

const Home = (): JSX.Element => {

  const { data, loading, error } = useQuery(GET_POKEMON_TYPES)


  if (loading) return <>Loading...</>
  if (!data) return <>No Data</>
  if (error) return <>An error has ocurred</>


  return (
    <>
      <h1 className="text-5xl my-4">Homepage</h1>
      <code>display all the types with link to /types/:type</code>
      <br />
      <ul className="pl-4">
        {data.pokemon_v2_type.map(poke => (
          <li key={poke.id}>
            <Link to={`/types/${poke.id}`}>{poke.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
