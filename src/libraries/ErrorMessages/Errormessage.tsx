import { Styles } from 'src/assets/style/student-style';
import { ErrorDetail1 } from '../styled/ErrormessageStyled';

function Errormessages({ Error }) {
  const classes = Styles();

  return (
    <>
      <ErrorDetail1>{Error}</ErrorDetail1>
    </>
  );
}

export default Errormessages;
