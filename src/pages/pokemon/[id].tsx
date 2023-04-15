/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Pokemon } from "..";

export async function getStaticPaths() {
  const res = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  const pokemon = (await res.json()) as Pokemon[];
  const paths = pokemon.map((p) => ({
    params: { id: p.id.toString() },
  }));
  return { paths, fallback: false };
}

const Pokemon: NextPage = () => {
  const {
    query: { id },
  } = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  useEffect(() => {
    if (!id) return;
    const fetchPokemon = async () => {
      const res = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${
          id as string
        }.json`
      );
      const data = (await res.json()) as Pokemon;
      setPokemon(data);
    };
    void fetchPokemon();
  }, [id]);
  if (!pokemon) {
    return null;
  }
  return (
    <>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <h1>Hello, {pokemon.name}</h1>
        <img
          src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
          alt={pokemon.name}
        />
      </div>
    </>
  );
};

export default Pokemon;
