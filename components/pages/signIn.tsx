import { SignIn } from "@/components/SignIn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export const SignInPage = () => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card>
        <CardHeader className="gap-4">
          <CardTitle className="text-center h1-bold">Sign in</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4">
          <SignIn />
        </CardContent>
      </Card>
    </div>
  );
};
