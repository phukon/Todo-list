// Model
// If localStorage has a todos array, then use it
// Otherwise use the defualt array
let todos;

// Retrieve localStorage
const savedTodos = JSON.parse(localStorage.getItem('todos'));
// check if it's an array
if (Array.isArray(savedTodos)) {
    todos = savedTodos;
} else {
        todos = [{
        title: 'buy food',
        dueDate: '2023-12-12',
        id: 'id1'
    },
    {
        title: 'buy condoms',
        dueDate: '2023-12-12',
        id: 'id2'
    },
    {
        title: 'book a hotel',
        dueDate: '2023-12-12',
        id: 'id3'
    },
    {
        title: 'call babe',
        dueDate: '2023-12-12',
        id: 'i6d4'
    }];
}

// Creates a todo
function createTodo (title, dueDate) {
    const id = ''+new Date().getTime(); //converting to string

    todos.push({
        title: title,
        dueDate: dueDate,
        id: id
    });

    saveTodos();
}

// Deletes a todo
function removeTodo (idToDelete){
    todos = todos.filter( function (thetodo){
        /*
        This function is used to create a new array with all elements that
        pass a certain test implemented by a provided function. The function
        takes a callback function as an argument, and it returns a new array
        containing all the elements for which the callback function returns
        true. The callback function is called for each element in the array,
        and it takes three arguments: the current element, the current index,
        and the original array.
        */

        if(thetodo.id === idToDelete) { // warning: will throw a type error if types not matched
            return false;
        }
        else {
            return true;
        }
    });

    saveTodos();
};

function saveTodos() {
localStorage.setItem('todos', JSON.stringify(todos));
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
render();

// Controller
function addTodo() {
    const textbox = document.getElementById('todo-title');
    const title = textbox.value;

    const datePicker = document.getElementById('date-picker');
    const dueDate = datePicker.value;

    createTodo(title, dueDate);

    render();
};

function deleteTodo(event) {
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;

    removeTodo(idToDelete);

    render();
};

// View
function render() {
    // reset the list
    document.getElementById('todo-list').innerHTML = '';

    todos.forEach(function (todol) {
        const todo = document.createElement('div');
        todo.innerText = todol.title + ' ' + todol.dueDate;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'delete';
        deleteButton.style = 'margin-left: 12px';
        deleteButton.onclick = deleteTodo;
        deleteButton.id = todol.id;
        todo.appendChild(deleteButton);

        const todoList = document.getElementById('todo-list');
        todoList.appendChild(todo);
    });

}