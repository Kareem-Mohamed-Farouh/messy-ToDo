var textTaskValue = document.getElementById("taskInput");
let comp = document.getElementById("comp");
let progress = document.querySelector(".progress-bar");
let alltasksList = document.getElementById("alltasks");
var list = document.getElementById("taskList");
let tasks = [];
let tasksFinshd = 0;
let allTasks = 0;



updateTaskCountDisplay();


function updateTaskCountDisplay() {
    alltasksList.innerHTML = allTasks;
    comp.innerHTML = tasksFinshd;
    computedPercent(allTasks, tasksFinshd);
}

if (localStorage.getItem("allTasksList")) {
    tasks = JSON.parse(localStorage.getItem("allTasksList"));
    timesTaskIsCompleted();
    displayTasks();
}



// Add new Task
function addTask() {
    if (textTaskValue.value !== " " && (textTaskValue.value) !== "") {
        let task = {
            content: textTaskValue.value,
            completed: false,
        };
        tasks.push(task);
        localStorage.setItem("allTasksList", JSON.stringify(tasks));
        allTasks++;

        updateTaskCountDisplay();
        // console.log(tasks);
        displayTasks();
        clearInputTask();
    }
}

function clearInputTask() {
    textTaskValue.value = null;
}

function displayTasks() {
    let cartonaEltasks = ``;
    for (let i = 0; i < tasks.length; i++) {
        cartonaEltasks += `<li
    class="li-list d-flex justify-content-between align-items-center  mb-4 p-3 rounded-4 border-bottom border-2">
    <p onclick="markDone(${i})" class="${tasks[i].completed
                ? "text-decoration-line-through"
                : "text-decoration-none"
            }  text-span  text-capitalize fs-5 overflow-hidden">
    ${tasks[i].content}
    </p>
    <div class="d-flex gap-3  justify-content-center align-items-center">
        <span   class=" fs-4 ">
            ${tasks[i].completed
                ? '<i class="fa-regular fa-circle-check" style="color: #63E6BE;"></i>'
                : '<i class="fa-regular fa-clock fa-spin-pulse" style="color: #74C0FC;"></i>'
            }
        </span>
        <button onclick="deleteTask(${i})"
            class="d-flex align-items-center gap-2 button text-white "
        >
            <i class="fw-lighter fa-solid fa-trash-can"></i> Delete
        </button>
    </div>
</li>`;
    }
    list.innerHTML = cartonaEltasks;
}
// delete tasks
function deleteTask(taskId) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {

            // to make progrres = 0 % when you have only task and its completed and you want to delete it 
            if (allTasks == 1 && tasksFinshd == 1) {
                progress.style.width = `${0}%`;
            }
            // *****************************
            // function progress

            allTasks--;
            if (tasks[taskId].completed == true) {
                tasksFinshd--;
            }
            updateTaskCountDisplay();
            // *************
            tasks.splice(taskId, 1);
            localStorage.setItem("allTasksList", JSON.stringify(tasks));
            if (localStorage.getItem("allTasksList") == "[]") {
                list.innerHTML = `<div>
            <i
            class="fa-solid fa-list-check text-secondary fs-1 my-3 mx-auto"
            ></i>
            <p class="text-capitalize fs-1 text-secondary">
            no task to do it yet
            <br>
            <span class="fs-2">  add one in your list</span>
            <br>
            <span class="fs-3">  kaf&#169;_&#169; </span>
            </p>
          </div>`;
                localStorage.removeItem("allTasksList");
            } else {
                displayTasks();
            }
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
            });
        }
    });
}


function markDone(id) {
    // check task if finishd or not to
    if (tasks[id].completed == false) {
        tasks[id].completed = true;
        tasksFinshd++;
        updateTaskCountDisplay();
        alert('top-end', "success", "Your Task has been Done");
    } else {
        tasks[id].completed = false;
        tasksFinshd--;

        updateTaskCountDisplay()
        alert('top-end', "info", 'Not Finished your Task yet !!');
    }

    localStorage.setItem("allTasksList", JSON.stringify(tasks));
    let flag = 0;
    for (const done of tasks) {
        if (done.completed == true) {
            // using a flag to take a strict dicision .
            flag += 1;
        }
    }
    if (flag == tasks.length && tasks.length !== 1) {
        // alert("all task done succesfully");
        alert('top', "success", "all Tasks have been Done");
    }
    displayTasks();
}

// more generic function

