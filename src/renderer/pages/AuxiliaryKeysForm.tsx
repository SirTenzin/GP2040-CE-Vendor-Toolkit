import FormCard from "../components/FormCard";
import InputCard from "../components/InputCard";
import WindowActions from "../components/WindowActions";

export default function AuxiliaryKeysForm({ updateFields }: any) {
  return (

    <div className="hero w-screen h-screen">
      <div className="hero-content text-center">
        <div>
          <FormCard
            textColor="white"
            title="Enter the pins of your auxiliary buttons"
            content={
              <div className="grid grid-cols-2 grid-rows-3 grid-flow-row gap-10">
                <InputCard label="Start" updateFields={updateFields} required/>
                <InputCard label="Select" updateFields={updateFields} required/>
                <InputCard label="Home" updateFields={updateFields} required/>
                <InputCard label="RS" updateFields={updateFields} />
                <InputCard label="LS" updateFields={updateFields} />
                <InputCard label="Capture" updateFields={updateFields} />
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}
