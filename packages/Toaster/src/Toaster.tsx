import React, { FC, forwardRef, AllHTMLAttributes, RefObject, useState, useEffect, ReactNode } from 'react';
import Alert, { AlertProps } from '@reach/alert';
import Portal from '@reach/portal';
import classnames from 'classnames';
import styles from './Toaster.scss';

export type ToasterProps = AllHTMLAttributes<HTMLDivElement> &
    AlertProps & {
        /** Determines whether the toaster should be displayed or not */
        show: boolean;
        /** Optional icon. By default it uses success icon */
        icon?: ReactNode;
    };
// TODO import and replace once icons are published
const SuccessIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32">
        <g id="Icons/UI/Check-Mark-h0vLfPcVDEC0_quIoYhQP" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <path
                id="Mask-h0vLfPcVDEC0_quIoYhQP"
                fill="#54575F"
                d="M27.5 16c0-6.35129737-5.1493212-11.5-11.5-11.5C9.64729211 4.5 4.5 9.64760131 4.5 16c0 6.3523987 5.14729211 11.5 11.5 11.5 6.3506788 0 11.5-5.1487026 11.5-11.5zm1 0c0 6.903609-5.5970633 12.5-12.5 12.5-6.90500609 0-12.5-5.59533-12.5-12.5C3.5 9.09533001 9.09499391 3.5 16 3.5c6.9029367 0 12.5 5.59639099 12.5 12.5zm-17.887709 1.0027207c-.1743696-.2141258-.1421409-.5290635.0719848-.7034332.2141257-.1743696.5290635-.142141.7034332.0719848.6641119.8155287 1.2894506 1.5960867 1.876027 2.3416936.8362955 1.0630288 1.3141024 1.0501802 2.2452588-.0454453 1.305686-1.5363077 3.0093136-3.5337538 5.110935-5.9924.179426-.209907.4950427-.2346167.7049496-.0551908.209907.179426.2346167.4950427.0551908.7049496-2.1010562 2.457985-3.8041046 4.454752-5.1090931 5.9902391-1.3267689 1.5611145-2.5518258 1.5940572-3.7931791.0161527-.5830125-.7410768-1.2048519-1.5172668-1.865507-2.3285505z"
            ></path>
        </g>
    </svg>
);
export const Toaster: FC<ToasterProps> = forwardRef((props: ToasterProps, ref: RefObject<HTMLDivElement>) => {
    const { show, icon = <SuccessIcon />, className = '', children, ...rest } = props;

    // Internal show is used to allow transition to complete before completely removing element from screen
    const [internalShow, setInternalShow] = useState(show);
    useEffect(() => {
        if (show) {
            // show right away
            setInternalShow(show);
        } else {
            // otherwise allow animation to complete then close it
            const timeout = setTimeout(() => {
                setInternalShow(show);
            }, Number(styles.transitionTime));

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [show]);

    const classNames = classnames({
        [styles.toaster]: true,
        [styles.hideToaster]: !show,
        [className]: className,
    });

    if (!internalShow) {
        return null;
    }

    return (
        <Portal>
            <Alert {...rest} className={classNames} ref={ref}>
                <div className={styles.icon}>{icon}</div>
                <div className={styles.content}>{children}</div>
            </Alert>
        </Portal>
    );
});
Toaster.displayName = 'Toaster';
