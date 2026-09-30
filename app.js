let students = [];
let editingStudentId = null;

const levelFilter = document.querySelector("#levelFilter");
const searchInput = document.querySelector("#searchInput");
const submitBtn = document.querySelector("#submitBtn");
const form = document.querySelector("#studentForm");
const studentName = document.querySelector("#studentName");
const studentAge = document.querySelector("#studentAge");
const studentLevel = document.querySelector("#studentLevel");
const studentCourse = document.querySelector("#studentCourse");
const studentList = document.querySelector("#studentList");
const studentCount = document.querySelector("#studentCount");


form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (studentLevel.value === "") {
        alert("Please select a level");
        return;
    }

    if (editingStudentId !== null) {
        const student = students.find(function(item) {
            return item.id === editingStudentId;
        });

        student.name = studentName.value;
        student.age = Number(studentAge.value);
        student.level = studentLevel.value;
        student.course = studentCourse.value;

        editingStudentId = null;
        submitBtn.textContent = "Add Student";
    } else {
        const student = {
            id: Date.now(),
            name: studentName.value,
            age: Number(studentAge.value),
            level: studentLevel.value,
            course: studentCourse.value
        };

        students.push(student);
    }

    form.reset();
    applyFilters();
});


function renderStudents(studentArray = students) {
    studentList.innerHTML = "";

    for (let student of studentArray) {
        const card = document.createElement("div");

        card.classList.add("student-card");

        card.innerHTML = `
            <h3>${student.name}</h3>
            <p>Age: ${student.age}</p>
            <p>Level: ${student.level}</p>
            <p>Course: ${student.course}</p>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        studentList.append(card);

        const deleteBtn = card.querySelector(".delete-btn");
        const editBtn = card.querySelector(".edit-btn");

        editBtn.addEventListener("click", function() {
            studentName.value = student.name;
            studentAge.value = student.age;
            studentLevel.value = student.level;
            studentCourse.value = student.course;

            editingStudentId = student.id;
            submitBtn.textContent = "Update Student";
        });

        deleteBtn.addEventListener("click", function() {
            students = students.filter(function(item) {
                return item.id !== student.id;
            });

            applyFilters();
        });
    }

    studentCount.textContent = `Total Students: ${studentArray.length}`;

    if (studentArray.length === 0) {
        studentList.innerHTML = "<p>No students found.</p>";
    }
}


function applyFilters() {
    const searchText = searchInput.value.toLowerCase();
    const selectedLevel = levelFilter.value;

    const filteredStudents = students.filter(function(student) {
        const matchesName = student.name.toLowerCase().includes(searchText);
        const matchesLevel = selectedLevel === "all" || student.level === selectedLevel;

        return matchesName && matchesLevel;
    });

    renderStudents(filteredStudents);
}

searchInput.addEventListener("input", applyFilters);
levelFilter.addEventListener("change", applyFilters);