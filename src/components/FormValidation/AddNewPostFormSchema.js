import * as Yup from "yup";

const AddNewPostFormSchema = Yup.object().shape({
    newPostText: Yup.string()
        .min(10, "Must be longer than 5 characters")
        .max(600, "Must be shorter than 600 characters")
        .required("Required"),
});
export default AddNewPostFormSchema;
