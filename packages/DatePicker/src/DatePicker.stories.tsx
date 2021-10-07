import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { DatePicker } from './index';
import { DatePickerProps } from './DatePicker';

export default {
    title: 'Components/DatePicker',
    component: DatePicker,
} as Meta;

const Template: Story<DatePickerProps> = args => <DatePicker {...args} />;

const defaultArgs: DatePickerProps = {
    label: 'Date Picker',
    inputProps: { placeholder: 'Select date...' },
};

export const DatePickerUS = Template.bind({});
DatePickerUS.args = {
    ...defaultArgs,
    calendarType: 'US',
};

export const DatePickerAribic = Template.bind({});
DatePickerAribic.args = {
    ...defaultArgs,
    calendarType: 'Arabic',
};

export const DatePickerHebrew = Template.bind({});
DatePickerHebrew.args = {
    ...defaultArgs,
    calendarType: 'Hebrew',
};
