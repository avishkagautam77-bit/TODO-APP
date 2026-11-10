let taskInput=document.getElementById("taskInput");
let addBtn=document.getElementById("addBtn");
let taskList=document.getElementById("taskList");
let todos = JSON.parse(localStorage.getItem("todos")) || [];let editId = null;
function addTodo() {
    let task = taskInput.value.trim();
    if (task === "") return;
    if (editId === null) {
        let todo = {
            id: Date.now(),
            task: task,
            completed: false
        };
        todos.push(todo);
    } 
    else {
        let todo = todos.find((item) => item.id === editId);
        todo.task = task;
        editId = null;
        addBtn.textContent = "Add";
    }
    taskInput.value = "";
    renderTodos();
}
addBtn.addEventListener("click",addTodo)
function renderTodos(){
    localStorage.setItem("todos", JSON.stringify(todos));
    taskList.innerHTML=""
    todos.forEach((todo)=>{let div=document.createElement("div");
        div.className="task"; 
        let span=document.createElement("span"); 
        span.textContent=todo.task; 
        div.appendChild(span);
        let btn=document.createElement("button"); 
        btn.textContent="Done";
        div.appendChild(btn);
        taskList.appendChild(div);
        btn.addEventListener("click",()=>{todo.completed=!todo.completed;renderTodos();});
        if(todo.completed){span.classList.add("completed");btn.textContent="Undo"};
        let dlt_btn=document.createElement("button");
        dlt_btn.textContent="Delete";
        div.appendChild(dlt_btn);
        dlt_btn.addEventListener("click",()=>deletion(todo.id));
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        div.appendChild(editBtn);
        editBtn.addEventListener("click", () => {
        taskInput.value = todo.task;
        editId = todo.id;
        addBtn.textContent = "Update";
        });
    })
}
function deletion(id){
    todos=todos.filter((item)=>item.id!==id);renderTodos();
}
renderTodos();