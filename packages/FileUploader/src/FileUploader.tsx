import React, {
    FC,
    forwardRef,
    RefObject,
    KeyboardEvent,
    useState,
    ReactNode,
    ChangeEvent,
    HTMLProps,
    useRef,
    AllHTMLAttributes,
} from 'react';
import classnames from 'classnames';
import styles from './FileUploader.scss';

export type FileUploaderProps = AllHTMLAttributes<HTMLDivElement> &
    HTMLProps<HTMLDivElement> & {
        /** Shows button in different variant */
        variant?: 'primary' | 'secondary' | 'primaryOutlined' | 'secondaryOutlined';
        /** Text that shows up in the input field when there is no value. (Do not rely on this for important information) */
        placeholder?: ReactNode;
        /** Text that shows up in the button */
        buttonLabel?: ReactNode;
        /** Shows loading indicator */
        loading?: boolean;
        /** Shows red outline around file uploader */
        invalid?: boolean;
        /** A11y attribute that reads to the user when the user has focus of the FileUploader */
        label?: string;
        /** Value that is displayed in the input field. If using an array of values it will automatically add the comma separators */
        value: string | string[];
        /** Function that is called when a file is uploaded */
        onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    };
export const FileUploader: FC<FileUploaderProps> = forwardRef(
    (props: FileUploaderProps, ref: RefObject<HTMLDivElement>) => {
        const {
            className = '',
            value,
            placeholder = 'To upload files tap here or drop a file',
            buttonLabel = 'Choose File',
            label = 'File Uploader',
            invalid,
            onChange,
            variant = 'secondary',
            loading,
            disabled,
            ...rest
        } = props;
        const inputRef = useRef<HTMLInputElement>(null);

        function triggerFilUpload() {
            const input = inputRef.current;
            if (input) {
                input.click();
            }
        }
        function handleKeyPress(event: KeyboardEvent) {
            switch (event.key) {
                case ' ':
                case 'Enter':
                    triggerFilUpload();
                    break;
                default:
                    break;
            }
        }

        const [isDragging, setIsDragging] = useState(false);
        function handleDragOver() {
            // As you hover over this component with a file,
            // this function is called for every cursor change
            if (!isDragging) {
                setIsDragging(true);
            }
        }
        function handleDragLeave() {
            setIsDragging(false);
        }
        function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
            // react needs to use this to persist the event in the passed function
            event.persist();
            onChange(event);
            setIsDragging(false);
        }

        const formattedValue = Array.isArray(value) ? formatListOfValues(value) : value;
        const classNames = classnames({
            [styles.fileUploader]: true,
            [styles.invalid]: invalid,
            [styles.isDragging]: isDragging,
            [styles.isLoading]: loading,
            [styles.disabled]: disabled,
            [className]: className,
        });
        const displayTextClassNames = classnames({
            [styles.displayText]: true,
            [styles.placeholder]: !formattedValue,
            [styles.value]: formattedValue,
        });
        const buttonClassNames = classnames({
            [styles.button]: true,
            [styles.isLoading]: loading,
            [styles[`variant${variant}`]]: true,
        });

        return (
            <div
                tabIndex={disabled ? -1 : 0}
                onKeyDown={handleKeyPress}
                className={classNames}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                role="button"
                aria-label={label}
                aria-busy={loading}
                ref={ref}
            >
                <div className={displayTextClassNames}>{formattedValue || placeholder}</div>
                <div className={buttonClassNames}>
                    {loading && <div className={styles.loader} />}
                    {buttonLabel}
                </div>
                <input
                    {...rest}
                    tabIndex={-1}
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    className={styles.input}
                    disabled={disabled || loading}
                />
            </div>
        );
    },
);
FileUploader.displayName = 'FileUploader';

function formatListOfValues(list: string[]) {
    return list
        .map((item, index) => {
            const isLast = index === list.length - 1;
            return `${item}${isLast ? '' : ', '}`;
        })
        .join('');
}
