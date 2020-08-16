#!/usr/bin/env -S node --experimental-modules --trace-warnings

import path from 'path';
import api from './api.mjs';

async function main(){

  const defaults = {
    destination: 'docs',
    template: 'main',
    locations: {},
    sorting: {
      'order': [ 'custom-properties', 'dollar-variables', 'declarations', 'rules', 'at-rules' ],
      'properties-order': 'alphabetical',
      'unspecified-properties-position': 'bottom'
    }
  };

  const options = await (await import(path.join(process.cwd(), 'catawampus.mjs'))).default();
  const data = {}; //await (await import(path.join(process.cwd(), 'src/data/index.mjs'))).default();
  const setup = Object.assign({}, data, defaults, options);

  setup.locations.destination = path.join(process.cwd(), setup.destination);
  setup.locations.cssFiles = path.join(setup.locations.destination, 'css');
  setup.locations.stylesheet = path.join(setup.locations.cssFiles, 'stylesheet.css');

  await api(setup);
}

main();
