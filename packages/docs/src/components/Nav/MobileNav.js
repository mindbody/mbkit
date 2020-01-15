import React, { useEffect } from 'react';
import styles from './Nav.module.scss';
import { Link } from 'gatsby';
import classnames from 'classnames';

const noop = () => {};

export function MobileNav(props) {
    const { menu = [], isMobile, className, onClick = noop, ...rest } = props;
    const [visibleChildren, setVisibleChildren] = React.useState([]);

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

    const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
    function handleLinkClick() {
        if (mobileNavOpen) {
            setMobileNavOpen(false);
        }
    }

    useEffect(() => {
        const hasWindow = typeof window !== 'undefined';
        if (isMobile && mobileNavOpen && hasWindow) {
            document.body.style.overflow = 'hidden';
        } else {
            if (hasWindow) {
                document.body.style.overflow = '';
            }
        }
    }, [isMobile, mobileNavOpen]);

    useEffect(() => {
        const hasWindow = typeof window !== 'undefined';
        if (hasWindow) {
            if (mobileNavOpen) {
                document.addEventListener('keydown', closeOnEscape);
            } else {
                document.removeEventListener('keydown', closeOnEscape);
            }
        }

        return () => {
            if (hasWindow && mobileNavOpen) {
                document.removeEventListener('keydown', closeOnEscape);
            }
        };
    }, [mobileNavOpen]);

    function closeOnEscape(event) {
        if (event.key === 'Escape') {
            setMobileNavOpen(false);
        }
    }

    if (menu.length === 0) {
        return null;
    }

    const containerClassName = classnames({
        [styles.mobileNavContainer]: true,
        [styles.hidden]: !isMobile,
    });
    const navClassName = classnames({
        [styles.mobileNav]: true,
        [styles.mobileNavOpen]: mobileNavOpen,
        [className]: className,
    });
    const veilClassName = classnames({
        [styles.veil]: true,
        [styles.open]: mobileNavOpen,
    });

    return (
        <div className={containerClassName}>
            <header className={styles.header}>
                <Link to="/" className={styles.homeLink}>
                    <img src="/mindbody-nav-logo.svg" alt="MINDBODY Logo" />
                </Link>
            </header>
            <div className={veilClassName} aria-hidden={!mobileNavOpen} onClick={() => setMobileNavOpen(false)} />
            <button className={styles.mobileNavButton} onClick={e => setMobileNavOpen(!mobileNavOpen)} />
            <nav className={navClassName} aria-hidden={!mobileNavOpen} {...rest}>
                <ul>
                    {menu
                        .sort((a, b) => {
                            if (a.title === 'Home' || b.title === 'Home') return 1;
                            return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
                        })
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
                                            <Link onClick={handleLinkClick} to={item.to}>
                                                {item.title}
                                            </Link>
                                        )) ||
                                            item.title}
                                    </div>
                                    {hasChildren && (
                                        <ul>
                                            {item.menu.map(child => (
                                                <li key={child.to}>
                                                    <Link to={child.to} onClick={handleLinkClick}>
                                                        {child.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                </ul>
            </nav>
        </div>
    );
}
