document.addEventListener("DOMContentLoaded", loadShoppingList);

const itemInput = document.getElementById("itemInput");
const addItemButton = document.getElementById("addItemButton");
const shoppingList = document.getElementById("shoppingList");

addItemButton.addEventListener("click", addItem);

function loadShoppingList() {
  const items = JSON.parse(localStorage.getItem("shoppingList")) || [];
  items.forEach((item) => {
    addItemToList(item);
  });
}

function addItem() {
  const itemText = itemInput.value.trim();
  if (itemText !== "") {
    addItemToList(itemText);
    saveItemToLocalStorage(itemText);
    itemInput.value = "";
  }
}

function addItemToList(itemText) {
  const li = document.createElement("li");
  li.textContent = itemText;
  li.addEventListener("click", toggleItemCompletion);
  shoppingList.appendChild(li);
}

function toggleItemCompletion(event) {
  const li = event.target;
  li.classList.toggle("completed");
  updateLocalStorage();
}

function saveItemToLocalStorage(itemText) {
  const items = JSON.parse(localStorage.getItem("shoppingList")) || [];
  items.push(itemText);
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

function updateLocalStorage() {
  const items = [];
  shoppingList.querySelectorAll("li").forEach((li) => {
    items.push({
      text: li.textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("shoppingList", JSON.stringify(items));
}
