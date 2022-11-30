import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./Components/Form";
import "@testing-library/jest-dom";

test("renders the page", () => {
  render(<Form />);

  const linkElement = screen.getByText("Login Form");
  const username = screen.queryByPlaceholderText("Username");
  const email = screen.queryByPlaceholderText("Email");
  const Password = screen.queryByPlaceholderText("Password");

  expect(linkElement).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(Password).toBeInTheDocument();
});

test("Submit empty field", () => {
  render(<Form />);

  const button = screen.getByRole("button");
  fireEvent.click(button);

  expect(screen.getByText(/Please enter username/)).toBeInTheDocument();
  expect(screen.getByText(/Please enter email/)).toBeInTheDocument();
  expect(screen.getByText(/Please enter password/)).toBeInTheDocument();
});

test("Ask user to ensure password length shoud more than 8", () => {
  render(<Form />);

  const password = screen.getByPlaceholderText("Password") as HTMLInputElement;
  const button = screen.getByRole("button");

  fireEvent.change(password, { target: { value: "passwo" } });
  fireEvent.click(button);

  expect(password.value).toBe("passwo");
  expect(
    screen.getByText(/Please enter password more than 8/)
  ).toBeInTheDocument();
});

test("Enter wrong email", () => {
  render(<Form />);

  const password = screen.getByPlaceholderText("Email") as HTMLInputElement;
  const button = screen.getByRole("button");

  fireEvent.change(password, { target: { value: "email@g" } });
  fireEvent.click(button);

  expect(password.value).toBe("email@g");
  expect(screen.getByText(/Email is not valid./)).toBeInTheDocument();
});
