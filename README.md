# Web Component Documentation (`wc-dox`)

The `wc-dox` package and it's components are designed to be a way to quickly and consistently document your custom element APIs using the [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest).

## Installation

```bash
npm i wc-dox
```

```ts
import { setWcDoxConfig } from 'wc-dox/index.js';
import manifest from './custom-elements.json' with { type: json };

setWcDoxConfig(manifest);
```