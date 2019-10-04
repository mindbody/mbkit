import React from 'react';
import theme from './base-theme.json';

export type Theme = {
    name: string;

    foreground: string;
    background: string;
    radius: string;

    neutral: ThemeColors;
    primary: ThemeColors;
    secondary: ThemeColors;
    success: ThemeColors;
    warning: ThemeColors;
    error: ThemeColors;

    font: {
        family: string;
        url?: string;
        spec: {
            [key: string]: FontSizes;
        };
    };
};

export type FontSizes = {
    size: string;
    lineHeight: string;
    margin?: string;
};

export type ThemeColors = {
    [key: string]: string;
};

export const baseTheme: Theme = { ...theme };

const ThemeContext: React.Context<{ theme: Theme }> = React.createContext({ theme: baseTheme });

export default ThemeContext;
