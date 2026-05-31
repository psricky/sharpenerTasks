const expenses = require('../models/expense');
const user = require('../models/user');

const getPaginatedExpenses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const userId = req.user.id; 

        const { count, rows } = await expenses.findAndCountAll({
            where: { userId },
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });
        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            expenses: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getPaginatedExpenses
}


