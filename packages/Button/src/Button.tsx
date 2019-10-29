import React, { RefObject } from 'react';
import classnames from 'classnames';
import styles from './Button.scss';

export type ButtonProps = {
    variant:
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'primaryOutlined'
        | 'secondaryOutlined'
        | 'tertiaryOutlined'
        | 'offCard'
        | 'simpleText'
        | 'icon'
        | 'iconPrimary';
    size?: '1' | '2' | '3' | '4';
    loading?: boolean;
    disabled?: boolean;
};
const noop = () => {};
export const Button: React.FC<ButtonProps & React.HTMLAttributes<HTMLButtonElement>> = React.forwardRef(
    (props: ButtonProps & React.HTMLAttributes<HTMLButtonElement>, ref: RefObject<HTMLButtonElement>) => {
        const {
            variant,
            size = '3',
            loading,
            className = '',
            onClick = noop,
            children,
            disabled = false,
            ...rest
        } = props;
        const buttonRef = React.useRef<HTMLSpanElement>(null);
        function generateRipple(e: React.MouseEvent<HTMLButtonElement>) {
            // disable ripple if in these states
            if (variant === 'simpleText' || disabled || loading) {
                return;
            }

            const btn = buttonRef.current;
            if (!btn) {
                return;
            }

            const posX = e.clientX - btn.getBoundingClientRect().left;
            const posY = e.clientY - btn.getBoundingClientRect().top;
            const ripple = document.createElement('div');
            ripple.className = styles.ripple;

            ripple.style.top = `${posY - 6}px`;
            ripple.style.left = `${posX - 6}px`;
            btn.appendChild(ripple);

            setTimeout(() => {
                btn.removeChild(ripple);
            }, Number(styles.rippleTiming));
        }

        const classNames = classnames({
            [styles.button]: true,
            [styles[`size${size}`]]: true,
            [styles[variant]]: true,
            [styles.loading]: loading,
            [className]: className,
        });

        // setting onMouseDown on span because when clicked it doesn't add the focus ring
        // focus ring still set when tabbed to the button element
        return (
            <button {...rest} className={classNames} onClick={loading ? noop : onClick} disabled={disabled} ref={ref}>
                {/* eslint-disable-next-line */}
                <span tabIndex={-1} onMouseDown={generateRipple} className={styles.children} ref={buttonRef}>
                    {children}
                </span>
                {loading && <div className={styles.loader}>Loading...</div>}
            </button>
        );
    },
);
