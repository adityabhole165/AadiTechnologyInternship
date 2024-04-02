import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetClassTeachersBody, IGetOptionalSubjectsForMarksTransferBody, IGetStudentsToTransferMarksBody, ITransferOptionalSubjectMarksBody } from 'src/interfaces/TransferOptionalSubjectMarks/ITransferOptionalSubjectMarks';
import { CDAGetClassTeachers, CDAOptionalSubjectsForMarksTransfer, CDAStudentsToTransferMarks, CDATransferOptionalSubjectMarks } from 'src/requests/TransferOptionalSubjectMarks/ReqTransferOptionalSubjectMarks';
import { RootState } from 'src/store';

const TransferOptionalSubjectMarks = () => {
    const dispatch = useDispatch();

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const UserId = Number(localStorage.getItem('UserId'));



    const USClassTeacherList = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISGetClassTeachers);
    const USStudentsToTransferMarks = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISStudentsToTransferMarks);
    const USOptionalSubjectsForMarksTransfer = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISOptionalSubjectsForMarksTransfer);
    const ISTransferOptionalSubjectMarks = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISTransferOptionalSubjectMarks);


    const GetClassTeachersBody: IGetClassTeachersBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        "asTeacherId": 0
    }

    const GetStudentsToTransferMarksBody: IGetStudentsToTransferMarksBody = {
        "asSchoolId": 18,
        "asAcademicYearId": 54,
        "asStandardDivisionId": 1266,
        "asName": "",
        "asEndIndex": 20,
        "asStartRowIndex": 0
    }
    const GetOptionalSubjectsForMarksTransferBody: IGetOptionalSubjectsForMarksTransferBody = {
        "asSchoolId": 18,
        "asAcademicYearId": 54,
        "asStandardDivisionId": 1266
    }

    const TransferOptionalSubjectMarksBody: ITransferOptionalSubjectMarksBody = {
        "asSchoolId": 18,
        "asAcademicYearId": 54,
        "asUserId": 4463,
        "asStudentTransferMarksXml": "<ArrayOfTransferSubjectMarksInfo xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><TransferSubjectMarksInfo><StudentId>37608</StudentId><StandardDivisionId>1266</StandardDivisionId><SubjectId>2353</SubjectId><SubjectGroupId>0</SubjectGroupId></TransferSubjectMarksInfo><TransferSubjectMarksInfo><StudentId>37608</StudentId><StandardDivisionId>1266</StandardDivisionId><SubjectId>2352</SubjectId><SubjectGroupId>0</SubjectGroupId></TransferSubjectMarksInfo></ArrayOfTransferSubjectMarksInfo>"
    }

    useEffect(() => {
        dispatch(CDAGetClassTeachers(GetClassTeachersBody));
    }, []);

    useEffect(() => {
        dispatch(CDAStudentsToTransferMarks(GetStudentsToTransferMarksBody));
    }, []);

    useEffect(() => {
        dispatch(CDAOptionalSubjectsForMarksTransfer(GetOptionalSubjectsForMarksTransferBody));
    }, []);

    useEffect(() => {
        dispatch(CDATransferOptionalSubjectMarks(TransferOptionalSubjectMarksBody));
    }, []);



    return (
        <div>TransferOptionalSubjectMarks</div>
    )
}

export default TransferOptionalSubjectMarks