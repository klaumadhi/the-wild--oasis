import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (updatedUser) => {
      // Use updatedUser from the mutation's response
      toast.success("User account successfully updated");
      // Update the user data in the React Query cache
      queryClient.setQueryData(["user"], updatedUser); // Update with the correct user data

      // Invalidate the specific "users" query to refresh data if needed
      // queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => toast.error(error.message),
  });

  return { updateUser, isUpdating };
}
