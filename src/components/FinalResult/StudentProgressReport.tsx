
import { useParams } from 'react-router';
import { decodeURL } from '../Common/Util';

function StudentProgressReport() {
    let {
        asUserId,
        asStudentId
    } = useParams();

    // Decode in-place
    asUserId = decodeURL(asUserId);
    asStudentId = decodeURL(asStudentId);

    console.log(asUserId, "asUserId");
    console.log(asStudentId, "asStudentId")
    return (
        <div>
            Student Progress
        </div>
    )
}

export default StudentProgressReport