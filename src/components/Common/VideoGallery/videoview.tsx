import Card23 from 'src/libraries/card/Card23';
import { useParams } from 'react-router-dom';

function Videoview() {
  const { VideoUrl } = useParams();
  return (
    <div>
      <Card23 pic={VideoUrl} />
    </div>
  );
}
export default Videoview;
