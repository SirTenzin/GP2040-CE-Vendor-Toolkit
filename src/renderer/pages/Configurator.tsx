import WindowActions from "../components/WindowActions";
import { useMultistepForm } from "../useMultiStepForm";
import ActionKeysForm from "./ActionKeysForm";
import MovementKeysForm from "./MovementKeysForm";
import AuxiliaryKeysForm from "./AuxiliaryKeysForm";
import { FormEvent, useState } from "react";
import Modal from "../components/Modal";

interface FormData {
  [key: string]: number | undefined;
}

const initialData: FormData = {};

const requiredOptions: string[] = [
  "up", "down", "left", "right", "a", "b" , "x", "y", "lb", "lt", "rb", "rt"
]


export default function Configurator() {
  const [data, setData] = useState<FormData>(initialData)
  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } = useMultistepForm([
      <MovementKeysForm updateFields={updateFields} />,
      <ActionKeysForm  updateFields={updateFields} />,
      <AuxiliaryKeysForm updateFields={updateFields} />,
  ])

  const hasDuplicateValues = (): boolean => {
    const valuesArray = Object.values(data);
    const uniqueValues = new Set(valuesArray);
    return uniqueValues.size < valuesArray.length;
  };



  // Function to check for keys in requiredOptions with value still equal to -2
  const checkForMissingValues = (): boolean => {
    // Iterate through requiredOptions
    for (const option of requiredOptions) {
      // If the option is not in the data or its value is undefined, return true (indicating missing value)
      if (!(option in data) || data[option] === undefined) {
        return true;
      }
    }
    // No missing values found
    return false;
  };

  // Check for duplicate values
  const hasDuplicates = hasDuplicateValues();

  // Check for keys in requiredOptions with value still equal to -2
  const missingRequiredOption = checkForMissingValues();


  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isLastStep) return next();
    if (missingRequiredOption) {
      // @ts-ignore
      document.getElementById("missingValuesModal").showModal();
      goTo(0);
    } else if(hasDuplicates) {
      // @ts-ignore
      document.getElementById("duplicateValuesModal").showModal();
      goTo(0);
    } else {
      // @ts-ignore
      document.getElementById("configurationModal").showModal();
      window.electron.ipcRenderer.sendMessage("ipc", ["generateConfig", data]);
      return;
    }
  }

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <WindowActions title={`GP2040-CE Vendor Toolkit | Step ${currentStepIndex+1}/${steps.length}`} isConfiguring={true} isFirstStep={isFirstStep} isLastStep={isLastStep} back={back} next={onSubmit}/>
      {step}
      <Modal
          modalID={"configurationModal"}
          title={"Completed configuration"}
          action={"Close"}
          content={"You can now view your BoardConfig.h file. It has been saved to the working directory."}
          onClick={() => { window.location.replace("/") }}
        />

        <Modal
          modalID={"duplicateValuesModal"}
          title={"You have duplicate values!"}
          action={"Close"}
          content={"One or more buttons were set to the same pin. Please check your pins again."}
          onClick={() => { }}
        />

        <Modal
          modalID={"missingValuesModal"}
          title={"Complete the missing values!"}
          action={"Close"}
          content={"One or more required values were not set. Please check your pins again."}
          onClick={() => {  }}
        />
    </div>
  )
}
