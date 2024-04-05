document.addEventListener("DOMContentLoaded", function() {
    // Fetch JSON data from server
    fetch('https://cbf67d83-7188-446b-9668-ff15d1924ba4-00-19ngter69pbcw.janeway.replit.dev/get-scores')
    .then(response => response.json())
    .then(jsonData => {
        // Sort the data by score (descending order)
        jsonData.sort((a, b) => b.score - a.score);

        // Generate HTML for the table
        var tableHTML = "<thead><tr><th>اللاعب</th><th>عدد نقاطه</th></tr></thead><tbody>";
        jsonData.forEach(player => {
            tableHTML += `<tr><td>${player.nickname}</td><td>${player.score}</td></tr>`;
        });
        tableHTML += "</tbody>";

        // Create a table element and set its inner HTML
        var tableElement = document.createElement("table");
        tableElement.innerHTML = tableHTML;

        // Add some basic styling
        tableElement.style.width = "50%";
        tableElement.style.margin = "20px auto";
        tableElement.style.borderCollapse = "collapse";
        tableElement.style.border = "1px solid #ddd";
        tableElement.style.backgroundColor = "#fff";
        tableElement.style.textAlign = "left";

        // Add the table to the DOM
        var jsonElement = document.getElementById("json-content");
        jsonElement.appendChild(tableElement);
    })
    .catch(error => console.error('Error fetching JSON:', error));
});
