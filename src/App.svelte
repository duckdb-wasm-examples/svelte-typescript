<script lang="ts">
	import * as duckdb from '@duckdb/duckdb-wasm';

	export let db: Promise<duckdb.AsyncDuckDB>;
</script>

<main>
	{#await db}
		<h1>Instantiating...</h1>
	{:then db} 
		<h1>Hello DuckDB-Wasm {duckdb.PACKAGE_VERSION}</h1>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>