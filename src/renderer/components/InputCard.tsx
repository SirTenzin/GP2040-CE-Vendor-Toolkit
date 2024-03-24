type InputCardProps = {
  label: string,
  updateFields: ({}) => void,
  inputType?: string,
  required?: boolean
}

export default ({ label, updateFields, inputType = "number", required = false }: InputCardProps) => {
  const lowerCaseLabel = label.toLowerCase();
  return (
    <div className="card bg-primary text-primary-content align-middle">
      <div className="grid grid-cols-2 grid-rows-1 items-center py-5 pr-10">
        <h2 className="text-bold text-4xl">{required ? `${label}*:` : `${label}:`}</h2>
        <input id={lowerCaseLabel.toLowerCase()} onChange={e => updateFields({ [lowerCaseLabel]: e.target.value })} type={inputType} placeholder="1" className="input input-bordered w-full input-lg appearance-none text-white" />
      </div>
    </div>
  )
}
