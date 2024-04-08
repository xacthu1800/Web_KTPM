/* 

document.addEventListener("DOMContentLoaded", function() {
		
    var searchLink = document.getElementById("search-link");
    var searchBoxContainer = document.getElementById("search-box-container");
    var searchInput = document.getElementById("search-input");

    searchLink.addEventListener("click", function(event) {
        event.preventDefault();
        if (searchBoxContainer.style.display === "block") {
            searchBoxContainer.style.display = "none";
        } else {
            searchBoxContainer.style.display = "block";
        }
    });

    document.getElementById("search-button").addEventListener("click", function() {
        var searchTerm = searchInput.value.trim();
        if (searchTerm !== "") {
            alert("Perform search for: " + searchTerm);
        }
    });
});




 */