// This ensures the file is treated as a module.
export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin" | "user"; // Define your roles here
    };
  }
}