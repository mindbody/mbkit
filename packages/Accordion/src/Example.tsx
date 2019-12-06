import React, { useState } from 'react';
import { Accordion } from './Accordion';
import { AccordionItem } from './AccordionItem';
import { AccordionHeader } from './AccordionHeader';
import { AccordionPane } from './AccordionPane';

export const AccordionExample = () => {
    const [activePanes, setActivePanes] = useState([1]);

    function handleChange(index: number) {
        setActivePanes([index]);
    }
    return (
        <Accordion activePanes={activePanes} onChange={handleChange}>
            <AccordionItem>
                <AccordionHeader>Item 1</AccordionHeader>
                <AccordionPane>Content in pane 1</AccordionPane>
            </AccordionItem>

            <AccordionItem>
                <AccordionHeader>Item 2</AccordionHeader>
                <AccordionPane>Content in pane 2</AccordionPane>
            </AccordionItem>

            <AccordionItem>
                <AccordionHeader>Item 3</AccordionHeader>
                <AccordionPane>Content in pane 3</AccordionPane>
            </AccordionItem>
        </Accordion>
    );
};
