import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getFaqs, submitContactForm } from "./api";
import { AxiosError } from "axios";

export function useFaqs() {
  return useQuery({
    queryKey: ["support", "faqs"],
    queryFn: getFaqs,
    staleTime: 10 * 60 * 1000, // FAQs change rarely — cache 10 min
  });
}

export function useSubmitContactForm() {
  return useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      toast.success("Message sent! We'll get back to you soon.");
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error?.response?.data?.message ?? "Could not send message. Try again.");
    },
  });
}