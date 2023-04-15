import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home, { type Pokemon } from "../pages";

const fetchPokemon = async () => {
  const res = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  const data = (await res.json()) as Pokemon[];
  return data;
};

test("there is an h1 on the home page", async () => {
  const pokemon = await fetchPokemon();
  render(<Home pokemon={pokemon} />);
  const h1 = screen.getByText("Pokemon List");
  expect(h1).toBeDefined();
});

test("we are rendering correct data from the api", async () => {
  const pokemon = await fetchPokemon();
  expect(pokemon).toBeDefined();
  expect(pokemon.length).toBeGreaterThan(0);
  if (!pokemon[0]) throw new Error("pokemon[0] is undefined");
  expect(pokemon[0].name).toBe("Bulbasaur");
});
