import Card23 from 'src/libraries/card/Card23';
import { useParams } from 'react-router-dom';
import BackButton from 'src/libraries/button/BackButton';

function Videoview() {
  const { VideoUrl,VideoID } = useParams();

  return (
    <div>
     
        <BackButton FromRoute={"/Common/Comments/" + VideoID + "/" + "VideoGallery" }/>
    
      <Card23 pic={VideoUrl} />
    </div>
  );
}
export default Videoview;
