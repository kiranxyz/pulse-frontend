import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";

interface Settings {
  siteName: string;
  maintenanceMode: boolean;
  notificationEmail: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    siteName: "",
    maintenanceMode: false,
    notificationEmail: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setSettings({
        siteName: "Pulse",
        maintenanceMode: false,
        notificationEmail: "admin@example.com",
      });
      setLoading(false);
    }, 500);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      if (settings.maintenanceMode) {
        setSendingEmail(true);
        await emailjs.send(
          "YOUR_SERVICE_ID",
          "YOUR_TEMPLATE_ID",
          { siteName: settings.siteName, to_email: settings.notificationEmail },
          "YOUR_PUBLIC_KEY",
        );
        alert("Maintenance email sent successfully!");
        setSendingEmail(false);
      }
      alert("Settings saved successfully!");
    } catch (err) {
      console.error(err);
      setSendingEmail(false);
      alert("Failed to send email or save settings");
    }
  };

  if (loading) return <p className="p-6 text-center">Loading settings...</p>;

  return (
    <main className="mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Settings</h1>

      <label className="block">
        <span className="font-medium">Site Name:</span>
        <input
          type="text"
          name="siteName"
          value={settings.siteName}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-300"
        />
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="maintenanceMode"
          checked={settings.maintenanceMode}
          onChange={handleChange}
          className="rounded border border-gray-300 focus:ring-2 focus:ring-blue-300"
        />
        <span className="font-medium text-gray-700">Maintenance Mode</span>
      </label>

      <label className="block">
        <span className="font-medium">Notification Email:</span>
        <input
          type="email"
          name="notificationEmail"
          value={settings.notificationEmail}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-300"
        />
      </label>

      <button
        onClick={handleSave}
        className={`btn btn-primary px-4 py-2 ${sendingEmail ? "loading" : ""}`}
        disabled={sendingEmail}
      >
        {sendingEmail ? "Sending..." : "Save"}
      </button>
    </main>
  );
}
