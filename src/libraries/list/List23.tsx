import Card31 from '../card/Card31'
import { useLocation, useNavigate } from 'react-router-dom';
const List23 = ({ data }) => {
  const navigate = useNavigate();
  const onClick = (Id) => {
    let pageName = window.location.pathname;
    pageName = pageName.replace(
      '/extended-sidebar/Student/',
      ''
    )
    if (pageName === "Homework") {
      navigate('/extended-sidebar/Student/viewHomework/' + Id);
    }
  }
  return (<>
    {
      data.map((Detail, index) => (
        <div onClick={() => onClick(Detail.Id)} key={index}>
          <Card31
            Name={Detail.Name}
            Value={Detail.Value}

          />
        </div>
      ))
    }
  </>)
}
export default List23;