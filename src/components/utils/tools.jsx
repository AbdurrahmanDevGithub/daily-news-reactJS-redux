import { toast } from 'react-toastify';

export const ShowToast = (type, msg) => {
    switch (type) {
        case 'SUCCESS':
            toast.success(msg, {
                position: toast.POSITION.BOTTOM_CENTER
            });
            break;
        case 'ERROR':
            toast.error(msg, {
                position: toast.POSITION.BOTTOM_CENTER
            });
            break;
        default:
            return false;
    }
};
