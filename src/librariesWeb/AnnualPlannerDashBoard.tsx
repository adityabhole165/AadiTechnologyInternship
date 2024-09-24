import { Box, Grid, Typography } from '@mui/material';
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
    const StandardDivisionId = Number(
        sessionStorage.getItem('StandardDivisionId')
    );
    const FinalResultFullAccess = GetScreenPermission('Final Result');
    const [standardDivisionId, setStandardDivisionId] = useState(FinalResultFullAccess == 'Y' ? '0' : String(StandardDivisionId))
    const [ClassToppersListCT, setClassToppersListCT] = useState([])
    const [SelectSubjectCT, setSubjectCT] = useState('0');
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

    const HeaderListCT = ['Rank', 'Roll No.', 'Student Name', 'Marks'];
    const GetClassTeachers = useSelector(
        (state: RootState) => state.FinalResult.ClassTeachers
    );
    const GetLatestclassExam = useSelector(
        (state: RootState) => state.Toppers.LatestExamIdCT
    );
    const GetClassToppersListCT = useSelector(
        (state: RootState) => state.Toppers.ClassToppersList
    );

    const getTeacherId = () => {
        let returnVal = 0
        GetClassTeachers.map((item) => {
            if (item.Value == standardDivisionId) {
                returnVal = item.Id
            }
        })

        return returnVal

    };

    const ClassTeachersBody: IClassTeacherListBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        // asTeacherId: "2532"
        asTeacherId: FinalResultFullAccess == 'Y' ? '0' : getTeacherId()
    };
    const ExamDropdownBodyCT: IGetLatestExamIdandDropdownBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: Number(standardDivisionId),
        asStandardId: 0
    };
    const ToppersListBodyCT: IGetClassandStandardToppersListBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: Number(standardDivisionId),
        asStandardId: null,
        asTestId: Number(GetLatestclassExam),
        asSubjectId: Number(SelectSubjectCT)
    };

    const clickTeacherDropdown = (value) => {
        setStandardDivisionId(value);

    };
    useEffect(() => {
        setClassToppersListCT(GetClassToppersListCT)
    }, [GetClassToppersListCT])

    useEffect(() => {
        dispatch(LatestClassExam(ExamDropdownBodyCT));
    }, []);
    useEffect(() => {
        dispatch(ClassToppersList(ToppersListBodyCT));
    }, [GetLatestclassExam, GetClassTeachers]);
    useEffect(() => {
        dispatch(ClassTechersList(ClassTeachersBody));
    }, [getTeacherId()]);


    return (
        <Box sx={{ backgroundColor: 'white', p: 1 }} >
            <Grid item sx={{ overflow: 'auto', display: 'flex', borderRadius: '10px' }}>
                <Header Title="Toppers" />
            </Grid>
            <Box>
                <SearchableDropdown
                    sx={{
                        minWidth: '300px'
                        , bgcolor: FinalResultFullAccess === 'N' ? '#F0F0F0' : 'inherit'
                    }}

                    ItemList={GetClassTeachers}
                    onChange={clickTeacherDropdown}
                    label={'Teacher'}
                    defaultValue={standardDivisionId}
                    DisableClearable={FinalResultFullAccess === 'N'}
                    disabled={FinalResultFullAccess === 'N'}

                    mandatory
                    size={"small"}

                />
            </Box>
            <Box sx={{ height: '320px', overflow: 'auto', mt: 1, }}>
                {GetClassToppersListCT.length > 0 ? (
                    <div>
                        <DynamicList2
                            HeaderList={HeaderListCT}
                            ItemList={ClassToppersListCT}
                            IconList={[]}
                            ClickItem={undefined}
                        />
                    </div>
                ) : (
                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                        <b>No record found.</b>
                    </Typography>

                )}
            </Box>
        </Box >
    );
};

export default AnnualPlannerDashBoard;


