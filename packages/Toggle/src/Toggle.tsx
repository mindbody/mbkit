import React, { AllHTMLAttributes, ChangeEvent, FC, forwardRef, RefObject, RefAttributes } from 'react';
import classnames from 'classnames';
import styles from './Toggle.scss';

export type ToggleProps = AllHTMLAttributes<HTMLInputElement> &
    RefAttributes<HTMLInputElement> & {
        /** Determines whether the toggle is toggled */
        checked: boolean;
        /** Fires when user presses the toggle */
        onChange: (event: ChangeEvent<HTMLInputElement>) => void;
        /** Changes the size of the toggle input */
        size?: 1 | 2;
    };
export const Toggle: FC<ToggleProps> = forwardRef((props: ToggleProps, ref: RefObject<HTMLInputElement>) => {
    const { className = '', size = 1, ...rest } = props;
    const classNames = classnames({
        [styles.toggle]: true,
        [styles[`size${size}`]]: true,
        [className]: className,
    });
    return <input role="switch" {...rest} className={classNames} ref={ref} type="checkbox" />;
});
Toggle.displayName = 'Toggle';
