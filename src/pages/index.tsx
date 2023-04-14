/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useState } from "react";
export type Pokemon = {
  id: number;
  name: string;
  image: string;
};

const Home: NextPage = () => {
  const [pokemon, setPokemon] = useState<Pokemon[] | null>(null);
  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch(
        "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
      );
      const data = (await res.json()) as Pokemon[];
      setPokemon(data);
    };
    void fetchPokemon();
  }, []);

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
