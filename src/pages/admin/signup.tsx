import { getRouteApi, Link } from "@tanstack/react-router";
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
import { phoneNumberSchema } from "@/lib/utils";
import { authRouter } from "@/api/routers";
import { toast } from "sonner";
import { useAuthStore } from "@/store";
import AuthImage from "@/assets/auth.svg";

const routeApi = getRouteApi("/admin/signup");

const Signup = () => {
  return (
    <div className="grid md:grid-cols-3 min-h-screen">
      <div className="bg-blue-3 grid place-items-center">
        <img src={AuthImage} alt="auth" className="w-full" />
      </div>
      <div className="md:col-span-2 ">
        <header className="flex justify-end py-2 px-6">
          <p className="text-right">
            Already have an account?{" "}
            <Link to="/admin/login">
              <Button variant="link" className="text-blue-10">
                SIGN IN
              </Button>
            </Link>
          </p>
        </header>
        <SignupForm />
      </div>
    </div>
  );
};

const signupFormSchema = z
  .object({
    fullName: z.string({ message: "Your name is required" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email" }),
    phoneNumber: phoneNumberSchema,
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string({ message: "Confirm password is required" })
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
  });
const confirmOtpSchema = z.object({
  otp: z
    .string({ message: "OTP is required" })
    .min(6, { message: "OTP must be 6 characters long" }),
});

type SignupFormSchema = z.infer<typeof signupFormSchema>;
type ConfirmOtpSchema = z.infer<typeof confirmOtpSchema>;

function SignupForm() {
  const { step, email } = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const setToken = useAuthStore((s) => s.setToken);
  const [resendOtpCountdown, setResendOtpCountdown] = React.useState(60);
  const { mutate: registerUser, isPending: isRegisterring } =
    authRouter.adminRegister.useMutation({
      onSuccess(data, variables) {
        toast.success(data.message ?? "Account created successfully");
        navigate({ search: { step: "confirm-otp", email: variables.email } });
      },
    });
  const { mutate: verifyOtp, isPending: isVerifyingOtp } =
    authRouter.verifyOTP.useMutation({
      onSuccess(data) {
        setToken(data.data.accessToken);
        toast.success("OTP verified successfully");
        navigate({
          to: "/admin/create-hospital",
        });
      },
    });
  const { mutate: resendOTP, isPending: isResendingOTP } =
    authRouter.resendOTP.useMutation({
      onSuccess(data) {
        toast.success(data.message ?? "OTP verified successfully");
      },
    });
  const signupForm = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
  });
  const confirmOtpForm = useForm<ConfirmOtpSchema>({
    resolver: zodResolver(confirmOtpSchema),
  });

  function onSignupFormSubmit(data: SignupFormSchema) {
    registerUser(data);
  }
  function onConfirmOtpFormSubmit(data: ConfirmOtpSchema) {
    if (email) {
      verifyOtp({ ...data, email });
    }
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
      <section className="flex flex-col gap-4 max-w-xl mx-auto" key="otp-form">
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
                  <Button
                    variant="ghost"
                    type="button"
                    loading={isResendingOTP}
                    onClick={() => (email ? resendOTP({ email }) : null)}
                  >
                    resend code
                  </Button>
                ) : (
                  <span className="">
                    <br /> You can request a new OTP in {resendOtpCountdown}{" "}
                    seconds
                  </span>
                )}
              </p>
            </div>
            <div className="flex justify-end">
              <Button type="submit" loading={isVerifyingOtp}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4 max-w-xl mx-auto" key="signupform">
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
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
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
                <FormLabel>Your Email</FormLabel>
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Phone number</FormLabel>
                <FormControl>
                  <Input placeholder="+234 000 111 222" {...field} />
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
            <Button loading={isRegisterring} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
export default Signup;
