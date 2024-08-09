import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      //Remove queries from reach cache
      queryClient.removeQueries();
      toast.success("You have logged out");
      // Redirect to login page after successful logout
      navigate("/login", { replace: true });
    },
  });
  return { logout, isLoading };
}
