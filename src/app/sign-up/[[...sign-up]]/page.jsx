import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Sign up — SneekerHub",
  description: "Create your SneekerHub account.",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <SignUp />
    </div>
  );
}
