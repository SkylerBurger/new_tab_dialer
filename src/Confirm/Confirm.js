export function Confirm({ showConfirm, setShowConfirm, forceGroupNavigation }) {
  return (
    <div className={`confirm ${showConfirm === null ? "hide" : ""}`}>
      <p>Unsaved changes. Return to apply them or continue without saving.</p>
      <button onClick={() => setShowConfirm(null)}>Return</button>
      <button onClick={() => forceGroupNavigation(showConfirm.newIndex)}>
        Continue
      </button>
    </div>
  );
}
