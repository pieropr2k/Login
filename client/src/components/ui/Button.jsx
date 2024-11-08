export function Button({ onClick, children, className = null }) {
  return (
    <button
      className={`bg-indigo-500 px-4 py-1 rounded-md disabled:bg-indigo-300${
        className ? " " + className : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
