import React from 'react';
import theme from './base-theme.json';

export type Theme = {
    name: string;

    foreground?: string;
    background?: string;
    applicationBackground?: string;
    radius?: string;

    neutral?: ThemeColors;
    primary?: ThemeColors;
    secondary?: ThemeColors;
    success?: ThemeColors;
    info?: ThemeColors;
    warning?: ThemeColors;
    error?: ThemeColors;

    font: {
        family?: string;
        url?: string;
        spec?: {
            [key: string]: FontSizes;
        };
    };
};

export type FontSizes = {
    size?: string;
    lineHeight?: string;
    margin?: string;
    usage?: string;
};

export type ThemeColors = {
    [key: string]: string;
};

export const baseTheme: Theme = { ...theme };
export const mindbodyTheme: Theme = { 
    ...baseTheme,
    primary: {
        base: '#D54400',
        light: '#FFF7F4',
        foreground: '#ffffff',
    },
    secondary: {
        base: '#D54400',
        light: '#FFF7F4',
        foreground: '#ffffff',
    },
};
export const mindbodyBusinessTheme: Theme = { 
    ...theme,
    primary: {
        base: '#0A7C8E',
        light: '#E5F2F4',
        foreground: '#ffffff',
    },
    secondary: {
        base: '#0A7C8E',
        light: '#E5F2F4',
        foreground: '#ffffff',
    },
};

export const ThemeContext: React.Context<{ theme: Theme }> = React.createContext({ theme: baseTheme });
