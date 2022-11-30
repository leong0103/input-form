import React, { useState } from "react";
import { Validator } from "./Validator";
import {
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Center from "./Center";

export interface formInput {
  username: string;
  email: string;
  password: string;
}

interface formError {
  username?: string;
  email?: string;
  password?: string;
}

function Form() {
  const formfields = [
    {
      label: "Username",
      type: "text",
      name: "username",
      placeholder: "Username",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Email",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Password",
    },
  ];

  const initialError = { username: "", email: "", password: "" };

  const initialValues = { username: "", email: "", password: "" };

  const [formValues, setFormValues] = useState<formInput>(initialValues);
  const [formError, setFormError] = useState<formError>(initialError);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let errors = Validator(formValues);
    if (!Object.values(errors).every((item) => item === "")) {
      setIsSubmit(false);
      setFormError(errors);
      console.log("Form has error");
      return;
    }
    setIsSubmit(true);
    console.log("You can submit");
  }

  return (
    <Center>
      {isSubmit ? (
        <Typography>
          <p>Form submitted</p>
        </Typography>
      ) : (
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <Box
              sx={{
                ".MuiTextField-root": {
                  m: 1,
                  width: "90%",
                },
              }}
            >
              <form onSubmit={(e) => handleSubmit(e)}>
                <Typography variant="h3">
                  Login Form
                </Typography>
                {formfields.map((field, index) => {
                  return (
                    <TextField
                      key={field.name}
                      label={field.label}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                      {...(formError[field.name as keyof typeof formError] && {
                        error: true,
                        helperText:
                          formError[field.name as keyof typeof formError],
                      })}
                    />
                  );
                })}
                <Button
                  id="submit-btn"
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ width: "90%" }}
                >
                  Submit
                </Button>
              </form>
            </Box>
          </CardContent>
        </Card>
      )}
    </Center>
  );
}

export default Form;
