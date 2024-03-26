import { useState } from 'react';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import PageHeader from 'src/libraries/heading/PageHeader';

const ExamResultToppers = () => {
    const [radioBtn, setRadioBtn] = useState('1');
    const RadioList = [
        { Value: '1', Name: 'Class Toppers' },
        { Value: '2', Name: 'Standard Toppers' }
    ];
    const ClickRadio = (value) => {
        setRadioBtn(value);
    };
    return (
        <>
            <br></br>
            <PageHeader heading="ClassToppers" />
            <RadioButton1
                Array={RadioList}
                ClickRadio={ClickRadio}
                defaultValue={radioBtn}
                Label={''}
            />
        </>
    )
}

export default ExamResultToppers