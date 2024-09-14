import { Bounce, toast } from 'react-toastify';

export const customErrToast = (str: string) => {
  return toast(str, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });
};
