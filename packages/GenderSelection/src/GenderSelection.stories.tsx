import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { GenderSelection } from './index';
import { GenderProps,SelectOptions } from './GenderSelection';
export default {
    title: 'Components/GenderSelection',
    component: GenderSelection,
} as Meta;

const optionArr = [
    {
        label: 'Male',
        value: 'male'
    }, {
        label: 'Female',
        value: 'female'
    }, {
        label: '+ Custom',
        value: 'custom'
    }
]

export const GenderSelectionExample = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [customGender, setCustomGender] = useState('');
    const [options, setOptions] = useState<SelectOptions>(optionArr)
    return <GenderSelection
        options={options}
        value={selectedValue}
        placeholder={'Select Gender'}
        onChange={(e: any) => setSelectedValue(e.target.value)}
        customGenderOnChange={(e: any) => setCustomGender(e.target.value)}
        customGenderValue={customGender}
        onEnterKeyPressed={() => {
            console.log('save in DB')
            let updatedOptions:SelectOptions = [];
            options.forEach(o => {
                if (o.value === 'custom') {
                    updatedOptions.push({
                        label: customGender,
                        value: customGender,
                    });
                }
                updatedOptions.push(o);
            });
            setOptions(updatedOptions)
            setSelectedValue(customGender)
            setCustomGender('')

        }}

    />
}