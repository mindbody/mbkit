import React from 'react';
import styles from './Nav.module.scss';
import { Link } from 'gatsby';
const classnames = require('classnames');

const noop = () => {};

// Recursive function that takes current item and finds direct children,
// then compares child to see if they have any matching children till there are no more children
function findMatchingChildren(currentNavItem, allPages) {
    // filter items based on included values
    const matchingItems = allPages.filter(_item => {
        const isDirectChild = _item.path.split('/').length - 1 === currentNavItem.to.split('/').length;
        const matchingPaths = _item.path.includes(currentNavItem.to);

        return matchingPaths && isDirectChild;
    });

    const menu = matchingItems.map(item => ({ title: item.title, to: item.path }));

    return {
        ...currentNavItem,
        menu: menu.map(menuItem => findMatchingChildren(menuItem, allPages)),
    };
}

function getTitleFromPath(path) {
    const pathSplit = path.split('/');
    return pathSplit[pathSplit.length - 1].replace(/\//g, '').replace(/-/g, ' ');
}

export function SiteMapNav(props) {
    const { allPages, ...rest } = props;
    const [menuItems, setMenuItems] = React.useState([]);
    const [visibleChildren, setVisibleChildren] = React.useState([]);
    React.useEffect(() => {
        try {
            let sitemap = [];

            // sort for order
            const itemsSorted = allPages.allSitePage.edges.sort((a, b) => a.node.path.length - b.node.path.length);
            // removing `node` as key
            const itemsFlattened = itemsSorted.map(item => ({
                title: getTitleFromPath(item.node.path),
                path: item.node.path,
            }));
            // remove 404 pages
            const allPagesExcept404 = itemsFlattened.filter(item => !item.path.includes('404'));

            allPagesExcept404.forEach(item => {
                const isTopLevelNav = item.path.split('/').length === 2;

                if (isTopLevelNav) {
                    if (item.path === '/') {
                        sitemap.push({
                            title: 'Home',
                            to: item.path,
                        });
                        return;
                    }
                    sitemap.push({
                        title: item.title,
                        to: item.path,
                    });
                }
            });
            // iterate over all top level nav items and recursively find children
            sitemap = sitemap.map(item => {
                if (item.to === '/') {
                    return item;
                }

                return findMatchingChildren(item, allPagesExcept404);
            });

            setMenuItems(sitemap);
            setVisibleChildren(itemsFlattened.map(item => ({ title: item.title, isVisible: true })));
        } catch (e) {
            console.log(e);
        }
    }, [allPages]);

    return <Nav menu={menuItems} visibleChildren={visibleChildren} setVisibleChildren={setVisibleChildren} {...rest} />;
}

export default function Nav(props) {
    const { menu = [], className, onClick = noop, visibleChildren, setVisibleChildren, ...rest } = props;

    React.useEffect(() => {
        if (menu.length > 0 && visibleChildren.length === 0) {
            menu.map(item => ({ isVisible: true, title: item.title }));
        }
    }, [menu]);

    function handleVisibleChange(item) {
        const updatedVisibility = visibleChildren.map(c => {
            if (c.title === item.title) {
                return {
                    ...c,
                    isVisible: !c.isVisible,
                };
            }
            return c;
        });
        setVisibleChildren(updatedVisibility);
    }

    if (menu.length === 0) {
        return null;
    }

    const navClassName = classnames({
        [styles.menu]: true,
        [className]: className,
    });
    return (
        <nav className={navClassName} {...rest}>
            <ul>
                {menu
                    .sort((a, b) => a.to[0] > b.to[0])
                    .map(item => {
                        const hasChildren = item.menu && item.menu.length > 0;
                        const { isVisible } = visibleChildren.find(c => c.title === item.title) || {};
                        const buttonClassnames = classnames({
                            [styles.menu__item__toggleChildren]: true,
                            [styles.menu__item__toggleChildrenOpened]: isVisible,
                        });

                        return (
                            <li key={item.title}>
                                <div className={styles.menu__item}>
                                    {(item.to && (
                                        <Link onClick={onClick} to={item.to}>
                                            {item.title}
                                        </Link>
                                    )) ||
                                        item.title}{' '}
                                    {hasChildren && (
                                        <button
                                            onClick={() => handleVisibleChange(item)}
                                            className={buttonClassnames}
                                        />
                                    )}
                                </div>
                                {hasChildren && isVisible && (
                                    <Nav
                                        menu={item.menu}
                                        visibleChildren={visibleChildren}
                                        setVisibleChildren={setVisibleChildren}
                                        onClick={onClick}
                                    />
                                )}
                            </li>
                        );
                    })}
            </ul>
        </nav>
    );
}
