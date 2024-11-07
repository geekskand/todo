import { createContext,useContext } from "react";

// Suggested code may be subject to a license. Learn more: ~LicenseLog:3537143264.
const todoContext = createContext({
    todos : [
        {
            id:1,
            todo: "todo txt",
            completed: false
        }
    ],
    addTodo : (todo) => {},
    updateTodo : (id,todo) => {},
    removeTodo : (id) => {},
    toggleTodo : (id) => {}
    
});

// Suggested code may be subject to a license. Learn more: ~LicenseLog:1401215867.
export useTodo = () => useContext(todoContext);

export TodoProvider = todoContext.Provider

