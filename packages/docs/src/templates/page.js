import React from 'react';
import { Link } from 'gatsby';
import { INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import SEO from '../components/seo';
import MarkdownWithOverrides from '../components/MarkdownWithOverrides/MarkdownWithOverrides';

const PageTemplate = props => {
    const { title, content } = props.pageContext.page;

    return (
        <>
            <SEO title={title} />
            <h1>{title}</h1>
            <MarkdownWithOverrides>{content.content}</MarkdownWithOverrides>
        </>
    );
};

export default PageTemplate;
