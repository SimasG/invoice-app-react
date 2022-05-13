import { ErrorMessage, Field } from "formik";

const Select = ({ label, name, options, ...rest }) => {
  return (
    <div className="payment-terms-container">
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component="p" />
    </div>
  );
};

export default Select;
