import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import WindowActions from "../components/WindowActions";

export default function MainMenu() {
  const navigate = useNavigate();

  const goToConfig = () => {
    navigate('/configurator');
  };

  const goToVendorDocs = () => {
    navigate('/docs');
  }

  const goToDocs = () => {
    return window.electron.ipcRenderer.sendMessage("ipc", ["openDocs"])
  };


  return (
    <div className="flex flex-col justify-center min-h-screen">
      <WindowActions title="GP2040-CE Vendor Toolkit | Select a tool to begin" />
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Card
          title="Board Configurator"
          content="Create a new board configuration for a fightstick"
          buttonText="Configure"
          textColor="white"
          bgColor="base-200"
          onClick = {goToConfig}
        />
        <Card
          title="Input Tester"
          content="Validate your fightstick is fully functional and reponds to all inputs properly."
          buttonText="Test"
          textColor="white"
          bgColor="base-200"
          onClick = {() => {}}
        />
        <Card
          title="Vendor Documentaton"
          content="All the information you need as a vendor in one place."
          buttonText="Read"
          textColor="white"
          bgColor="base-200"
          onClick = {goToVendorDocs}
        />
        <Card
          title="GP2040-CE Documentation"
          content="Official GP2040-CE Documentation"
          buttonText="Read"
          textColor="white"
          bgColor="base-200"
          onClick = {goToDocs}
        />
      </div>
    </div>
  );
}
