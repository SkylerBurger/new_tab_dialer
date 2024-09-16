import "./TimeSettings.css";

export function TimeSettings({ timeEnabled, timeFormat, updateSetting }) {
  const updateTimeEnabled = (event) => {
    const newValue = event.target.value === "true" ? true : false;
    updateSetting("timeEnabled", newValue);
  };
  const updateTimeFormat = (event) => {
    updateSetting("timeFormat", event.target.value);
  };
  const currentDisplay = timeEnabled ? "true" : "false";
  const currentFormat = timeFormat === "24" ? "24" : "12";

  return (
    <div id="TimeSettings">
      <h2>Time Settings</h2>
      <div>
        <label for="time-enabled">Show Time</label>
        <select
          name="time-enable"
          value={currentDisplay}
          onChange={updateTimeEnabled}
        >
          <option value="true">Show</option>
          <option value="false">Hide</option>
        </select>
      </div>
      <div>
        <label for="time-format">Time Format</label>
        <select
          name="time-format"
          value={currentFormat}
          onChange={updateTimeFormat}
        >
          <option value="12">12 Hour</option>
          <option value="24">24 Hour</option>
        </select>
      </div>
    </div>
  );
}
