<script>
  import { onMount } from "svelte";

  import Close from "./icons/Close.svelte";
  import PokemonBanner from "./PokemonBanner.svelte";

  export let closePokemonModal;
  export let pokemonToOpen;

  let pokemonInfo;
  let pokemonDescription;

  const choosePokemonDescription = (arrayOfDescriptions) => {
    const filteredDescriptionInEN = arrayOfDescriptions.filter(
      (description) => description.language.name === "en"
    );

    const randomNumberBasedOnArrayLength = Math.floor(
      Math.random() * filteredDescriptionInEN.length
    );

    pokemonDescription =
      filteredDescriptionInEN[randomNumberBasedOnArrayLength].flavor_text;
  };

  onMount(async () => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonToOpen.id}`
    );
    pokemonInfo = await res.json();

    choosePokemonDescription(pokemonInfo.flavor_text_entries);
  });
</script>

<div
  class="fixed top-1/2 left-1/2 transform translate -translate-y-2/4 -translate-x-2/4  h-screen w-screen bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur flex justify-center items-center"
>
  <Close
    additionalClass="absolute top-3 md:top-5 right-3 md:right-5 stroke-current text-black text-opacity-50 transition-all duration-500 ease-in-out hover:text-opacity-100 hover:cursor-pointer"
    {closePokemonModal}
  />
  <div
    class="h-5/6 w-5/6 md:w-4/6 bg-white rounded-lg shadow-lg md:grid md:grid-cols-2  overflow-scroll md:overflow-hidden"
  >
    <div class="relative border-8 border-b-0 border-red-600">
      <div class="h-4/5 flex justify-center items-center">
        <img
          src={pokemonToOpen["sprites"]["other"]["official-artwork"][
            "front_default"
          ]}
          alt={pokemonToOpen.name}
          class="w-40 md:w-80"
        />
      </div>
      <div
        class="absolute bottom-0 h-1/5 w-full flex justify-center items-center bg-red-600 text-center text-white"
      >
        <p class="text-2xl font-bold capitalize">{pokemonToOpen.name}</p>
      </div>
    </div>
    <div class="m-5 md:m-12 flex flex-col justify-around">
      {#if pokemonInfo}
        <div>
          <div class="mb-3 md:mb-5 flex justify-center overflow-hidden">
            <PokemonBanner
              pokemonName={pokemonToOpen.name}
              pokemonFrontImage={pokemonToOpen.sprites.front_default}
              pokemonBackImage={pokemonToOpen.sprites.back_default}
              numberOfRepetitions={5}
            />
          </div>
          <p class="text-sm italic text-center text-gray-700">
            {pokemonDescription}
          </p>
          <div class="my-3 md:my-5 flex justify-center overflow-hidden">
            <PokemonBanner
              pokemonName={pokemonToOpen.name}
              pokemonFrontImage={pokemonToOpen.sprites.front_default}
              pokemonBackImage={pokemonToOpen.sprites.back_default}
              numberOfRepetitions={5}
            />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          {#each pokemonToOpen.stats as stat}
            <div
              class="h-[75px] flex flex-col justify-center items-center text-center"
            >
              <p class="text-gray-700">
                {stat.base_stat}
              </p>
              <p class="text-[10px] text-gray-300">{stat.stat.name}</p>
            </div>
          {/each}
        </div>
      {:else}
        <p>Fetching Pokemon info</p>
      {/if}
    </div>
  </div>
</div>
