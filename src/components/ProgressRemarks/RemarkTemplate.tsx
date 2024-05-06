import { Box, Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IGetAllGradesForStandardBody, IGetRemarkTemplateDetailsBody, IGetRemarksCategory } from 'src/interfaces/ProgressRemarks/IRemarkTemplate';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import { CDAGetGrades, CDAGetRemarkCategory, CDAGetRemarkTemplateDetails } from 'src/requests/ProgressRemarks/ReqRemarkTemplate';
import { RootState, useDispatch } from 'src/store';

const RemarkTemplate = ({ open, setOpen, ClickCloseDialogbox, clickPublishUnpublish }) => {
    const dispatch = useDispatch();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const [StandardId, setStandardId] = useState();
    const [SubjectId, setSubjectId] = useState();
    const [TestId, setTestId] = useState();
    const [RemarkId, setRemarkId] = useState();
    const [SortExpression, setSortExpression] = useState();
    const [SortDirection, setSortDirection] = useState();
    const [Filter, setFilter] = useState();
    const [MarksGradesConfigurationDetailsId, setMarksGradesConfigurationDetailsId] = useState();





    const [Remarks, setRemarks] = useState();
    const [Grade, setGrade] = useState();
    const [Reason, setReason] = useState('');

    const RemarksCategory: any = useSelector((state: RootState) => state.RemarkTemplate.GetRemarkCategory)
    const RemarkTemplateDetails: any = useSelector((state: RootState) => state.RemarkTemplate.GetRemarkTemplateDetails)

    console.log('RemarkTemplateDetails', RemarkTemplateDetails);
    console.log('RemarksCategory', RemarksCategory);

    const Grades: any = useSelector((state: RootState) => state.RemarkTemplate.GetGrades)

    console.log('Grades', Grades);

    const GetRemarkCategory: IGetRemarksCategory = {
        asSchoolId: asSchoolId,
        asAcadmicYearId: asAcademicYearId

    }

    const GetAllGrades: IGetAllGradesForStandardBody = {
        asSchool_Id: asSchoolId,
        asAcademic_Year_Id: asAcademicYearId,
        // asStandard_Id: StandardId,
        // asSubjectId: SubjectId,
        // asTest_Id: TestId

        asStandard_Id: 0,
        asSubjectId: 0,
        asTest_Id: 0
    }
    const GetRemarkTemplateDetails: IGetRemarkTemplateDetailsBody = {

        asSchoolId: asSchoolId,
        asRemarkId: RemarkId,
        asSortExpression: SortExpression,
        asSortDirection: SortDirection,
        asFilter: Filter,
        asAcadmicYearId: asAcademicYearId,
        asMarksGradesConfigurationDetailsId: MarksGradesConfigurationDetailsId,
        asStandardId: StandardId

    }


    useEffect(() => {
        dispatch(CDAGetRemarkCategory(GetRemarkCategory))
    }, []);

    useEffect(() => {
        dispatch(CDAGetGrades(GetAllGrades))
    }, []);

    useEffect(() => {
        dispatch(CDAGetRemarkTemplateDetails(GetRemarkTemplateDetails))
    }, [])

    const clickRemarks = (value) => {
        setRemarks(value)
    }

    const clickGrade = (value) => {
        setGrade(value)
    }

    const ClickOk = () => {
        if (Reason != '') clickPublishUnpublish(0);
    };



    return (
        <>
            <br></br>
            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                fullWidth
                maxWidth={'sm'}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: (theme) => theme.palette.error.main,
                        py: 1
                    }}
                ></DialogTitle>
                <DialogContent dividers sx={{ px: 3 }}>
                    <PageHeader heading={'Select appropriate template'} subheading={''} />
                    {/* <InputField Item = {studentName} label={'Student Name'} /> */}

                    <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                    >

                        <Grid item xs={12} sm={6}>
                            <Typography
                                component={Box}
                                sx={{ border: '1px solid black' }}
                                p={0.5}
                            >
                                Student Name:
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        {/* <TextField value={TeacherName} /> */}
                    </Grid>
                    <br></br>
                    <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                    >

                        <Grid item xs={12} sm={6}>
                            <Typography
                                component={Box}
                                sx={{ border: '1px solid black' }}
                                p={0.5}
                            >
                                Remark Category:
                            </Typography>
                        </Grid>

                        <Grid item xs={3}>
                            <SearchableDropdown
                                ItemList={RemarksCategory}
                                onChange={clickRemarks}
                                defaultValue={Remarks}
                                label={'All'}
                            />
                        </Grid>

                        <br></br>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                component={Box}
                                sx={{ border: '1px solid black' }}
                                p={0.5}
                            >
                                Grade:
                            </Typography>
                        </Grid>
                        {/* <br></br> */}

                        <Grid item xs={3}>
                            <SearchableDropdown
                                ItemList={Grades}
                                onChange={clickGrade}
                                defaultValue={Grade}
                                label={'All'}
                            />
                        </Grid>


                    </Grid>

                </DialogContent>
            </Dialog>

        </>
    )
}
export default RemarkTemplate;