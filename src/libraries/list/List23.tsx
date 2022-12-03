import Card31 from '../card/Card31'
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorMessages from '../ErrorMessages/ErrorMessages';

const List23 = ({ data }) => {
  const navigate = useNavigate();
  const onClick = (navPath) => {
    if (navPath !== undefined) {
        navigate(navPath);
    }
  }
  return (<>

  {data.length == 0 ? <ErrorMessages Error={'Not configured yet'} /> :
  <>
  {
      data.map((Detail, index) => (
        <div onClick={() => onClick(Detail.navPath)} key={index}>
          <Card31
            Name={Detail.Name}
            Value={Detail.Value}
            text1={Detail.text1}
            text2={Detail.text2}
            text3={Detail.text3}
          />
        </div>
      ))
    }
  </>
}
  </>)
}
export default List23;