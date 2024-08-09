
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";





export default function CabinTable() {
  const {isPending, cabins, error} = useCabins()
  const [searchParams]= useSearchParams()

  if (isPending) {
    return <Spinner/>
  }

  //1_) Filter cabins based on the discount value from the URL
  //Get the values from url , in the first opening of the page set to all
  const filterValue = searchParams.get('discount') || 'all'

  let filteredCabins
  if(filterValue === "all") {filteredCabins = cabins}
  if(filterValue === "no-discount") {filteredCabins = cabins.filter(cabins=> cabins.discount === 0)}
  if(filterValue === "with-discount") {filteredCabins = cabins.filter(cabins=> cabins.discount > 0)}


    //2) SORTING

    const sortBy = searchParams.get("sortBy") || ''
    const [field,direction]=sortBy.split("-")
    const modifier = direction === "asc" ? 1 : -1
    const sortedCabins = filteredCabins?.sort((a, b) =>
      typeof a[field] === 'string'
        ? a[field].localeCompare(b[field]) * modifier
        : (a[field] - b[field]) * modifier
    );



  return (
    <Menus>

    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
      <div></div>
      <div>Cabin</div>
      <div>Capacity</div>
      <div>Price</div>
      <div>Discount</div>
      <div></div>

      </Table.Header>

      <Table.Body data={sortedCabins} render={
        cabin => (
          <CabinRow key={cabin.id} cabin={cabin} />
        )}/>

  
    
    </Table>
        </Menus>
  )
}

