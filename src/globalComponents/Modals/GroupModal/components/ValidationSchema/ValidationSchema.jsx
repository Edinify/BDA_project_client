import * as yup from "yup";

export const ValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Mininum 3 hərfdən ibarət olmalıdır.")
    .required("Bu xana tələb olunur."),
  course: yup.object().required("Bu xana tələb olunur."),
});
