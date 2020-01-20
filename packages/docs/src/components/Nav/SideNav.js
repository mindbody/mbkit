import React, { useState } from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';
import styles from './Nav.module.scss';
import { pathnameContainsCurrentPage } from './TopNav';
import { useEffect } from 'react';
import { IconChevronDown } from '@mindbody/icon';

export const SideNav = props => {
    const { menu, isMobile, path } = props;
    const [subMenu, setSubMenu] = useState([]);

    useEffect(() => {
        if (path === '/') {
            setSubMenu([]);
        } else {
            menu.forEach(item => {
                if (pathnameContainsCurrentPage(item.to)) {
                    if (item.menu) {
                        setSubMenu(item.menu);
                    }
                }
            });
        }
    }, [menu, path]);

    if (subMenu.length === 0) {
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
                            return <RecursiveSubNav key={item.to} {...item} path={path} />;
                        })}
                </ul>
            </nav>
        </aside>
    );
};

const RecursiveSubNav = props => {
    const { title, to, menu = [], path = '' } = props;
    const hasChildren = menu.length > 0;
    const [nestedNavOpen, setNestedNavOpen] = useState(false);
    useEffect(() => {
        if (typeof path === 'string') {
            setNestedNavOpen(path.includes(to));
        }
    }, [path]);
    const itemClassNames = classnames({
        [styles.item]: true,
        [styles.active]: pathnameContainsCurrentPage(to),
    });
    const subnavClassnames = classnames({
        [styles.subnav]: true,
        [styles.open]: nestedNavOpen,
    });
    const toggleButtonClassNames = classnames({
        [styles.navToggle]: true,
        [styles.open]: nestedNavOpen,
        [styles.activePage]: pathnameContainsCurrentPage(to),
    });
    return (
        <li className={itemClassNames}>
            <Link to={to} className={styles.link}>
                {title}
            </Link>

            {hasChildren && (
                <>
                    <button className={toggleButtonClassNames} onClick={() => setNestedNavOpen(!nestedNavOpen)}>
                        <IconChevronDown />
                    </button>
                    <ul className={subnavClassnames}>
                        {menu
                            .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1))
                            .map(subMenu => (
                                <RecursiveSubNav key={subMenu.to} {...subMenu} />
                            ))}
                    </ul>
                </>
            )}
        </li>
    );
};
