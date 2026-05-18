const { Sequelize } = require('sequelize')
const Expense = require('../models/expense')
const NewUsers = require('../models/user')

const getLeaderboard = async (req, res) => {
    try {
        const leaderboardData = await NewUsers.findAll({
            attributes: ['username', 'totalExpenses'],
            include: [{
                model: Expense,
                attributes: []
            }],
            group: ['NewUsers.id'],
            order: [['totalExpenses', 'DESC']]
        });
        return res.status(200).json({
            success: true,
            data: leaderboardData
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
module.exports = {
    getLeaderboard
}