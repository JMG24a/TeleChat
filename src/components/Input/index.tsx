import React, { ChangeEvent } from "react";

function Input({ type, name, value, onChange }: IProps) {
  return (
    <input
      value={value}
      onChange={(e: ChangeEvent) => onChange(e)}
      className="bg-transparent mb-2 text-white"
      type={type}
      placeholder={name}
    />
  );
}

interface IProps {
  type: string;
  name: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent) => void;
}

export { Input };
