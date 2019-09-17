import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styles from './index.module.scss';
import { SiteMapNav } from '../components/Nav/Nav';
const classnames = require('classnames');

const query = graphql`
    query {
        allSitePage {
            edges {
                node {
                    id
                    path
                }
            }
        }
    }
`;

const Layout = props => {
    const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
    const layoutStyles = classnames({
        [styles.container]: true,
        [styles.open]: mobileNavOpen,
    });

    function handleLinkClick() {
        if (mobileNavOpen) {
            setMobileNavOpen(false);
        }
    }
    return (
        <div className={layoutStyles}>
            <div className={styles.navContainer}>
                <nav className={styles.nav}>
                    <StaticQuery
                        query={query}
                        render={data => <SiteMapNav allPages={data} onClick={handleLinkClick} />}
                    />
                </nav>
                <button className={styles.mobileNavButton} onClick={e => setMobileNavOpen(!mobileNavOpen)} />
            </div>
            <main className={styles.main}>{props.children}</main>
        </div>
    );
};

export default Layout;
