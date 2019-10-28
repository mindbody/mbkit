import React, { HTMLAttributes, FC, RefObject } from 'react';
import classnames from 'classnames';
import styles from './Checkbox.scss';

export type CheckboxProps = HTMLAttributes<HTMLInputElement> & {
    checked?: boolean | 'mixed';
};
export const Checkbox: FC<CheckboxProps> = React.forwardRef(
    (props: CheckboxProps, ref: RefObject<HTMLInputElement>) => {
        const { checked, className = '', ...rest } = props;

        const classNames = classnames({
            [styles.checkbox]: true,
            [className]: className,
        });
        return (
            <input
                {...rest}
                aria-checked={checked}
                checked={typeof checked === 'boolean' ? checked : false}
                type="checkbox"
                className={classNames}
                ref={ref}
            />
        );
    },
);
Checkbox.displayName = 'Checkbox';
