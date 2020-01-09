import React, { FC } from 'react';
import { Checkbox } from '@mindbody/checkbox';
import styles from './Select.scss';

export type MultiSelectItemProps = {
    checked: boolean;
    label: string;
    onChange: () => void;
    id: string;
};
export const MultiSelectItem: FC<MultiSelectItemProps> = (props: MultiSelectItemProps) => {
    const { label, ...rest } = props;
    return (
        <label className={styles.multiSelectItem}>
            <Checkbox
                data-multiselect-item
                type="checkbox"
                role="option"
                aria-selected={props.checked}
                aria-checked={props.checked}
                aria-label={label}
                tabIndex={-1}
                className={styles.checkbox}
                {...rest}
            />
            {label}
        </label>
    );
};
