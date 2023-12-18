import * as yup from "yup";

export const ValidationSchema = yup.object().shape({
    category: yup.string().required('Bu xana tələb olunur.'),
    appointment: yup.string().required('Bu xana tələb olunur.'),
    unitMeasurement: yup.string().required('Bu xana tələb olunur.'),
    // quantity: yup.number().typeError('Rəqəm olmalıdır.').moreThan(0, 'Müsbət ədəd olmalıdır.').required("Bu xana tələb olunur."),
    unitPrice: yup.number().typeError('Rəqəm olmalıdır.').moreThan(0, 'Müsbət ədəd olmalıdır.').required("Bu xana tələb olunur."),
    recipient: yup.string().required('Bu xana tələb olunur.'),
    amount: yup.number().typeError('Rəqəm olmalıdır.').moreThan(0, 'Müsbət ədəd olmalıdır.').required("Bu xana tələb olunur."),
    date: yup.string().required('Bu xana tələb olunur.'),
    paymentMethod: yup.string().required('Bu xana tələb olunur.'),
    imx: yup.number().typeError('Rəqəm olmalıdır.').moreThan(0, 'Müsbət ədəd olmalıdır.').required("Bu xana tələb olunur."),
  });
