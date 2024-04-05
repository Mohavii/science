document.addEventListener("DOMContentLoaded", function() {
    // Fetch JSON data from server
    fetch('https://cbf67d83-7188-446b-9668-ff15d1924ba4-00-19ngter69pbcw.janeway.replit.dev/get-scores')
    .then(response => response.json())
    .then(jsonData => {
        // Sort the data by score (descending order)
        jsonData.sort((a, b) => b.score - a.score);

        // Generate leaderboard HTML
        var leaderboardHTML = "";
        jsonData.forEach(player => {
            leaderboardHTML += `<tr><td>${player.nickname}</td><td>${player.score}</td></tr>`;
        });

        // Display leaderboard HTML
        var leaderboardBody = document.getElementById("leaderboard-body");
        leaderboardBody.innerHTML = leaderboardHTML;
    })
    .catch(error => console.error('Error fetching JSON:', error));
});
