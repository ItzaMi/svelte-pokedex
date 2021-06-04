<script>
  export let pokemonName;
  export let pokemonFrontImage;
  export let pokemonBackImage;
  export let numberOfRepetitions;
</script>

{#each Array(numberOfRepetitions) as _, index}
  <img src={pokemonFrontImage} alt={pokemonName} class="w-10" key={index} />
  <img src={pokemonBackImage} alt={pokemonName} class="w-10" key={index} />
{/each}
