import React from "react";

interface field {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, type, name, placeholder, handleChange }: field) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

export default Input;
