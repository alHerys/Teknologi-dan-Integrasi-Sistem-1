const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

const output = document.getElementById("output");

function showOutput(data) {
    const students = Array.isArray(data) ? data : [data];
    let html = "<ul>";
    students.forEach((s) => {
        html += `<li><strong>NIM:</strong> ${s.nim} | <strong>Nama:</strong> ${s.nama}`;
        if (s.mataKuliah && s.mataKuliah.length > 0) {
            html += "<ul>";
            s.mataKuliah.forEach((mk) => {
                html += `<li>${mk.kode} - ${mk.nama} (${mk.sks} SKS)</li>`;
            });
            html += "</ul>";
        }
        html += "</li>";
    });
    html += "</ul>";
    output.innerHTML = html;
}

function showMessage(message) {
    let html = `<p>${message.message}</p>`;
    if (message.data) {
        const form = message.data;
        html += `<ul><li><strong>NIM:</strong> ${form.nim} | <strong>Nama:</strong> ${form.nama}`;
        if (form.mataKuliah && form.mataKuliah.length > 0) {
            html += "<ul>";
            form.mataKuliah.forEach((mk) => {
                html += `<li>${mk.kode} - ${mk.nama} (${mk.sks} SKS)</li>`;
            });
            html += "</ul>";
        }
        html += "</li></ul>";
    }
    output.innerHTML = html;
}

function showError(error) {
    if (error.response) {
        const data = error.response.data;
        output.innerHTML = `<p><strong>Error:</strong> ${data.message}</p>`;
    } else {
        output.innerHTML = `<p>${error.message}</p>`;
    }
}

function getStudents() {
    api.get("/students")
        .then((response) => {
            console.log("GET Students:", response.data);
            showOutput(response.data);
        })
        .catch((error) => {
            console.error("GET Students Error:", error);
            showError(error);
        });
}

function createStudent() {
    const nim = document.getElementById("nim").value;
    const nama = document.getElementById("nama").value;
    const kode = document.getElementById("kodeMk").value;
    const namaMk = document.getElementById("namaMk").value;
    const sks = parseInt(document.getElementById("sks").value);

    api.post("/students", {
        nim: nim,
        nama: nama,
        mataKuliah: [{ kode: kode, nama: namaMk, sks: sks }],
    })
        .then((response) => {
            console.log("POST Student:", response.data);
            showMessage(response.data);
        })
        .catch((error) => {
            console.error("POST Student Error:", error);
            showError(error);
        });
}

function updateStudentPatch() {
    const nim = document.getElementById("nim").value;
    const nama = document.getElementById("nama").value;

    api.patch(`/students/${nim}`, {
        nama: nama,
    })
        .then((response) => {
            console.log("PATCH Student:", response.data);
            showMessage(response.data);
        })
        .catch((error) => {
            console.error("PATCH Student Error:", error);
            showError(error);
        });
}

function deleteStudent() {
    const nim = document.getElementById("nim").value;

    api.delete(`/students/${nim}`)
        .then((response) => {
            console.log("DELETE Student:", response.data);
            output.innerHTML = `<p>${response.data.message}</p>`;
        })
        .catch((error) => {
            console.error("DELETE Student Error:", error);
            showError(error);
        });
}