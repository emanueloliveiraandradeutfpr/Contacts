const filter = document.querySelector(".input-wrapper input");
const letters = document.querySelectorAll(".list-wrapper");
let contacts = document.querySelectorAll(".list-wrapper li");
const containerForm = document.querySelector(".container-form");
const form = document.querySelector(".addContact");

const adicionar = document.querySelector("#add");
const editar = document.querySelector("#pencil");
const deletar = document.querySelector("#trash");

filter.addEventListener("keyup", filterContacts);
function filterContacts() {
    if (filter.value !== "") {
        for (let contact of contacts) {
            let keySearchByName = contact.querySelector("h3");
            keySearchByName = keySearchByName.textContent.toLowerCase();
            let keySearchByNumber = contact.querySelector("p");
            keySearchByNumber = keySearchByNumber.textContent.toLowerCase();

            let filterText = filter.value.toLowerCase().trim();
            if (
                !keySearchByName.includes(filterText) &&
                !keySearchByNumber.includes(filterText)
            ) {
                contact.style.display = "none";
            } else {
                contact.style.display = "flex";
            }
        }
        renderListContacts();
    } else {
        for (let contact of contacts) {
            contact.style.display = "flex";
        }
        renderListContacts();
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
    MaskInput("numContact");

    containerForm.classList.toggle("visible");
    form.onsubmit = (e) => {
        e.preventDefault();
        let nome = document.querySelector(".nomeContact");
        let numberContact = document.querySelector(".numContact");
        let img = li.querySelector("img");
        let file = e.target[0].files[0];
        let ramdom = (Math.random() * 100).toFixed(0);

        const gender = e.currentTarget[1].checked ? "men" : "women";

        file
            ? createFileReader(img, file)
            : (img.src = `https://randomuser.me/api/portraits/${gender}/${ramdom}.jpg`);

        if (!nome.value) {
            e.cancelBubble;
            setTimeout(() => {
                nome.setCustomValidity("");
            }, 3000);
            return nome.setCustomValidity("Preencha o nome do contato ");
        }
        if (numberContact.value.length !== 15) {
            e.cancelBubble;
            setTimeout(() => {
                numberContact.setCustomValidity("");
            }, 3000);
            return numberContact.setCustomValidity(
                "Preencha o número completo",
            );
        }
        li.querySelector("h3").textContent = nome.value;
        li.querySelector("#numberContact").textContent = numberContact.value;

        form.reset();
        add.appendChild(li);
        containerForm.classList.toggle("visible");
        contacts = document.querySelectorAll(".list-wrapper li");
    };
}

deletar.onclick = deleteContacts;

function deleteContacts() {
    for (const i of contacts) {
        i.addEventListener("click", deleta);
    }
}

function edit(e) {
    //criar formulario para editar
    const container = document.querySelector(".container-form").cloneNode(true);
    const formEdit = container.childNodes[1];
    editar.parentElement.childNodes[9]
        ? editar.parentElement.childNodes[9].replaceWith(container)
        : editar.parentElement.appendChild(container);
    container.classList.toggle("visible");
    //////

    const contactInfoOnForm =
        e.currentTarget.firstElementChild.lastElementChild;
    let beforeName = contactInfoOnForm.firstElementChild;
    let beforeTel = contactInfoOnForm.lastElementChild;
    let beforeImg = contactInfoOnForm.parentElement.firstElementChild;

    let name, tel, botao, img;

    formEdit.childNodes.forEach((item) => {
        if (item?.nextSibling?.classList?.contains("fotoContact")) {
            return (img = item.nextSibling);
        }
        if (item?.nextSibling?.classList?.contains("nomeContact")) {
            return (name = item.nextSibling);
        }
        if (item?.nextSibling?.classList?.contains("numContact")) {
            return (tel = item.nextSibling);
        }
        if (item?.nextSibling?.classList?.contains("botao")) {
            return (botao = item.nextSibling);
        }
    });
    tel.classList.add("editTelForm");
    MaskInput("editTelForm");

    name.value = beforeName.textContent;
    tel.value = beforeTel.textContent;
    botao.innerHTML = "Alterar";

    formEdit.onsubmit = (e) => {
        e.preventDefault();

        let file = e.target[0].files[0];
        img.src = file ? createFileReader(img, file) : beforeImg.src;

        if (!name.value) {
            e.cancelBubble;
            setTimeout(() => {
                name.setCustomValidity("");
            }, 3000);
            return name.setCustomValidity("Preencha o nome do contato ");
        }
        if (tel.value.length !== 15) {
            e.cancelBubble;
            setTimeout(() => {
                tel.setCustomValidity("");
            }, 3000);
            return tel.setCustomValidity("Preencha o número completo");
        }

        container.remove();
        removeListener(edit, true);
    };
}

function deleta(e) {
    if (confirm("Gostaria de deletar este contato?")) {
        e.currentTarget.remove();
        removeListener(deleta);
        renderListContacts();
        contacts = document.querySelectorAll(".list-wrapper li");
    }
}

editar.onclick = () => {
    if (editar.parentElement.childNodes[9]) {
        editar.parentElement.childNodes[9].remove();
        removeListener(edit, true);
    } else {
        for (const i of contacts) {
            i.addEventListener("click", edit);
        }
    }
};

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
