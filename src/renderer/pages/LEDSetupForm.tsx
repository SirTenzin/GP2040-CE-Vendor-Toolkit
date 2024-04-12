import FormCard from "../components/FormCard";
import InputCard from "../components/InputCard";
import WindowActions from "../components/WindowActions";

export default function ActionKeysForm({ updateFields }: any) {
  return (
    <div className="hero w-screen h-screen">
      <div className="hero-content text-center">
        <div>
          <FormCard
            textColor="white"
            title="Enter the pins of your action keys"
            content={
              <div className="grid grid-cols-2 grid-rows-4 grid-flow-row gap-10">
                <InputCard label="A" updateFields={updateFields} required />
                <InputCard label="B" updateFields={updateFields} required />
                <InputCard label="X" updateFields={updateFields} required />
                <InputCard label="Y" updateFields={updateFields} required />
                <InputCard label="RB" updateFields={updateFields} required />
                <InputCard label="RT" updateFields={updateFields} required />
                <InputCard label="LB" updateFields={updateFields} required />
                <InputCard label="LT" updateFields={updateFields} required />
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}
