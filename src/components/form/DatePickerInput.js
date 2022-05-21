import { MantineProvider } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Field, ErrorMessage } from "formik";

// 1. Do I have to use <MantineProvider> wrapper to manipulate components themes (i.e. colors, fonts, spacing)?

const DatePickerInput = ({ label, name, ...rest }) => {
  return (
    <div className="date-picker-container">
      <label htmlFor={name}>{label}</label>
      <Field name={name} className="mantine-date-picker">
        {({ form, field }) => {
          const { setFieldValue, validateField } = form;
          const { value } = field;
          // Don't understand the "{...field}" syntax
          return (
            <MantineProvider>
              <DatePicker
                id={name}
                {...field}
                {...rest}
                selected={value}
                onChange={(val) => setFieldValue(name, val)}
                // Disables onBlur (& onChange, for some reason) validation. Why?
                onBlur={() => validateField(name)}
                shadows="xl"
                styles={{
                  wrapper: {
                    width: "24rem",
                    height: "4.8rem",
                  },
                  calendarHeader: {
                    width: "22rem",
                  },
                  month: {
                    width: "21.5rem",
                  },
                  dropdown: {
                    width: "24rem",
                  },
                  arrow: {
                    color: "green",
                  },
                  invoiceDate: {
                    height: "4.8rem",
                  },
                }}
              />
            </MantineProvider>
          );
        }}
      </Field>
      <ErrorMessage name={name} component="p" />
    </div>
  );
};

export default DatePickerInput;
