import { Field, ErrorMessage } from "formik";

const Input = ({ label, name, ...rest }) => {
  return (
    <div key={name}>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage name={name} component="p" className="error-msg" />
    </div>
  );
};

export default Input;
