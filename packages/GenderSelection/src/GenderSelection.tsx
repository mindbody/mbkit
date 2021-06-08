import React, { AllHTMLAttributes, FC, RefObject, RefAttributes, useRef, useEffect, forwardRef } from 'react';
import classnames from 'classnames';
import styles from './GenderSelection.scss';
import { Input, InputProps } from "@mbkit/input";
import { Select, SelectProps } from "@mbkit/select";
import { Label } from "@mbkit/label";
export type SelectOptions = {
    label: string;
    value: string;
}[]

export type GenderProps = AllHTMLAttributes<HTMLDivElement> &
    RefAttributes<HTMLDivElement> & {

        /** This will make the selected value */
        value: string;

        // return object on change of selection 
        onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;

        // options for select 
        options?: SelectOptions;

        // label text Placeholder
        placeholder?: string;

        customGenderValue: string;

        customGenderOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

        // this is called when user pressed enter key on the custom gender input field
        onEnterKeyPressed: () => void;

        // this is props for select component
        selectProps?: SelectProps;

        // this is props for input component
        inputProps?: InputProps;
    };

export const GenderSelection: FC<GenderProps> = forwardRef((props: GenderProps, ref: RefObject<HTMLDivElement>) => {

    const {
        options = [],
        onChange,
        className = '',
        placeholder = '',
        value,
        customGenderValue,
        customGenderOnChange,
        onEnterKeyPressed,
        selectProps,
        inputProps,
        ...rest
    } = props;

    const customGenderInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (value === "custom" && customGenderInputRef.current) {
            customGenderInputRef.current.focus();
        }
    }, [value, customGenderInputRef]);
    const handleInputKeyPress = (event: KeyboardEvent | React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            onEnterKeyPressed()
        }
    }
    const classNames = classnames({
        [styles.genderWrapper]: true,
        [className]: className,
    });
    return (

        <div className={classNames} ref={ref} {...rest}>
            <Label htmlFor="gender-select">Gender</Label>
            <Select
                {...selectProps}
                value={value}
                onChange={onChange}
                id="gender-select"
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map(item => {
                    return (
                        <option key={JSON.stringify(item)} value={item.value}> {item.label}  </option>
                    )
                })}
            </Select>
            {value === "custom" && (
                <Input
                    {...inputProps}
                    ref={customGenderInputRef}
                    id="custom-gender"
                    placeholder={inputProps?.placeholder || 'Enter your custom gender'}
                    value={customGenderValue}
                    onChange={customGenderOnChange}
                    onKeyPress={(e) => handleInputKeyPress(e)}
                />
            )}
        </div>
    )
});
GenderSelection.displayName = 'GenderSelection';
