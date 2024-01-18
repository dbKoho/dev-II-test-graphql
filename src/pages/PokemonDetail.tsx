import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

const GET_POKEMON_STATS_INFO = (pokemonId: string) => {
  return gql`
  query MyQuery {
    pokemon_v2_pokemonstat(where: {pokemon_id: {_eq: ${Number(pokemonId)}}}) {
      base_stat
      pokemon_v2_stat {
        name
      }
    }
    pokemon_v2_pokemon(where: {id: {_eq: ${Number(pokemonId)}}}) {
      name
    }
  }
`}


const PokemonDetail = (): JSX.Element => {

  const {id} = useParams();

  const {data, loading, error} = useQuery(GET_POKEMON_STATS_INFO(id))

  if (loading) return <>Loading...</>
  if (!data) return <>No Data</>
  if (error) return <>An error has ocurred</>
  return (
    <>
      <h1 className="text-5xl my-4">Pokemon Detail</h1>
      <h2 className="font-bold text-3xl uppercase mb-4">
        Name: <span className="font-normal">{data.pokemon_v2_pokemon[0].name}</span>
      </h2>
      <code>display the details of the pokemon of the given id</code>
      <hr className="mb-4" />
      <Link to="/">
        <button className="px-4 py-2 bg-blue-500 rounded-2xl text-white hover:text-black">
          Go home
        </button>
      </Link>
      <h2 className="my-4 text-4xl underline">Info:</h2>
      <table className='border-collapse border-spacing-2 border border-slate-500'>
        <thead>
          <tr>
            <th className='border border-slate-600' >Stat name</th>
            <th className='border border-slate-600'>Base stat</th>
          </tr>
        </thead>
        <tbody>
          {data.pokemon_v2_pokemonstat.map(stat => (
            <tr key={stat.pokemon_v2_stat.name}>
              <td className='border border-slate-600'>{stat.pokemon_v2_stat.name}</td>
              <td className='border border-slate-600'>{stat.base_stat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PokemonDetail;
