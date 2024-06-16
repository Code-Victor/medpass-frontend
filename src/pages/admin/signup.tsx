import { getRouteApi } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import React from "react";

const routeApi = getRouteApi("/admin/signup");

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
const confirmOtpSchema = z.object({
  otp: z
    .string({ message: "OTP is required" })
    .min(6, { message: "OTP must be 6 characters long" }),
});
const updateInfoSchema = z.object({
  address: z.string({ message: "Address is required" }),
  websiteUrl: z.string({ message: "Website URL is required" }).refine(
    (url) => {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    },
    {
      message: "Website URL is invalid",
    }
  ),
  cacNumber: z.number({ message: "CAC Number is required" }).min(14, {
    message: "CAC Number should be 14 characters long",
  }),
});
type SignupFormSchema = z.infer<typeof signupFormSchema>;
type ConfirmOtpSchema = z.infer<typeof confirmOtpSchema>;
type UpdateInfoSchema = z.infer<typeof updateInfoSchema>;

function SignupForm() {
  const { step, email } = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const [resendOtpCountdown, setResendOtpCountdown] = React.useState(60);
  const signupForm = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
  });
  const confirmOtpForm = useForm<ConfirmOtpSchema>({
    resolver: zodResolver(confirmOtpSchema),
  });
  const updateInfoForm = useForm<UpdateInfoSchema>({
    resolver: zodResolver(updateInfoSchema),
  });
  function onSignupFormSubmit(data: SignupFormSchema) {
    console.log(data);
    navigate({ search: { step: "confirm-otp", email: data.email } });
  }
  function onConfirmOtpFormSubmit(data: ConfirmOtpSchema) {
    console.log(data);
    navigate({ search: { step: "update-info" } });
  }
  function onUpdateInfoFormSubmit(data: UpdateInfoSchema) {
    console.log(data);
  }

  React.useEffect(() => {
    if (step === "confirm-otp") {
      const interval = setInterval(() => {
        setResendOtpCountdown((prev) => {
          if (prev === 0) {
            clearInterval(interval);
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  if (step === "confirm-otp") {
    return (
      <section className="flex flex-col gap-4 max-w-xl mx-auto">
        <div className="space-y-2">
          <h1 className="font-bold text-2xl">Enter OTP</h1>
          <p className="text-gray-11">
            {`Enter the 6 digit one-time-password that was sent to ${email}`}
          </p>
        </div>
        <Form {...confirmOtpForm}>
          <form onSubmit={confirmOtpForm.handleSubmit(onConfirmOtpFormSubmit)}>
            <FormField
              control={confirmOtpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter 6-digit OTP</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center my-16">
              <p className="">
                Didn’t receive the code?{" "}
                {resendOtpCountdown === 0 ? (
                  <Button variant="ghost">resend code</Button>
                ) : (
                  <span className="">
                    <br /> You can request a new OTP in {resendOtpCountdown}{" "}
                    seconds
                  </span>
                )}
              </p>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </section>
    );
  }
  if (step === "update-info") {
    return (
      <section className="flex flex-col gap-4 max-w-xl mx-auto">
        <div className="space-y-2">
          <h1 className="font-bold text-2xl">Update Hospital info</h1>
          <p className="text-gray-11">Fill in your hospital information</p>
        </div>
        <Form {...updateInfoForm}>
          <form
            onSubmit={updateInfoForm.handleSubmit(onUpdateInfoFormSubmit)}
            className="space-y-4"
          >
            <FormField
              control={updateInfoForm.control}
              name="address"
              key="update-info-form-address"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Hospital address</FormLabel>
                  <FormControl>
                    <Input placeholder="yaba Lagos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={updateInfoForm.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com"
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={updateInfoForm.control}
              name="cacNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CAC number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234567...."
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </section>
    );
  }
  return (
    <section className="flex flex-col gap-4 max-w-xl mx-auto">
      <div className="space-y-2">
        <h1 className="font-bold text-2xl">Welcome to MedPass!</h1>
        <p className="text-gray-11">Register your hospital account</p>
      </div>
      <Form {...signupForm}>
        <form
          onSubmit={signupForm.handleSubmit(onSignupFormSubmit)}
          className="space-y-4"
        >
          <FormField
            control={signupForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hospital Name</FormLabel>
                <FormControl>
                  <Input placeholder="federal medical center" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hospital Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Set password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
export default Signup;
