import React, { FC, forwardRef, AllHTMLAttributes, HTMLProps } from 'react';
import { AlertDialog, AlertDialogLabel } from '@reach/alert-dialog';
import { AlertDialogProps } from '@reach/alert-dialog';
import classnames from 'classnames';
import styles from './Dialog.scss';
import '@reach/dialog/styles.css';

export type DialogProps = AllHTMLAttributes<HTMLDivElement> &
    HTMLProps<HTMLDivElement> &
    AlertDialogProps & {
        /** Determines whether the dialog is open or not */
        show: boolean;
        /** This is the title and is read to the screen reader */
        header: string;
        /** Function that is called when user clicks the close "X" icon */
        onClose: () => void;
    };

// TODO consume button and close icon
const CloseIcon = (props: any) => (
    <svg width="32" height="32" viewBox="0 0 32 32" {...props}>
        <defs>
            <path
                id="path-1-YCcq7N9hUYyFxWI-pg_o5"
                d="M7.6440993 7.64644661c.19526214-.19526215.51184463-.19526215.70710678 0L15.9986527 15.294l7.6477939-7.64755339c.1952622-.19526215.5118446-.19526215.7071068 0 .1952621.19526215.1952621.51184464 0 .70710678L16.7056527 16.001l7.6479007 7.6477938c.1735663.1735663.1928515.4429907.0578554.6378589l-.0578554.0692479c-.1952622.1952621-.5118446.1952621-.7071068 0L15.9986527 16.708l-7.64744662 7.6479006c-.19526215.1952621-.51184464.1952621-.70710678 0-.19526215-.1952622-.19526215-.5118447 0-.7071068L15.2916527 16.001 7.6440993 8.35355339c-.17356635-.17356635-.1928515-.44299075-.05785545-.63785889z"
            ></path>
        </defs>
        <g id="Icons/UI/Close-YCcq7N9hUYyFxWI-pg_o5" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <mask id="mask-2-YCcq7N9hUYyFxWI-pg_o5" fill="#fff">
                <use xlinkHref="#path-1-YCcq7N9hUYyFxWI-pg_o5"></use>
            </mask>
            <use id="Close-YCcq7N9hUYyFxWI-pg_o5" fill="#54575F" xlinkHref="#path-1-YCcq7N9hUYyFxWI-pg_o5"></use>
        </g>
    </svg>
);

export const Dialog: FC<DialogProps> = forwardRef((props: DialogProps, ref) => {
    const { children, header, className = '', show, onClose, ...rest } = props;
    const closeRef = React.useRef(null);
    const classNames = classnames({
        [styles.dialog]: true,
        [className]: className,
    });
    return (
        <AlertDialog {...rest} className={classNames} isOpen={show} leastDestructiveRef={closeRef} ref={ref}>
            <button onClick={onClose} ref={closeRef}>
                <CloseIcon />
            </button>
            <AlertDialogLabel>{header}</AlertDialogLabel>
            {children}
        </AlertDialog>
    );
});
Dialog.displayName = 'Dialog';
3;
