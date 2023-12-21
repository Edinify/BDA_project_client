import * as yup from "yup";

export const ValidationSchema = yup.object().shape({
    studentName: yup.string().min(3, 'Mininum 3 hərfdən ibarət olmalıdır.').required('Bu xana tələb olunur.'),
  });