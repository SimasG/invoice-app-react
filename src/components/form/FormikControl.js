import DatePickerInput from "./DatePickerInput";
import Input from "./Input";
import Select from "./Select";

const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "date":
      return <DatePickerInput {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
