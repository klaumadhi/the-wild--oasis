import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from '../../ui/Spinner'
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins"
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;



export default function DashboardLayout() {
  const {bookings, isLoading} = useRecentBookings()
  const {stays, isLoading1 , confirmedStays, numDays} = useRecentStays()
  const {cabins,isLoading2} = useCabins()



  
  if(isLoading || isLoading1 || isLoading2) return <Spinner/>

 

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length}></Stats>
      <TodayActivity/>
      <DurationChart confirmedStays={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  )
}
