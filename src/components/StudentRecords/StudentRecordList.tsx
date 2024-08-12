import ExpandMore from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { useState } from 'react';
import QueAnsList from './QueAnsList';
const AddStudentRecordList = () => {
    const [ItemList, setItemList] = useState(
        [{
            Header: "Family Information",
            QueAnsList: [
                {
                    Id: 1,
                    Question: "Is the child living with both the parents?",
                    QueType: 2,
                    Answer: "",

                },
                {
                    Id: 2,
                    Question: "Language spoken at home",
                    QueType: 1,
                    Answer: ""
                }
            ]
        }, {
            Header: "Medical History",
            QueAnsList: [
                {
                    Id: 3,
                    Question: "Has the child had any prolonged absences from school? If yes, please state the reason for absence.",
                    QueType: 1,
                    Answer: "",

                },
                {
                    Id: 4,
                    Question: "Does the child have any medical record?",
                    QueType: 1,
                    Answer: ""
                }
            ]
        },]
    )
    const ChangeItem = (ItemList) => {
        setItemList(ItemList)
    }
    return (
        <div>
            {
                ItemList.length == 0 ?
                    <Typography>No Records Found</Typography>
                    :
                    ItemList.map((Item, i) => {
                        return (
                            <Accordion defaultExpanded
                                sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Typography variant={"h4"}>
                                        {Item.Header}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ p: 0 }}>
                                    <QueAnsList ItemList={Item.QueAnsList} ChangeItem={ChangeItem}></QueAnsList>
                                </AccordionDetails>
                            </Accordion >
                        )
                    })
            }

        </div>
    )
}

export default AddStudentRecordList