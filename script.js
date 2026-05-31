let assets = JSON.parse(localStorage.getItem("batEquipment")) || [];
let editIndex = -1;

const form = document.getElementById("assetForm");
const assetList = document.getElementById("assetList");
const totalWealth = document.getElementById("totalWealth");

displayAssets();

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const value = Number(document.getElementById("value").value);

    const asset = {
        name: name,
        type: type,
        value: value
    };

    if (editIndex === -1) {
        assets.push(asset);
    } else {
        assets[editIndex] = asset;
        editIndex = -1;
    }

    localStorage.setItem("batEquipment", JSON.stringify(assets));

    displayAssets();

    form.reset();
});

function displayAssets() {
    assetList.innerHTML = "";

    let total = 0;

    for (let i = 0; i < assets.length; i++) {

        const li = document.createElement("li");

        const info = document.createElement("span");

        info.textContent =
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

        li.appendChild(info);
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