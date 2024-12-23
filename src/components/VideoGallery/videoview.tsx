import { useParams } from 'react-router-dom';
import BackButton from 'src/libraries/button/BackButton';
import Card23 from 'src/libraries/card/Card23';
import { decodeURL } from '../Common/Util';

function Videoview() {
  let {
    VideoUrl,
    VideoID
  } = useParams();

  // Decode in-place
  VideoUrl = decodeURL(VideoUrl);
  VideoID = decodeURL(VideoID);


  return (
    <div>
      <BackButton
        FromRoute={'/Common/Comments/' + VideoID + '/' + 'VideoGallery'}
      />

      <Card23 pic={VideoUrl} />
    </div>
  );
}
export default Videoview;
