import React from 'react';
import MarkdownWithOverrides from '../components/MarkdownWithOverrides/MarkdownWithOverrides';
import components from '../../generated/components.js';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vsDark from 'react-syntax-highlighter/dist/esm/styles/prism/vs-dark';
import SEO from '../components/seo';
import Component from '@reach/component-component';
const docsToMarkdown = require('react-docs-markdown');

const defaultOverrides = {
    h1: props => <h2 {...props} />,
    h2: props => <h3 {...props} />,
    h3: props => <h4 {...props} />,
    h4: props => <h5 {...props} />,
    h5: props => <h6 {...props} />,
    a: props => <a {...props} target="_blank" />,
    Component: props => <Component {...props} />,
};

const ComponentDocumentation = props => {
    const { devDocs, designDocs, componentContext, propDocs, pkgJson, changelog } = props.pageContext;
    const { componentName } = componentContext;

    const relatedComponents = [];
    const namedComponents = {};

    // Checking if named component or default export as well if component relates to current documentation
    Object.keys(components).forEach(comp => {
        const isRelatedComponent = comp === componentName;
        const currComp = components[comp];
        // if actual component, just add to namedComponents
        if (typeof currComp === 'function') {
            namedComponents[comp] = currComp;
            if (isRelatedComponent) {
                relatedComponents.push({ name: comp, isNamedExport: false });
            }
            return;
        }

        // if a set of named exports, loop and add each one
        Object.keys(currComp).forEach(subComp => {
            if (isRelatedComponent) {
                relatedComponents.push({ name: subComp, isNamedExport: true });
            }
            namedComponents[subComp] = currComp[subComp];
        });
    });

    const MarkdownJsx = props => {
        const { overrides = [], children } = props;
        return (
            <MarkdownWithOverrides overrides={{ ...defaultOverrides, ...namedComponents, ...overrides }}>
                {children}
            </MarkdownWithOverrides>
        );
    };

    const PropDocumentation = props => {
        const { name, allDocs } = props;
        try {
            const foundDocumentation = Object.keys(allDocs).find(keyDoc => {
                const splitPath = keyDoc.split('/');
                const componentName = splitPath[splitPath.length - 1].replace('.tsx', '');
                return componentName === name;
            });
            const docs = allDocs[foundDocumentation].find(doc => doc.displayName === name);

            const docsParsed = docsToMarkdown(docs)
                .replace(/&#124;/g, '&separator;')
                .replace(/&#91;/g, '&openbracket;')
                .replace(/&#93;/g, '&closebracket;');

            if (docsParsed.includes('No props')) {
                return null;
            }

            return (
                <MarkdownJsx
                    overrides={{
                        h2: () => <h3>{name} Props</h3>,
                    }}
                >
                    {docsParsed}
                </MarkdownJsx>
            );
        } catch (e) {
            return null;
        }
    };

    const componentImportStatements = relatedComponents
        .map((component, index) => {
            const isFirst = index === 0;
            const isLast = relatedComponents.length === index + 1;
            const isNamedExport = component.isNamedExport;

            const useOpenBracket = isNamedExport && isFirst;
            const useClosingBracket = isNamedExport && isLast;

            const useCommaSeparator = isNamedExport && !isLast;

            const openingBracket = useOpenBracket ? '{' : '';
            const commaSeparator = useCommaSeparator ? ', ' : '';
            const closingBracket = useClosingBracket ? '}' : '';

            return `${openingBracket} ${component.name}${commaSeparator} ${closingBracket}`;
        })
        .join('')
        // replaces multiple white spaces with single
        .replace(/ +(?= )/g, '');

    const tooManyExports = relatedComponents.length > 15;
    return (
        <>
            <SEO
                title={componentName}
                description={`${componentName} in our component library at version ${pkgJson.version}`}
            />
            <h1>{componentName}</h1>

            <h2>Documentation</h2>
            {documentToReactComponents(designDocs)}

            <h3>Implementation Details</h3>

            <p>
                <a
                    href={`https://github.com/mindbody/design-system/tree/master/packages/${componentName}`}
                    target="_blank"
                >
                    Version {pkgJson.version} on GitHub
                </a>
            </p>

            {!tooManyExports &&
                relatedComponents.map(component => (
                    <p key={component.name}>
                        <a
                            href={`/coverage/lcov-report/${pkgJson.name.replace('@mbkit/', '')}/src/${
                                component.name
                            }.tsx`}
                            target="_blank"
                        >
                            View line by line code coverage for {component.name}
                        </a>
                    </p>
                ))}

            {relatedComponents.map(component => (
                <PropDocumentation key={component.name} name={component.name} allDocs={propDocs} />
            ))}

            {!tooManyExports && (
                <SyntaxHighlighter language="jsx" style={vsDark}>
                    {`import ${componentImportStatements} from "${pkgJson.name}"`}
                </SyntaxHighlighter>
            )}

            <MarkdownJsx>{devDocs}</MarkdownJsx>

            <MarkdownJsx>{changelog}</MarkdownJsx>
        </>
    );
};

export default ComponentDocumentation;
