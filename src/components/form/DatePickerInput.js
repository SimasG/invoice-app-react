import { DatePicker } from "@mantine/dates";
import { Field, ErrorMessage } from "formik";

const DatePickerInput = ({ label, name, ...rest }) => {
  return (
    <div className="date-picker-container">
      <label htmlFor={name}>{label}</label>
      <Field name={name} className="mantine-date-picker">
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          // console.log('setFieldValue', setFieldValue)
          // console.log('value', value)
          <DatePicker />;
        }}
      </Field>
      <ErrorMessage name={name} component="p" />
    </div>
  );
};

export default DatePickerInput;
