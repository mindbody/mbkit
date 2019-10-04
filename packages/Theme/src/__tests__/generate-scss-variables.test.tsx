// @ts-ignore
import generateScssVariables from '../tools/generate-scss-variables.js';

describe('scss variable generator', () => {
    it('should take a JSON-like object and convert it to SCSS variables', () => {
        const json = {
            name: 'mindbody',
            foreground: '#0B0B0D',
            background: '#ffffff',
            radius: '3px',
            neutral: {
                '1': '#0B0B0D',
                '2': '#5A5E66',
                '3': '#8F96A1',
                '4': '#CBD0D7',
                '5': '#EAEDF1',
                '6': '#F8F9FB',
                '7': '#ffffff',
            },
            primary: {
                '1': '#993100',
                '2': '#C23E00',
                '3': '#FFEEE6',
            },
            secondary: {
                '1': '#004C57',
                '2': '#007485',
                '3': '#E5F2F4',
            },
            success: {
                '1': '#00592E',
                '2': '#007A3F',
                '3': '#E5F3EC',
            },
            warning: {
                '1': '#8C6600',
                '2': '#FFD73D',
                '3': '#FFFBEB',
            },
            error: {
                '1': '#992D38',
                '2': '#BD3845',
                '3': '#FAEBED',
            },
            font: {
                family: "'Lato', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'",
                url: 'https://fonts.googleapis.com/css?family=Lato:300,400,700',
                spec: {
                    '1': {
                        size: '2.5rem',
                        lineHeight: '3rem',
                        margin: '1rem 0',
                    },
                    '2': {
                        size: '2rem',
                        lineHeight: '3rem',
                        margin: '1rem 0',
                    },
                    '3': {
                        size: '1.5rem',
                        lineHeight: '2rem',
                        margin: '1rem 0',
                    },
                    '4': {
                        size: '1.25rem',
                        lineHeight: '1.5rem',
                        margin: '1rem 0',
                    },
                    '5': {
                        size: '1rem',
                        lineHeight: '1.5rem',
                        margin: '1rem 0',
                    },
                    '6': {
                        size: '.75rem',
                        lineHeight: '1rem',
                        margin: '1rem 0',
                    },
                    '7': {
                        size: '1rem',
                        lineHeight: '1.5rem',
                        margin: '1rem 0',
                    },
                    '8': {
                        size: '.75rem',
                        lineHeight: '1.125rem',
                        margin: '.25rem 0',
                    },
                    '9': {
                        size: '1.25rem',
                        lineHeight: '2rem',
                        margin: '1rem 0',
                    },
                    '10': {
                        size: '.6875rem',
                        lineHeight: '1rem',
                    },
                },
            },
        };

        const expectedOutput = `$name: var(--name, mindbody);
$foreground: var(--foreground, #0B0B0D);
$background: var(--background, #ffffff);
$radius: var(--radius, 3px);
$neutral-1: var(--neutral-1, #0B0B0D);
$neutral-2: var(--neutral-2, #5A5E66);
$neutral-3: var(--neutral-3, #8F96A1);
$neutral-4: var(--neutral-4, #CBD0D7);
$neutral-5: var(--neutral-5, #EAEDF1);
$neutral-6: var(--neutral-6, #F8F9FB);
$neutral-7: var(--neutral-7, #ffffff);
$primary-1: var(--primary-1, #993100);
$primary-2: var(--primary-2, #C23E00);
$primary-3: var(--primary-3, #FFEEE6);
$secondary-1: var(--secondary-1, #004C57);
$secondary-2: var(--secondary-2, #007485);
$secondary-3: var(--secondary-3, #E5F2F4);
$success-1: var(--success-1, #00592E);
$success-2: var(--success-2, #007A3F);
$success-3: var(--success-3, #E5F3EC);
$warning-1: var(--warning-1, #8C6600);
$warning-2: var(--warning-2, #FFD73D);
$warning-3: var(--warning-3, #FFFBEB);
$error-1: var(--error-1, #992D38);
$error-2: var(--error-2, #BD3845);
$error-3: var(--error-3, #FAEBED);
$font-family: var(--font-family, 'Lato', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif');
$font-url: var(--font-url, https://fonts.googleapis.com/css?family=Lato:300,400,700);
$font-spec-1-size: var(--font-spec-1-size, 2.5rem);
$font-spec-1-lineHeight: var(--font-spec-1-lineHeight, 3rem);
$font-spec-1-margin: var(--font-spec-1-margin, 1rem 0);
$font-spec-2-size: var(--font-spec-2-size, 2rem);
$font-spec-2-lineHeight: var(--font-spec-2-lineHeight, 3rem);
$font-spec-2-margin: var(--font-spec-2-margin, 1rem 0);
$font-spec-3-size: var(--font-spec-3-size, 1.5rem);
$font-spec-3-lineHeight: var(--font-spec-3-lineHeight, 2rem);
$font-spec-3-margin: var(--font-spec-3-margin, 1rem 0);
$font-spec-4-size: var(--font-spec-4-size, 1.25rem);
$font-spec-4-lineHeight: var(--font-spec-4-lineHeight, 1.5rem);
$font-spec-4-margin: var(--font-spec-4-margin, 1rem 0);
$font-spec-5-size: var(--font-spec-5-size, 1rem);
$font-spec-5-lineHeight: var(--font-spec-5-lineHeight, 1.5rem);
$font-spec-5-margin: var(--font-spec-5-margin, 1rem 0);
$font-spec-6-size: var(--font-spec-6-size, .75rem);
$font-spec-6-lineHeight: var(--font-spec-6-lineHeight, 1rem);
$font-spec-6-margin: var(--font-spec-6-margin, 1rem 0);
$font-spec-7-size: var(--font-spec-7-size, 1rem);
$font-spec-7-lineHeight: var(--font-spec-7-lineHeight, 1.5rem);
$font-spec-7-margin: var(--font-spec-7-margin, 1rem 0);
$font-spec-8-size: var(--font-spec-8-size, .75rem);
$font-spec-8-lineHeight: var(--font-spec-8-lineHeight, 1.125rem);
$font-spec-8-margin: var(--font-spec-8-margin, .25rem 0);
$font-spec-9-size: var(--font-spec-9-size, 1.25rem);
$font-spec-9-lineHeight: var(--font-spec-9-lineHeight, 2rem);
$font-spec-9-margin: var(--font-spec-9-margin, 1rem 0);
$font-spec-10-size: var(--font-spec-10-size, .6875rem);
$font-spec-10-lineHeight: var(--font-spec-10-lineHeight, 1rem);
`;

        expect(generateScssVariables({ theme: json })).toBe(expectedOutput);
    });
});
