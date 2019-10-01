import React from 'react';
import ThemeContext, { Theme } from './ThemeContext';

export type ThemeConsumer = {
    children: (props: { theme: Theme }) => React.ReactNode;
};
const ThemeConsumer: React.FC<ThemeConsumer> = (props: ThemeConsumer) => <ThemeContext.Consumer {...props} />;

export default ThemeConsumer;
