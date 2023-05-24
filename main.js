const filter = document.querySelector(".input-wrapper input");
const letters = document.querySelectorAll(".list-wrapper");
let contacts = document.querySelectorAll(".list-wrapper li");
const form = document.querySelector(".addContact");

const adicionar = document.querySelector("#add");
const editar = document.querySelector("#pencil");
const deletar = document.querySelector("#trash");

filter.addEventListener("keyup", filterContacts);
function filterContacts() {
    if (filter.value !== "") {
        for (let contact of contacts) {
            let keySearch = contact.querySelector("h3");
            keySearch = keySearch.textContent.toLowerCase();
            let filterText = filter.value.toLowerCase().trim();
            if (!keySearch.includes(filterText)) {
                contact.style.display = "none";
            } else {
                contact.style.display = "flex";
            }
            renderListContacts();
        }
    } else {
        for (let contact of contacts) {
            contact.style.display = "flex";
        }
        for (const letter of letters) {
            letter.style.display = "flex";
        }
    }
    contacts = document.querySelectorAll(".list-wrapper li");
}

function renderListContacts() {
    for (const letter of letters) {
        let cont = 0;
        if (letter.lastElementChild.childElementCount === 0) {
            letter.style.display = "none";
        }
        for (const iterator of letter.lastElementChild.children) {
            if (iterator.style.display == "none") {
                cont++;
            }
            if (letter.lastElementChild.childElementCount === cont) {
                letter.style.display = "none";
            } else {
                letter.style.display = "flex";
            }
        }
    }
}
adicionar.addEventListener("click", addContacts);
function addContacts() {
    const li = document.querySelector(".list-wrapper li").cloneNode(true);
    const add = document.querySelector(".list-wrapper ul");

    form.classList.toggle("visible");
    form.onsubmit = (e) => {
        e.preventDefault();
        let nome = document.querySelector("#nomeContact").value;
        let ddd = document.querySelector("#dddContact").value;
        let numberContact = document.querySelector("#numContact").value;
        let img = li.querySelector("img");
        let file = event.target[0].files[0];
        let ramdom = (Math.random() * 100).toFixed(0);

        const gender = e.currentTarget[1].checked ? "men" : "women";

        file
            ? createFileReader(img, file)
            : (img.src = `https://randomuser.me/api/portraits/${gender}/${ramdom}.jpg`);

        if (nome != "") {
            li.querySelector("h3").textContent = nome;
        }

        li.querySelector("#ddd").textContent = ddd;

        li.querySelector("#numberContact").textContent = numberContact;

        form.reset();
        add.appendChild(li);
        form.classList.toggle("visible");
        contacts = document.querySelectorAll(".list-wrapper li");
    };
}

deletar.onclick = deleteContacts;

function deleteContacts() {
    for (const i of contacts) {
        i.addEventListener("click", deleta);
    }
}

function deleta() {
    if (confirm("Gostaria de deletar este contato?")) {
        event.currentTarget.remove();
        removeListener(deleta);
        renderListContacts();
        contacts = document.querySelectorAll(".list-wrapper li");
    }
}

editar.onclick = editContacts;
function editContacts() {
    for (const i of contacts) {
        i.addEventListener("click", edit);
    }
}

function edit() {
    if (event.target.contentEditable === "inherit") {
        event.target.contentEditable = true;
    }
    event.target.addEventListener("focusout", () => {
        event.target.contentEditable = "inherit";
    });

    removeListener(edit);
}

function removeListener(funcao) {
    for (const index of contacts) {
        index.removeEventListener("click", funcao, false);
    }
}

function createFileReader(img, file) {
    const reader = new FileReader();

    reader.addEventListener("load", (ev) => {
        const readerTarget = ev.target;
        img.src = readerTarget.result;
    });
    reader.readAsDataURL(file);
}
