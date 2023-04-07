import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;

export const url = "http://localhost:5000/abovi";

export const basicSchema = yup.object().shape({
  Email: yup.string().email("Please enter a valid email").required("Required"),
  Address: yup.string().min(2).max(15).required("Please enter your address"),
  Firstname: yup
    .string()
    .min(2)
    .max(15)
    .required("Please enter your firstname"),
  Lastname: yup.string().min(2).max(15).required("Please enter your lastname"),
  university: yup
    .string()
    .min(2)
    .max(15)
    .required("Please enter your university"),
  GPA: yup.number().positive().required("Please enter your GPA or Jamb score"),
  phone: yup
    .number()
    .min(0)
    .max(11)
    .positive()
    .required("Please enter your GPA or Jamb score"),
  natid: yup.string().required("Please select your means of  Identification "),
  profile: yup.string().required("Please select your recent photograph "),
});

export const validateSchema = yup.object().shape({
  Email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is Required"),
  Firstname: yup
    .string()
    .min(2)
    .max(15)
    .required("Please enter agents Firstname"),
  Lastname: yup
    .string()
    .min(2)
    .max(15)
    .required("Please enter agents Lastname"),
  Address: yup.string().min(2).max(40).required("Please enter agents Address"),
  Phone: yup
    .string()
    .required("Please enter agent's phone number")
    .test(
      "len",
      "Phone number must be  11 digits",
      (val) => val && val.length === 11
    ),
  Password: yup
    .string()
    .min(7)
    .matches(passwordRules, {
      message:
        "Please create a stronger password(1 upper case letter, 1 lower case letter, 1 numeric digit)",
    })
    .required("Password is required"),
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref("Password"), null], "Passwords must match")
    .required("Please Confirm agents Password"),
});

export const updateSchema = yup.object().shape({
  Email: yup.string().email("Please enter a valid email"),
  Firstname: yup.string().min(2).max(15),
  Lastname: yup.string().min(2).max(15),
  Address: yup.string().min(2).max(40),
  Phone: yup.string().min(11).max(11),
  Password: yup.string().min(7).matches(passwordRules, {
    message:
      "Please create a stronger password(1 upper case letter, 1 lower case letter, 1 numeric digit)",
  }),
});

export const updatePasswordSchema = yup.object().shape({
  Password: yup
    .string()
    .min(7)
    .matches(passwordRules, {
      message:
        "Please create a stronger password(1 upper case letter, 1 lower case letter, 1 numeric digit)",
    })
    .required("Password is required"),
  NewPassword: yup
    .string()
    .min(7)
    .matches(passwordRules, {
      message:
        "Please create a stronger password(1 upper case letter, 1 lower case letter, 1 numeric digit)",
    })
    .required("New Password is required"),
  ConfirmNewPassword: yup
    .string()
    .oneOf([yup.ref("NewPassword"), null], "Passwords must match")
    .required("Please Confirm your Password"),
});
