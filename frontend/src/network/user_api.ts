import { User } from "../models/user";

import { UnauthorizedError } from "../network/http-errors";
export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}
export async function SignUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetch("http://localhost:8080/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export async function Login(credentials: LoginCredentials): Promise<User> {
  const response = await fetch("http://localhost:8080/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new UnauthorizedError("Invalid credentials");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getAuthenticatedUser() {
  const response = await fetch(
    "http://localhost:8080/api/users/authenticated-user",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
}
