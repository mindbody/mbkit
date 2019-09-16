#!/usr/bin/env node
const args = require('yargs').argv;
const path = require('path');
const fs = require('fs');

const { consumerPath } = args;

const pkgJson = require(`${consumerPath}/package.json`);
const componentName = path.basename(consumerPath);

generateComponentImport();

function generateComponentImport() {
    const components = `import React from 'react';
import MarkdownWithOverrides from '../../../packages/docs/src/components/MarkdownWithOverrides/MarkdownWithOverrides';
import * as components from '../${path.relative(__dirname, consumerPath)}/${pkgJson.main}';
import Documentation from '../${path.relative(__dirname, consumerPath)}/src/${componentName}.mdx';

export const GeneratedMarkdown = () => {
  const [md, setMd] = React.useState('');

  React.useEffect(() => {
    fetch(Documentation)
        .then(res=> res.text())
        .then(content => setMd(content))
  }, [])
  
  let namedExports = {}
  Object.keys(components).forEach(key => {
    if (key === 'default') {
      if (typeof components[key] === 'object') {
        namedExports = components[key];
        return;
      }
      namedExports['${componentName}'] = components.default;
      return;
    }
    namedExports[key] = components[key]
    return;
  })

  return (
    <MarkdownWithOverrides overrides={{ ...namedExports }}>
      {md}
    </MarkdownWithOverrides>
  )
}
`;
    fs.writeFile(`${__dirname}/local-server/generated.component.js`, components, err => {
        if (err) {
            throw err;
        }
    });
}
