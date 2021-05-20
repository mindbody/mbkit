import React, { FC, MouseEvent, AllHTMLAttributes, useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import nanoid from 'nanoid';
import styles from './Select.scss';
import { MultiSelectItem } from './MultiSelectItem';

export type MultiSelectOption = {
    label: string;
    checked: boolean | 'mixed';
    id: string;
};
export type MultiSelectProps = AllHTMLAttributes<HTMLDivElement> & {
    /** Label to be displayed above the select field */
    label: string;
    /** object with the properties of "label", "checked", "id" */
    options: MultiSelectOption[];
    /** Will be fired when user selects an option */
    onChange: (option: MultiSelectOption) => void;
    /** Placeholder of multi select input */
    placeholder?: string;
    /** Override rendered selected elements, useful if you want to have a "All" selection without displaying "All" in the selected field */
    selectedOptionsLabel?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const noop = (args: any) => {};

export const MultiSelect: FC<MultiSelectProps> = (props: MultiSelectProps) => {
    const {
        options,
        label,
        onChange,
        className = '',
        placeholder = 'Select option(s)',
        onClick = noop,
        selectedOptionsLabel,
        ...rest
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const selectButtonRef = useRef<HTMLDivElement>(null);
    const selectItemsRef = useRef<HTMLDivElement>(null);

    function handleSelectClick(e: MouseEvent<HTMLDivElement>) {
        onClick(e);
        if (selectItemsRef.current && !selectItemsRef.current.contains(e.target as Node)) {
            setIsOpen(!isOpen);
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleWatchClick, { capture: true });  
            document.addEventListener('keydown', handleWatchKeyDown);
        } else {
            document.removeEventListener('click', handleWatchClick);
            document.removeEventListener('keydown', handleWatchKeyDown);
        }
        return () => {
            document.removeEventListener('click', handleWatchClick);
            document.removeEventListener('keydown', handleWatchKeyDown);
        };
    }, [isOpen]);

    function handleWatchClick(event: Event) {
        const select = selectRef.current;
        if (select && !select.contains(event.target as HTMLElement)) {
            setIsOpen(false);
        }
    }
    function handleWatchKeyDown(event: KeyboardEvent | React.KeyboardEvent<HTMLDivElement>) {
        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowUp':
                event.stopPropagation();
                event.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                }
                handleChangeFocusOfItems(event.key);
                break;
            case 'Escape':
                setIsOpen(false);
                if (selectButtonRef.current) {
                    selectButtonRef.current.focus();
                }
                break;
            case 'Tab':
                // setting timeout so the dom has time to change activeElement after tab was pressed
                // otherwise activeElement is still same element that triggered the change
                setTimeout(() => {
                    const select = selectRef.current;
                    if (select && !select.contains(document.activeElement)) {
                        setIsOpen(false);
                    }
                }, 1);
                break;
            case 'Home':
            case 'End':
                event.preventDefault();
                handleChangeFocusOfItems(event.key);
            default:
                break;
        }
    }
    // Manages whether it should open/close when user is focused on select element
    function handleSelectWatchKeyDown(event: KeyboardEvent | React.KeyboardEvent<HTMLDivElement>) {
        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowUp':
                if (!isOpen) {
                    event.preventDefault();
                    setIsOpen(true);
                }
                break;
            case 'Enter':
            case ' ':
                setTimeout(() => {
                    const isSelectButton = document.activeElement === selectButtonRef.current;
                    if (isSelectButton) {
                        setIsOpen(!isOpen);
                    }
                }, 1);
                break;
            default:
                break;
        }
    }
    function handleChangeFocusOfItems(direction: 'ArrowUp' | 'ArrowDown' | 'Home' | 'End') {
        // setting timeout so the dom has time to change activeElement after tab was pressed
        // otherwise activeElement is still same element that triggered the change
        setTimeout(() => {
            const currentEl = document.activeElement as Element;
            const children =
                (selectButtonRef.current &&
                    Array.from(selectButtonRef.current.querySelectorAll('input[data-multiselect-item]'))) ||
                [];

            const getChildAsElement = (index: number) => children[index] as HTMLElement;

            if (children.length >= 1 && currentEl) {
                const currentIndex = children.indexOf(currentEl);
                switch (direction) {
                    case 'ArrowDown':
                        if (currentIndex + 1 >= children.length || currentIndex === -1) {
                            getChildAsElement(0).focus();
                        } else {
                            getChildAsElement(currentIndex + 1).focus();
                        }
                        break;
                    case 'ArrowUp':
                        if (currentIndex - 1 < 0) {
                            getChildAsElement(children.length - 1).focus();
                        } else {
                            getChildAsElement(currentIndex - 1).focus();
                        }
                        break;
                    case 'Home':
                        getChildAsElement(0).focus();
                        break;
                    case 'End':
                        getChildAsElement(children.length - 1).focus();
                        break;
                }
            }
        }, 1);
    }

    const selectId = `select-${nanoid()}`;
    const labelId = `label-${nanoid()}`;

    const selectClassNames = classnames({
        [styles.select]: true,
        [className]: className,
        [styles.isOpen]: isOpen,
    });
    const selectMenuClassNames = classnames({
        [styles.multiSelectMenu]: true,
        [styles.isOpen]: isOpen,
    });
    const checkedOptions = options.filter(opt => {
        if (opt.checked === true) {
            return opt;
        }
        return null;
    });
    const activeDescendants = checkedOptions.map(option => option.id).join(' ');
    const activeLabels = selectedOptionsLabel ? selectedOptionsLabel : checkedOptions
        .map((option, index) => {
            const useComma = index + 1 >= checkedOptions.length ? '' : ',';
            return `${option.label}${useComma}`;
        })
        .join(' ');
    const placeholderClassNames = classnames({
        [styles.selectPlaceholderLabel]: true,
        [styles.placeholder]: activeLabels.trim().length === 0,
    });
    return (
        <div ref={selectRef} className={styles.multiSelectContainer}>
            <div id={labelId} className={styles.label} data-testid="label">
                {label}
            </div>
            <div
                ref={selectButtonRef}
                id={selectId}
                className={selectClassNames}
                onClick={handleSelectClick}
                onKeyDown={handleSelectWatchKeyDown}
                tabIndex={0}
                role="listbox"
                aria-roledescription="multi select"
                aria-expanded={isOpen}
                aria-labelledby={labelId}
                aria-activedescendant={activeDescendants}
                aria-multiselectable="true"
                {...rest}
            >
                <div className={placeholderClassNames} data-testid="placeholdOrSelectedOptions">{activeLabels.trim() || placeholder}</div>
                <div className={selectMenuClassNames} ref={selectItemsRef}>
                    {options.map((option, index) => (
                        <MultiSelectItem
                            {...option}
                            aria-posinset={index + 1}
                            aria-setsize={options.length}
                            key={option.id}
                            onChange={() => onChange({ ...option, checked: !option.checked })}
                            aria-controls={selectId}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
MultiSelect.displayName = 'MultiSelect';
