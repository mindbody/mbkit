import React, { FC, RefObject, AllHTMLAttributes, ChangeEvent, RefAttributes } from 'react';
import classnames from 'classnames';
import styles from './Checkbox.scss';

export type CheckboxProps = Omit<AllHTMLAttributes<HTMLInputElement>, 'checked'> &
    RefAttributes<HTMLInputElement> & {
        /** Determines whether the checkbox is checked, unchecked, or intermediate state */
        checked: boolean | 'mixed';
        /** Fires when input is interacted with */
        onChange: (event: ChangeEvent<HTMLInputElement>) => void;
        /** Shows red border and sets aria-invalid attribute */
        invalid?: boolean;
    };
export const Checkbox: FC<CheckboxProps> = React.forwardRef(
    (props: CheckboxProps, ref: RefObject<HTMLInputElement>) => {
        const { checked, className = '', invalid, ...rest } = props;

        const classNames = classnames({
            [styles.checkbox]: true,
            [styles.invalid]: invalid,
            [className]: className,
        });
        return (
            <input
                {...rest}
                aria-checked={checked}
                aria-invalid={invalid}
                checked={typeof checked === 'boolean' ? checked : false}
                type="checkbox"
                className={classNames}
                ref={ref}
            />
        );
    },
);
Checkbox.displayName = 'Checkbox';
