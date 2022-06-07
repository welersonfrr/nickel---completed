const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);

// ADICIONAR LCTO
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getTransactions();

    alert("Lançamento adicionado com sucesso.");

});

checkLogged();

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
    }
    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getTransactions();

}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;
    let count = 0;

    if (transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";

            if (item.type === "2") {
                type = "Saida";
            }

            transactionsHtml += ` 
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                    <td><button class="btn trash" type="button" onClick="removeTransaction(${count})" ><i class="bi bi-trash3-fill"></i></button></td>
                    
                </tr>
            `
            count = count + 1;
        });
    }
    document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}
function removeTransaction(i) {
    let localItens = JSON.parse(localStorage.getItem(logged))
    localItens['transactions'].splice(i,1)
    localStorage.setItem(logged, JSON.stringify(localItens));

    alert("Transação eliminada com sucesso!");
    location.reload();
}