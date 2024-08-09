import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";

import toast from "react-hot-toast";

export default function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked-out!`);

      // Invalidate only booking-related queries, to avoid refetching unrelated data
      queryClient.invalidateQueries(["bookings"]);
      queryClient.invalidateQueries(["booking", data.id]);
    },
    onError: (error) => {
      const message = error?.message || "An error occurred during check-in.";
      toast.error(message);
    },
  });

  return { checkout, isCheckingOut };
}
