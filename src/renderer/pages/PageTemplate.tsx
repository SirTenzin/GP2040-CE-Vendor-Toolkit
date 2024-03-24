import WindowActions from "../components/WindowActions";

export default function Template() {
  return (
    <div>
    <WindowActions />
    <div className='body-bg'>
      <div className="hero h-screen w-screen">
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-center bg-opacity-60">
          <div className="max-w-md">

          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
