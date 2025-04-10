import React from "react";

const TodoFilter = ({ filter, setFilter }) => {
  return (
    <div className="flex gap-4 mt-4">
      {["Semua", "Aktif", "Selesai"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded ${
            filter === f ? "bg-amber-900 text-white" : "bg-amber-50"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;
