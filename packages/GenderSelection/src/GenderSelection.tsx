import React, { useState, AllHTMLAttributes, FC, RefObject, RefAttributes, useRef, useEffect} from 'react';
import classnames from 'classnames';
import styles from './GenderSelection.scss';
import { Input } from "@mbkit/input";
import { Select } from "@mbkit/select";
import { Label } from "@mbkit/label";

export type SelectOptions = {
    label: string;
    value: string;
}[]

export type GenderProps = AllHTMLAttributes<HTMLDivElement> &
    RefAttributes<HTMLDivElement> & {
        // return object on change of selection 
        onChange: (event: any) => void;

        // options for select 
        options: SelectOptions;

        // label text Placeholder
        placeholder?: String;
    };

export const GenderSelection: FC<GenderProps> = (props: GenderProps, ref: RefObject<HTMLDivElement>) => {

    const {
        options = [],
        onChange,
        className = '',
        placeholder = '',
        ...rest
    } = props;

    const [customGender, setCustomGender] = useState("");
    const [selectedOption, setSelectedOption] = useState<string>("");
    const customGenderInputRef = useRef<HTMLInputElement>(null);
    const [selectEvent, setSelectEvent] = useState<React.ChangeEvent<HTMLInputElement> | null>(null);
    const [optionsArr, setOptions] = useState(options)

    useEffect(() => {
        if (selectedOption === "custom" && customGenderInputRef.current) {
            customGenderInputRef.current.focus();
        }
    }, [selectedOption, customGenderInputRef]);
    const setSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value)
        setSelectEvent(e)
    }
    useEffect(() => {
        onChange(selectEvent)
    }, [selectedOption])


    const handleInputKeyPress = (event: KeyboardEvent | React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && customGender) {
            setSelectedOption('')
            const customEntery = {
                label: customGender,
                value: customGender.split(' ').join('-').toLowerCase()
            }
            let updatedOptions = [...optionsArr]
            updatedOptions.splice(updatedOptions.length, 0, customEntery)
            setCustomGender('')
            setOptions(updatedOptions)
        }
    }
    return (

        <div className={classnames({ [styles.genderWrapper]: true })} {...rest}>
            <Label htmlFor="gender-select">Gender</Label>
            <Select
                value={selectedOption}
                onChange={(e: any) => setSelected(e)}
                // style={{ maxWidth: 240, margin: "0 0 8px 0" }}
                id="gender-select"
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {optionsArr.map(item => {
                    return (
                        <option key={JSON.stringify(item)} value={item.value}> {item.label}  </option>
                    )
                })}
                <option value="custom">+ Custom</option>
            </Select>
            {selectedOption === "custom" && (
                <Input
                    ref={customGenderInputRef}
                    id="custom-gender"
                    placeholder="Enter your custom gender"
                    // style={{ maxWidth: 240 }}
                    value={customGender}
                    onChange={(e) => setCustomGender(e.target.value)}
                    onKeyPress={(e) => handleInputKeyPress(e)}
                />
            )}
        </div>
    )
};

GenderSelection.displayName = 'GenderSelection';
