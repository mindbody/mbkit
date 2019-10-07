import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styles from './index.module.scss';
import { SiteMapNav } from '../components/Nav/Nav';
import { useNetlifyIdentity } from 'react-netlify-identity';
import { UserAuth } from '../auth/UserAuth';

const url = 'https://friendly-bose-a575fc.netlify.com/';
export const IdentityContext = React.createContext();

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
    const identity = useNetlifyIdentity(url);
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
        <IdentityContext.Provider value={identity}>
            {identity.isLoggedIn && identity.isConfirmedUser ? (
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
            ) : (
                <UserAuth />
            )}
        </IdentityContext.Provider>
    );
};

export default Layout;
