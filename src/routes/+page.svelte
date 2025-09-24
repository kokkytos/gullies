<script>
  import { onMount } from "svelte";

  let year = "";
  let landform = "";
  let result = "";
  let status = "";

  let gullyOptions = {
    ephemeral: false,
    natural: false,
    outside: false,
    large: false,
    outOfBounds: false
  };

  function updateString() {
    const trimmed = year.trim();
    const yearInt = parseInt(trimmed, 10);

    if (isNaN(yearInt)) {
      status = "Year must be an integer";
      result = "";
      return;
    }
    if (yearInt <= 1985) {
      status = "Year must be greater than 1985";
      result = "";
      return;
    }

    let res = "";
    if (landform === "BADLANDS") res = `B_${yearInt}`;
    else if (landform === "TERRACES") res = `T_${yearInt}`;
    else if (landform === "GULLY") {
      res = `G_${yearInt}`;
      if (gullyOptions.outOfBounds) res = `F_${res}`;
      if (gullyOptions.ephemeral) res += "_E";
      if (gullyOptions.outside) res += "_X";
      if (gullyOptions.natural) res += "_N";
      if (gullyOptions.large) res += "_L";
    } else {
      res = "Please select a landform";
    }

    result = res;
    if (res && res !== "Please select a landform") {
      navigator.clipboard.writeText(res);
      status = `${res} copied to clipboard!`;
      setTimeout(() => (status = ""), 2500);
    }
  }

  function toggleEphemeral() {
    gullyOptions.ephemeral = !gullyOptions.ephemeral;
    if (gullyOptions.ephemeral) gullyOptions.natural = false;
    updateString();
  }

  function toggleNatural() {
    gullyOptions.natural = !gullyOptions.natural;
    if (gullyOptions.natural) gullyOptions.ephemeral = false;
    updateString();
  }
</script>

<div class="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-6">
  <h1 class="text-xl font-bold">Gully Codes</h1>

  <!-- Year Input -->
  <div>
    <label>Year Input</label>
    <input
      class="border p-2 w-full"
      placeholder="Enter Year (e.g. 2020)"
      bind:value={year}
      on:input={updateString}
    />
  </div>

  <!-- Landform Selection -->
  <div>
    <label>Select Landform</label>
    <div class="flex flex-col space-y-2 mt-2">
      <label><input type="radio" bind:group={landform} value="BADLANDS" on:change={updateString}/> BADLANDS</label>
      <label><input type="radio" bind:group={landform} value="TERRACES" on:change={updateString}/> TERRACES</label>
      <label><input type="radio" bind:group={landform} value="GULLY" on:change={updateString}/> GULLY</label>
    </div>
  </div>

  <!-- Gully Options -->
  {#if landform === "GULLY"}
    <div>
      <label>Gully Options</label>
      <div class="flex flex-col space-y-2 mt-2">
        <label><input type="checkbox" checked={gullyOptions.ephemeral} on:change={toggleEphemeral}/> Ephemeral (E)</label>
        <label><input type="checkbox" checked={gullyOptions.natural} on:change={toggleNatural}/> Possibly Natural (N)</label>
        <label><input type="checkbox" bind:checked={gullyOptions.outside} on:change={updateString}/> Starts Outside Site (X)</label>
        <label><input type="checkbox" bind:checked={gullyOptions.large} on:change={updateString}/> Large >10m (L)</label>
        <label class="text-red-600"><input type="checkbox" bind:checked={gullyOptions.outOfBounds} on:change={updateString}/> Out of bounds (F)</label>
      </div>
    </div>
  {/if}

  <!-- Result -->
  <div>
    <label>Result</label>
    <input class="border p-2 w-full font-bold" readonly value={result} />
  </div>

  <!-- Status -->
  {#if status}
    <p class="text-gray-600 text-sm">{status}</p>
  {/if}
</div>
