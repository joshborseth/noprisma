/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
export type Pokemon = {
  id: number;
  name: string;
  image: string;
};

export async function getStaticProps() {
  const res = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  const pokemon = (await res.json()) as Pokemon[];
  return {
    props: {
      pokemon,
    },
  };
}

const Home = ({ pokemon }: { pokemon: Pokemon[] }) => {
  return (
    <>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <div>
        <h1 className="py-10 text-center text-4xl font-bold">Pokemon List</h1>
        <div className="grid grid-cols-5 justify-center gap-10">
          {!pokemon && <p>Loading...</p>}
          {pokemon &&
            pokemon.map((p) => {
              return (
                <a
                  className="flex flex-col justify-between border-2"
                  href={`/pokemon/${p.id}`}
                  key={p.id}
                >
                  <img
                    src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${p.image}`}
                    alt={p.name}
                  />
                  <p className="text-center">{p.name}</p>
                </a>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
