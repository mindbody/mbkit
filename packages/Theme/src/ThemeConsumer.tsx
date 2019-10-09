import React from 'react';
import { Theme, ThemeContext } from './ThemeContext';

export type ThemeConsumerProps = {
    children: (props: { theme: Theme }) => React.ReactNode;
};
export const ThemeConsumer: React.FC<ThemeConsumerProps> = (props: ThemeConsumerProps) => (
    <ThemeContext.Consumer {...props} />
);
