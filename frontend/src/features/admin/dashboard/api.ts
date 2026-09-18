import { dashboardStats } from "@/data";
import axiosInstance from "@/lib/axios";

export async function getDashboardStats(): Promise<DashboardStats> {
  // const { data } = await axiosInstance.get<DashboardStats>("/admin/dashboard/stats");
  return dashboardStats;
  // return data;
}