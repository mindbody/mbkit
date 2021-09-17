import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Accordion } from '../Accordion';
import { AccordionHeader } from '../AccordionHeader';
import { AccordionItem } from '../AccordionItem';
import { AccordionPane } from '../AccordionPane';
import { act } from 'react-dom/test-utils';

describe('Accordion', () => {
    const changeSpy = jest.fn();
    it('should render with the same number of headers as passed in', () => {
        const { getAllByText } = render(
            <Accordion activePanes={[0]} onChange={changeSpy}>
                <AccordionItem>
                    <AccordionHeader>Header</AccordionHeader>
                    <AccordionPane>Content 1</AccordionPane>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader>Header</AccordionHeader>
                    <AccordionPane>Content 2</AccordionPane>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader>Header</AccordionHeader>
                    <AccordionPane>Content 3</AccordionPane>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader>Header</AccordionHeader>
                    <AccordionPane>Content 4</AccordionPane>
                </AccordionItem>
            </Accordion>,
        );
        expect(getAllByText('Header').length).toBe(4);
    });
    it('should render props passed through', () => {
        const { getByTestId } = render(
            <Accordion activePanes={[0]} onChange={changeSpy} className="foo" data-testid="wrapper">
                <AccordionItem>
                    <AccordionHeader
                        className="bar"
                        data-randomattribute="THIS IS A TEST"
                        style={{ background: 'red' }}
                        data-testid="header"
                    >
                        Header
                    </AccordionHeader>
                    <AccordionPane
                        data-testid="pane"
                        data-randomattribute="THIS IS A TEST"
                        className="tester"
                        style={{ padding: 24 }}
                    >
                        Content 1
                    </AccordionPane>
                </AccordionItem>
            </Accordion>,
        );

        const wrapper = getByTestId('wrapper');
        const header = getByTestId('header');
        const pane = getByTestId('pane');

        expect(wrapper.classList.contains('foo')).toBe(true);

        expect(header.classList.contains('bar')).toBe(true);
        expect(header.style.background).toBe('red');

        expect(pane.classList.contains('tester')).toBe(true);
        expect(pane.style.padding).toBe('24px');
        expect(pane.getAttribute('data-randomattribute')).toBe('THIS IS A TEST');
    });

    describe('Keyboard interactions', () => {
        it('should still allow you to use a onKeyDown and not swallow any presses', () => {
            const onKeyDownSpy = jest.fn();
            const { getByText } = render(
                <Accordion activePanes={[0]} onChange={changeSpy}>
                    <AccordionItem>
                        <AccordionHeader onKeyDown={onKeyDownSpy}>Header1</AccordionHeader>
                        <AccordionPane>Content 1</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader>Header2</AccordionHeader>
                        <AccordionPane>Content 2</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader>Header3</AccordionHeader>
                        <AccordionPane>Content 3</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader>Header4</AccordionHeader>
                        <AccordionPane>Content 4</AccordionPane>
                    </AccordionItem>
                </Accordion>,
            );
            act(() => {
                fireEvent.keyDown(getByText('Header1'), { key: 'Enter' });
                fireEvent.keyDown(getByText('Header1'), { key: ' ' });
                fireEvent.keyDown(getByText('Header1'), { key: 'd' });
                fireEvent.keyDown(getByText('Header1'), { key: 'ArrowUp' });
            });
            expect(onKeyDownSpy).toHaveBeenCalledTimes(4);
        });
        it('should activate the onChange with the appropriate index when you click the header', () => {
            const { getByText } = render(
                <Accordion activePanes={[0]} onChange={changeSpy}>
                    <AccordionItem>
                        <AccordionHeader>Header1</AccordionHeader>
                        <AccordionPane>Content 1</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader>Header2</AccordionHeader>
                        <AccordionPane>Content 2</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader>Header3</AccordionHeader>
                        <AccordionPane>Content 3</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader>Header4</AccordionHeader>
                        <AccordionPane>Content 4</AccordionPane>
                    </AccordionItem>
                </Accordion>,
            );

            const header1 = getByText('Header1');
            const header2 = getByText('Header2');
            const header3 = getByText('Header3');
            const header4 = getByText('Header4');
            // First index
            act(() => {
                fireEvent.click(header1);
            });
            expect(changeSpy).toHaveBeenCalledWith(0);

            // second index
            act(() => {
                fireEvent.click(header2);
            });
            expect(changeSpy).toHaveBeenCalledWith(1);

            // third index
            act(() => {
                fireEvent.click(header3);
            });
            expect(changeSpy).toHaveBeenCalledWith(2);

            // fourth index
            act(() => {
                fireEvent.click(header4);
            });
            expect(changeSpy).toHaveBeenCalledWith(3);

            expect(changeSpy).toHaveBeenCalledTimes(4);
        });
        it('should activate the onChange when enter or space is pressed', () => {
            const { getByTestId } = render(
                <Accordion activePanes={[0]} onChange={changeSpy}>
                    <AccordionItem>
                        <AccordionHeader data-testid="header1">Header1</AccordionHeader>
                        <AccordionPane>Content 1</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader>Header2</AccordionHeader>
                        <AccordionPane data-testid="pane">Content 2</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader data-testid="header3">Header3</AccordionHeader>
                        <AccordionPane>Content 3</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader>Header4</AccordionHeader>
                        <AccordionPane>Content 4</AccordionPane>
                    </AccordionItem>
                </Accordion>,
            );
            const header3 = getByTestId('header3');

            header3.focus();
            act(() => {
                fireEvent.keyDown(header3, { key: ' ', code: 0 });
                fireEvent.keyDown(header3, { key: '3', code: 51 });
            });

            expect(changeSpy).toHaveBeenCalledWith(2);

            const header1 = getByTestId('header1');
            act(() => {
                header1.focus();
                fireEvent.keyDown(header1, { key: 'Enter', code: 13 });
            });
            expect(changeSpy).toHaveBeenCalledWith(0);

            expect(changeSpy).toHaveBeenCalledTimes(2);
        });
        it('should not activate the onChange when enter or space is pressed on a nested button that preventsDefault', () => {
            const { getByTestId } = render(
                <Accordion activePanes={[0]} onChange={changeSpy}>
                    <AccordionItem>
                        <AccordionHeader data-testid="header1">
                            Header1{' '}
                            <button data-testid="nestedButton" onClick={e => e.stopPropagation()}>
                                Press Me
                            </button>
                        </AccordionHeader>
                        <AccordionPane>Content 1</AccordionPane>
                    </AccordionItem>
                </Accordion>,
            );
            const nestedButton = getByTestId('nestedButton');
            act(() => {
                fireEvent.keyDown(nestedButton, { key: ' ' });
                fireEvent.click(nestedButton);
            });

            expect(changeSpy).toHaveBeenCalledTimes(0);
        });
        it('should navigate through the headers as the user arrows up', () => {
            const { getByTestId } = render(
                <Accordion activePanes={[0]} onChange={changeSpy}>
                    <AccordionItem>
                        <AccordionHeader data-testid="header1">Header1</AccordionHeader>
                        <AccordionPane>Content 1</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader data-testid="header2">Header2</AccordionHeader>
                        <AccordionPane data-testid="pane">Content 2</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader data-testid="header3">Header3</AccordionHeader>
                        <AccordionPane>Content 3</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader data-testid="header4">Header4</AccordionHeader>
                        <AccordionPane>Content 4</AccordionPane>
                    </AccordionItem>
                </Accordion>,
            );
            const header1 = getByTestId('header1');
            const header2 = getByTestId('header2');
            const header3 = getByTestId('header3');
            const header4 = getByTestId('header4');

            // Starting at the 3rd header
            header3.focus();
            act(() => {
                fireEvent.keyDown(header3, { key: 'ArrowUp' });
            });
            expect(document.activeElement).toBe(header2);

            act(() => {
                fireEvent.keyDown(header2, { key: 'ArrowUp' });
            });
            expect(document.activeElement).toBe(header1);

            act(() => {
                fireEvent.keyDown(header1, { key: 'ArrowUp' });
            });
            expect(document.activeElement).toBe(header4);
        });
        it('should navigate through the headers as the user arrows down', () => {
            const { getByTestId } = render(
                <Accordion activePanes={[0]} onChange={changeSpy}>
                    <AccordionItem>
                        <AccordionHeader data-testid="header1">Header1</AccordionHeader>
                        <AccordionPane>Content 1</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader data-testid="header2">Header2</AccordionHeader>
                        <AccordionPane data-testid="pane">Content 2</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader data-testid="header3">Header3</AccordionHeader>
                        <AccordionPane>Content 3</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader data-testid="header4">Header4</AccordionHeader>
                        <AccordionPane>Content 4</AccordionPane>
                    </AccordionItem>
                </Accordion>,
            );
            const header1 = getByTestId('header1');
            const header2 = getByTestId('header2');
            const header3 = getByTestId('header3');
            const header4 = getByTestId('header4');

            // Starting at the 3rd header
            header3.focus();
            act(() => {
                fireEvent.keyDown(header3, { key: 'ArrowDown' });
            });
            expect(document.activeElement).toBe(header4);

            act(() => {
                fireEvent.keyDown(header4, { key: 'ArrowDown' });
            });
            expect(document.activeElement).toBe(header1);

            act(() => {
                fireEvent.keyDown(header1, { key: 'ArrowDown' });
            });
            expect(document.activeElement).toBe(header2);
        });
        it('should navigate to top/bottom when "Home"/"End" are pressed and header is focused', () => {
            const { getByTestId } = render(
                <Accordion activePanes={[0]} onChange={changeSpy}>
                    <AccordionItem>
                        <AccordionHeader data-testid="header1">Header1</AccordionHeader>
                        <AccordionPane>Content 1</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader data-testid="header2">Header2</AccordionHeader>
                        <AccordionPane data-testid="pane">Content 2</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader data-testid="header3">Header3</AccordionHeader>
                        <AccordionPane>Content 3</AccordionPane>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader data-testid="header4">Header4</AccordionHeader>
                        <AccordionPane>Content 4</AccordionPane>
                    </AccordionItem>
                </Accordion>,
            );
            const header1 = getByTestId('header1');
            const header3 = getByTestId('header3');
            const header4 = getByTestId('header4');

            // Starting at the 3rd header
            header3.focus();
            act(() => {
                fireEvent.keyDown(header3, { key: 'Home' });
            });
            expect(document.activeElement).toBe(header1);

            act(() => {
                fireEvent.keyDown(header1, { key: 'End' });
            });
            expect(document.activeElement).toBe(header4);
        });
    });
});
