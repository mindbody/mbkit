import React from 'react';
import ThemeContext, { Theme } from './ThemeContext';

export type ThemeConsumerProps = {
    children: (props: { theme: Theme }) => React.ReactNode;
};
const ThemeConsumer: React.FC<ThemeConsumerProps> = (props: ThemeConsumerProps) => <ThemeContext.Consumer {...props} />;

export default ThemeConsumer;
