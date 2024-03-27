import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    IGetClassExamDropDownBodyCT,
    IGetClassNameDropDownBodyCT,
    IGetClassSubjectDropdownBodyCT
} from 'src/interfaces/ExamResult/IExamResultToppers';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import {
    ClassExamListCT,
    ClassNameListCT,
    ClassSubjectListDropdownCT
} from 'src/requests/ExamResult/RequestExamResultToppers';
import { RootState, useDispatch } from 'src/store';

const ExamResultToppers = () => {
    const dispatch = useDispatch();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const [radioBtn, setRadioBtn] = useState('1');
    const [SelectSubjectCT, setSelectSubjectCT] = useState('0');
    const [SelectExamCT, setExamCT] = useState('0');
    const [SelectClassNameCT, setClassNameCT] = useState('0');

    const RadioListCT = [
        { Value: '1', Name: 'Class Toppers' },
        { Value: '2', Name: 'Standard Toppers' }
    ];
    const GetSubjectdropdownCT: any = useSelector(
        (state: RootState) => state.ExamResultToppers.ClassSubjectCT
    );
    const GetExamdropdownCT: any = useSelector(
        (state: RootState) => state.ExamResultToppers.ClassExamCT
    );
    const GetClassNameropdownCT: any = useSelector(
        (state: RootState) => state.ExamResultToppers.ClassNamelistCT
    );
    console.log(GetClassNameropdownCT, "abcd");

    const ClassSubjectDropdownCT: IGetClassSubjectDropdownBodyCT = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        "asStandardDivId": 1270,
        "asExamId": 609
    };
    const ClassExamDropdownCT: IGetClassExamDropDownBodyCT = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        "asStandardDivisionId": 1266
    };
    const ClassNameDropdownCT: IGetClassNameDropDownBodyCT = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,

    };

    useEffect(() => {
        dispatch(ClassSubjectListDropdownCT(ClassSubjectDropdownCT));
    }, []);
    useEffect(() => {
        dispatch(ClassExamListCT(ClassExamDropdownCT));
    }, []);
    useEffect(() => {
        dispatch(ClassNameListCT(ClassNameDropdownCT));
    }, []);

    const ClickRadio = (value) => {
        setRadioBtn(value);
    };
    const clickSubjectDropdownCT = (value) => {
        setSelectSubjectCT(value);
    };
    const clickExamDropdownCT = (value) => {
        setExamCT(value);
    };
    const clickClassNameDropdownCT = (value) => {
        setClassNameCT(value);
    };
    return (
        <>
            <br></br>
            <PageHeader heading="ClassToppers" />
            <RadioButton1
                Array={RadioListCT}
                ClickRadio={ClickRadio}
                defaultValue={radioBtn}
                Label={''}
            />
            <Grid item xs={6}>
                <Typography margin={'1px'}>
                    <b>Select Class:</b>
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <SearchableDropdown
                    ItemList={GetClassNameropdownCT}
                    onChange={clickClassNameDropdownCT}
                    defaultValue={SelectClassNameCT}
                    size={"small"}
                />
            </Grid>
            <Grid item xs={6}>
                <Typography margin={'1px'}>
                    <b>Select Exam:</b>
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <SearchableDropdown
                    label={""}
                    sx={{ pl: 0, minWidth: '350px' }}
                    ItemList={GetExamdropdownCT}
                    onChange={clickExamDropdownCT}
                    defaultValue={SelectExamCT}
                    size={"small"}

                />
            </Grid>
            <Grid item xs={6}>
                <Typography margin={'1px'}>
                    <b>Select Standard:</b>
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <SearchableDropdown
                    label={""}
                    sx={{ pl: 0, minWidth: '350px' }}
                    ItemList={GetSubjectdropdownCT}
                    onChange={clickSubjectDropdownCT}
                    defaultValue={SelectSubjectCT}
                    size={"small"}

                />
            </Grid>


        </>
    )
}

export default ExamResultToppers