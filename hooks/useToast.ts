import { toast } from "sonner";

const useToast = () => {
  const toastError = (message: string) => {
    toast.error(message, {
      style: {
        border: "none",
        padding: "8px",
        borderRadius: "12px",
        background: "#EE4E4E",
        color: "white",
        fontSize: 16,
      },
    });
  };

  const toastSuccess = (message: string) => {
    toast.success(message, {
      style: {
        border: "none",
        padding: "8px",
        borderRadius: "12px",
        background: "#009874",
        fontSize: 16,
        color: "white",
      },
    });
  };

  return { toastSuccess, toastError };
};

export default useToast;
