import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";


import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";



const Label = styled.label`
  font-weight: 500;
`;



function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {
  const {isCreating ,createCabin} = useCreateCabin()
  const {isEditing, editCabin} = useEditCabin()
  
  const isWorking = isCreating || isEditing

  const {id: editId, ...editValues} = cabinToEdit
  const isEditSession = Boolean(editId)

  const {register, handleSubmit,reset, getValues, formState} = useForm({
    defaultValues: isEditSession ? editValues : {},
  })
  const {errors} = formState

 

  



  //To use React-hook-form we need to place {...register("name")} in every input on the form
  //and we have to place onSubmit with calling handleSubmit(onSubmit) on the form
  //in data is the object with all inputs from the form
  function onSubmit(data) {
    const image = typeof data.image === "string"? data.image : data.image[0]

    if(isEditSession){
      editCabin({newCabinData: {...data, image}, id: editId},{
        onSuccess: (data)=> {reset();
          onCloseModal?.()
        }
        ,
      })
    }else
    createCabin({...data, image : image},{
      onSuccess: (data)=> {reset();
        onCloseModal?.()
      }
      ,

    })


    
    // console.log(data)
  }

  function onError(error){
    // console.log(error)
  }
  

  return (
    //If an error occurred the handleSubmit will call onError instead of onSubmit
    <Form onSubmit={handleSubmit(onSubmit,onError)} type={onCloseModal ? 'modal' : 'regular'}>
      {/* Form type without using the form from FormRow.jsx */}
{/* <FormRow2>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name", {required: "This field is required"})}/>
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow2> */}
      

      <FormRow label="Cabin name" error={errors?.name?.message} >
      <Input type="text" id="name"  disabled={isWorking} {...register("name", {required: "This field is required"})}/>

      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" disabled={isWorking} id="maxCapacity" {...register("maxCapacity", {required: "This field is required", min : {
          value:1,
          message: "Minimum capacity is 1"
 } })} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input type="number" disabled={isWorking} id="regularPrice" {...register("regularPrice", {required: "This field is required", min : {
          value:1,
          message: "Minimum capacity is 1"
 }})} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" disabled={isWorking} id="discount" defaultValue={0}  {...register("discount", {required: "This field is required", validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular price" 
 })}/>
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue=""  {...register("description", {required: "This field is required"})}/>
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput id="image" disabled={isWorking} accept="image/*"  type="file"{...register("image", {required: isEditSession ? false :  "This field is required"})} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={()=> onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit Cabin" : "Add Cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
