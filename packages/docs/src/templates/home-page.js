import React from 'react';
import { Link } from 'gatsby';
import { INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import SEO from '../components/seo';

const HomePageTemplate = props => {
    const {
        title,
        description,
        guides,
        guideHeader,
        guideDescription,
        guideLinks,
        gettingStartedHeader,
        gettingStartedDescription,
        gettingStarted,
        gettingStartedDescriptions,
        gettingStartedLinks,
    } = props.pageContext.homePage;
    const options = {
        renderNode: {
            [INLINES.HYPERLINK]: node => {
                const text = node.content[0].value;
                const linkTo = node.data.uri;
                if (linkTo.includes('http')) {
                    return (
                        <a href={linkTo} target="_blank" rel="nofollow">
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
            {documentToReactComponents(description.json, options)}

            <h2>{guideHeader}</h2>

            {guides.map((guide, index) => (
                <Link to={guideLinks[index]} key={guide}>
                    <h3>{guide}</h3>
                    <p>{guideDescription[index]}</p>
                </Link>
            ))}

            <h2>{gettingStartedHeader}</h2>

            {documentToReactComponents(gettingStartedDescription.json, options)}

            {gettingStarted.map((gettingStarted, index) => (
                <Link to={gettingStartedLinks[index]} key={gettingStarted}>
                    <h3>{gettingStarted}</h3>
                    <p>{gettingStartedDescriptions[index]}</p>
                </Link>
            ))}
        </>
    );
};

export default HomePageTemplate;
