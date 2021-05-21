/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, MouseEvent, AllHTMLAttributes, FC, forwardRef, RefObject, ReactNode, RefAttributes, useRef, useEffect, ChangeEventHandler } from 'react';
import classnames from 'classnames';
import styles from './GenderSelection.scss';
export type SelectOptions = {
    label: string;
    value: string;
}[]

type item = {
    label?: string;
    value?: string;
}
type selectItem = null | item
const CheckIcon =(props:any)=>{
    return(
    <svg xmlns="http://www.w3.org/2000/svg" width="7.868" height="5.863" viewBox="0 0 7.868 5.863" stroke='inherit'>
  <path id="Stroke_761" data-name="Stroke 761" d="M6.455,0,2.169,4.656,0,2.328" transform="translate(0.707 0.707)" fill="none" stroke="inherit" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1"/>
</svg>
    )
} 
const BottomArrow = (props:any) =>{
    return (
        <svg id="Icon" xmlns="http://www.w3.org/2000/svg" stroke="#696C74" width="12" height="12" viewBox="0 0 9 9" transform="rotate(270)">
        <g id="Icon-2" data-name="Icon" transform="translate(3.375 1.688)">
    <path id="Path_31" data-name="Path 31" d="M2.25,0,0,2.813,2.25,5.625" transform="translate(0 0)" fill="none" stroke="inherit" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1"/>
  </g>
</svg>
    )
}
const AddIcon = (props: any) =>{
    return (
        
<svg xmlns="http://www.w3.org/2000/svg" width="7.054" height="7.054" viewBox="0 0 7.054 7.054" stroke='#000'>
  <g id="Component_4_1" data-name="Component 4 – 1" transform="translate(0.5 0.5)">
    <path id="Path_1" data-name="Path 1" d="M73.947,40.329v6.054" transform="translate(-70.92 -40.329)" fill="none" stroke="inherit" stroke-linecap="round" stroke-width="1"/>
    <path id="Path_2" data-name="Path 2" d="M0,0V6.054" transform="translate(0 3.027) rotate(-90)" fill="none" stroke="inherit" stroke-linecap="round" stroke-width="1"/>
  </g>
</svg>

    )
}
export type GenderProps = AllHTMLAttributes<HTMLDivElement> &
    RefAttributes<HTMLDivElement> & {

        // Determines custom option is visible or not 
        customEnable?: boolean;

        // return object on change of selection 
        onChange: (selectedItem: item | null) => void;
    };

const optionArr = [{
    label: 'Male',
    value: 'male'
},
{
    label: 'Female',
    value: 'female'
}]
export const GenderSelection: FC<GenderProps> = (props: GenderProps, ref: RefObject<HTMLDivElement>) => {

    const {
        customEnable,
        // options = [],
        onChange,
        className = '',
        placeholder = 'Gender',

        ...rest
    } = props;

    const [isInputVisible, setInputVisible] = useState(false)
    const [isDropDownOpen, SetDropDownState] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<selectItem>({})
    const [customInputValue, setCustomInputValue] = useState('')
    const [options, setOptions] = useState(optionArr)
    const toggleCustomItem = () => {
        if (customEnable) {
            const customPlaceHolder = { label: 'Custom', value: 'custom' }
            const updatedOptions = [...options, customPlaceHolder]
            setOptions(updatedOptions)
            return
        }
        // options[options.length-1].value === 'custom' && options.pop() 

    }
    useEffect(() => {
        toggleCustomItem()
    }, [])
    useEffect(() => {
        onChange(selectedItem)
    }, [selectedItem])

    useEffect(() => {
        toggleCustomItem()

    }, [customEnable])

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("click", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref]);


    const wrapperRef = useRef<HTMLDivElement>(null);
    // useOutsideAlerter(wrapperRef);
    const toggleDropDown = () => {
        SetDropDownState(!isDropDownOpen)
    }
    const selectFromFropDown = (item: item) => {
        if (item.label && item.label.toLowerCase() === 'custom') {
            setInputVisible(true)
        }else{
            setInputVisible(false)
        }
        setSelectedItem(item)
        SetDropDownState(false)
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomInputValue(e.target.value)

    }
    const handleInputKeyPress = (event: KeyboardEvent | React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            const customEntery = {
                label: customInputValue,
                value: customInputValue
            }
            let updatedOptions = [...options]
            updatedOptions.splice(updatedOptions.length - 1, 0, customEntery)
            // options.push(customEntery)
            setCustomInputValue('')
            setInputVisible(false)
            setSelectedItem({})
            setOptions(updatedOptions)

        }
    }


    const handleClickOutside = (event: Event) => {
        const select = wrapperRef.current;
        if (select && !select.contains(event.target as HTMLElement)) {
            SetDropDownState(false)
        }
    }


    return (
        <div className={classnames([styles.genderWrapper])} ref={wrapperRef} {...rest} >
            <div className={classnames([styles.selectWrapper])}>
                <label className={classnames([styles.genderLabel])}>Gender</label>
                <div className={classnames([styles.genderSelect])}>
                    <div id={'GenderSelection'} className={classnames([styles.genderSelectTitle])} onClick={toggleDropDown}>
                        {selectedItem && Object.keys(selectedItem).length !== 0 ? selectedItem.label : <span className={classnames([styles.placeholder])}>{placeholder}</span>} <span className={classnames([styles.bottomIcon])}><BottomArrow /></span>
                    </div>
                    <div className={classnames([styles.genderSelectionList], { [styles.openList]: isDropDownOpen })} >
                        {options && options.map(item => {
                            return (
                                <div className={classnames([styles.singleListItem])} 
                                    onClick={() => { selectFromFropDown(item) }} 
                                    key={JSON.stringify(item)}
                                >
                                    <CheckIcon  />     
                                    {item.value === 'custom' && <AddIcon /> }  
                                    {item.label}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={classnames([styles.customInputWrapper], { [styles.displayInput]: isInputVisible })}>
                <div className="customInput">
                    <input className={'customInputBox'} type='text' placeholder='Enter custom gender' onChange={handleInputChange} value={customInputValue} onKeyPress={(e) => handleInputKeyPress(e)} />
                </div>
            </div>
        </div>
    )
};

GenderSelection.displayName = 'GenderSelection';
