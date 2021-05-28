<script>
  import { onMount } from "svelte";

  let pokemons = [];
  let pokemonsWithAdditionalInfo = [];

  onMount(async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon");
    const result = await res.json();
    pokemons = result.results;

    if (pokemons.length > 0) {
      for (const pokemon of pokemons) {
        const singlePokemonFetch = await fetch(pokemon.url);
        const singlePokemonInfo = await singlePokemonFetch.json();
        Object.assign(
          pokemons[
            pokemons.findIndex((oldPokemon) => oldPokemon.name === pokemon.name)
          ],
          singlePokemonInfo
        );
      }
      pokemonsWithAdditionalInfo = [...pokemons];
      console.log(pokemonsWithAdditionalInfo);
    }
  });
</script>

<main class="py-20 bg-gray-50">
  <h1 class="text-4xl font-bold text-center">
    <span class="text-gray-800">Svelte</span>
    <span class="text-red-500">Pokedex</span>
  </h1>
  <div class="w-4/5 m-auto mt-10 grid grid-cols-3 gap-20">
    {#each pokemonsWithAdditionalInfo as pokemon}
      <div
        class="relative h-72 bg-white rounded-lg shadow-lg flex flex-col justify-between items-center overflow-hidden group"
      >
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          class="w-40 mb-10"
        />
        <div
          class="absolute w-full h-full transform translate-y-3/4 p-4 bg-red-600 text-center text-white  transition-all duration-700 ease-in-out group-hover:translate-y-0"
        >
          <p class="text-2xl font-bold capitalize">
            {pokemon.name}
          </p>
          <div class="mt-10 w-8/12 m-auto">
            {#each pokemon.stats as stat}
              <p class="flex justify-between text-base border-b-2 mb-1">
                <span class="font-bold capitalize">{stat.stat.name}</span><span
                  >{stat.base_stat}</span
                >
              </p>
            {/each}
          </div>
        </div>
      </div>
    {:else}
      <p>loading...</p>
    {/each}
  </div>
</main>
