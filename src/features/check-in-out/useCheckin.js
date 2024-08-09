import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        //The breakfast object attributes would spread here for example attributes from CheckinBookin.jsx line 62
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked-in!`);

      // Invalidate only booking-related queries, to avoid refetching unrelated data
      queryClient.invalidateQueries(["bookings"]);
      queryClient.invalidateQueries(["booking", data.id]);

      navigate("/");
    },
    onError: (error) => {
      const message = error?.message || "An error occurred during check-in.";
      toast.error(message);
    },
  });

  return { checkin, isCheckingIn };
}
