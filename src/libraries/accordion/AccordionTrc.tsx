import PropTypes from 'prop-types';
import { useState } from 'react';
import AccordionPTA from './accordionPTA';

AccordionTrc.propTypes = {
  Parent: PropTypes.array,
  Teacher: PropTypes.array,
  headingg: PropTypes.object
};

function AccordionTrc({ Parent, Teacher, headingg }) {
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const Data = Teacher.map((item, index) => {
    return {
      id: item.RealatedSection,
      header: item.TeacherName,
      text1: item.TeacherDesignation,
      text2: '',
      backgroundColor: item.RealatedSection === '2' ? 'info' : '',
      RelatedSection: item.RealatedSection === '2' ? '2' : '0'
    };
  });

  const Data1 = Parent.map((item, index) => {
    return {
      id: index,
      header: item.ParentName,
      text1: item.ParentDesignation,
      text2: item.MobileNumber1,
      text3: item.Class,
      text4: item.MobileNumber2,
      text6: item.ContactTime,
      backgroundColor: ''
    };
  });
  return (
    <>
      <AccordionPTA
        name="panel1"
        header={headingg.PTA_Member}
        Data={Data}
        isExpanded={expanded === 'panel1'}
        handleChange={handleChange('panel1')}
      />

      <AccordionPTA
        name="panel2"
        header={headingg.PTA}
        Data={Data1}
        isExpanded={expanded === 'panel2'}
        handleChange={handleChange('panel2')}
      />
    </>
  );
}
export default AccordionTrc;
