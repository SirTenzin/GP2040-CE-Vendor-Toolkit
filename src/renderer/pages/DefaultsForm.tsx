import FormCard from '../components/FormCard';
import SelectCard from '../components/SelectCard';

export default function DefaultsForm({ updateFields }: any) {
  return (
    <div className="hero w-screen h-screen">
      <div className="hero-content text-center">
        <div>
          <FormCard
            textColor="white"
            title="Enter the default behaviour for your board"
            content={
              <div className="grid grid-cols-1 grid-rows-4 grid-flow-row gap-10">
                <SelectCard
                  required
                  defaultValue="XInput"
                  label={'Input Mode'}
                  updateFields={updateFields}
                  choices={[
                    {
                      value: 'XInput',
                    },
                    {
                      value: 'Switch',
                    },
                    {
                      value: 'PS4',
                    },
                    {
                      value: 'HID',
                    },
                    {
                      value: 'Web Config',
                    },
                    {
                      value: 'Keyboard',
                    },
                    {
                      value: 'Astro City Mini',
                    },
                    {
                      value: 'Egret Mini',
                    },
                    {
                      value: 'Megadrive Mini',
                    },
                    {
                      value: 'Neo Geo Mini',
                    },
                    {
                      value: 'PC Engine Mini',
                    },
                    {
                      value: 'PS Classic (Mini)',
                    },
                    {
                      value: 'Xbox One X/S | Xbox Series X/S',
                    },
                  ]}
                  placeholder={'e.g XInput'}
                />

                <SelectCard
                  required
                  defaultValue="digital"
                  label={'DPAD Mode'}
                  updateFields={updateFields}
                  choices={[
                    {
                      value: 'Digital',
                    },
                    {
                      value: 'Left Stick',
                    },
                    {
                      value: 'Right Stick',
                    },
                  ]}
                  placeholder={'e.g Digital'}
                />

                <SelectCard
                  required
                  defaultValue="neutral"
                  label={'SOCD Mode'}
                  updateFields={updateFields}
                  choices={[
                    {
                      value: 'Neutral',
                    },
                    {
                      value: 'Up Priority',
                    },
                    {
                      value: 'First Input Priority',
                    },
                    {
                      value: 'Second Input Priority',
                    },
                    {
                      value: 'Bypass',
                    },
                  ]}
                  placeholder={'e.g Up + Down = Neutral'}
                />

                <SelectCard
                  required
                  defaultValue="Off"
                  label={'Forced Setup Mode'}
                  updateFields={updateFields}
                  choices={[
                    {
                      value: 'Off',
                    },
                    {
                      value: 'Lock Web Config',
                    },
                    {
                      value: 'Lock Default Input Mode',
                    },
                    {
                      value: 'Lock Both',
                    },
                  ]}
                  placeholder={'e.g Off'}
                />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
