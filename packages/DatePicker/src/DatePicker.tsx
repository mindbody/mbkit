import React, { AllHTMLAttributes, ChangeEvent, FC, forwardRef, RefAttributes, RefObject, useState } from 'react';
import { Input, InputProps } from '@mbkit/input';
import { Calendar } from '@mbkit/calendar';

import styles from './DatePicker.scss';
import classnames from 'classnames';

export type DatePickerProps = AllHTMLAttributes<HTMLDivElement> &
    RefAttributes<HTMLDivElement> & {
        /** When the datepicker is set to be displayed, the screen reader will read this to the assistive technology */
        label: string;
        /** Value that is displayed in text input */
        value: Date;
        /** Locale that will determine date format */
        locale?: string;
        /** DateTimeFormat options. Ex: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } */
        dateFormatOptions?: object;
        /** Fires when user interacts with value in input field */
        onChange: (event: ChangeEvent<HTMLInputElement>) => void;
        /** Adds red border and sets aria-invalid attribute */
        invalid?: boolean;
        // this is props for input component
        inputProps?: InputProps;
    };

export const DatePicker: FC<DatePickerProps> = forwardRef((props: DatePickerProps, ref: RefObject<HTMLDivElement>) => {
    const {
        className = '',
        label,
        locale = 'en-US',
        dateFormatOptions = {},
        value = '',
        onChange,
        invalid,
        inputProps,
        ...rest
    } = props;
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(value);

    function toggleCalendar(date) {
        setDate(date);
        setShow(false);
    }
    return (
        <div
            {...rest}
            className={styles.datePicker}
            onKeyDown={event => {
                if (event.key === 'Escape') {
                    event.stopPropagation();
                    setShow(false);
                }
            }}
        >
            <Input
                {...inputProps}
                value={date ? new Date(date).toLocaleDateString(locale, dateFormatOptions) : ''}
                placeholder={inputProps?.placeholder}
                onClick={() => setShow(!show)}
                onChange={onChange}
                className={className}
            />
            {show && <Calendar onChange={date => toggleCalendar(date)} />}
        </div>
    );
});
DatePicker.displayName = 'DatePicker';
