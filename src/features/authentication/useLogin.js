import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Corrected typo
  const { mutate: login, isLoading } = useMutation({
    mutationFn: async (
      { email, password } // Corrected destructuring
    ) => loginApi({ email, password }), // Passing the correct parameters
    onSuccess: (user) => {
      //Set data into react query cache
      queryClient.setQueryData(["user", user.user]);
      toast.success("Login successful"); // Corrected typo

      navigate("/dashboard"); // Corrected typo
    },
    onError: (error) => {
      toast.error("Email or password is incorrect");
    },
  });
  return { login, isLoading };
}
