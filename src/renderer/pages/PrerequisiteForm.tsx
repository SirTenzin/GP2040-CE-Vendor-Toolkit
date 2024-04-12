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
                <SelectCard defaultValue="WASD" required label={"Movement Key Layout"} updateFields={updateFields} choices={[
                  {
                    "value": "WASD"
                  },
                  {
                    "value": "WASD Angled"
                  },
                  {
                    "value": "Stick"
                  },
                  {
                    "value": "Stickless"
                  },
                  {
                    "value": "Dancepad"
                  },
                ]} placeholder={"e.g WASD, Stickless"} />

                <SelectCard required defaultValue="Arcade" label={"Action Key Layout"} updateFields={updateFields} choices={[
                  {
                    "value": "Arcade"
                  },
                  {
                    "value": "Stickless"
                  },
                  {
                    "value": "Vewlix"
                  },
                  {
                    "value": "Vewlix 7"
                  },
                  {
                    "value": "Noir 8"
                  },
                  {
                    "value": "Dancepad"
                  },
                  {
                    "value": "Capcom"
                  },
                  {
                    "value": "Capcom 6"
                  },
                  {
                    "value": "Sega 2P"
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
