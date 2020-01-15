const path = require('path');
const fs = require('fs');
require = require('esm')(module);

require.extensions['.mdx'] = function(module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
require.extensions['.md'] = function(module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

/**
 * onPreInit
 *
 * Creating component mapping for dev docs to pull in correct components
 */
exports.onPreInit = () => {
    // generate mapping of all components for `templates/component-documentation` to use
    const components = {};
    const packagesDir = path.resolve(__dirname, '../../packages');
    fs.readdir(packagesDir, (err, entries) => {
        if (err) {
            throw 'There was an error reading the packages directory before generating documentation';
        }

        entries.forEach(entry => {
            components[entry] = `../../${entry}/dist/${entry}.js`;
        });

        generateComponentsFile(components);
    });
};

/**
 * This fetches all design documentation stored in contentful and creates pages for each component
 */
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    return graphql(`
        {
            allContentfulComponent {
                edges {
                    node {
                        componentName
                        slug
                        documentation {
                            json
                        }
                    }
                }
            }

            allContentfulPage {
                edges {
                    node {
                        content {
                            json
                        }
                        title
                        slug
                        id
                    }
                }
            }

            allContentfulHomePage {
                edges {
                    node {
                        title
                        description {
                            json
                        }
                        guideHeader
                        guides
                        guideLinks
                        guideDescription
                        gettingStartedHeader
                        gettingStartedDescription {
                            json
                        }
                        gettingStarted
                        gettingStartedDescriptions
                        gettingStartedLinks
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors);
        }

        const { allContentfulPage, allContentfulComponent, allContentfulHomePage } = result.data;

        // Get pages
        const pages = allContentfulPage.edges;
        generatePages({ createPage, pageNodes: pages });

        // generate component pages
        const components = allContentfulComponent.edges;
        generateComponents({ createPage, componentEdges: components });

        // generate home page
        const homePage = allContentfulHomePage.edges;
        generateHomePage({ createPage, homePage });

        // Create landing page (kitchen sink?)
        // createPage({
        //     path: '/components',
        //     component: path.resolve('src/templates/component-landing.js'),
        //     context: {
        //         components,
        //     },
        // });
    });
};

const allPages = [];
exports.onCreatePage = ({ page, actions }) => {
    console.log(page.path);
    allPages.push({
        title: '',
        path: page.path,
    });
    console.log('------------------------------------------------');
};
exports.onPostBootstrap = () => {
    console.log('------------------------------------------------------------------------');
    console.log(allPages);
    console.log('------------------------------------------------------------------------');
};

/**
 * Page generator
 */
function generatePages({ pageNodes, createPage }) {
    const pages = pageNodes.map(n => n.node);

    pages.forEach(p => {
        createPage({
            path: p.slug,
            component: path.resolve('src/templates/page.js'),
            context: {
                page: p,
            },
        });
    });
}

function generateComponents({ componentEdges, createPage }) {
    // Type docs are generated during `build:all` script
    const generatedTypeDocs = require('./generated/component-prop-types.json');

    // Getting components from contentful and sorting them by name
    const components = componentEdges.sort((a, b) => a.node.componentName[0] > b.node.componentName[0]);
    // then iterating over each one
    components.forEach(edge => {
        const { slug, componentName, documentation } = edge.node;

        // Try/catch so the build will continue if one component fails building the page
        try {
            const componentFolder = path.resolve(`../${componentName}`);

            // Get package.json
            const pkgJson = require(`${componentFolder}/package.json`);

            /**
             * Try/catch for developer (mdx) documentation and changelog
             */
            let devDocs = ``;
            try {
                devDocs = `${require(`${componentFolder}/src/${componentName}.mdx`)}`;
            } catch (e) {
                console.warn(
                    `⚠️ There was an error fetching the developer example and documentation for ${componentName}`,
                );
            }

            let changelog = ``;
            try {
                changelog = `${require(`${componentFolder}/CHANGELOG.md`)}`;
            } catch (e) {
                console.warn(`⚠️ There was an error fetching the changelog for ${componentName}`);
            }

            // generating slug (checking for forward slash and adding one if it doesn't exist)
            const componentSlug = slug[0] === '/' ? `/components${slug}` : `/components/${slug}`;

            // Building gatsby page
            createPage({
                path: componentSlug,
                component: path.resolve('src/templates/component-documentation.js'),
                context: {
                    componentContext: { ...edge.node, slug: componentSlug },
                    changelog,
                    devDocs,
                    propDocs: generatedTypeDocs,
                    pkgJson,
                    designDocs: documentation.json,
                },
            });
        } catch (e) {
            console.warn('====================================');
            console.warn(`There was an error building a page for: ${componentName}`);
            console.warn(e);
            console.warn('====================================');
        }
    });
}

/**
 * This is used to create a component mapping to pass into MarkdownToJsx component
 */
function generateComponentsFile(componentMap) {
    const generatedDir = `./generated`;
    const importStatements = Object.keys(componentMap)
        .map(comp => {
            // if the first letter of component is capitalized, add it
            if (isComponent(comp)) {
                return `import * as ${comp} from '${componentMap[comp]}';`;
            }
            return '';
        })
        .join('');
    const exportStatements = Object.keys(componentMap)
        .map(comp => {
            if (isComponent(comp)) {
                return `${comp},`;
            }
            return ``;
        })
        .join('');
    const fileContents = `${importStatements}
  export default {${exportStatements}}`;

    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync('', { recursive: true }, err => {
            if (!err) {
                console.log('Created generated folder');
            }
        });
    }
    fs.writeFileSync(`${generatedDir}/components.js`, fileContents, err => {
        if (!err) {
            console.log('File Created');
        }
    });
}

/**
 * This makes sure the first letter of the component is capitalized; otherwise it's `docs` package or a util of some sort
 */
function isComponent(componentTitle) {
    if (componentTitle[0].search(/[A-Z]/) === 0) {
        return true;
    }
    return false;
}

/**
 * Home Page generator
 */
function generateHomePage({ homePage, createPage }) {
    createPage({
        path: '/',
        component: path.resolve('src/templates/home-page.js'),
        context: {
            homePage: homePage[0].node,
            layout: 'fullPage',
        },
    });
}
