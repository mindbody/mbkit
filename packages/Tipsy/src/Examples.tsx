import React from 'react';
import { Tipsy, TipsyProps } from './Tipsy';

export type TipsyExamplesProps = {
    multiLineExample: boolean;
};
export const TipsyExamples: React.FC<TipsyExamplesProps> = (props: TipsyExamplesProps) => {
    const { multiLineExample = false } = props;
    const positions: TipsyProps['position'][] = [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
        'left-top',
        'left-center',
        'left-bottom',
        'right-top',
        'right-center',
        'right-bottom',
    ];

    const multiLine = (
        <>
            All doggies go to heaven (or so I{`'`}ve been told).
            <br />
            They run and play along the streets of Gold.
            <br />
            Why is heaven such a doggie-delight?
            <br />
            Why, because there{`'`}s not a single cat in sight...
        </>
    );
    const singleLine = 'Assist the user with these messages';

    return (
        <>
            {positions.map(pos => {
                const width = getRandomInt(100, 300);
                const height = getRandomInt(50, 150);
                return (
                    <Tipsy position={pos} key={pos} label={multiLineExample ? multiLine : singleLine}>
                        <div
                            tabIndex={0}
                            role="button"
                            style={{
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '1px solid #000',
                                margin: '32px 32px',
                                width,
                                height,
                            }}
                        >
                            {pos}
                        </div>
                    </Tipsy>
                );
            })}
        </>
    );
};

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
