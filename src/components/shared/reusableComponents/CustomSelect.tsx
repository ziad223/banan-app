'use client';

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

type SelectTypes = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  options: SelectTypes[];
  error?: string;
};

export default function CustomSelect({
  control,
  name,
  label,
  placeholder,
  options,
  error,
}: CustomSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="w-full">
          {label && (
            <label className="mb-2 block text-sm font-medium">{label}</label>
          )}
          <Select
            onValueChange={field.onChange}
            value={field.value || ""} // ✅ يخليه controlled ويدعم reset
          >
            <SelectTrigger
              className={`w-full h-[40px] border bg-white px-2 outline-none text-right ${
                error ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder={placeholder || "اختر..."} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options?.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-right"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      )}
    />
  );
}
