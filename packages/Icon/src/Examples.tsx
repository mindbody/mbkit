import React, { ReactNode } from 'react';
import * as Icons from './Icon';
import * as Glyphs from './Glyph';

type AllIcons = {
    [key: string]: React.ReactNode;
};

type RenderAllComponentsProps = {
    components: AllIcons;
    label: string;
};
const RenderAllComponents: React.FC<RenderAllComponentsProps> = (props: RenderAllComponentsProps) => {
    const { components, label } = props;
    const [filtered, setFiltered] = React.useState('');

    const renderAllIcons = () =>
        Object.keys(components).map(key => {
            const Comp: any = (components as AllIcons)[key];

            if (filtered.trim() !== '' && !key.toLowerCase().includes(filtered.toLowerCase())) {
                return null;
            }

            return (
                <div key={key} style={{ wordBreak: 'break-word' }}>
                    <Comp />
                    <br />
                    {`<${key} />`}
                </div>
            );
        });

    return (
        <>
            <div>
                <label>
                    Filter {label}
                    <input
                        value={filtered}
                        placeholder={`Filter by name`}
                        onChange={e => setFiltered(e.target.value)}
                    />
                </label>
            </div>
            <div
                style={{
                    display: 'grid',
                    gridGap: '16px',
                    gridTemplateColumns: 'repeat(auto-fill, 200px)',
                    fontSize: '.6rem',
                    textAlign: 'center',
                    padding: '8px',
                }}
            >
                {renderAllIcons()}
            </div>
        </>
    );
};

export const AllIconsExample = () => <RenderAllComponents label={'Icons'} components={Icons} />;
export const AllGlyphsExample = () => <RenderAllComponents label={'Glyphs'} components={Glyphs} />;
