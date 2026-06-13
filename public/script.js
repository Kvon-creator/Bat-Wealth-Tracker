let assets = [];

let editIndex = -1;

const form = document.getElementById("assetForm");
const assetList = document.getElementById("assetList");
const totalWealth = document.getElementById("totalWealth");

loadAssets();

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const asset = {
        name: document.getElementById("name").value,
        type: document.getElementById("type").value,
        value: Number(document.getElementById("value").value)
    };

    if (editIndex === -1) {

        saveAsset(asset);

    } else {

        assets[editIndex] = asset;

        displayAssets();

        editIndex = -1;
    }

    form.reset();
});

function loadAssets() {

    fetch("/api/assets")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            assets = data;

            displayAssets();
        });
}

function saveAsset(asset) {

    fetch("/api/assets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(asset)
    })
        .then(function (response) {
            return response.json();
        })
        .then(function () {

            loadAssets();
        });
}

function displayAssets() {

    assetList.innerHTML = "";

    let total = 0;

    for (let i = 0; i < assets.length; i++) {

        const li = document.createElement("li");

        const text = document.createElement("span");

        text.textContent =
            assets[i].name +
            " | " +
            assets[i].type +
            " | $" +
            assets[i].value;

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.addEventListener("click", function () {
            editAsset(i);
        });

        li.appendChild(text);
        li.appendChild(editButton);

        assetList.appendChild(li);

        total += assets[i].value;
    }

    totalWealth.textContent = total;
}

function editAsset(index) {

    document.getElementById("name").value =
        assets[index].name;

    document.getElementById("type").value =
        assets[index].type;

    document.getElementById("value").value =
        assets[index].value;

    editIndex = index;
}