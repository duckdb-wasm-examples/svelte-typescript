/// <reference types="svelte" />

declare module '*.wasm' {
    const value: any;
    export default value;
}

declare module '*.worker.js' {
    const value: any;
    export default value;
}