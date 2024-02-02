import {
  CardDetaiAtt,
  CardDetailTopper,
  CardDetailTopper1
} from '../styled/AccordianStyled';
function CardAttendace({ Name, Text1 }) {
  return (
    <div>
      <CardDetaiAtt>
        <CardDetailTopper>{Name} :</CardDetailTopper>
        <CardDetailTopper1
          dangerouslySetInnerHTML={{ __html: Text1 }}
        ></CardDetailTopper1>
      </CardDetaiAtt>
    </div>
  );
}
export default CardAttendace;
