document.addEventListener("DOMContentLoaded", function() {
    // Fetch JSON data from file
    fetch('dashboard.json')
        .then(response => response.json())
        .then(jsonData => {
            // Generate leaderboard HTML
            var leaderboardHTML = "<ol>";
            jsonData.forEach(player => {
                leaderboardHTML += `<li><span>${player.nickname}</span><span>${player.score}</span></li>`;
            });
            leaderboardHTML += "</ol>";

            // Display leaderboard HTML
            var jsonElement = document.getElementById("json-content");
            jsonElement.innerHTML = leaderboardHTML;
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
