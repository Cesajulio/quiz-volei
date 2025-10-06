// Mapeamento dos elementos da página de ranking
const rankingList = document.getElementById("ranking-list");
const returnButton = document.getElementById("return-button");

// Função para carregar os dados do localStorage e exibir o ranking
function loadRanking() {
    const savedScores = localStorage.getItem('teamScores');

    if (savedScores) {
        const teamScores = JSON.parse(savedScores);
        const teamsWithAverages = [];

        for (const team in teamScores) {
            if (teamScores.hasOwnProperty(team)) {
                const scores = teamScores[team];
                if (scores.length > 0) {
                    const sum = scores.reduce((total, currentScore) => total + currentScore, 0);
                    const average = sum / scores.length;
                    teamsWithAverages.push({ team: team, average: average });
                }
            }
        }

        teamsWithAverages.sort((a, b) => b.average - a.average);

        if (teamsWithAverages.length > 0) {
            rankingList.innerHTML = '';
            teamsWithAverages.forEach((teamData, index) => {
                const rankingItem = document.createElement("div");
                rankingItem.classList.add("ranking-item");
                rankingItem.innerHTML = `
                    <p class="position">#${index + 1}</p>
                    <p class="team-name">${teamData.team}</p>
                    <p class="team-score">Média: **${teamData.average.toFixed(2)}**</p>
                `;
                rankingList.appendChild(rankingItem);
            });
        } else {
            rankingList.innerHTML = "<p>Ainda não há dados suficientes para criar o ranking.</p>";
        }

    } else {
        rankingList.innerHTML = "<p>Nenhum quiz foi completado ainda. Seja o primeiro a participar!</p>";
    }
}

// Adiciona o event listener para o botão de voltar
returnButton.addEventListener("click", () => {
    window.location.href = "index.html";
});

// Executa a função para carregar o ranking quando a página é carregada
loadRanking();