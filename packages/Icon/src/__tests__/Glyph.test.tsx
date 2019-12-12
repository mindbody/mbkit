import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import * as Glyphs from '../Glyph';

describe('Icon', () => {
    type AllIcons = {
        [key: string]: React.ReactNode;
    };

    const renderAllIcons = (props = {}) =>
        Object.keys(Glyphs).map(key => {
            const Comp: any = (Glyphs as AllIcons)[key];
            return <Comp {...props} key={key} />;
        });

    const { GlyphAdd } = Glyphs;
    it('should render with all props passed to it', () => {
        const spy = jest.fn();
        const { getByTestId } = render(
            <GlyphAdd data-testid="test" className="testing" width="24" height="24" onClick={spy} />,
        );

        const glyph = getByTestId('test');
        fireEvent.click(glyph);

        expect(glyph.classList).toContain('testing');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(glyph.getAttribute('width')).toBe('24');
        expect(glyph.getAttribute('height')).toBe('24');
    });
    it('should render with the color passed to it', () => {
        const { getByTestId } = render(
            <>
                <GlyphAdd data-testid="test1" color="primary" />
                <GlyphAdd data-testid="test2" color="warning" />
                <GlyphAdd data-testid="test3" color="success" />
                <GlyphAdd data-testid="test4" color="error" />
                <GlyphAdd data-testid="test5" color="info" />
                <GlyphAdd data-testid="test6" color="meta" />
            </>,
        );
        const icon1 = getByTestId('test1');
        expect(icon1.classList).toContain('primaryColor');

        const icon2 = getByTestId('test2');
        expect(icon2.classList).toContain('warningColor');

        const icon3 = getByTestId('test3');
        expect(icon3.classList).toContain('successColor');

        const icon4 = getByTestId('test4');
        expect(icon4.classList).toContain('errorColor');

        const icon5 = getByTestId('test5');
        expect(icon5.classList).toContain('infoColor');

        const icon6 = getByTestId('test6');
        expect(icon6.classList).toContain('metaColor');
    });
    it(`should render all glyphs multiple times with no duplicate id's`, () => {
        const { getByTestId } = render(
            <div data-testid="container">
                {renderAllIcons()}
                {renderAllIcons()}
                {renderAllIcons()}
            </div>,
        );

        const container = getByTestId('container');
        const ids = Array.from(container.querySelectorAll('[id]'));
        const svgs = Array.from(container.querySelectorAll('svg'));
        ids.forEach(element => expect(container.querySelectorAll(`[id="${element.id}"]`).length).toBe(1));
        expect(svgs.length).toBe(Object.keys(Glyphs).length * 3);
    });
    it('should pass all class names and other props passed to every glyph', () => {
        const spy = jest.fn();
        const totalNumberOfGlyphs = Object.keys(Glyphs).length;

        const { getByTestId } = render(
            <div data-testid="container">
                {renderAllIcons({
                    className: 'customClassName',
                    onClick: spy,
                    width: '100',
                    height: '82',
                    'data-random-test-attribute': 'is passed correctly',
                })}
            </div>,
        );

        const container = getByTestId('container');
        const componentsWithClassName = Array.from(container.querySelectorAll('.customClassName'));
        componentsWithClassName.forEach(comp => {
            fireEvent.click(comp);

            // normally you don't want to pass different size width/height but here we are just testing that the prop is being passed correctly
            expect(comp.getAttribute('width')).toBe('100');
            expect(comp.getAttribute('height')).toBe('82');
            expect(comp.getAttribute('data-random-test-attribute')).toBe('is passed correctly');
        });
        expect(componentsWithClassName.length).toBe(totalNumberOfGlyphs);
        expect(spy).toHaveBeenCalledTimes(totalNumberOfGlyphs);
    });
});
