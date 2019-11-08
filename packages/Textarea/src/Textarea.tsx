import React, { AllHTMLAttributes, ChangeEvent, FC, forwardRef, RefObject } from 'react';
import classnames from 'classnames';
import styles from './Textarea.scss';

export type TextareaProps = AllHTMLAttributes<HTMLTextAreaElement> & {
    /** Value that is displayed in the textarea */
    value: string;
    /** Fires when textarea value changes */
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    /** Shows red border around textarea */
    invalid?: boolean;
};
export const Textarea: FC<TextareaProps> = forwardRef((props: TextareaProps, ref: RefObject<HTMLTextAreaElement>) => {
    const { className = '', invalid, ...rest } = props;
    const classNames = classnames({
        [styles.textarea]: true,
        [styles.invalid]: invalid,
        [className]: className,
    });
    return <textarea {...rest} className={classNames} ref={ref} />;
});
Textarea.displayName = 'Textarea';
