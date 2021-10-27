export function displayTags() {

    //events
    document.addEventListener("click", (event) => {
        if (event.target.className === "list-element primary-color" ||
            event.target.className === "list-element secondary-color" ||
            event.target.className === "list-element tertiary-color") {
            createNewTag(event)
        }

        if (event.target.className === "delete-tag-btn") {
            deleteTag(event)
        }
    });

    //functions
    function createNewTag(event) {
        let targetContent = event.target.innerHTML;
        let targetColor = event.target.className;

        document.getElementById("tag-section").innerHTML += `
            <span class="tag tag-ingredients ${targetColor}">
                ${targetContent}
                <button><img src="img/delete.svg" class="delete-tag-btn" alt="delete svg"></button>
            </span>
        `
    }

    function deleteTag(event) {
        event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
    }
};