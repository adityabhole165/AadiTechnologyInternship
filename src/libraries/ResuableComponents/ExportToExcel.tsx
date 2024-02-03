import ReactExport from 'react-export-excel';
import { ButtonPrimary } from '../styled/ButtonStyle';

const ExportToExcel = ({ File1, File2 = [], File3 = [], ExportExcel }) => {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const ExportClick = () => {
    if (ExportExcel) {
      ExportExcel();
    }
  };

  const Button = (
    <ButtonPrimary
      style={{ background: 'green', color: 'white', padding: '8px' }}
      onClick={ExportClick}
    >
      Export
    </ButtonPrimary>
  );

  return (
    <ExcelFile element={Button}>
      <ExcelSheet data={File1} name="Sheet1">
        {File1.length > 0 &&
          Object.keys(File1[0]).map((key) => (
            <ExcelColumn key={key} label={key} value={key} />
          ))}
      </ExcelSheet>

      <ExcelSheet data={File2} name="Sheet2">
        {File2.length > 0 &&
          Object.keys(File2[0]).map((key) => (
            <ExcelColumn key={key} label={key} value={key} />
          ))}
      </ExcelSheet>

      <ExcelSheet data={File3} name="Sheet3">
        {File3.length > 0 &&
          Object.keys(File3[0]).map((key) => (
            <ExcelColumn key={key} label={key} value={key} />
          ))}
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportToExcel;
