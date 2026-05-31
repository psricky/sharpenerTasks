const { Transform } = require('json2csv');
// Import your configured sequelize instance and Model
// const { sequelize, User } = require('./models'); 
const Expense=require('../models/expense')
const sequelize  = require('../config/db'); // Ensure your sequelize instance is imported

const downloadCSV = async (req, res) => {
    try {
        // Default to 'daily' if no range is passed
        const range = req.query.range || 'daily'; 
        
        let selectAttributes = [];
        let groupByAttributes = [];
        let orderByAttributes = [];
        let csvFields = [];
        let filename = '';

        // 1. Configure dynamically based on the requested range
        switch (range) {
            case 'weekly':
                filename = 'weekly_expenses_report.csv';
                csvFields = ['Year', 'Week', 'TotalExpense', 'TransactionCount'];
                
                // Group by Year and Week Number
                selectAttributes = [
                    [sequelize.fn('YEAR', sequelize.col('expenseCreationDate')), 'Year'],
                    [sequelize.fn('WEEK', sequelize.col('expenseCreationDate')), 'Week'],
                ];
                groupByAttributes = [
                    sequelize.fn('YEAR', sequelize.col('expenseCreationDate')),
                    sequelize.fn('WEEK', sequelize.col('expenseCreationDate'))
                ];
                orderByAttributes = [
                    [sequelize.fn('YEAR', sequelize.col('expenseCreationDate')), 'DESC'],
                    [sequelize.fn('WEEK', sequelize.col('expenseCreationDate')), 'DESC']
                ];
                break;

            case 'monthly':
                filename = 'monthly_expenses_report.csv';
                csvFields = ['Year', 'Month', 'TotalExpense', 'TransactionCount'];

                // Group by Year and Month Number
                selectAttributes = [
                    [sequelize.fn('YEAR', sequelize.col('expenseCreationDate')), 'Year'],
                    [sequelize.fn('MONTH', sequelize.col('expenseCreationDate')), 'Month'],
                ];
                groupByAttributes = [
                    sequelize.fn('YEAR', sequelize.col('expenseCreationDate')),
                    sequelize.fn('MONTH', sequelize.col('expenseCreationDate'))
                ];
                orderByAttributes = [
                    [sequelize.fn('YEAR', sequelize.col('expenseCreationDate')), 'DESC'],
                    [sequelize.fn('MONTH', sequelize.col('expenseCreationDate')), 'DESC']
                ];
                break;

            case 'yearly':
                filename = 'yearly_expenses_report.csv';
                csvFields = ['Year', 'TotalExpense', 'TransactionCount'];

                // Group by Year only
                selectAttributes = [
                    [sequelize.fn('YEAR', sequelize.col('expenseCreationDate')), 'Year']
                ];
                groupByAttributes = [
                    sequelize.fn('YEAR', sequelize.col('expenseCreationDate'))
                ];
                orderByAttributes = [
                    [sequelize.fn('YEAR', sequelize.col('expenseCreationDate')), 'DESC']
                ];
                break;

            case 'daily':
            default:
                filename = 'daily_expenses_report.csv';
                csvFields = ['Date', 'TotalExpense', 'TransactionCount'];

                // Group by exact Date (strips time if your column is DATETIME)
                selectAttributes = [
                    [sequelize.fn('DATE', sequelize.col('expenseCreationDate')), 'Date']
                ];
                groupByAttributes = [
                    sequelize.fn('DATE', sequelize.col('expenseCreationDate'))
                ];
                orderByAttributes = [
                    [sequelize.fn('DATE', sequelize.col('expenseCreationDate')), 'DESC']
                ];
                break;
        }

        // 2. Append the common Aggregation Fields (SUM and COUNT) to our selection
        selectAttributes.push(
            [sequelize.fn('SUM', sequelize.col('amount')), 'TotalExpense'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'TransactionCount']
        );

        // 3. Set standard HTTP download response headers
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        // 4. Initialize CSV Parser Stream
        const json2csvParser = new Transform({ fields: csvFields }, { objectMode: true });
        json2csvParser.pipe(res);

        // 5. Execute Aggregation Query using Sequelize
        const reports = await Expense.findAll({
            attributes: selectAttributes,
            group: groupByAttributes,
            order: orderByAttributes,
            raw: true // Returns clean JSON rows directly
        });

        // 6. Push data into the stream and finalize
        reports.forEach(row => json2csvParser.write(row));
        json2csvParser.end();

    } catch (error) {
        console.error('Failed to generate aggregated expense report:', error);
        if (!res.headersSent) {
            res.status(500).send('Error generating report');
        }
    }
};

module.exports = { downloadCSV };
