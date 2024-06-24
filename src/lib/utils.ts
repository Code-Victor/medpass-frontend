import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// A schema for a phone number field
export const phoneNumberSchema = z
  .string()
  .refine(
    (value) => {
      // A regex pattern to check for the prefix +234 or 0
      const prefixPattern = /^(?:\+234|0)/;
      // Return true if the value starts with +234 or 0, false otherwise
      return prefixPattern.test(value);
    },
    {
      // A custom error message
      message: "Phone number must start with +234 or 0.",
    }
  )
  .refine(
    (value) => {
      // A regex pattern to check for the first digit after the prefix
      const firstDigitPattern = /(?<=^(?:\+234|0))[7-9]/;
      // Return true if the value has a digit from 7 to 9 after the prefix, false otherwise
      return firstDigitPattern.test(value);
    },
    {
      // A custom error message
      message: "Phone number must have a digit from 7 to 9 after the prefix.",
    }
  )
  .refine(
    (value) => {
      // A regex pattern to check for the total length of the phone number
      const lengthPattern = /^(?:\+234|0)(?=[7-9])\d{10}$/;
      // Return true if the value has a total length of 13 or 11 digits, false otherwise
      return lengthPattern.test(value);
    },
    {
      // A custom error message
      message: "Phone number must have a total length of 13 or 11 digits.",
    }
  );

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function splitByNewline(text: string): string[] {
  const splittedText = text.split(/\r?\n/);
  return splittedText.flatMap((t) => (t ? [t] : []));
}
