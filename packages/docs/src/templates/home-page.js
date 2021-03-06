import React from 'react';
import { Link } from 'gatsby';
import { INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import SEO from '../components/seo';
import styles from './home.module.scss';

const HomePageTemplate = props => {
    const {
        title,
        bannerImage,
        description,
        guides,
        guideDescription,
        guideLinks,
        guideImages,
    } = props.pageContext.homePage;
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
            <div className={styles.card}>
                <div className={styles.banner} style={{ backgroundImage: `url(${bannerImage})` }}>
                    <div className={styles.bannerText}>{documentToReactComponents(description.json, options)}</div>
                </div>
            </div>
            <div className={styles.homeLinks}>
                {guides.map((guide, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.roundImage}>
                            <img src={guideImages[index]} alt={`${guide} logo`} />
                        </div>
                        <Link to={guideLinks[index]} className={styles.blockLink} key={guide}>
                            <h3>{guide}</h3>
                        </Link>
                        <p>{guideDescription[index]}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default HomePageTemplate;
