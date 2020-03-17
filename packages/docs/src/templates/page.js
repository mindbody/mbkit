import React from 'react';
import { Link } from 'gatsby';
import { INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import SEO from '../components/seo';

const PageTemplate = props => {
    const { title, content } = props.pageContext.page;
    const options = {
        renderNode: {
            [INLINES.HYPERLINK]: node => {
                const text = node.content[0].value;
                const linkTo = node.data.uri;
                if (linkTo.includes('http')) {
                    return (
                        <a href={linkTo} target="_blank" rel="noopener noreferrer nofollow">
                            {text}
                        </a>
                    );
                }

                return <Link to={linkTo}>{text}</Link>;
            },
        },
    };
    return (
        <>
            <SEO title={title} />
            <h1>{title}</h1>
            {documentToReactComponents(content.json, options)}
        </>
    );
};

export default PageTemplate;
