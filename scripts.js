document.addEventListener("DOMContentLoaded", function() {
    // Fetch JSON data from server
    fetch('https://cbf67d83-7188-446b-9668-ff15d1924ba4-00-19ngter69pbcw.janeway.replit.dev/get-scores')
    .then(response => response.json())
    .then(jsonData => {
        // Sort the data by score (descending order)
        jsonData.sort((a, b) => b.score - a.score);

        // Generate leaderboard HTML
        var leaderboardHTML = "<ol>";
        jsonData.forEach(player => {
            leaderboardHTML += `<li><span>${player.nickname}</span><span>${player.score}</span></li>`;
        });
        leaderboardHTML += "</ol>";

        // Display leaderboard HTML
        var jsonElement = document.getElementById("json-content");
        if (jsonElement) {
            jsonElement.innerHTML = leaderboardHTML;
        } else {
            console.error('Error: Element with id "json-content" not found.');
        }
    })
    .catch(error => console.error('Error fetching JSON:', error));
});
