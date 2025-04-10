import React, { useState, useEffect } from "react";
import TodoItem from "../components/TodoItem";
import TodoFilter from "../components/Filter";

const Header = () => {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState("Semua");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (!input.trim()) return alert("Todo tidak boleh kosong!");
        const newTodo = {
            id: Date.now(),
            text: input.trim(),
            completed: false,
        };
        setTodos([newTodo, ...todos]);
        setInput("");
    };

    const handleToggle = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const editTodo = (id, newText) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    };

    const filterTodos = todos.filter((todo) => {
        if (filter === "Aktif") return !todo.completed;
        if (filter === "Selesai") return todo.completed;
        return true;
    });

    return (
        //input
        <div className="h-screen w-screen bg-gray-100 flex flex-col">
            <div className="bg-amber-100 shadow-md px-4 py-6 z-10 sticky top-0">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Todo List</h1>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Tambah todo..."
                        className="flex-grow border border-amber-900 p-2 rounded"
                    />
                    <button
                        onClick={addTodo}
                        className="bg-amber-900 text-white px-4 rounded hover:bg-amber-950"
                    >
                        Add
                    </button>
                </div>
            </div>

            <div className="bg-amber-100 shadow-md px-4 py-2 z-10 sticky top-[112px]">
                <div className="flex justify-start mb-4">
                    <TodoFilter filter={filter} setFilter={setFilter} />
                </div>
            </div>

            <div className="overflow-y-auto flex-1 mt-4 px-4 pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filterTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={handleToggle}
                            onDelete={deleteTodo}
                            onEdit={editTodo}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;
