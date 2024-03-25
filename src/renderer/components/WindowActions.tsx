function handleExit() {
  window.electron.ipcRenderer.sendMessage("ipc", ["exit"])
}

function CloseButton() {
  return (
    <button className="btn btn-square btn-primary col-start-5" onClick={handleExit}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
  )
}

function handleMinimise() {
  window.electron.ipcRenderer.sendMessage("ipc", ["minimise"])
}

function MinimiseButton() {
  return (
    <button className="btn btn-square btn-primary col-start-4" onClick={handleMinimise}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      </svg>
    </button>
  )
}

function handleHome() {
  window.location.replace("/")
}

function HomeButton() {
  return (
    <button className="btn btn-square btn-primary col-start-3" onClick={handleHome}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    </button>
  )
}

function WindowActions({ title, isConfiguring, next, back, isLastStep, isFirstStep }: any) {
  return (
    <div className="absolute top-0 left-0 navbar bg-base-100">
      <div className="flex-1 justify-between items-center w-full">
        <a className="btn btn-ghost text-xl">{title ? title : "GP2040-CE Vendor Toolkit"}</a>
      </div>
      <div className="flex-none grid grid-cols-5 gap-2">

        {!isFirstStep && isConfiguring && (
          <button className="btn btn-square btn-secondary text-black col-start-1" onClick={back}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
          </button>
        )}
        {isConfiguring && (
          <button className="btn btn-square btn-secondary text-black col-start-2" type="submit" onClick={next}>
            {isLastStep ?
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            }
          </button>
        )}
        <HomeButton />
        <MinimiseButton />
        <CloseButton />
      </div>
    </div>

  )
}

export default WindowActions
