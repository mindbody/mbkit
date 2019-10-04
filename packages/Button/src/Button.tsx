import React from 'react';
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
        | 'incognito';
    size?: '1' | '2' | '3' | '4';
    loading?: boolean;
    disabled?: boolean;
};
const noop = () => {};
const Button: React.FC<ButtonProps & React.HTMLAttributes<HTMLButtonElement>> = (
    props: ButtonProps & React.HTMLAttributes<HTMLButtonElement>,
) => {
    const {
        variant,
        size = '3',
        loading,
        className = '',
        onClick = noop,
        children,
        onMouseDown,
        disabled = false,
        ...rest
    } = props;
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    function generateRipple(e: React.MouseEvent<HTMLButtonElement>) {
        // disable ripple if in these states
        if (variant === 'incognito' || disabled || loading) {
            return;
        }

        const btn = buttonRef.current;
        if (!btn) {
            return;
        }

        const posX = e.pageX - btn.getBoundingClientRect().left;
        const posY = e.pageY - btn.getBoundingClientRect().top;
        const ripple = document.createElement('div');
        ripple.className = styles.ripple;

        ripple.style.top = `${posY - 4}px`;
        ripple.style.left = `${posX - 4}px`;
        btn.appendChild(ripple);

        setTimeout(() => {
            btn.removeChild(ripple);
        }, Number(styles.rippleTiming));
    }
    function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
        if (typeof onMouseDown === 'function') {
            onMouseDown(e);
        }
        generateRipple(e);
    }

    const classNames = classnames({
        [styles.button]: true,
        [styles[`size${size}`]]: true,
        [styles[variant]]: true,
        [styles.loading]: loading,
        [className]: className,
    });
    return (
        <button
            {...rest}
            ref={buttonRef}
            className={classNames}
            onClick={loading ? noop : onClick}
            onMouseDown={handleMouseDown}
            disabled={disabled}
        >
            <span className={styles.children}>{children}</span>
            {loading && <div className={styles.loader}>Loading...</div>}
        </button>
    );
};

export default Button;
