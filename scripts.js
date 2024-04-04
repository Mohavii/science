document.addEventListener("DOMContentLoaded", function() {
    // Fetch JSON data from file
fetch('https://cbf67d83-7188-446b-9668-ff15d1924ba4-00-19ngter69pbcw.janeway.replit.dev//dashboard.json')
.then(response => response.json())
.then(data => {
  // Process data and display it on your website
  console.log(data);
})
.catch(error => console.error('Error:', error));
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
