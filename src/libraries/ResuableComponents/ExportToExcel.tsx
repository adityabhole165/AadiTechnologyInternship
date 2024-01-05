import React from 'react';
import ReactExport from 'react-export-excel';
import { ButtonPrimary } from '../styled/ButtonStyle';

const ExportToExcel = ({ File }) => {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const Button = (
    <ButtonPrimary
      style={{ background: 'green', color: 'white', padding: '8px' }}
    >
      Export
    </ButtonPrimary>
  );

  return (
    <ExcelFile element={Button}>
      <ExcelSheet data={File} name="Sheet1">
      
        {File.length > 0 && Object.keys(File[0]).map((key) => (
          <ExcelColumn key={key} label={key} value={key} />
        ))}
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportToExcel;
