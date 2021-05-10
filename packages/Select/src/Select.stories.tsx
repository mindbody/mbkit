import React, { ChangeEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Select, SelectProps } from './Select';
import { MultiSelect, MultiSelectProps, MultiSelectOption } from './MultiSelect';

export default {
    title: 'Components/Select',
    component: Select,
} as Meta;

const defaultArgs: SelectProps = {
    value: 'Banana',
    onChange: (valueSelected: ChangeEvent<HTMLSelectElement>) => console.log(`Value was changed to`, valueSelected),
    invalid: false,
    children: (
        <>
            <option value="Apple">Apple</option>
            <option value="Banana">Banana</option>
            <option value="Orange">Orange</option>
        </>
    ),
};

const Template: Story<SelectProps> = args => <Select {...args} />;

export const BasicSelect = Template.bind({});
BasicSelect.args = defaultArgs;

export const BasicMultiSelect: Story<MultiSelectProps> = () => {
    const [options, setOptions] = useState([
        { label: 'Apple', checked: false, id: '1' },
        { label: 'Banana', checked: false, id: '2' },
        { label: 'Orange', checked: false, id: '3' },
    ]);
    return (
        <MultiSelect
            label={'Select the fruits you ate today'}
            options={options}
            onChange={(selected: any) => {
                setOptions(options.map(o => (o.id === selected.id ? selected : o)));
            }}
        />
    );
};

export const MultiSelectWithAllOptionExample: Story<MultiSelectProps> = () => {
    const [options, setOptions] = useState<MultiSelectOption[]>([
        { label: 'All', checked: false, id: 'all' },
        { label: 'Apple', checked: false, id: '1' },
        { label: 'Banana', checked: false, id: '2' },
        { label: 'Orange', checked: false, id: '3' },
    ]);

    return (
        <MultiSelect
            label={'Select the fruits you ate today'}
            selectedOptionsLabel={options.filter(o => o.id !== 'all' && o.checked).map(o => o.label).join(', ')}
            options={options}
            onChange={(selected: any) => {
                const selectAllChanged = selected.id === 'all';
                let updatedOptions: MultiSelectOption[] = [];
                if (selectAllChanged) {
                    const nextState = !options.every(o => o.checked);
                    updatedOptions = options.map(o => {
                        return {
                            ...o,
                            checked: nextState,
                        };
                    });
                } else {
                    updatedOptions = options.map(o => {
                        if (o.id === selected.id) {
                            return selected;
                        }
                        return o;
                    });
                    const noSelectAll = updatedOptions.filter(o => o.id !== 'all');
                    const selectAllNextStateTrue = noSelectAll.every(o => o.checked);
                    const selectAllNextStateIsMixed = noSelectAll.some(o => o.checked);
                    updatedOptions = updatedOptions.map(o => {
                        if (o.id === 'all') {
                            return {
                                ...o,
                                checked: selectAllNextStateTrue ? true : selectAllNextStateIsMixed ? 'mixed' : false,
                            };
                        }
                        return o;
                    });
                }

                setOptions(updatedOptions);
            }}
        />
    );
};
