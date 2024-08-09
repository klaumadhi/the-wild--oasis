import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  //Get the query client from App.jsx
  const queryClient = useQueryClient();

  const { isPending, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: (success) => {
      toast.success(`Cabin successfully deleted!`);

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, deleteCabin };
}
