import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import PageHeader from 'src/libraries/heading/PageHeader';
import { RootState, useDispatch } from 'src/store';

import { Box, Grid, Typography } from '@mui/material';
import {
    IGetClassSubjectDropdownBodyCT
} from 'src/interfaces/ExamResult/IExamResultToppers';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import {
    ClassSubjectListDropdownCT
} from 'src/requests/ExamResult/RequestExamResultToppers';

const ExamResultToppers = () => {
    const dispatch = useDispatch();
    const [radioBtn, setRadioBtn] = useState('1');
    const [SelectSubjectCT, setSelectSubjectCT] = useState('0');

    const RadioList = [
        { Value: '1', Name: 'Class Toppers' },
        { Value: '2', Name: 'Standard Toppers' }
    ];
    const GetSubjectdropdownCT: any = useSelector(
        (state: RootState) => state.ExamResultToppers.ClassSubjectCT
    );

    const ClassSubjectDropdownCT: IGetClassSubjectDropdownBodyCT = {
        "asSchoolId": 18,
        "asAcademicYearId": 54,
        "asStandardDivId": 1270,
        "asExamId": 609
    };
    useEffect(() => {
        dispatch(ClassSubjectListDropdownCT(ClassSubjectDropdownCT));
    }, []);
    const ClickRadio = (value) => {
        setRadioBtn(value);
    };
    const clickSubjectDropdownCT = (value) => {
        setSelectSubjectCT(value);
    };
    return (
        <>
            <br></br>
            <PageHeader heading="ClassToppers" />
            <RadioButton1
                Array={RadioList}
                ClickRadio={ClickRadio}
                defaultValue={radioBtn}
                Label={''}
            />
            <Grid item xs={6}>
                <Typography margin={'1px'}>
                    <b>Select Standard:</b>
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Box
                    sx={{
                        marginRight: '0px',
                        width: '110%',
                        padding: '0.9px',
                        boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
                        border: '1px solid black'
                    }}
                >
                    <Dropdown
                        Array={GetSubjectdropdownCT}
                        handleChange={clickSubjectDropdownCT}
                        defaultValue={SelectSubjectCT}

                    />
                </Box>
            </Grid>
        </>
    )
}

export default ExamResultToppers