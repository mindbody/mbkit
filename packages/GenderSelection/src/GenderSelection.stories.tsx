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
    onChange: (event: any) =>{return console.log('event item -> ', event);},
    placeholder: 'Select Gender',
    options:optionArr
};
export const ManyChildren = Template.bind({});
ManyChildren.args = {
    ...defaultArgs,
};
