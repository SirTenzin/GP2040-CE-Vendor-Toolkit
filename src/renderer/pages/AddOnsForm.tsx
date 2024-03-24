import FormCard from "../components/FormCard";
import InputCard from "../components/InputCard";

export default function AddOnsForm({ updateFields }: any) {
  return (
    <div className="hero w-screen h-screen">
      <div className="hero-content text-center">
        <div>
          <FormCard
            textColor="white"
            title="Setup Addons"
            content={
              <div className="grid grid-cols-1 grid-rows-4 grid-flow-row gap-10">
                <InputCard label="Up" updateFields={updateFields} />
                <InputCard label="Down" updateFields={updateFields} />
                <InputCard label="Left" updateFields={updateFields} />
                <InputCard label="Right" updateFields={updateFields} />
              </div>
            }
          />
        </div>
      </div>
    </div>

  )
}
