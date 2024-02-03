import { Styles } from 'src/assets/style/student-style';
import { ErrorDetail2 } from '../styled/ErrormessageStyled';

function ErrorMessage1({ Error }) {
  const classes = Styles();

  return (
    <>
      <ErrorDetail2>{Error}</ErrorDetail2>
    </>
  );
}

export default ErrorMessage1;
