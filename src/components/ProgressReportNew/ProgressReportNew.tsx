
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetClassTeachersBody } from "src/interfaces/ProgressReport/IprogressReport";
import { CDAGetClassTeachers } from 'src/requests/ProgressReport/ReqProgressReport';
import { RootState } from 'src/store';

const ProgressReportNew = () => {
    const dispatch = useDispatch();
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const TeacherId = sessionStorage.getItem('TeacherId');

    const USGetClassTeachers: any = useSelector(
        (state: RootState) => state.ProgressReportNew.ISGetClassTeachers
    );

    console.log(USGetClassTeachers, "USGetClassTeachers");
    const GetClassTeachersBody: IGetClassTeachersBody =
    {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asTeacherId: Number(TeacherId)
    };


    useEffect(() => {
        dispatch(CDAGetClassTeachers(GetClassTeachersBody));

    }, []);

    return (
        <div>ProgressReportNew</div>
    )
}

export default ProgressReportNew