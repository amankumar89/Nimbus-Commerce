import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loginRequest, registerRequest, logoutRequest } from "@/features/auth/api";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials, logout as logoutAction } from "@/store/slices/authSlice";

export function useLoginMutation() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: ({ accessToken, user }) => {
      dispatch(setCredentials({ accessToken, user }));
      toast.success(`Welcome back, ${user.name || user.email}!`);
      router.replace(user.role === "ADMIN" ? "/admin/dashboard" : "/");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ?? "Invalid email or password. Please try again.";
      toast.error(message);
    },
  });
}

export function useRegisterMutation() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: registerRequest,
    onSuccess: ({ accessToken, user }) => {
      dispatch(setCredentials({ accessToken, user }));
      toast.success("Account created successfully!");
      router.replace("/");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ?? "Could not create account. Please try again.";
      toast.error(message);
    },
  });
}

export function useLogoutMutation() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      dispatch(logoutAction());
      toast.success("Logged out successfully");
      router.replace("/login");
    },
    onError: () => {
      dispatch(logoutAction());
      router.replace("/login");
    },
  });
}