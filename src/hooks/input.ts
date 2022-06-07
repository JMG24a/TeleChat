import { ChangeEvent, useState, useContext } from "react";
import { AuthContext } from "../context/auth";

const useInputValue = (initial_value: string) => {
  const [getValue, setValue] = useState(initial_value);

  const {
    auth: { setError },
  } = useContext(AuthContext);

  const onChange = (e: ChangeEvent) => {
    setError("");
    setValue(e.target?.value);
  };

  return {
    getValue,
    onChange,
  };
};

export { useInputValue };
