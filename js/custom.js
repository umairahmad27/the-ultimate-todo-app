function addTodo() {

    var title = document.getElementById('title').value;
    var location = document.getElementById('location').value;
    var description = document.getElementById('description').value;
    var addedTime = moment().format('dddd, MMM Do YY, h:mm a');

    if (title === '') {

        document.getElementById('message').innerHTML = '<span style="color: black;">Your title field is empty<br>Please add a To-Do title</span>';
        return false;
    }

    if (location === '') {

        document.getElementById('message').innerHTML = '<span style="color: black;">Your location field is empty<br>Please add a To-Do location</span>';
        return false;
    }

    if (description === '') {

        document.getElementById('message').innerHTML = '<span style="color: black;">Your description field is empty<br>Please add a To-Do description</span>';
        return false;
    }

    // localStorage code starting form here
    var todo = { title: title, location: location, description: description, addedTime: addedTime }; // Creating an object of todo data

    var todoList = JSON.parse(localStorage.getItem('To-Do List')) || []; // getting item from localStorage OR 
    // Check if todo array is not created yet then create a new array of todo

    todoList.push(todo); // when a new todo is creating, new todo adds into old todo list array

    var todosArray = JSON.stringify(todoList); // converting the array into original condition

    localStorage.setItem('To-Do List', todosArray); // Setting items into localStorage with a name of 'To-Do List'
    // localStorage code ends form here

    document.getElementById('message').innerHTML = '<span style="color: palegreen;">Your To-Do has been added successfully.</span>';

    setInterval(function () {
        window.location.href = "/";
    }, 1000);
}

function getTodoItems() {

    var todoList = JSON.parse(localStorage.getItem('To-Do List')) || []; // getting item from localStorage
    var ulTag = document.getElementById('ul');
    ulTag.innerHTML = "";

    if (todoList.length === 0) {
        ulTag.innerHTML = `<h5 class="center-align">You don't have any pending work :)</h5>`;
    }

    for (var i = 0; i < todoList.length; i++) {

        var value = todoList[i];
        // Creating an new element
        var newLiTag = document.createElement('li');
        newLiTag.setAttribute('class', 'collection-item avatar hoverable');
        newLiTag.setAttribute('data-index', i);
        ulTag.insertBefore(newLiTag, ulTag.firstChild);

        var newITag = document.createElement('i');
        newITag.setAttribute('class', 'fas fa-check circle doneIcon');
        newITag.setAttribute('data-index', i);
        newITag.style.backgroundColor = 'gray';
        newLiTag.appendChild(newITag);
        newITag.onclick = doneTodo;

        var newSpanTag = document.createElement('span');
        newSpanTag.setAttribute('class', 'title');
        newSpanTag.innerHTML = value.title;
        newSpanTag.style.textTransform = 'capitalize';
        newLiTag.appendChild(newSpanTag);

        var newPTagForLocation = document.createElement('p');
        newPTagForLocation.innerHTML = value.location;
        newPTagForLocation.style.textTransform = 'capitalize';
        newLiTag.appendChild(newPTagForLocation);

        var newPTagForDescription = document.createElement('p');
        newPTagForDescription.setAttribute('class', 'truncate');
        newPTagForDescription.innerHTML = value.description;
        newPTagForDescription.style.textTransform = 'capitalize';
        newLiTag.appendChild(newPTagForDescription);

        var newPTagForAddedTime = document.createElement('p');
        newPTagForAddedTime.innerHTML = 'Added On: ' + value.addedTime;
        newLiTag.appendChild(newPTagForAddedTime);

        if (value.updatedTime !== undefined) {
            var newPTagForUpdatedTime = document.createElement('p');
            newPTagForUpdatedTime.innerHTML = 'Updated On: ' + value.updatedTime;
            newLiTag.appendChild(newPTagForUpdatedTime);

        }

        var newATagForIconEdit = document.createElement('a');
        newATagForIconEdit.setAttribute('href', 'JavaScript:void(0)');
        newATagForIconEdit.setAttribute('data-index', i);
        newATagForIconEdit.setAttribute('class', 'secondary-content');
        newLiTag.appendChild(newATagForIconEdit);
        newATagForIconEdit.onclick = goToEditPage;

        var newITagForIconEdit = document.createElement('i');
        newITagForIconEdit.setAttribute('class', 'fas fa-pen');
        newATagForIconEdit.appendChild(newITagForIconEdit);

        var newATagForIconDelete = document.createElement('a');
        newATagForIconDelete.setAttribute('href', 'JavaScript:void(0)');
        newATagForIconDelete.setAttribute('data-index', i);
        newATagForIconDelete.setAttribute('class', 'secondary-content marginTop35 red-text');
        newLiTag.appendChild(newATagForIconDelete);
        newATagForIconDelete.onclick = deleteTodo;

        var newITagForIconDelete = document.createElement('i');
        newITagForIconDelete.setAttribute('class', 'fas fa-trash');
        newATagForIconDelete.appendChild(newITagForIconDelete);
        // End of creating new element
    }

}

function deleteTodo(event) {

    var todoIndex = this.getAttribute('data-index');
    var todoList = JSON.parse(localStorage.getItem('To-Do List'));
    todoList.splice(todoIndex, 1)
    localStorage.setItem('To-Do List', JSON.stringify(todoList));

    getTodoItems()
}

function goToEditPage(event) {

    var todoIndex = this.getAttribute('data-index');
    localStorage.setItem('toEdit', todoIndex);
    window.location.href = "edit.html";
}

function putDataIntoField() {

    var todoIndex = Number(localStorage.getItem('toEdit'));
    var todoList = JSON.parse(localStorage.getItem('To-Do List'));

    document.getElementById('title').value = todoList[todoIndex].title
    document.getElementById('location1').value = todoList[todoIndex].location
    document.getElementById('description').value = todoList[todoIndex].description
}

function editTodo() {
    var todoIndex = Number(localStorage.getItem('toEdit'));
    var todoList = JSON.parse(localStorage.getItem('To-Do List'));

    var newData = {
        title: title.value,
        location: location1.value,
        description: description.value,
        addedTime: todoList[todoIndex].addedTime,
        updatedTime: moment().format('dddd, MMM Do YY, h:mm a')
    }

    todoList[todoIndex] = newData;

    localStorage.setItem('To-Do List', JSON.stringify(todoList));
    document.getElementById('message').innerHTML = '<span style="color: palegreen;">Your To-Do has been updated successfully.</span>';
    localStorage.removeItem('toEdit');

    setInterval(function () {
        window.location.href = "/";
    }, 1000);
}