import { useSettings } from "../../context/SettingsProvider";

export default function SettingsPage() {
  const { maintenanceMode, setMaintenanceMode } = useSettings();

  return (
    <main className="max-w-md p-4">
      <h1 className="mb-4 text-xl font-bold">Settings</h1>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="checkbox"
          checked={maintenanceMode}
          onChange={(e) => setMaintenanceMode(e.target.checked)}
        />
        <span>Maintenance Mode</span>
      </label>
    </main>
  );
}
