import { FC, createContext, useState } from 'react';
import { AlertProps } from 'src/components/AlertComponents';
type AlertContext = {
  toggleAlert: boolean;
  alertInfo: AlertProps;
  showAlert({
    variant,
    title,
    message,
    confirmButtonText,
    cancelButtonText,
    onConfirm,
    onCancel
  }: AlertProps);
  closeAlert();
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AlertContext = createContext<AlertContext>({} as AlertContext);

export const AlertProvider: FC = ({ children }) => {
  const [toggleAlert, setToggleAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState<AlertProps>({
    variant: 'info',
    title: '',
    message: '',
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    onConfirm: () => {},
    onCancel: () => {}
  });

  const showAlert = (alertInfo) => {
    setAlertInfo(alertInfo);
    setToggleAlert(true);
  };

  const closeAlert = () => {
    setToggleAlert(false);
  };

  return (
    <AlertContext.Provider
      value={{ toggleAlert, alertInfo, showAlert, closeAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
};
