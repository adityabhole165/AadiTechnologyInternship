import LessonPlanListPrint from "./LessonPlanListPrint";

const ExportLessonPlan = ({ LesssonPlanDetails, printRef, TeacherName, startDate, endDate }) => {
    return (
        <>

            {/* <AddLessonPlanPrint valueProp={valueProp} /> */}
            <LessonPlanListPrint exampleLessonDetails={LesssonPlanDetails} printRef={printRef} TeacherName={TeacherName}
                startDate={startDate} endDate={endDate} />

        </>
    );
};
export default ExportLessonPlan;
