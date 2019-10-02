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
    font: {
        family: `'Lato', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'`,
        url: 'https://fonts.googleapis.com/css?family=Lato:300,400,700',
        spec: {
            // 1-6 are headings
            1: {
                size: '2.5rem',
                lineHeight: '3rem',
                margin: '1rem 0',
            },
            2: {
                size: '2rem',
                lineHeight: '3rem',
                margin: '1rem 0',
            },
            3: {
                size: '1.5rem',
                lineHeight: '2rem',
                margin: '1rem 0',
            },
            4: {
                size: '1.25rem',
                lineHeight: '1.5rem',
                margin: '1rem 0',
            },
            5: {
                size: '1rem',
                lineHeight: '1.5rem',
                margin: '1rem 0',
            },
            6: {
                size: '.75rem',
                lineHeight: '1rem',
                margin: '1rem 0',
            },
            // default paragraph size
            7: {
                size: '1rem',
                lineHeight: '1.5rem',
                margin: '1rem 0',
            },
            // meta sizes
            8: {
                size: '.75rem',
                lineHeight: '1.125rem',
                margin: '.25rem 0',
            },
            // "subheading"
            9: {
                size: '1.25rem',
                lineHeight: '2rem',
                margin: '1rem 0',
            },
            // tooltip
            10: {
                size: '.6875rem',
                lineHeight: '1rem',
            },
        },
    },
};

const ThemeContext: React.Context<{ theme: Theme }> = React.createContext({ theme: baseTheme });

export default ThemeContext;
