import fs from 'fs-extra';
import path from 'path';
import prettier from 'prettier';
import postcss  from 'postcss';
import postcssJs  from 'postcss-js';
import precss  from 'precss';
import sorting  from 'postcss-sorting';
import autoprefixer  from 'autoprefixer';
import cloneDeep from 'lodash/cloneDeep.js';
export default main;

async function main(options){
  const {css:precssCss} = await postcss().process(await buildTree(options), {parser:postcssJs, from:undefined });
  const {css:unformattedCss} = await postcss([ precss({}), autoprefixer(), sorting(options.sorting) ]).process(precssCss,{from:undefined});
  const css = prettier.format(unformattedCss, { parser: "css" });
  fs.ensureDirSync(path.dirname(options.locations.stylesheet));
  fs.writeFileSync(options.locations.stylesheet, css);
}

function dig(path, root){
  let destination = root;
  for(let fragment of path){
    if(!destination[fragment]) destination[fragment] = {}; // create path if missing
    destination = destination[fragment]; // descend down the path.
  }
  return destination; // return latest know
};
function buildTree(setup){
  const base = cloneDeep(setup.style); // grab the styles that are ready to go.
  const responsive = {}; // this is the destination where we will calculate based on breakpoints.
  // uses the responsive information to apply defaults to the main/default section of the stylesheet.
  for(let item of setup.responsive){
     let location = dig(item.id, base);
     for (const [key, value] of Object.entries(item).filter(([key, value])=>key!=='id')) {
       const [from, to, unit] = value;
       location[key] = from + (unit||setup.unit);
     }
  };
  // process the media queries with adaptive fractional values
  for(let item of setup.responsive){
    let breakpointIndex = 1;
    for(let breakpointWidth of setup.breakpoints){
      let path = [`@media (min-width: ${breakpointWidth}px)`].concat(item.id);
      let location = dig(path, responsive);
      for (const [key, value] of Object.entries(item).filter(([key, value])=>key!=='id')) {
        const [from, to, unit] = value;
        let fraction = (to - from) / setup.breakpoints.length;
        let increment = fraction * (breakpointIndex);
        location[key] = (from + increment).toFixed(2) + (unit||setup.unit);
      }
      breakpointIndex++;
    }
  }
  return Object.assign({}, base, responsive);
}
