import { Database } from "sqlite3";

document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todoForm');
    const todoList = document.getElementById('todoList');
    let itemCount = 0;
    
    // Function to add a new TODO item
    todoForm.addEventListener('submit', function (e) {
        const itemInput = document.getElementById('item');
        const itemText = itemInput.value.trim();
        
        if (itemText !== '') {
            itemCount++;
            const listItem = document.createElement('li');

            // Create unique id for each item
            const itemID = `todo-item-${itemCount}`;
            listItem.id = itemID;
            
            // Item paragraph
            const itemParagraph = document.createElement('p');
            itemParagraph.textContent = `${itemCount}: ${itemText}`;
            
            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'delete';
            deleteButton.addEventListener('click', function () {
                todoList.removeChild(listItem);
            });
            
            // Append text and delete button to the list item
            listItem.appendChild(itemParagraph);
            listItem.appendChild(deleteButton);
            
            // Append the list item to the TODO list
            todoList.appendChild(listItem);
            
            // Clear the input field
            itemInput.value = '';
        }
    });
  });