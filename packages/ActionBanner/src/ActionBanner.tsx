import React, { forwardRef, FC, RefObject, AllHTMLAttributes, HTMLProps, useState, useEffect, useRef } from 'react';
import Alert, { AlertProps } from '@reach/alert';
import classnames from 'classnames';
import styles from './ActionBanner.scss';

export type ActionBannerProps = AllHTMLAttributes<HTMLDivElement> &
    HTMLProps<HTMLDivElement> &
    AlertProps & {
        /** Determines whether the action banner will be visible */
        show: boolean;
        /** When user clicks on the close icon this will be called */
        onClose: () => void;
        /** Determines the color variant that will be displayed */
        variant: 'warning' | 'error';
    };

const CloseIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32">
        <defs>
            <path
                id="path-1-ad645vBcsnp8uI-Dbkgds"
                d="M7.6440993 7.64644661c.19526214-.19526215.51184463-.19526215.70710678 0L15.9986527 15.294l7.6477939-7.64755339c.1952622-.19526215.5118446-.19526215.7071068 0 .1952621.19526215.1952621.51184464 0 .70710678L16.7056527 16.001l7.6479007 7.6477938c.1735663.1735663.1928515.4429907.0578554.6378589l-.0578554.0692479c-.1952622.1952621-.5118446.1952621-.7071068 0L15.9986527 16.708l-7.64744662 7.6479006c-.19526215.1952621-.51184464.1952621-.70710678 0-.19526215-.1952622-.19526215-.5118447 0-.7071068L15.2916527 16.001 7.6440993 8.35355339c-.17356635-.17356635-.1928515-.44299075-.05785545-.63785889z"
            ></path>
        </defs>
        <g id="Icons/UI/Close-ad645vBcsnp8uI-Dbkgds" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <mask id="mask-2-ad645vBcsnp8uI-Dbkgds" fill="#fff">
                <use xlinkHref="#path-1-ad645vBcsnp8uI-Dbkgds"></use>
            </mask>
            <use id="Close-ad645vBcsnp8uI-Dbkgds" fill="#54575F" xlinkHref="#path-1-ad645vBcsnp8uI-Dbkgds"></use>
        </g>
    </svg>
);

export const ActionBanner: FC<ActionBannerProps> = forwardRef(
    (props: ActionBannerProps, ref: RefObject<HTMLDivElement>) => {
        const { className = '', variant, children, onClose, show, ...rest } = props;
        const [internalShow, setInternalShow] = useState(show);
        const classNames = classnames({
            [styles.actionBanner]: true,
            [styles[variant]]: true,
            [styles.hideActionBanner]: !show,
            [className]: className,
        });

        const [height, setHeight] = useState(0);
        const containerRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (show) {
                // show right away
                setInternalShow(show);
            } else {
                setHeight(0);
                // otherwise allow animation to complete then close it
                const timeout = setTimeout(() => {
                    setInternalShow(show);
                }, Number(styles.transitionTime));

                return () => {
                    clearTimeout(timeout);
                };
            }
        }, [show]);
        useEffect(() => {
            if (show) {
                if (containerRef.current) {
                    const child: ChildNode | null = containerRef.current.firstChild;
                    if (child instanceof HTMLElement) {
                        setHeight(child.getBoundingClientRect().height);
                    }
                }
            } else {
                setHeight(0);
            }
        }, [internalShow]);

        if (!internalShow) {
            return null;
        }
        return (
            <div style={{ height }} ref={containerRef} className={styles.container}>
                <Alert {...rest} className={classNames} ref={ref}>
                    {children}
                    <button className={styles.closeIcon} onClick={onClose} data-testid="actionBannerCloseIcon">
                        <CloseIcon />
                    </button>
                </Alert>
            </div>
        );
    },
);
ActionBanner.displayName = 'ActionBanner';
