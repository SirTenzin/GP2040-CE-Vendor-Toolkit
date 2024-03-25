import FormCard from "../components/FormCard";
import SelectCard from "../components/SelectCard";

export default function PrerequisiteForm({ updateFields }: any) {
  return (
    <div className="hero w-screen h-screen">
      <div className="hero-content text-center">
        <div>
          <FormCard
            textColor="white"
            title="Enter some basic information about your board"
            content={
              <div className="grid grid-cols-1 grid-rows-4 grid-flow-row gap-10">
                <SelectCard label={"Movement Key Layout"} updateFields={updateFields} choices={[
                  {
                    "key": "layout",
                    "value": "WASD"
                  },
                  {
                    "key": "layout",
                    "value": "WASD Angled"
                  },
                  {
                    "key": "layout",
                    "value": "Stick"
                  },
                  {
                    "key": "layout",
                    "value": "Stickless"
                  },
                  {
                    "key": "layout",
                    "value": "Dancepad"
                  },
                ]} placeholder={"e.g WASD, Stickless"} />

                <SelectCard label={"Action Key Layout"} updateFields={updateFields} choices={[
                  {
                    "key": "layout_right",
                    "value": "Arcade"
                  },
                  {
                    "key": "layout_right",
                    "value": "Stickless"
                  },
                  {
                    "key": "layout_right",
                    "value": "Vewlix 8"
                  },
                  {
                    "key": "layout_right",
                    "value": "Vewlix 7"
                  },
                  {
                    "key": "layout_right",
                    "value": "Noir 8"
                  },
                  {
                    "key": "layout_right",
                    "value": "Dancepad"
                  },
                ]} placeholder={"e.g WASD, Stickless, ..."} />
              </div>
            }
          />
        </div>
      </div>
    </div>

  )
}
