import * as Yup from "yup";

const AddMessageFormSchema = Yup.object().shape({
    newMessageBody: Yup.string()
        .min(5, "Must be longer than 5 characters")
        .max(300, "Must be shorter than 300 characters")
        .required("Required"),
});
export default AddMessageFormSchema;
