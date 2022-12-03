import React from "react";
import { inputInfo } from "../utils/input-info";

export function InputField({ infoKey, register, error }) {
  const info = inputInfo[infoKey];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="uppercased font-medium block text-sm text-gray-600 ">
          {info.label}
        </label>
        <div className="relative flex flex-col items-center group">
          <div className="">
            <InfoCircle />
          </div>
          <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex w-max">
            <span className="relative z-10 p-2 text-xs text-white whitespace-no-wrap bg-black shadow-lg rounded-lg">
              {info.tooltip}
            </span>
          </div>
        </div>
      </div>

      <input
        {...register}
        className="bg-gray-50 w-full text-sm rounded-lg block p-2"
        type={info.type}
        placeholder={info.placeholder}
      />
      {error && <p className="mt-1 text-red-600 text-sm">{error.message}</p>}
    </div>
  );
}

export const InfoCircle = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5Z"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 12V8.25"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.00415 6H8.99741"
        stroke="#292D32"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
