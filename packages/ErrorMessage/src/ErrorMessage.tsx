import React, { FC, forwardRef, RefObject } from 'react';
import classnames from 'classnames';
import styles from './ErrorMessage.scss';
import Alert, { AlertProps } from '@reach/alert';

export type ErrorMessageProps = AlertProps & {
    /** If true the error will be displayed to the end user */
    show: boolean;
    /** This determines how the screen reader will read the error to the user, most of the time use "polite" */
    type?: 'polite' | 'assertive';
};
export const ErrorMessage: FC<ErrorMessageProps> = forwardRef(
    (props: ErrorMessageProps, ref: RefObject<HTMLDivElement>) => {
        const { show, className = '', ...rest } = props;

        if (!show) {
            return null;
        }

        const classNames = classnames({
            [styles.errorMessage]: true,
            [className]: className,
        });

        return <Alert {...rest} className={classNames} ref={ref} />;
    },
);
ErrorMessage.displayName = 'ErrorMessage';
