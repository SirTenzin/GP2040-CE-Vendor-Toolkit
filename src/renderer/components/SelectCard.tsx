type Choices = {
  key: string | number | undefined,
  value: string | number | undefined
}

type InputCardProps = {
  label: string,
  updateFields: ({}) => void,
  required?: boolean,
  choices: Array<Choices>,
  placeholder: string
}

export default ({ label, updateFields, required = false, choices, placeholder}: InputCardProps) => {
  return (
    <div className="card bg-primary text-primary-content align-middle">
      <div className="grid grid-cols-2 grid-rows-1 items-center py-5 px-10 gap-4">
        <h2 className="text-bold text-4xl">{required ? `${label}*:` : `${label}:`}</h2>
        <select className="select w-full max-w-xs bg-secondary" onChange={updateFields}>
          <option disabled selected>{placeholder}</option>
          {choices.map((choice) => (
            <option key={choice.key} value={choice.value}>{choice.value}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
