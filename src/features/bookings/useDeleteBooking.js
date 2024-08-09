import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBookingById, isPending: isDeleting } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: (data, bookingId) => {
      toast.success(`Booking #${bookingId} deleted successfully!`);

      // Invalidate booking queries to ensure data is fresh after deletion
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: (error) => {
      const message = error?.message || "An error occurred during deletion.";
      toast.error(message);
    },
  });

  return { deleteBookingById, isDeleting };
}
