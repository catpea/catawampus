# Catawampus CSS: Becasue CSS things go bork and hork in the night.
Classless Responsive CSS Generator for Semantic HTML

## Links

- [catawampus at npm](https://www.npmjs.com/package/catawampus)
- [catawampus at github](https://github.com/catpea/catawampus)

## Installation

```sh

npm i -g catawampus

```

## Usage

Create a ```catawampus.mjs``` in the root of your website project.

```JavaScript

// configuration https://github.com/catpea/catawampus#readme

import {inspect} from 'util';

const configuration = {

  destination: 'docs',
  template: 'main',
  color: 'main',

  colors:[
    {
      id:'main',
      color: {
        primary: '',
        secondary: '',
      },
      background: {
        primary: [],
        secondary: [],
      },
    }
  ],

  style: {
    article: {
      header: {
      },
      section: {
      },
      article: {
      },
      footer: {
      },
    }
  },

  responsive: [
    {id: ['body'], fontSize: [1, 1.5]},
    {id: ['img'], width: [100, 75, '%']},
  ],

}

export default async function () {
  return configuration;
}


```

Run ```catawampus``` in website directory to generate the CSS
