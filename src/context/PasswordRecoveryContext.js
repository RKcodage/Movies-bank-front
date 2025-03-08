import React, { createContext, useState } from "react";

// Création du contexte
export const PasswordRecoveryContext = createContext(null);

// Provider du contexte
export const PasswordRecoveryProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <PasswordRecoveryContext.Provider
      value={{ email, setEmail, otp, setOTP, newPassword, setNewPassword }}
    >
      {children}
    </PasswordRecoveryContext.Provider>
  );
};
