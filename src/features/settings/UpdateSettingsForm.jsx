import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useSettings from './useSettings';
import useUpdateSetting from './useUpdateSetting';

function UpdateSettingsForm() {

  const {isPending, settings: {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  }
= {},} = useSettings()
 // Extracting the updating state and the function to update settings from the useUpdateSetting hook
 const { isUpdating, updateSetting } = useUpdateSetting();

 // Handler for updating a setting when the input field loses focus (onBlur event)
 function handleUpdate(e, field) {
   const { value } = e.target; // get the value from the input field
   if (!value) return; // if the value is empty, do nothing
   updateSetting({ [field]: value }); // update the setting with the new value
 }


  if(isPending) return <Spinner/>

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' disabled={isUpdating} defaultValue={minBookingLength} onBlur={e=>handleUpdate(e, "minBookingLength")}/>
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' disabled={isUpdating} defaultValue={maxBookingLength} onBlur={e=>handleUpdate(e, "maxBookingLength")}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' disabled={isUpdating} defaultValue={maxGuestsPerBooking} onBlur={e=>handleUpdate(e, "maxGuestsPerBooking")}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' disabled={isUpdating} defaultValue={breakfastPrice} onBlur={e=>handleUpdate(e, "breakfastPrice")}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
