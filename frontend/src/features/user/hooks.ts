import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProfile, changePassword } from "./api";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { useAppSelector } from "@/store/hooks";
import { AxiosError } from "axios";

export function useUpdateProfile() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (user) => {
      if (accessToken) {
        dispatch(setCredentials({ accessToken, user }));
      }
      toast.success("Profile updated");
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error?.response?.data?.message ?? "Could not update profile");
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error?.response?.data?.message ?? "Could not change password");
    },
  });
}