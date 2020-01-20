import React from 'react';
import { Link } from 'gatsby';
import { INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import SEO from '../components/seo';
import styles from './home.module.scss';
import classnames from 'classnames';

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
        guideImages,
        gettingStartedImages,
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
    const gettingStartedClassNames = classnames({
        [styles.gettingStarted]: true,
        [styles.card]: true,
    });
    return (
        <>
            <SEO title={title} />
            <div className={styles.card}>
                <div className={styles.banner}>
                    <h1>{title}</h1>
                    {documentToReactComponents(description.json, options)}
                </div>

                <div className={styles.guides}>
                    <h2>{guideHeader}</h2>
                    <div className={styles.allGuides}>
                        {guides.map((guide, index) => (
                            <Link to={guideLinks[index]} className={styles.blockLink} key={guide}>
                                <div className={styles.roundImage}>
                                    <img src={guideImages[index]} alt={`${guide} logo`} />
                                </div>
                                <h3>{guide}</h3>
                                <p>{guideDescription[index]}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className={gettingStartedClassNames}>
                <h2>{gettingStartedHeader}</h2>

                {documentToReactComponents(gettingStartedDescription.json, options)}

                <div className={styles.gettingStartedContainer}>
                    {gettingStarted.map((gettingStarted, index) => (
                        <Link to={gettingStartedLinks[index]} key={gettingStarted} className={styles.blockLink}>
                            <div className={styles.roundImage}>
                                <img src={gettingStartedImages[index]} alt={`${gettingStarted} logo`} />
                            </div>
                            <div>
                                <h3>{gettingStarted}</h3>
                                <p>{gettingStartedDescriptions[index]}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HomePageTemplate;
