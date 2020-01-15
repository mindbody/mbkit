import React from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';
import styles from './Nav.module.scss';
import { pathnameContainsCurrentPage } from './TopNav';

export const SideNav = props => {
    const { menu, isMobile } = props;

    let subMenu;
    menu.forEach(item => {
        if (pathnameContainsCurrentPage(item.to)) {
            subMenu = item.menu;
        }
    });

    if (!subMenu || subMenu.length === 0) {
        return null;
    }
    const sideNavClassNames = classnames({
        [styles.sidenav]: true,
        [styles.hidden]: isMobile,
    });
    return (
        <aside>
            <nav className={sideNavClassNames}>
                <ul>
                    {subMenu
                        .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1))
                        .map(item => {
                            const sideNavClassNames = classnames({
                                [styles.item]: true,
                                [styles.active]: pathnameContainsCurrentPage(item.to),
                            });
                            const hasChildren = item.menu && item.menu.length > 0;
                            return (
                                <li key={item.title} className={sideNavClassNames}>
                                    <Link to={item.to}>{item.title}</Link>

                                    <ul>
                                        {hasChildren &&
                                            item.menu.map(subMenu => (
                                                <li key={subMenu.to}>
                                                    <Link to={subMenu.to}>{subMenu.title}</Link>
                                                </li>
                                            ))}
                                    </ul>
                                </li>
                            );
                        })}
                </ul>
            </nav>
        </aside>
    );
};
