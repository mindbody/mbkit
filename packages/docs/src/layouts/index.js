import React, { useEffect } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styles from './index.module.scss';
import { SiteMapNav } from '../components/Nav/Nav';
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';
import '@reach/skip-nav/styles.css';
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
    useEffect(() => {
        if (mobileNavOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('resize', disableScrollOnWindowOnly);
        } else {
            document.body.style.overflow = '';
            window.removeEventListener('resize', disableScrollOnWindowOnly);
        }

        return () => {
            window.removeEventListener('resize', disableScrollOnWindowOnly);
        };
    }, [mobileNavOpen]);

    function disableScrollOnWindowOnly() {
        const { clientWidth } = window.document.body;
        if (clientWidth >= 640) {
            setMobileNavOpen(false);
        }
    }
    return (
        <>
            <SkipNavLink />
            <div className={layoutStyles}>
                <div className={styles.navContainer}>
                    <nav className={styles.nav}>
                        <StaticQuery
                            query={query}
                            render={data => <SiteMapNav allPages={data} onClick={handleLinkClick} />}
                        />
                        <ul className={styles.footerNav}>
                            <li>
                                <a
                                    href="https://mindbodyonline.invisionapp.com/dsm/mindbody/1-mb-2-0"
                                    target="_blank"
                                    rel="nofollow"
                                >
                                    InVision DSM
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/mindbody/design-system" target="_blank" rel="nofollow">
                                    Github
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <button className={styles.mobileNavButton} onClick={e => setMobileNavOpen(!mobileNavOpen)} />
                </div>
                <SkipNavContent>
                    <main className={styles.main}>{props.children}</main>
                </SkipNavContent>
            </div>
        </>
    );
};

export default Layout;
