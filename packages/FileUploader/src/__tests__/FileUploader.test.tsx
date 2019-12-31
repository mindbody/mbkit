import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FileUploader } from '../FileUploader';

describe('FileUploader', () => {
    const onChangeSpy = jest.fn();
    const onClickSpy = jest.fn();
    it('should render', () => {
        const { getByTestId } = render(<FileUploader value={''} onChange={onChangeSpy} data-testid="test" />);
        expect(getByTestId('test')).toBeTruthy();
    });
    it('should render with the passed in button text and placeholder', () => {
        const { getByText } = render(
            <FileUploader
                value={''}
                placeholder="CUSTOM PLACEHOLDER"
                buttonLabel="TEST BUTTON"
                onChange={onChangeSpy}
                data-testid="test"
            />,
        );
        expect(getByText('TEST BUTTON')).toBeTruthy();
        expect(getByText('CUSTOM PLACEHOLDER')).toBeTruthy();
    });
    it('should render with the value passed in', () => {
        const { getByText } = render(<FileUploader value={'somefile.txt'} onChange={onChangeSpy} data-testid="test" />);
        expect(getByText('somefile.txt')).toBeTruthy();
    });
    it('should render text with commas with a value array passed in', () => {
        const { getByText } = render(
            <FileUploader
                value={['somefile.txt', 'another.png', 'final.js']}
                onChange={onChangeSpy}
                data-testid="test"
            />,
        );
        expect(getByText('somefile.txt, another.png, final.js')).toBeTruthy();
    });
    it('should have a loading indicator when loading prop is passed', () => {
        const { container } = render(<FileUploader loading value={['final.js']} onChange={onChangeSpy} />);
        const loaderElements = container.querySelectorAll('.loader').length;
        expect(loaderElements).toBe(1);
    });
    it('should disable the input when the disabled prop is passed', () => {
        const { getByTestId } = render(
            <FileUploader data-testid="test" disabled value={['final.js']} onChange={onChangeSpy} />,
        );
        expect(getByTestId('test').hasAttribute('disabled')).toBe(true);
    });
    it('should trigger the onChange spy when the change event is fired', () => {
        const { getByTestId } = render(<FileUploader data-testid="test" value={['final.js']} onChange={onChangeSpy} />);
        fireEvent.change(getByTestId('test'));
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });
    it('should trigger the onChange spy when the space or enter key is pressed', () => {
        const { getByTestId } = render(
            <FileUploader data-testid="test" value={['final.js']} onChange={onChangeSpy} onClick={onClickSpy} />,
        );
        const fileUploader = getByTestId('test');
        // should fire for these two events
        fireEvent.keyDown(fileUploader, { key: ' ' });
        fireEvent.keyDown(fileUploader, { key: 'Enter' });

        // should not fire for these
        fireEvent.keyDown(fileUploader, { key: 'a' });
        fireEvent.keyDown(fileUploader, { key: '/' });
        fireEvent.keyDown(fileUploader, { key: '?' });
        expect(onClickSpy).toHaveBeenCalledTimes(2);
    });
    it('should trigger the drag styles when a drag over happens', () => {
        const { container, getByTestId } = render(
            <FileUploader data-testid="test" value={''} onChange={onChangeSpy} />,
        );

        // starts with no drag class
        expect(container.querySelectorAll('.isDragging').length).toBe(0);

        // when dragging, a class should exist
        fireEvent.dragOver(getByTestId('test'));
        fireEvent.dragOver(getByTestId('test'));
        expect(container.querySelectorAll('.isDragging').length).toBe(1);

        // when leaving, drag should also leave
        fireEvent.dragLeave(getByTestId('test'));
        expect(container.querySelectorAll('.isDragging').length).toBe(0);
    });
});
