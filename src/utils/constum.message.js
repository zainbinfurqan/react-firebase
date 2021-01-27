import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const configuration = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
}
const CustomToast = (flag, message) => {
    switch (flag) {
        case 'error':
            return (toast.error(message, {
                ...configuration
            }))
        case 'success':
            return (toast.success(message, {
                ...configuration,
            }))

        default:
            break;
    }
}

export default CustomToast