function alert(position, type, message) {
    Swal.fire({
        position: position,
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 1500,
        toast: true
    });
}

function computedPercent(allTasks, tasksFinshd) {
    if (allTasks == 1 && tasksFinshd == 1) {
        progress.style.width = `${0}%`;

    }
    let percent = (tasksFinshd / allTasks) * 100;
    console.log(percent);
    progress.style.width = `${percent}%`;
}



function timesTaskIsCompleted() {
    for (const ok of tasks) {
        allTasks += 1;
        alltasksList.innerHTML = allTasks;
        if (ok.completed === true) {
            tasksFinshd += 1;
            comp.innerHTML = `${tasksFinshd}`;
        }
    }
    computedPercent(allTasks, tasksFinshd);

}


















// old code

// function addNewTask() {
//     allTasks += 1;
//     alltasksList.innerHTML = allTasks;
//     computedPercent(allTasks, tasksFinshd);
// }

// function removeTask(taskId) {
//     allTasks--;
//     alltasksList.innerHTML = allTasks;

//     if (tasks[taskId].completed == true) {
//         oneTaskNotCompleted()
//     }
//     computedPercent(allTasks, tasksFinshd)
// }

// function oneTaskCompleted() {
//     tasksFinshd += 1;
//     comp.innerHTML = `${tasksFinshd}`;

//     computedPercent(allTasks, tasksFinshd);
// }

// function oneTaskNotCompleted() {
//     tasksFinshd -= 1;
//     comp.innerHTML = `${tasksFinshd}`;
//     computedPercent(allTasks, tasksFinshd)
// }



// old code

// var task = a.value;
// if (task !== "" && task !== " ") {
//     data[counter] = {
//         id: counter,
//         name: task,
//         done: false
//     };
//     counter++;
//     a.value = "";
//     b();
// }

// var data = [];

// function b() {
//     var ul = document.getElementById("taskList");
//     ul.innerHTML = "";
//     for (let j = 0; j < data.length; j++) {
//         if (typeof data[j] !== "undefined") {
//             var li = document.createElement("li");
//             li.innerHTML = data[j].name +
//                 " <button onclick='toggle(" + j + ")'>Toggle</button> " +
//                 " <button onclick='deleteTask(" + j + ")'>Delete</button>";
//             if (data[j].done === true) {
//                 li.style.textDecoration = "line-through";
//             }
//             ul.appendChild(li);
//         }
//     }
// }

// function toggle(index) {
//     if (data[index].done === false) {
//         data[index].done = true;
//     } else {
//         data[index].done = false;
//     }
//     b();
// }

// function deleteTask(i) {
//     data[i] = undefined; // BAD PRACTICE: Leaves holes in array
//     b();
// }

// // Extra confusing logic
// setInterval(() => {
//     var allDone = true;
//     for (var z = 0; z < data.length; z++) {
//         if (data[z] && data[z].done === false) {
//             allDone = false;
//         }
//     }
//     if (allDone && data.length > 0) {
//         console.log("All tasks done!");
//     }
// }, 10000);

// `<li
//     class="li-list d-flex justify-content-between align-items-center  mb-4 p-3 rounded-4 border-bottom border-2"
// >
//     <p class="text-span text-capitalize fs-5 overflow-hidden">
//         hello kareeem
//     </p>
//     <div class="d-flex gap-3 justify-content-center align-items-center">
//         <button class="btn btn-outline-success  text-white">
//             Toggle
//         </button>
//         <button
//             class="d-flex align-items-center gap-2 btn btn-outline-danger text-white "
//         >
//             <i class="fw-lighter fa-solid fa-trash-can"></i> Delete
//         </button>
//     </div>
// </li>`;




// // start  alerts of task
// function alertOneTaskDone() {
//     Swal.fire({
//         position: 'top-end',
//         icon: "success",
//         title: "Your Task has been Done",
//         showConfirmButton: false,
//         timer: 1500,
//         toast: true
//     });
// }

// function alertOneTaskNotFinishd() {



//     Swal.fire({
//         position: 'top-end',
//         icon: 'info',
//         title: 'Not Finished your Task yet !!',
//         showConfirmButton: false,
//         timer: 1500,
//         toast: true
//     });
// }

// function allTasksDone() {
//     Swal.fire({
//         position: 'top-end',
//         icon: 'success',
//         title: 'All tasks have been done',
//         showConfirmButton: false,
//         timer: 1500,
//         toast: true
//     });
// }
// end  alerts of task
