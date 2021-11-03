import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Toaster, ToasterProps } from './Toaster';

export default {
    title: 'Components/Toaster',
    component: Toaster,
} as Meta;

const Template: Story<ToasterProps> = args => <Toaster {...args}>Sample Message</Toaster>;

const defaultArgs: ToasterProps = {
    color: 'default',
    show: true,
};

export const standard = Template.bind({});
standard.args = {
    ...defaultArgs,
};

export const topCenter = Template.bind({});
topCenter.args = {
    ...defaultArgs,
    location: 'top-center',
};

export const successColor = Template.bind({});
successColor.args = {
    ...defaultArgs,
    color: 'success',
};
