<script>
  import { onMount } from "svelte";

  import { pokemonStore } from "./store";

  import Star from "./components/icons/Star.svelte";
  import ChevronRight from "./components/icons/ChevronRight.svelte";

  import Modal from "./components/Modal.svelte";

  let numberOfPokemonsToFetch = 100;
  let numberOfPokemonsToShow = 12;
  let pokemons = [];
  let pokemonWithAdditionalInfo;
  let isModalOpen = false;
  let pokemonToOpen;

  pokemonStore.subscribe((value) => {
    pokemonWithAdditionalInfo = value;
  });

  onMount(async () => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemonsToFetch}`
    );
    const result = await res.json();
    pokemons = result.results;

    if (pokemons.length > 0) {
      for (const pokemon of pokemons) {
        const singlePokemonFetch = await fetch(pokemon.url);
        const singlePokemonInfo = await singlePokemonFetch.json();
        pokemonStore.update((value) => [...value, singlePokemonInfo]);
      }
    }
  });

  const favouriteClick = (id) => {
    pokemonWithAdditionalInfo.forEach((pokemon) => {
      if (pokemon.id === id) {
        return (pokemon.isFavourite = !pokemon.isFavourite);
      }
    });

    pokemonStore.update(() => [...pokemonWithAdditionalInfo]);
  };

  const openPokemonModal = (id) => {
    pokemonToOpen = pokemonWithAdditionalInfo.filter(
      (pokemon) => pokemon.id === id
    );
    isModalOpen = true;
  };

  const closePokemonModal = () => {
    isModalOpen = false;
    pokemonToOpen = [];
  };
</script>

<main class="py-20 bg-gray-50">
  <h1 class="text-4xl font-bold text-center">
    <span class="text-gray-800">Svelte</span>
    <span class="text-red-500">Pokedex</span>
  </h1>
  <div class="w-4/5 m-auto mt-10 grid sm:grid-cols-3 grid-cols-1 gap-20">
    {#if pokemonWithAdditionalInfo.length === numberOfPokemonsToFetch}
      {#each pokemonWithAdditionalInfo.slice(0, numberOfPokemonsToShow) as pokemon}
        <div
          class="relative h-72 bg-white rounded-lg shadow-lg flex flex-col justify-between items-center overflow-hidden group"
        >
          <img
            src={pokemon["sprites"]["other"]["official-artwork"][
              "front_default"
            ]}
            alt={pokemon.name}
            class="w-40 mt-4"
          />
          <div
            class="absolute w-full h-full transform translate-y-3/4 p-4 bg-red-600 text-center text-white transition-all duration-700 ease-in-out group-hover:translate-y-0"
          >
            {#if pokemon.isFavourite}
              <Star
                favouriteClick={() => favouriteClick(pokemon.id)}
                additionalClass="absolute top-5 left-5 fill-current text-yellow-300 transition-all duration-700 ease-in-out hover:animate-pulse hover:cursor-pointer"
              />
            {:else}
              <Star
                favouriteClick={() => favouriteClick(pokemon.id)}
                additionalClass="absolute top-5 left-5 stroke-current text-white text-opacity-0 transition-all duration-700 ease-in-out hover:animate-pulse group-hover:text-opacity-100 hover:cursor-pointer"
              />
            {/if}
            <p class="text-2xl font-bold capitalize">
              {pokemon.name}
            </p>
            <ChevronRight
              favouriteClick={() => openPokemonModal(pokemon.id)}
              additionalClass="absolute top-5 right-5  stroke-current text-white text-opacity-0 transition-all duration-700 ease-in-out hover:animate-pulse group-hover:text-opacity-100 hover:cursor-pointer"
            />
            <div class="mt-10 w-8/12 m-auto">
              {#each pokemon.stats as stat}
                <p class="flex justify-between text-base border-b-2 mb-1">
                  <span class="font-bold capitalize">{stat.stat.name}</span
                  ><span>{stat.base_stat}</span>
                </p>
              {/each}
            </div>
          </div>
        </div>
      {:else}
        <p>loading...</p>
      {/each}
    {:else}
      <div class="relative h-72 bg-white rounded-lg shadow-lg animate-pulse" />
      <div class="relative h-72 bg-white rounded-lg shadow-lg animate-pulse" />
      <div class="relative h-72 bg-white rounded-lg shadow-lg animate-pulse" />
    {/if}
  </div>
  {#if numberOfPokemonsToShow < pokemonWithAdditionalInfo.length}
    <div class="mt-10 flex justify-center items-center">
      <button
        on:click={() => (numberOfPokemonsToShow = numberOfPokemonsToShow + 12)}
        type="button"
        class="py-2 px-4 rounded bg-red-600 text-white font-bold transition-all duration-700 ease-in-out hover:bg-red-900 focus:outline-none"
      >
        Load More
      </button>
    </div>
  {/if}
  {#if isModalOpen}
    <Modal {closePokemonModal} pokemonToOpen={pokemonToOpen[0]} />
  {/if}
</main>
