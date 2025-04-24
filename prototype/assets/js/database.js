// Database schema for Tank Wars
const database = {
    users: [
        {
            id: 1,
            username: "player1",
            email: "player1@example.com",
            password: "hashed_password_here",
            score: 1500,
            rank: "Gold",
            gamesPlayed: 25,
            wins: 15,
            losses: 10
        }
    ],
    leaderboard: [
        {
            id: 1,
            username: "player1",
            score: 1500,
            rank: "Gold",
            lastPlayed: "2024-03-20"
        }
    ],
    gameStats: [
        {
            id: 1,
            userId: 1,
            gameId: "game123",
            score: 500,
            kills: 5,
            deaths: 2,
            date: "2024-03-20"
        }
    ]
};

// Database functions
const db = {
    // Add new user
    addUser: function(userData) {
        const newUser = {
            id: database.users.length + 1,
            ...userData,
            score: 0,
            rank: "Bronze",
            gamesPlayed: 0,
            wins: 0,
            losses: 0
        };
        database.users.push(newUser);
        return newUser;
    },

    // Update user score
    updateScore: function(userId, newScore) {
        const user = database.users.find(u => u.id === userId);
        if (user) {
            user.score = newScore;
            // Update rank based on score
            if (newScore >= 2000) user.rank = "Diamond";
            else if (newScore >= 1500) user.rank = "Gold";
            else if (newScore >= 1000) user.rank = "Silver";
            else user.rank = "Bronze";
            
            // Update leaderboard
            this.updateLeaderboard(userId, newScore, user.rank);
            return true;
        }
        return false;
    },

    // Update leaderboard
    updateLeaderboard: function(userId, score, rank) {
        const user = database.users.find(u => u.id === userId);
        if (!user) return false;

        const leaderboardEntry = database.leaderboard.find(entry => entry.id === userId);
        if (leaderboardEntry) {
            leaderboardEntry.score = score;
            leaderboardEntry.rank = rank;
            leaderboardEntry.lastPlayed = new Date().toISOString().split('T')[0];
        } else {
            database.leaderboard.push({
                id: userId,
                username: user.username,
                score: score,
                rank: rank,
                lastPlayed: new Date().toISOString().split('T')[0]
            });
        }

        // Sort leaderboard by score
        database.leaderboard.sort((a, b) => b.score - a.score);
        return true;
    },

    // Get top players
    getTopPlayers: function(limit = 10) {
        return database.leaderboard.slice(0, limit);
    },

    // Add game stats
    addGameStats: function(userId, gameData) {
        const newGameStats = {
            id: database.gameStats.length + 1,
            userId: userId,
            ...gameData,
            date: new Date().toISOString().split('T')[0]
        };
        database.gameStats.push(newGameStats);
        return newGameStats;
    }
};

// Export database functions
export default db; 