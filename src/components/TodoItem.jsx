import React, { useState } from "react";

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow rounded p-4 border border-amber-200">
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mt-1 accent-amber-900"
        />
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          ) : (
            <p
              className={`text-gray-800 break-words ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-2">
        {isEditing ? (
          <>
            <button
              onClick={handleEdit}
              className="text-sm bg-green-800 text-white px-2 py-1 rounded hover:bg-green-900"
            >
              Simpan
            </button>
            <button
              onClick={handleCancel}
              className="text-sm bg-zinc-400 text-white px-2 py-1 rounded hover:bg-zinc-500"
            >
              Batal
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="text-sm bg-green-800 text-white px-2 py-1 rounded hover:bg-green-900"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="text-sm bg-yellow-800 text-white px-2 py-1 rounded hover:bg-yellow-900"
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
