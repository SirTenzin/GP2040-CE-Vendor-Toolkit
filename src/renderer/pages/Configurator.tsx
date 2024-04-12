import WindowActions from "../components/WindowActions";
import { useMultistepForm } from "../useMultiStepForm";
import ActionKeysForm from "./ActionKeysForm";
import MovementKeysForm from "./MovementKeysForm";
import AuxiliaryKeysForm from "./AuxiliaryKeysForm";
import DefaultsForm from "./DefaultsForm";
import PrerequisiteForm from "./PrerequisiteForm";
import { FormEvent, useState } from "react";
import Modal from "../components/Modal";

interface FormData {
  [key: string]: number | string | undefined;
}

const initialData: FormData = {};

const requiredOptions: string[] = [
  "up", "down", "left", "right", "a", "b" , "x", "y", "lb", "lt", "rb", "rt",
  "start", "select", "home", "movement key layout", "action key layout",
  "forced setup mode", "socd mode", "input mode", "dpad mode"
]


export default function Configurator() {
  const [data, setData] = useState<FormData>(initialData)
  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } = useMultistepForm([
      <PrerequisiteForm updateFields={updateFields} />,
      <DefaultsForm updateFields={updateFields} />,
      <MovementKeysForm updateFields={updateFields} />,
      <ActionKeysForm  updateFields={updateFields} />,
      <AuxiliaryKeysForm updateFields={updateFields} />,
  ])

  const hasDuplicateValues = (): boolean => {
    let valuesArray = Object.values(data)
    const uniqueValues = new Set(valuesArray);
    console.log(uniqueValues, valuesArray);
    return uniqueValues.size < valuesArray.length;
  };

  const checkForMissingValues = (): boolean => {
    // Iterate through requiredOptions
    for (const option of requiredOptions) {
      // If the option is not in the data or its value is undefined, return false (indicating missing value)
      if (!(option in data) || data[option] === undefined) {
        return false;
      }
    }
    // No missing values found
    return true;
  };
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    // Check for duplicate values
    const hasDuplicates = hasDuplicateValues();

    // Check for keys in requiredOptions
    const hasAllOptions = checkForMissingValues();
    console.log(hasAllOptions);
    if (!isLastStep) { return next() }
    else {
      if (!hasAllOptions) {
        // @ts-ignore
        document.getElementById("missingValuesModal").showModal();
        console.log("Data missing");
        goTo(0);
        setData(initialData);
      } else if(hasDuplicates) {
        // @ts-ignore
        document.getElementById("duplicateValuesModal").showModal();
        goTo(0);
        setData(initialData);
      } else {
        // @ts-ignore
        // document.getElementById("configurationModal").showModal();
        window.electron.ipcRenderer.sendMessage("ipc", ["generateConfig", data]);
        return;
      }
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
