type Choices = {
  value: string
}

type SelectCardProps = {
  label: string,
  updateFields: ({}) => void,
  required?: boolean,
  choices: Array<Choices>,
  placeholder: string,
  defaultValue: string,
}

export default ({ defaultValue = "Placeholder", label, updateFields, required = false, choices, placeholder}: SelectCardProps) => {
  return (
    <div className="card bg-primary text-primary-content align-middle">
      <div className="grid grid-cols-2 grid-rows-1 items-center py-5 px-10 gap-4">
        <h2 className="text-bold text-4xl">{required ? `${label}*:` : `${label}:`}</h2>
        <select id={label.toLowerCase()} className="select w-full max-w-xs bg-secondary" onChange={(e)=> {
          var data: any = {}
          data[label.toLowerCase()] = e.target.value;
          updateFields(data)
        }}>
          <option disabled selected>{placeholder}</option>
          {choices.map((choice) => (
            <option key={choice.value} value={choice.value}>{choice.value}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
