// alert("Heeloo bkllll");

let todoIndex = 1;

function addTodo(){
 
    //read the contents inside the input box   && write code that reads the content of the input box
    //Write the todo to html
            // step 1: create a new div element in js (as a varible)
            // step 2: Append that div into parent div
    // clear the input

 
    const element = document.getElementById("todoInput")
    const todo = element.value;
    element.value = "";
    if (todo === ""){
        return;
    }
    // console.log(todo);
   

    const todoDiv = document.createElement("div");
    todoDiv.setAttribute("id" , "todo" + todoIndex);

    const todoSpan = document.createElement("span")
    todoSpan.innerHTML = todo;
     
    todoDiv.appendChild(todoSpan)

    const todoButton = document.createElement("button")
    todoButton.innerHTML = "Delete todo"
    todoButton.setAttribute("onclick", "deleteTodo(" + todoIndex + ")");

    todoDiv.appendChild(todoButton);
     document.getElementById("todos").appendChild(todoDiv);

    todoIndex = todoIndex + 1;

} 

function deleteTodo(index){
    alert("delete todo is called " + index )
    const divElement = document.getElementById("todo" + index);
   document.getElementById("todos").removeChild(divElement);
}