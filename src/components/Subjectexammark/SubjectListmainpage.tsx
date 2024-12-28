import { useState } from 'react';
import SubjectList from 'src/libraries/ResuableComponents/SubjectList';

const SubjectListmainpage = () => {
  const [checkValue, setcheckValue] = useState(false);
  const [textHeader4, settextHeader4] = useState('');
  const [textHeader5, settextHeader5] = useState('');
  const [textHeader6, settextHeader6] = useState('');

  const [Absent, setAbsent] = useState('');

  const [itemPublish, setitemPublish] = useState([
    {
      Id: '1',
      Text1: '4',
      Text2: 'Miss Sakshi Anand Battale',
      Text3: '0',
      IsActive: false,
      variant: 'standard',
      Text4: '4',
      Text5: 'Absent',
      Text6: '5',
      Text7: 'Absent',
      Text8: '9',
      Text9: '1011'
    },
    {
      Id: '2',
      Text1: '4',
      Text2: 'Miss Sakshi Anand Battale',
      Text3: '0',
      IsActive: false,
      variant: 'standard',
      Text4: '4',
      Text5: 'Absent',
      Text6: '5',
      Text7: 'Absent',
      Text8: '9',
      Text9: '1011'
    },
    {
      Id: '3',
      Text1: '4',
      Text2: 'Miss Sakshi Anand Battale',
      Text3: '0',
      IsActive: false,
      variant: 'standard',
      Text4: '4',
      Text5: 'Absent',
      Text6: '5',
      Text7: 'Absent',
      Text8: '9',
      Text9: '1011'
    }
  ]);

  const HeaderPublish = [
    { Id: 1, Header: '' },
    { Id: 2, Header: 'Roll No' },
    { Id: 3, Header: 'Student Name' },
    { Id: 4, Header: 'Exam Status' },
    { Id: 5, Header: ' M1 / 5' },
    { Id: 6, Header: ' 	Exam Status' },
    { Id: 7, Header: ' M2 / 5' },
    { Id: 8, Header: ' Exam Status' },
    { Id: 9, Header: ' M3 / 10' },
    { Id: 10, Header: ' Total / 20' }
  ];

  const HeaderPublish1 = [
    { Id: 1, Name: 'Absent', Value: '1' },
    { Id: 2, Name: 'exempted', Value: '2' }
  ];

  const DropdwonSelect = (value) => {
    setAbsent(value);
  };

  const Changevalue = (value) => {
    setitemPublish(value);
    //console.log(value, 'value--');
    value.map((item) => {
      return item.IsActive ? (value = value + item.Id + ',') : '';
    });
  };

  const clickchange = () => {
    let li = itemPublish.map((Item) => {
      return { ...Item, IsActive: !checkValue };
    });
    setitemPublish(li);

    setcheckValue(!checkValue);
  };

  const changetextHeader4 = (value, list) => {
    settextHeader4(value);
    //console.log(list, 'list=');
    setitemPublish(list);
  };

  const changetextHeader5 = (value, list) => {
    settextHeader5(value);
    //console.log(list, 'list=');
    setitemPublish(list);
  };

  const changetextHeader6 = (value, list) => {
    settextHeader6(value);
    //console.log(list, 'list=');
    setitemPublish(list);
  };
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <SubjectList
        textHeader4={textHeader4}
        textHeader5={textHeader5}
        textHeader6={textHeader6}
        ItemList={itemPublish}
        onChange={Changevalue}
        HeaderArray={HeaderPublish}
        clickchange={clickchange}
        changetextHeader4={changetextHeader4}
        changetextHeader5={changetextHeader5}
        changetextHeader6={changetextHeader6}
        defaultValue={Absent}
        Array={HeaderPublish1}
        // handleChange={DropdwonSelect}
        label={'Select'}
      />
    </div>
  );
};

export default SubjectListmainpage;
