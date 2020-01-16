import React, { useEffect, useState, useRef } from 'react';
import styles from './Nav.module.scss';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { IconChevronDown, IconClose, IconListInactive } from '@mindbody/icon';

const noop = () => {};

export function MobileNav(props) {
    const { menu = [], isMobile, className, path, onClick = noop, ...rest } = props;

    const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
    function handleLinkClick() {
        if (mobileNavOpen) {
            setMobileNavOpen(false);
        }
    }

    // Make body not scrollable if mobile and menu is open
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
    return (
        <div className={containerClassName}>
            <header className={styles.header}>
                <Link onClick={() => setMobileNavOpen(!mobileNavOpen)} to="/" className={styles.homeLink}>
                    <img src="/mindbody-nav-logo.svg" alt="MINDBODY Logo" />
                </Link>
                <button
                    className={styles.mobileNavButton}
                    onClick={() => setMobileNavOpen(!mobileNavOpen)}
                    aria-label={mobileNavOpen ? 'Close' : 'Open'}
                >
                    {mobileNavOpen ? <IconClose /> : <IconListInactive />}
                </button>
                {/* This div will eventually be replaced with a search bar */}
                <div />
            </header>
            <nav className={navClassName} aria-hidden={!mobileNavOpen} {...rest}>
                <ul>
                    {menu
                        .sort((a, b) => {
                            if (a.title === 'Home' || b.title === 'Home') return 1;
                            return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
                        })
                        .map(item => (
                            <RecursiveSubNav path={path} key={item.to} item={item} handleLinkClick={handleLinkClick} />
                        ))}
                </ul>
            </nav>
        </div>
    );
}

function RecursiveSubNav(props) {
    const { item, handleLinkClick, path = '' } = props;
    const { title, to, menu = [] } = item;

    const childrenRef = useRef(null);
    const [childrenHeight, setChildrenHeight] = useState('auto');
    useEffect(() => {
        if (childrenRef.current) {
            const { height } = childrenRef.current.getBoundingClientRect();
            if (height === 0) {
                setChildrenHeight('auto');
            } else {
                setChildrenHeight(height);
            }
        }
    }, [nestedNavOpen]);

    const [nestedNavOpen, setNestedNavOpen] = useState(false);
    useEffect(() => {
        if (typeof path === 'string') {
            setNestedNavOpen(path.includes(to));
        }
    }, [path]);

    const hasChildren = menu.length > 0;

    const mobileNavToggleButtonClassNames = classnames({
        [styles.mobileNavToggle]: true,
        [styles.open]: nestedNavOpen,
    });
    const nestedListClassNames = classnames({
        [styles.list]: true,
        [styles.open]: nestedNavOpen,
    });
    return (
        <li className={styles.listItem}>
            <Link onClick={handleLinkClick} to={to} className={styles.link}>
                {title}
            </Link>

            {hasChildren && (
                <>
                    <button
                        className={mobileNavToggleButtonClassNames}
                        onClick={() => setNestedNavOpen(!nestedNavOpen)}
                    >
                        <IconChevronDown />
                    </button>
                    <div style={{ height: nestedNavOpen ? childrenHeight : 0 }} className={nestedListClassNames}>
                        <ul ref={childrenRef}>
                            {menu.map(menuItem => (
                                <RecursiveSubNav
                                    path={path}
                                    key={menuItem.to}
                                    handleLinkClick={handleLinkClick}
                                    item={menuItem}
                                />
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </li>
    );
}
