import { formInput } from "./Form";
interface Error {
  [key: string]: string;
}

export function Validator(formData: formInput) {
  let errors: Error = {};
  let emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "i");

  errors.username = formData.username !== "" ? "" : "Please enter username";

  errors.password = formData.password !== "" ? "" : "Please enter password";
  errors.password = formData.password.length <= 8 ? "Please enter password more than 8" : "";

  errors.email = formData.email !== "" ? "" : "Please enter email";

  if(formData.email !== "" && !emailRegex.test(formData.email)) {
    errors.email = "Email is not valid.";
  }

  return errors;
}
