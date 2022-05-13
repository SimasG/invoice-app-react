import Input from "./Input";
import Select from "./Select";

const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "date":
    default:
      return null;
  }
};

export default FormikControl;
