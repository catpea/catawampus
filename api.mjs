import fs from 'fs-extra';
import path from 'path';
import prettier from 'prettier';
import postcss  from 'postcss';
import postcssJs  from 'postcss-js';
import precss  from 'precss';
import sorting  from 'postcss-sorting';
import autoprefixer  from 'autoprefixer';
import cloneDeep from 'lodash/cloneDeep.js';
import merge from 'lodash/merge.js';
export default main;

async function main(options){

  const {css:precssCss} = await postcss().process(await calculate(options), {parser:postcssJs, from:undefined });

  console.log(css);

  // const {css:unformattedCss} = await postcss([ precss({}), autoprefixer(), sorting(sortingOptions) ]).process(precssCss,{from:undefined});
  // const css = prettier.format(unformattedCss, { parser: "css" });
  // const stylesheetLocation = path.resolve(path.join(options.website.directory, options.website.stylesheet));
  // const stylesheetOptions = {
  //   meta: {
  //     title: 'CSS Stylesheet',
  //     timestamp: moment((new Date())).tz("America/Detroit").format("MMMM Do YYYY, h:mm:ss a z"),
  //     author: options.author,
  //     canonical: options.canonical,
  //   },
  //   data:{
  //     css
  //   }
  // };
  // const stylesheetTemplate = handlebars.compile(fs.readFileSync(path.resolve(path.join(options.website.template.path, options.website.template.stylesheet))).toString());
  // const stylesheet = stylesheetTemplate(stylesheetOptions);
  // //console.log(stylesheet);
  // fs.ensureDirSync(path.dirname(stylesheetLocation));
  // fs.writeFileSync(stylesheetLocation, stylesheet);

}




function rem(str){return str+'rem'};

function calculate(setup){

  const base = cloneDeep(setup.styles); // grab the styles that are ready to go.
  const responsive = {}; // this is the destination where we will calculate based on breakpoints.

  // setup.responsive.forEach((item)=>{
  //    let location = base;
  //   for(let fragment of item.path){
  //     if(!location[fragment]) location[fragment] = {};
  //     location = location[fragment];
  //   }
  //   for(let property of item.property){
  //     location[property.name] = property.from + property.unit;
  //   }
  // });

  // setup.breakpoints.forEach((breakpointWidth,index)=>{
  //   const containerWidth = setup.container[index];
  //   responsive[`@media (min-width: ${breakpointWidth}px)`] = {'body > *':{maxWidth: `${containerWidth}px`}};
  // })

  // setup.breakpoints.forEach((breakpointWidth,index)=>{
  //   const containerWidth = setup.container[index];
  //   responsive[`@media (min-width: ${breakpointWidth}px)`] = {'body > *':{maxWidth: `${containerWidth}px`}};
  // })

  // setup.responsive.forEach((item)=>{
  //    let location = base;
  //   for(let fragment of item.path){
  //     if(!location[fragment]) location[fragment] = {};
  //     location = location[fragment];
  //   }
  //   for(let property of item.property){
  //     location[property.name] = property.from + property.unit;
  //   }
  // });

  // setup.responsive.forEach((item)=>{
  //   setup.breakpoints.forEach((breakpointWidth,increase)=>{
  //
  //     let location = responsive[`@media (min-width: ${breakpointWidth}px)`]
  //     for(let fragment of item.path){
  //       if(!location[fragment]) location[fragment] = {};
  //       location = location[fragment];
  //     }
  //     for(let property of item.property){
  //       let fraction = (property.to - property.from) / setup.breakpoints.length;
  //       location[property.name] = (property.from + (fraction*(increase+1))).toFixed(2) + property.unit;
  //     }
  //   })
  // })

  const response = merge({}, base, responsive);
  return response;
}










function calculate2(setup){
  const base = merge({}, setup.styles);
  const responsive = {};

  setup.breakpoints.forEach((breakpointWidth,index)=>{
    const containerWidth = setup.container[index];
    responsive[`@media (min-width: ${breakpointWidth}px)`] = {'body > *':{maxWidth: `${containerWidth}px`}};
  })

  setup.breakpoints.forEach((breakpointWidth,index)=>{
    const containerWidth = setup.container[index];
    responsive[`@media (min-width: ${breakpointWidth}px)`] = {'body > *':{maxWidth: `${containerWidth}px`}};
  })

  setup.responsive.forEach((item)=>{
     let location = base;
    for(let fragment of item.path){
      if(!location[fragment]) location[fragment] = {};
      location = location[fragment];
    }
    for(let property of item.property){
      location[property.name] = property.from + property.unit;
    }
  });

  setup.responsive.forEach((item)=>{
    setup.breakpoints.forEach((breakpointWidth,increase)=>{

      let location = responsive[`@media (min-width: ${breakpointWidth}px)`]
      for(let fragment of item.path){
        if(!location[fragment]) location[fragment] = {};
        location = location[fragment];
      }
      for(let property of item.property){
        let fraction = (property.to - property.from) / setup.breakpoints.length;
        location[property.name] = (property.from + (fraction*(increase+1))).toFixed(2) + property.unit;
      }
    })
  })

  const response = merge({}, base, responsive);
  return response;
}
