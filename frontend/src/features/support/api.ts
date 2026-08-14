import { faqs } from "@/data";
import axiosInstance from "@/lib/axios";

export async function getFaqs(): Promise<Faq[]> {
  // const { data } = await axiosInstance.get<Faq[]>("/support/faqs");
  return faqs;
  // return data;
}

export async function submitContactForm(
  payload: ContactFormPayload
): Promise<{ success: boolean }> {
  const { data } = await axiosInstance.post("/support/contact", payload);
  return data;
}