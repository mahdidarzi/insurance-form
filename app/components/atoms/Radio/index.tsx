import React from "react";

interface RadioButtonProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
}

export default function RadioButton({
  name,
  value,
  checked,
  onChange,
  label,
}: RadioButtonProps) {
  return (
    <label
      className="flex items-center justify-center cursor-pointer select-none"
      dir="rtl"
      htmlFor={value}
    >
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="hidden"
      />

      {/* Outer circle */}
      <span
        className={`w-4 h-4  !border-2 rounded-full border-[#C2C2C2] relative flex items-center justify-center`}
        // style={{ top: "3px", left: "0" }}
      >
        {/* Inner circle visible only if checked */}
        {checked && (
          <span className="w-full h-full bg-black rounded-full" />
        )}
      </span>

      {/* Label text */}
      {/* <span className="mr-2 text-black">{label}</span> */}
    </label>
  );
}
