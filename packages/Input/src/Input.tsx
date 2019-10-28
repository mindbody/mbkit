import React, { forwardRef, FC, RefObject, InputHTMLAttributes, ReactNode, HTMLAttributes } from 'react';
import classnames from 'classnames';
import styles from './Input.scss';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    /** Add text or icon here which shows as in front of the input field */
    before?: ReactNode;
    /** Add text or icon here which shows as after of the input field */
    after?: ReactNode;
    wrapperProps?: HTMLAttributes<HTMLDivElement>;
    invalid?: boolean;
};
export const Input: FC<InputProps> = forwardRef((props: InputProps, ref: RefObject<HTMLInputElement>) => {
    const [hasFocus, setHasFocus] = React.useState(false);
    const { className = '', before, after, disabled, onBlur, onFocus, wrapperProps = {}, invalid, ...rest } = props;

    // TODO ... should class names be passed to parent AND input??
    const containerClassNames = classnames({
        [styles.inputContainer]: true,
        [styles.beforeInput]: before,
        [styles.afterInput]: after,
        [styles.hasFocus]: hasFocus,
        [styles.invalid]: invalid,
        [wrapperProps.className as string]: wrapperProps.className || false,
    });
    const classNames = classnames({
        [styles.input]: true,
        [styles.hasBefore]: before,
        [styles.hasAfter]: after,
        [className]: className,
    });
    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
        if (onFocus) {
            onFocus(e);
        }
        setHasFocus(true);
    }
    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        if (onBlur) {
            onBlur(e);
        }
        setHasFocus(false);
    }
    return (
        <div className={containerClassNames} data-disabled={disabled} {...wrapperProps}>
            {before && (
                <span className={styles.beforeInput} data-testid="beforeInput">
                    {before}
                </span>
            )}
            <input
                className={classNames}
                disabled={disabled}
                ref={ref}
                onFocus={handleFocus}
                onBlur={handleBlur}
                aria-invalid={invalid}
                {...rest}
            />
            {after && (
                <span className={styles.afterInput} data-testid="afterInput">
                    {after}
                </span>
            )}
        </div>
    );
});
Input.displayName = 'Input';
