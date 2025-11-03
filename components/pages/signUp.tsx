import { SignUp } from "@/components/SignUp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export const SignUpPage = () => {
  return (
    <section className="w-full max-w-md mx-auto p-4">
      <Card>
        <CardHeader className="gap-4">
          <CardTitle className="text-center h1-bold">Sign up</CardTitle>
          <CardDescription className="text-center">
            Enter your information below to sign up.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4">
          <SignUp />
        </CardContent>
      </Card>
    </section>
  );
};
