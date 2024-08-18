export function TimeSettings({ timeEnabled, updateSetting }) {
  const updateTimeEnabled = (event) => {
    const newValue = event.target.value === "true" ? true : false;
    updateSetting("timeEnabled", newValue);
  };
  const currentValue = timeEnabled ? "true" : "false";

  return (
    <div id="TimeSettings">
      <label for="time-enabled">Show Time</label>
      <select
        name="time-enable"
        value={currentValue}
        onChange={updateTimeEnabled}
      >
        <option value="true">Show</option>
        <option value="false">Hide</option>
      </select>
    </div>
  );
}
