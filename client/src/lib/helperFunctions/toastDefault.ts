import { useToasterStore } from "react-hot-toast";

export const defaultToastMessage = {
  loading: "Loading...",
  success: "Data fetched successfully",
  error: (err: any) => `${err?.response?.data?.msg}` ?? "Something is wrong, please try again",
};

/**
 * Hook to get information whether something is loading
 * @returns true if there is a loading toast
 * @example const isLoading = useLoadingToast();
 */
export function useLoadingToast(): boolean {
  const { toasts } = useToasterStore();
  const isLoading = toasts.some((toast: any) => toast.type === "loading");
  return isLoading;
}
