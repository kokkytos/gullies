<script>
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
      status = "⚠️ Year must be an integer";
      result = "";
      return;
    }
    if (yearInt <= 1985) {
      status = "⚠️ Year must be greater than 1985";
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
      status = `✅ ${res} copied to clipboard!`;
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

<div class="p-8 max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-xl space-y-8 border border-blue-200">
  <h1 class="text-3xl font-extrabold text-blue-700 text-center">🌍 Gully Code Generator</h1>

  <!-- Year Input -->
  <div>
    <label class="block font-semibold text-gray-700 mb-2">Year</label>
    <input
      class="border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 rounded-lg p-3 w-full transition"
      placeholder="Enter Year (e.g. 2020)"
      bind:value={year}
      on:input={updateString}
    />
  </div>

  <!-- Landform Selection -->
  <div>
    <label class="block font-semibold text-gray-700 mb-2">Select Landform</label>
    <div class="grid grid-cols-3 gap-3">
      <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-100 transition">
        <input type="radio" bind:group={landform} value="BADLANDS" on:change={updateString} class="mr-2" />
        <span class="font-medium text-blue-700">Badlands</span>
      </label>
      <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-100 transition">
        <input type="radio" bind:group={landform} value="TERRACES" on:change={updateString} class="mr-2" />
        <span class="font-medium text-green-700">Terraces</span>
      </label>
      <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-100 transition">
        <input type="radio" bind:group={landform} value="GULLY" on:change={updateString} class="mr-2" />
        <span class="font-medium text-red-700">Gully</span>
      </label>
    </div>
  </div>

  <!-- Gully Options -->
  {#if landform === "GULLY"}
    <div>
      <label class="block font-semibold text-gray-700 mb-2">Gully Options</label>
      <div class="grid grid-cols-2 gap-2">
        <label class="flex items-center p-2 border rounded-lg hover:bg-red-50 transition">
          <input type="checkbox" checked={gullyOptions.ephemeral} on:change={toggleEphemeral} class="mr-2" />
          Ephemeral <span class="ml-1 text-gray-500">(E)</span>
        </label>
        <label class="flex items-center p-2 border rounded-lg hover:bg-green-50 transition">
          <input type="checkbox" checked={gullyOptions.natural} on:change={toggleNatural} class="mr-2" />
          Possibly Natural <span class="ml-1 text-gray-500">(N)</span>
        </label>
        <label class="flex items-center p-2 border rounded-lg hover:bg-yellow-50 transition">
          <input type="checkbox" bind:checked={gullyOptions.outside} on:change={updateString} class="mr-2" />
          Starts Outside <span class="ml-1 text-gray-500">(X)</span>
        </label>
        <label class="flex items-center p-2 border rounded-lg hover:bg-purple-50 transition">
          <input type="checkbox" bind:checked={gullyOptions.large} on:change={updateString} class="mr-2" />
          Large >10m <span class="ml-1 text-gray-500">(L)</span>
        </label>
        <label class="flex items-center p-2 border border-red-300 rounded-lg bg-red-50">
          <input type="checkbox" bind:checked={gullyOptions.outOfBounds} on:change={updateString} class="mr-2" />
          <span class="text-red-700 font-semibold">Out of Bounds (F)</span>
        </label>
      </div>
    </div>
  {/if}

  <!-- Result -->
  <div>
    <label class="block font-semibold text-gray-700 mb-2">Result</label>
    <input
      class="border-2 border-gray-300 rounded-lg p-3 w-full font-mono text-lg font-bold text-blue-700 bg-gray-50"
      readonly
      value={result}
    />
  </div>

  <!-- Status -->
  {#if status}
    <p class="text-sm font-medium text-green-600 bg-green-100 p-2 rounded-md">{status}</p>
  {/if}
</div>
