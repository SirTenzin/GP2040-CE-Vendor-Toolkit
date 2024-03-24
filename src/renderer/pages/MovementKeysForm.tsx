import { FormEvent } from "react";
import FormCard from "../components/FormCard";
import WindowActions from "../components/WindowActions";
import InputCard from "../components/InputCard";

export default function MovementKeysForm({ updateFields }: any) {
  return (
    <div className="hero w-screen h-screen">
      <div className="hero-content text-center">
        <div>
          <FormCard
            textColor="white"
            title="Enter the pins of your movement keys"
            content={
              <div className="grid grid-cols-1 grid-rows-4 grid-flow-row gap-10">
                <InputCard label="Up" updateFields={updateFields} required={true} />
                <InputCard label="Down" updateFields={updateFields} required={true} />
                <InputCard label="Left" updateFields={updateFields} required={true} />
                <InputCard label="Right" updateFields={updateFields} required={true} />
              </div>
            }
          />
        </div>
      </div>
    </div>

  )
}
