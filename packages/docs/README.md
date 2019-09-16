# Documentation for MB Design system

## Where does the content come from? 

In [contentful](https://app.contentful.com) we have a `component` content type. On build* we pull all components and find the corresponding component inside the parents folder of the MB repo. 

This creates a mapping of all components and generates a file for the components template (`./src/templates/component-documentation.js`) pulling in the components `mdx`, `changelog`, `package.json`, and typescript props to display on the components page.

* The build starts in `gatsby-node.js` and pulls in all the documentation described above.
