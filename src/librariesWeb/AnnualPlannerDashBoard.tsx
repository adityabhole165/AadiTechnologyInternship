import { Box, Card, CardContent, FormControlLabel, Grid, Switch, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetScreenPermission } from 'src/components/Common/Util';
import { IGetClassandStandardToppersListBody, IGetLatestExamIdandDropdownBody } from 'src/interfaces/ExamResult/IToppers';
import { IClassTeacherListBody } from 'src/interfaces/FinalResult/IFinalResult';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { ClassToppersList, LatestClassExam } from 'src/requests/ExamResult/RequestToppers';
import { ClassTechersList } from 'src/requests/FinalResult/RequestFinalResult';
import { RootState } from 'src/store';
import Header from './Header';

const AnnualPlannerDashBoard = () => {
    const dispatch = useDispatch();
    const StandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const FinalResultFullAccess = GetScreenPermission('Final Result');
    const [isToggleEnabled, setIsToggleEnabled] = useState(false);
    const [standardDivisionId, setStandardDivisionId] = useState(FinalResultFullAccess === 'Y' ? '0' : String(StandardDivisionId));
    const [ClassToppersListCT, setClassToppersListCT] = useState([]);
    const [SelectSubjectCT, setSubjectCT] = useState('0');
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

    const HeaderListCT = ['Rank', 'Roll No.', 'Student Name', 'Marks'];
    const GetClassTeachers = useSelector((state: RootState) => state.FinalResult.ClassTeachers);
    const GetLatestclassExam = useSelector((state: RootState) => state.Toppers.LatestExamIdCT);
    const GetClassToppersListCT = useSelector((state: RootState) => state.Toppers.ClassToppersList);

    const getTeacherId = () => {
        let returnVal = 0;
        GetClassTeachers.forEach((item) => {
            if (item.Value === standardDivisionId) {
                returnVal = item.Value;
            }
        });
        console.log(returnVal, 'returnVal')
        return returnVal;
    };

    const ClassTeachersBody: IClassTeacherListBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asTeacherId: FinalResultFullAccess === 'Y' ? '0' : getTeacherId(),
    };

    const ExamDropdownBodyCT: IGetLatestExamIdandDropdownBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: Number(standardDivisionId),
        asStandardId: 0,
    };

    const ToppersListBodyCT: IGetClassandStandardToppersListBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: Number(standardDivisionId),
        asStandardId: null,
        asTestId: Number(GetLatestclassExam),
        asSubjectId: Number(SelectSubjectCT),
    };

    const clickTeacherDropdown = (value) => {
        setStandardDivisionId(value);
    };

    const handleToggleChange = (event) => {
        setIsToggleEnabled(event.target.checked);
    };

    useEffect(() => {
        dispatch(ClassTechersList(ClassTeachersBody));
    }, []);

    useEffect(() => {
        setClassToppersListCT(GetClassToppersListCT);
    }, [GetClassToppersListCT]);

    useEffect(() => {
        dispatch(LatestClassExam(ExamDropdownBodyCT));
    }, []);

    useEffect(() => {
        dispatch(ClassToppersList(ToppersListBodyCT));
    }, [GetLatestclassExam, standardDivisionId]);

    return (
        <Box sx={{ backgroundColor: 'white', p: 1 }}>
            <Grid item sx={{ overflow: 'auto', display: 'flex', borderRadius: '10px' }}>
                <Header Title="Toppers" />
            </Grid>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <SearchableDropdown
                    sx={{
                        minWidth: '20vw',
                        bgcolor: FinalResultFullAccess === 'N' ? '#F0F0F0' : 'inherit',
                    }}
                    ItemList={GetClassTeachers}
                    onChange={clickTeacherDropdown}
                    label={'Teacher'}
                    defaultValue={standardDivisionId}
                    DisableClearable={FinalResultFullAccess === 'N'}
                    disabled={FinalResultFullAccess === 'N'}
                    mandatory
                    size="small"
                />
                <FormControlLabel
                    control={
                        <Switch checked={isToggleEnabled} onChange={handleToggleChange} color="primary" />
                    }
                    label="Change View"
                    sx={{ ml: 2 }}
                />
            </Box>
            <Box sx={{ height: '270px', overflow: 'auto', mt: 1 }}>
                {GetClassToppersListCT.length > 0 ? (
                    isToggleEnabled ? (

                        <Grid container spacing={2}>
                            {ClassToppersListCT.map((student, index) => (
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card sx={{ backgroundColor: '#f5f5f5', p: 2 }}>
                                        <CardContent>
                                            <Typography>Roll No.: {student.Text2}</Typography>
                                            <Typography>Student Name: {student.Text3}</Typography>
                                            <Typography>Marks: {student.Text4}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>


                    ) : (
                        // Render the original list view when toggle is disabled
                        <DynamicList2
                            HeaderList={HeaderListCT}
                            ItemList={ClassToppersListCT}
                            IconList={[]}
                            ClickItem={undefined}
                        />
                    )
                ) : (
                    <Typography variant="h4" color="textSecondary" sx={{ mt: 5 }}>
                        No record found.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default AnnualPlannerDashBoard;
