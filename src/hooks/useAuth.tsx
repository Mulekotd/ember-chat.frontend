import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";

import Cookies from "js-cookie";
import { FirebaseError } from "firebase/app";
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { api, setAuthToken } from "@/services/api";

// Validation schema for login
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .min(1, "Password is required"),
});

// Validation schema for sign-up
const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must be at most 50 characters long"),
    email: z
      .string()
      .email("Invalid email")
      .min(5, "Email must be at least 5 characters long")
      .max(100, "Email must be at most 100 characters long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password must be at most 50 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Validation schema for password reset
const resetPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const useAuth = () => {
  const router = useRouter();

  // Function to handle Firebase errors
  const getFirebaseErrorMessage = (
    error: FirebaseError | Error | unknown
  ): string => {
    // Check if it's a FirebaseError
    if (error && typeof error === "object" && "code" in error) {
      const firebaseError = error as FirebaseError;

      switch (firebaseError.code) {
        case "auth/user-not-found":
          return "User not found.";
        case "auth/wrong-password":
          return "Incorrect password.";
        case "auth/invalid-email":
          return "Invalid email.";
        case "auth/user-disabled":
          return "Account disabled.";
        case "auth/too-many-requests":
          return "Too many attempts. Please try again later.";
        case "auth/network-request-failed":
          return "Network error. Please check your connection.";
        case "auth/email-already-in-use":
          return "This email is already in use.";
        case "auth/weak-password":
          return "Password is too weak.";
        case "auth/popup-closed-by-user":
          return "Login cancelled by the user.";
        case "auth/popup-blocked":
          return "Popup blocked. Please allow popups for this site.";
        case "auth/invalid-credential":
          return "Invalid credentials. Please check email and password.";
        default:
          return "Unexpected error. Please try again.";
      }
    }

    // Check if it's a regular Error
    if (error instanceof Error) {
      return error.message;
    }

    return "Unexpected error. Please try again.";
  };

  const sso = async (values: LoginFormValues) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    const token = await userCredential.user.getIdToken();

    Cookies.set("auth_token", token, {
      expires: 1, // Expires in 1 day
      secure: process.env.NODE_ENV === "production", // Secure in production (HTTPS)
      sameSite: "strict",
    });

    await setAuthToken(userCredential.user);

    toast.success("Login successful!");
    router.push("/chat");
  };

  // Hook for login
  const useLogin = () => {
    const handleSubmit = async (values: LoginFormValues) => {
      formik.setSubmitting(true);

      try {
        await sso(values);
      } catch (error) {
        const errorMessage = getFirebaseErrorMessage(error);
        toast.error(errorMessage);
      } finally {
        formik.setSubmitting(false);
      }
    };

    const formik = useFormik<LoginFormValues>({
      initialValues: { email: "", password: "" },
      validationSchema: toFormikValidationSchema(loginSchema),
      onSubmit: handleSubmit,
    });

    return { formik };
  };

  // Hook for sign-up
  const useRegister = () => {
    const handleSubmit = async (values: SignUpFormValues) => {
      formik.setSubmitting(true);

      try {
        const payload = Object.assign({}, values);
        const { data: response } = await api.post("/auth/register", payload);

        if (response) {
          await api.post("user", {
            email: values.email,
            name: values.name,
            uid: response.data.uid,
          });
        }
      } catch (e) {
        let errorMessage = "An unknown error occurred";

        if (e instanceof Error) {
          errorMessage = e.message;
        } else if (typeof e === "string") {
          errorMessage = e;
        } else if (e && typeof e === "object" && "response" in e) {
          const axiosError = e as {
            response?: { data?: { error?: { message?: string } } };
          };

          errorMessage =
            axiosError.response?.data?.error?.message || "Request error";
        }

        toast.error(errorMessage);
      } finally {
        await sso(formik.values);
        formik.setSubmitting(false);
      }
    };

    const formik = useFormik<SignUpFormValues>({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: toFormikValidationSchema(signUpSchema),
      onSubmit: handleSubmit,
    });

    return { formik };
  };

  // Hook for password reset
  const useResetPassword = () => {
    const handleSubmit = async (values: ResetPasswordFormValues) => {
      formik.setSubmitting(true);

      try {
        await sendPasswordResetEmail(auth, values.email);

        toast.success("Recovery email sent! Please check your inbox.");
        formik.resetForm();
      } catch (error) {
        const errorMessage = getFirebaseErrorMessage(error);
        toast.error(errorMessage);
      } finally {
        formik.setSubmitting(false);
      }
    };

    const formik = useFormik<ResetPasswordFormValues>({
      initialValues: { email: "" },
      validationSchema: toFormikValidationSchema(resetPasswordSchema),
      onSubmit: handleSubmit,
    });

    return { formik };
  };

  const logout = async () => {
    try {
      // Clear token before logout
      await setAuthToken(null);
      await signOut(auth);

      toast.success("Successfully logged out!");
      router.push("/login");
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  return {
    useLogin,
    useRegister,
    useResetPassword,
    logout,
  };
};
