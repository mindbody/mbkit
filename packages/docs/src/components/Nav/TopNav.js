import React from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';
import styles from './Nav.module.scss';

export const TopNav = props => {
    const { menu, isMobile } = props;
    const topNavClassNames = classnames({
        [styles.topNav]: true,
        [styles.hidden]: isMobile,
    });
    return (
        <header className={topNavClassNames}>
            <nav className={styles.links}>
                <Link to="/" className={styles.homeLink}>
                    <img src="/mindbody-nav-logo.svg" alt="MINDBODY Logo" />
                </Link>
                <div className={styles.navigation}>
                    {menu
                        .sort((a, b) => a.order - b.order)
                        .map(item => {
                            if (item.title === 'Home') {
                                return null;
                            }
                            const linkClassNames = classnames({
                                [styles.active]: pathnameContainsCurrentPage(item.to),
                            });
                            return (
                                <Link key={item.to} to={item.to} className={linkClassNames}>
                                    {item.title}
                                </Link>
                            );
                        })}
                </div>
            </nav>
        </header>
    );
};

export function pathnameContainsCurrentPage(path) {
    if (typeof window !== 'undefined') {
        return window.location.pathname.includes(path);
    }
    return false;
}
