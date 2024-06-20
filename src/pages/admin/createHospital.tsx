import { useNavigate } from "@tanstack/react-router";
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
import { hospitalRouter } from "@/api/routers";
import { toast } from "sonner";
import { phoneNumberSchema } from "@/lib/utils";
import AuthImage from "@/assets/auth.svg";

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
            <span className="text-blue-10">SIGN IN</span>
          </p>
        </header>
        <SignupForm />
      </div>
    </div>
  );
};

const signupFormSchema = z.object({
  name: z.string({ message: "Hospital name is required" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  phoneNumber: phoneNumberSchema,
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
  cacNumber: z.string({ message: "CAC Number is required" }).min(14, {
    message: "CAC Number should be 14 characters long",
  }),
});

type SignupFormSchema = z.infer<typeof signupFormSchema>;

function SignupForm() {
  const navigate = useNavigate();
  const { mutate: createHospital, isPending: isCreating } =
    hospitalRouter.createHospital.useMutation({
      onSuccess() {
        toast.success("Hospital created successfully");
        navigate({
          to: "/admin/verify-kyc",
          search: {
            role: "admin",
          },
        });
      },
    });
  const signupForm = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
  });
  console.log(signupForm.formState.errors);
  function onSignupFormSubmit(data: SignupFormSchema) {
    console.log(data);
    createHospital({
      email: data.email,
      name: data.name,
      phone: data.phoneNumber,
      address: data.address,
      website_url: data.websiteUrl,
      cac_number: data.cacNumber,
    });
  }

  return (
    <section className="flex flex-col gap-4 max-w-xl mx-auto">
      <div className="space-y-2">
        <h1 className="font-bold text-2xl">Register your hospital account</h1>
        <p className="text-gray-11">
          Join the National Electronic Health Record System
        </p>
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hospital phone number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+234 704 522 1111"
                    type="tel"
                    {...field}
                  />
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hospital Address</FormLabel>
                <FormControl>
                  <Input placeholder="yankee Lagos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
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
            control={signupForm.control}
            name="cacNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CAC number</FormLabel>
                <FormControl>
                  <Input placeholder="000 000 000 000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button loading={isCreating} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
export default Signup;
