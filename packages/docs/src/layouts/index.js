import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styles from './index.module.scss';
import { TopNav } from '../components/Nav/TopNav';
import { MobileNav } from '../components/Nav/MobileNav';
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';
import '@reach/skip-nav/styles.css';
import { SideNav } from '../components/Nav/SideNav';
import classnames from 'classnames';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { Text } from '@mbkit/typography';
import { ThemeProvider } from '@mbkit/theme';

const query = graphql`
    query {
        allSitePage {
            edges {
                node {
                    id
                    path
                    context {
                        componentContext {
                            componentName
                        }
                        page {
                            title
                            order
                        }
                    }
                }
            }
        }
        allContentfulPage {
            nodes {
                order
                slug
                title
            }
        }
    }
`;

function getTitleFromPath(path) {
    const pathSplit = path.split('/');
    return pathSplit[pathSplit.length - 1].replace(/\//g, '').replace(/-/g, ' ');
}
// Recursive function that takes current item and finds direct children,
// then compares child to see if they have any matching children till there are no more children
function findMatchingChildren(currentNavItem, allPages) {
    // filter items based on included values
    const matchingItems = allPages.filter(_item => {
        const isDirectChild = _item.path.split('/').length - 1 === currentNavItem.to.split('/').length;
        const matchingPaths = _item.path.includes(currentNavItem.to);

        return matchingPaths && isDirectChild;
    });

    const menu = matchingItems.map(item => ({ title: item.title, to: item.path, order: item.order }));
    return {
        ...currentNavItem,
        menu: menu.map(menuItem => findMatchingChildren(menuItem, allPages)),
    };
}

const Layout = props => {
    const { pageContext, path } = props;
    const allPages = useStaticQuery(query);
    const [menuItems, setMenuItems] = React.useState([]);

    React.useEffect(() => {
        try {
            let sitemap = [];

            // sort for order and remove 404 pages
            const itemsSorted = allPages.allSitePage.edges
                .sort((a, b) => a.node.path.length - b.node.path.length)
                .filter(item => !item.node.path.includes('404'));

            // removing `node` as key
            const pagesWithOrderFlattened = allPages.allContentfulPage.nodes.map(page => page);

            const itemsFlattened = itemsSorted
                // trim items down to simple objects
                .map(item => {
                    let title = '';
                    let order = null;
                    // Use page/component {title} in sidebar nav item
                    if (item.node.context.page) {
                        title = item.node.context.page.title;
                        order = item.node.context.page.order;
                    } else if (item.node.context.componentContext) {
                        title = item.node.context.componentContext.componentName;
                    } else {
                        title = getTitleFromPath(item.node.path);
                    }

                    return {
                        title: title,
                        path: item.node.path,
                        order,
                    };
                });

            itemsFlattened.forEach(item => {
                const isTopLevelNav = item.path.split('/').length === 2;
                const page = pagesWithOrderFlattened.find(i => i.slug === item.path.replace('/', ''));
                const order = page ? page.order : null;
                if (isTopLevelNav) {
                    if (item.path === '/') {
                        sitemap.push({
                            title: 'Home',
                            to: item.path,
                            order,
                        });
                        return;
                    }
                    sitemap.push({
                        title: item.title,
                        to: item.path,
                        order,
                    });
                }
            });
            // iterate over all top level nav items and recursively find children
            sitemap = sitemap.map(item => {
                if (item.to === '/') {
                    return item;
                }

                return findMatchingChildren(item, itemsFlattened);
            });

            setMenuItems(sitemap);
        } catch (e) {
            console.log(e);
        }
    }, [allPages]);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            detectIfMobile();
            window.addEventListener('resize', detectIfMobile);
        }
        return () => {
            if (window !== undefined) {
                window.removeEventListener('resize', detectIfMobile);
            }
        };
    }, []);
    function detectIfMobile() {
        // TODO consume theme to get mobile breakpoint variable
        setIsMobile(window.innerWidth < 800);
    }

    // if this doesn't exist, it should have a sidebar
    const fullPage = pageContext.layout && pageContext.layout === 'fullPage';

    const containerClassNames = classnames({
        [styles.contentContainer]: true,
        [styles.useSidebar]: !fullPage,
    });

    const contentClassNames = classnames({
        [styles.content]: true,
        [styles.fullPage]: fullPage,
    });
    const skipNavClassNames = classnames({
        [styles.skipNavContent]: true,
        [styles.fullPage]: fullPage,
    });

    return (
        <>
            <ThemeProvider>
                <SkipNavLink />
                <TopNav menu={menuItems} isMobile={isMobile} />
                <MobileNav path={path} menu={menuItems} isMobile={isMobile} />
                <div className={containerClassNames}>
                    <SideNav menu={menuItems} isMobile={isMobile} path={path} />
                    <SkipNavContent className={skipNavClassNames}>
                        <main className={contentClassNames}>
                            <Breadcrumbs isFullPage={fullPage} />
                            {props.children}
                        </main>
                        <footer className={styles.footer}>
                            <Text size={6} color="meta">
                                Copyright &copy; {new Date().getFullYear()} MINDBODY Inc.
                            </Text>
                        </footer>
                    </SkipNavContent>
                </div>
            </ThemeProvider>
        </>
    );
};

export default Layout;
