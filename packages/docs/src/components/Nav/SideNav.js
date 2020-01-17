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
                            return <RecursiveSubNav key={item.to} {...item} />;
                        })}
                </ul>
            </nav>
        </aside>
    );
};

const RecursiveSubNav = props => {
    const { title, to, menu = [] } = props;
    const hasChildren = menu.length > 0;
    const itemClassNames = classnames({
        [styles.item]: true,
        [styles.active]: pathnameContainsCurrentPage(to),
    });
    return (
        <li className={itemClassNames}>
            <Link to={to}>{title}</Link>

            {hasChildren && (
                <ul>
                    {menu
                        .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1))
                        .map(subMenu => (
                            <RecursiveSubNav key={subMenu.to} {...subMenu} />
                        ))}
                </ul>
            )}
        </li>
    );
};
