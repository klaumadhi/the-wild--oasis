import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";



const Label = styled.label`
  font-weight: 500;
`;



function CreateCabinForm() {
  const {register, handleSubmit,reset, getValues, formState} = useForm()
  const {errors} = formState
  const queryClient = useQueryClient()

  const {mutate, isPending} = useMutation({
    mutationFn: createEditCabin,
    onSuccess: ()=>
    {
      toast.success("Cabin created")
      //Update the state of cabins so it rerenders with the new cabin
      queryClient.invalidateQueries({queryKey: ["cabins"]})
      reset()

    },
    onError: (error)=> toast.error(error.message)
  })



  //To use React-hook-form we need to place {...register("name")} in every input on the form
  //and we have to place onSubmit with calling handleSubmit(onSubmit) on the form
  //in data is the object with all inputs from the form
  function onSubmit(data) {
    mutate({...data, image : data.image[0]})
  }

  function onError(error){
    // console.log(error)
  }
  

  return (
    //If an error occurred the handleSubmit will call onError instead of onSubmit
    <Form onSubmit={handleSubmit(onSubmit,onError)}>
      {/* Form type without using the form from FormRow.jsx */}
{/* <FormRow2>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name", {required: "This field is required"})}/>
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow2> */}
      

      <FormRow label="Cabin name" error={errors?.name?.message} >
      <Input type="text" id="name"  disabled={isPending} {...register("name", {required: "This field is required"})}/>

      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" disabled={isPending} id="maxCapacity" {...register("maxCapacity", {required: "This field is required", min : {
          value:1,
          message: "Minimum capacity is 1"
 } })} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input type="number" disabled={isPending} id="regularPrice" {...register("regularPrice", {required: "This field is required", min : {
          value:1,
          message: "Minimum capacity is 1"
 }})} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" disabled={isPending} id="discount" defaultValue={0}  {...register("discount", {required: "This field is required", validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular price" 
 })}/>
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" disabled={isPending} id="description" defaultValue=""  {...register("description", {required: "This field is required"})}/>
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput id="image" disabled={isPending} accept="image/*"  type="file"{...register("image", {required: "This field is required"})} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
