import { DatePicker } from "@mantine/dates";
import { Field, ErrorMessage } from "formik";

const DatePickerInput = ({ label, name, ...rest }) => {
  return (
    <div className="date-picker-container">
      <label htmlFor={name}>{label}</label>
      <Field name={name} className="mantine-date-picker">
        {({ form, field }) => {
          const { setFieldValue, validateField } = form;
          const { value } = field;
          // console.log("setFieldValue", setFieldValue);
          // console.log("value", value);
          // Don't understand the "{...field}" syntax
          return (
            <DatePicker
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
              // Disables onBlur (& onChange, for some reason) validation. Why?
              onBlur={() => validateField(name)}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component="p" />
    </div>
  );
};

export default DatePickerInput;
