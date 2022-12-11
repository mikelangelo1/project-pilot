import { FormInstance } from "antd";

export function NumberOnly(val: string): boolean {
  if (!Number(val) && val !== "") {
    return false;
  }
  return true;
}
export const FormatNumberOnly = (
  form: FormInstance<any>,
  formField: string,
  val: string
): boolean => {
  if (val === "") {
    form.setFields([{ name: formField, value: "" }]);
    return true;
  }
  if (!NumberOnly(val) && val !== "0") {
    const value = val.split("");
    const num = value.filter((val) => Number(val));
    form.setFields([{ name: formField, value: num.join("") }]);
    return false;
  }
  return true;
};
