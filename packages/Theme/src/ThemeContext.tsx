import React from 'react';

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
};

export type ThemeColors = {
    [key: string]: string;
};

export const baseTheme: Theme = {
    name: 'mindbody',
    foreground: '#0B0B0D',
    background: '#ffffff',
    radius: '3px',
    neutral: {
        1: '#0B0B0D',
        2: '#5A5E66',
        3: '#8F96A1',
        4: '#CBD0D7',
        5: '#EAEDF1',
        6: '#F8F9FB',
        7: '#ffffff',
    },
    primary: {
        1: '#993100',
        2: '#C23E00',
        3: '#FFEEE6',
    },
    secondary: {
        1: '#004C57',
        2: '#007485',
        3: '#E5F2F4',
    },
    success: {
        1: '#00592E',
        2: '#007A3F',
        3: '#E5F3EC',
    },
    warning: {
        1: '#8C6600',
        2: '#FFD73D',
        3: '#FFFBEB',
    },
    error: {
        1: '#992D38',
        2: '#BD3845',
        3: '#FAEBED',
    },
};

const ThemeContext: React.Context<{ theme: Theme }> = React.createContext({ theme: baseTheme });

export default ThemeContext;
