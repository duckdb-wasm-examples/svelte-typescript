import App from './App.svelte';

import * as duckdb from '@duckdb/duckdb-wasm';
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm';
import duckdb_wasm_eh from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm';
import duckdb_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js';
import duckdb_worker_eh from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js';

const DUCKDB_BUNDLES: duckdb.DuckDBBundles = {
	mvp: {
		mainModule: duckdb_wasm,
		mainWorker: duckdb_worker,
	},
	eh: {
		mainModule: duckdb_wasm_eh,
		mainWorker: duckdb_worker_eh,
	},
};

const initDB = async () => {
	const bundle = await duckdb.selectBundle(DUCKDB_BUNDLES);
	const logger = new duckdb.ConsoleLogger();
	const worker = new Worker(bundle.mainWorker);
	const db = new duckdb.AsyncDuckDB(logger, worker);
	await db.instantiate(bundle.mainModule);
	return db;
};
const db = initDB();

const app = new App({
	target: document.body,
	props: {
		db
	}
});

export default app;