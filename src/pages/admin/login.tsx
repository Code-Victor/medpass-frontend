import { useNavigate, getRouteApi } from "@tanstack/react-router";
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
import { authRouter } from "@/api/routers";
import { toast } from "sonner";
import { useAuthStore } from "@/store";
import AuthImage from "@/assets/auth.svg";

const Login = () => {
  return (
    <div className="grid md:grid-cols-3 min-h-screen">
      <div className="bg-blue-3 grid place-items-center">
        <img src={AuthImage} alt="auth" className="w-full" />
      </div>
      <div className="md:col-span-2 ">
        <header className="flex justify-end py-2 px-6">
          <p className="text-right">
            Already have an account?{" "}
            <span className="text-blue-10">SIGN IN</span>
          </p>
        </header>
        <LoginForm />
      </div>
    </div>
  );
};
const fallbackDocotor = "/admin" as const;
const fallbackAdmin = "/admin/department" as const;
const routeApi = getRouteApi("/admin/login");
const loginFormSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string({ message: "Password is required" }),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

function LoginForm() {
  const navigate = useNavigate();
  const setToken = useAuthStore((s) => s.setToken);
  const search = routeApi?.useSearch();
  const { mutate: login, isPending: isLogginging } =
    authRouter.login.useMutation({
      onSuccess(data) {
        toast.success("Loggged in successfully");
        setToken(data.data.accessToken);
        if (data.data.user.role === "doctor") {
          navigate({ to: search.redirect || fallbackDocotor });
          return;
        }
        if (search.redirect === "/admin") {
          navigate({
            to: fallbackAdmin,
          });
          return;
        }
        navigate({
          to: search.redirect || fallbackAdmin,
        });
      },
    });
  const signupForm = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });
  function onSignupFormSubmit(data: LoginFormSchema) {
    login(data);
  }

  return (
    <section className="flex flex-col gap-4 max-w-xl mx-auto">
      <div className="space-y-2">
        <h1 className="font-bold text-2xl">Log into your account</h1>
        <p className="text-gray-11">
          Log into the National Electronic Health Record System
        </p>
      </div>
      <Form {...signupForm}>
        <form
          onSubmit={signupForm.handleSubmit(onSignupFormSubmit)}
          className="space-y-4"
        >
          <FormField
            control={signupForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button loading={isLogginging} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
export default Login;
