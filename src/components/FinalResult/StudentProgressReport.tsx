
import { useParams } from 'react-router';

function StudentProgressReport() {
    const { asUserId, asStudentId } = useParams();
    console.log(asUserId, "asUserId");
    console.log(asStudentId, "asStudentId")
    return (
        <div>
            Student Progress
        </div>
    )
}

export default StudentProgressReport