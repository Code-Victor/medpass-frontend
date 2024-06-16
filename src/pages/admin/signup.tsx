import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
const Signup = () => {
  return (
    <div className="grid md:grid-cols-3 min-h-screen">
      <div className="bg-blue-3"></div>
      <div className="md:col-span-2 ">
        <header className="flex justify-end py-2 px-6">
          <p className="text-right">
            Already have an account?{" "}
            <span className="text-blue-10">SIGN IN</span>
          </p>
        </header>
        <SignupForm />
      </div>
    </div>
  );
};

const signupFormSchema = z
  .object({
    name: z.string({ message: "Hospital name is required" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string({ message: "Confirm password is required" })
      .min(6, { message: "Password must be at least 6 characters long" }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
  });
type FormStep = "create-account" | "confirm-otp" | "update-info";
type SignupFormSchema = z.infer<typeof signupFormSchema>;
function SignupForm() {
  const [searchParams, setSearchParams] = useSearchParams({
    step: "create-account" as FormStep,
  }); // possible steps: "create-account","confirm-otp", "update-info"

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
  });
  function onSubmit(data: SignupFormSchema) {
    console.log(data);
    setSearchParams({ step: "2" });
  }
  let email = watch("email");
  console.log(email)
  if (searchParams.get("step") === "confirm-otp") {
    return (
      <section className="flex flex-col gap-4 max-w-xl mx-auto">
        <div className="space-y-2">
          <h1 className="font-bold text-2xl">Welcome to MedPass!</h1>
          <p className="text-gray-11">Register your hospital account</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="hospital-name">Hospital name</Label>
            <div className="spacy-y-1">
              <Input id="hospital-name" {...register("name")} />
              <span className="text-red-10 text-sm">
                {errors.name?.message}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hospital-email">Hospital email</Label>
            <div className="spacy-y-1">
              <Input type="email" id="hospital-email" {...register("email")} />
              <span className="text-red-10 text-sm">
                {errors.email?.message}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hospital-password">Set Password</Label>
            <div className="spacy-y-1">
              <Input id="hospital-password" {...register("password")} />
              <span className="text-red-10 text-sm">
                {errors.password?.message}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hospital-confirm-password">Confirm Password</Label>
            <div className="spacy-y-1">
              <Input
                id="hospital-confirm-password"
                {...register("confirmPassword")}
              />
              <span className="text-red-10 text-sm">
                {errors.confirmPassword?.message}
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Proceed</Button>
          </div>
        </form>
      </section>
    );
  }
  if (searchParams.get("step") === "update-info") {
    return (
      <section className="flex flex-col gap-4 max-w-xl mx-auto">
        <div className="space-y-2">
          <h1 className="font-bold text-2xl">Welcome to MedPass!</h1>
          <p className="text-gray-11">Register your hospital account</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="hospital-name">Hospital name</Label>
            <div className="spacy-y-1">
              <Input id="hospital-name" {...register("name")} />
              <span className="text-red-10 text-sm">
                {errors.name?.message}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hospital-email">Hospital email</Label>
            <div className="spacy-y-1">
              <Input type="email" id="hospital-email" {...register("email")} />
              <span className="text-red-10 text-sm">
                {errors.email?.message}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hospital-password">Set Password</Label>
            <div className="spacy-y-1">
              <Input id="hospital-password" {...register("password")} />
              <span className="text-red-10 text-sm">
                {errors.password?.message}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hospital-confirm-password">Confirm Password</Label>
            <div className="spacy-y-1">
              <Input
                id="hospital-confirm-password"
                {...register("confirmPassword")}
              />
              <span className="text-red-10 text-sm">
                {errors.confirmPassword?.message}
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Proceed</Button>
          </div>
        </form>
      </section>
    );
  }
  return (
    <section className="flex flex-col gap-4 max-w-xl mx-auto">
      <div className="space-y-2">
        <h1 className="font-bold text-2xl">Welcome to MedPass!</h1>
        <p className="text-gray-11">Register your hospital account</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="hospital-name">Hospital name</Label>
          <div className="spacy-y-1">
            <Input id="hospital-name" {...register("name")} />
            <span className="text-red-10 text-sm">{errors.name?.message}</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="hospital-email">Hospital email</Label>
          <div className="spacy-y-1">
            <Input type="email" id="hospital-email" {...register("email")} />
            <span className="text-red-10 text-sm">{errors.email?.message}</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="hospital-password">Set Password</Label>
          <div className="spacy-y-1">
            <Input id="hospital-password" {...register("password")} />
            <span className="text-red-10 text-sm">
              {errors.password?.message}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="hospital-confirm-password">Confirm Password</Label>
          <div className="spacy-y-1">
            <Input
              id="hospital-confirm-password"
              {...register("confirmPassword")}
            />
            <span className="text-red-10 text-sm">
              {errors.confirmPassword?.message}
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Proceed</Button>
        </div>
      </form>
    </section>
  );
}
export default Signup;
