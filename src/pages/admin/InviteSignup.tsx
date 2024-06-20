import { authRouter } from "@/api/routers";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRouteApi, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import AuthImage from "@/assets/auth.svg";

const routeApi = getRouteApi("/admin/invite-signup");

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

const inviteSignupFormSchema = z
  .object({
    fullName: z.string({ message: "Your name is required" }),
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

type InviteSignupFormSchema = z.infer<typeof inviteSignupFormSchema>;

function SignupForm() {
  const { token } = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const setToken = useAuthStore((s) => s.setToken);
  const { mutate: acceptInvite, isPending: isAcceptingInvite } =
    authRouter.inviteSignup.useMutation({
      onSuccess(data) {
        setToken(data.data.accessToken);
        toast.success("Account created successfully");
        navigate({
          to: "/admin/verify-kyc",
          search: {
            role: "doctor",
          },
        });
      },
    });

  const form = useForm<InviteSignupFormSchema>({
    resolver: zodResolver(inviteSignupFormSchema),
  });

  function onSubmit({ fullName, password }: InviteSignupFormSchema) {
    acceptInvite({
      token,
      fullName,
      password,
    });
  }

  return (
    <section className="flex flex-col gap-4 max-w-xl mx-auto" key="signupform">
      <div className="space-y-2">
        <h1 className="font-bold text-2xl">Welcome to MedPass!</h1>
        <p className="text-gray-11">Complete your invite by signing up</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="john doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
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
            control={form.control}
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
            <Button loading={isAcceptingInvite} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
export default Signup;
