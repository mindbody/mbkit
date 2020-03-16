# Documentation for MB Design system

## Where does the content come from? 

In [contentful](https://app.contentful.com) we have a `component` content type. On build* we pull all components and find the corresponding component inside the parents folder of the MB repo. 

This creates a mapping of all components and generates a file for the components template (`./src/templates/component-documentation.js`) pulling in the components `mdx`, `changelog`, `package.json`, and typescript props to display on the components page.

* The build starts in `gatsby-node.js` and pulls in all the documentation described above.

## Working on the site locally

To pull from contentful request a access token from one of the maintainers. You will need to create a `.env` file in the root of this package `docs` and place token with the `CONTENTFUL_ACCESS_TOKEN` variable.

```
CONTENTFUL_ACCESS_TOKEN={YOUR ACCESS TOKEN TO CONTENTFUL}
```
