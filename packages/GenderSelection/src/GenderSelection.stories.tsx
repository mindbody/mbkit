import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { GenderSelection } from './index';
import { GenderProps } from './GenderSelection';

export default {
    title: 'Components/GenderSelection',
    component: GenderSelection,
} as Meta;
const optionArr = [{
    label : 'Male',
     value : 'male'
},
 {
    label : 'Female',
 value : 'female'
}]
const Template: Story<GenderProps> = args => <GenderSelection {...args} />;
const defaultArgs: GenderProps = {
    onChange: (selectedItem: any) =>{return console.log('selected item -> ', selectedItem);},
    placeholder: 'Gender'
};
export const ManyChildren = Template.bind({});
ManyChildren.args = {
    ...defaultArgs,
};

export const withCustomOption = Template.bind({});
withCustomOption.args = {
    ...defaultArgs,
    customEnable: true,
};