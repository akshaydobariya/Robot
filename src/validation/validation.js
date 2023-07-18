import * as yup from "yup";

// Define the validation schema
export const loginValidationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export const registerValidationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export const addRobotValidationSchema = yup.object().shape({
  robotName: yup.string().required("Robot Name is required"),
  ownerName: yup.string().required("Owner Name is required"),
  robotFeature: yup.string().required("Robot Feature is required"),
  location: yup.string().required("Location is required"),
  version: yup.string().required("Version is required"),
  //image: yup.mixed().required("Image is required"),
});
