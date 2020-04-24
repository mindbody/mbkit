import React from 'react';
import SEO from '../components/seo';
import MarkdownWithOverrides from '../components/MarkdownWithOverrides/MarkdownWithOverrides';

const PageTemplate = props => {
    const { title, content } = props.pageContext.page;
    const pageContent = content.content || '';

    return (
        <>
            <SEO title={title} />
            <h1>{title}</h1>
            <MarkdownWithOverrides>{pageContent}</MarkdownWithOverrides>
        </>
    );
};

export default PageTemplate;
