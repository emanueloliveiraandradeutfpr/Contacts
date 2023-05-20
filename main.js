const filter = document.querySelector(".input-wrapper input");
const letters = document.querySelectorAll(".list-wrapper");
let contacts = document.querySelectorAll(".list-wrapper li");

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

    let foto = (Math.random() * 100).toFixed(0);
    let nome = "Emanuel";
    let ddd = "42";
    let numberContact = "9 9647-4730";

    li.querySelector("h3").textContent = nome;
    li.querySelector("#ddd").textContent = ddd;
    li.querySelector("#numberContact").textContent = numberContact;
    li.querySelector(
        "img",
    ).src = `https://randomuser.me/api/portraits/men/${foto}.jpg`;

    add.appendChild(li);
    contacts = document.querySelectorAll(".list-wrapper li");
}

editar.onclick = function editContacts() {
    console.log("Oi");
};

deletar.onclick = deleteContacts;

function deleteContacts() {
    for (const i of contacts) {
        i.addEventListener("click", deleta);
    }
}

function removeListener(funcao) {
    for (const index of contacts) {
        index.removeEventListener("click", funcao, false);
    }
}
let deleta = function () {
    if (confirm("Gostaria de deletar este contato?")) {
        event.currentTarget.remove();
        removeListener(deleta);
        renderListContacts();
        contacts = document.querySelectorAll(".list-wrapper li");
    }
};
