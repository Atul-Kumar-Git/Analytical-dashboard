const pool = require('../config/db');

exports.getAnalytics = async (req, res) => {
    const { startDate, endDate, gender } = req.body;

    try {
        let baseQuery = `
            FROM feature_clicks fc
            JOIN users u ON fc.user_id = u.id
            WHERE 1=1
        `;

        let params = [];
        let index = 1;

        if (startDate) {
            baseQuery += ` AND fc.timestamp >= $${index++}`;
            params.push(startDate);
        }

        if (endDate) {
            baseQuery += ` AND fc.timestamp <= $${index++}`;
            params.push(endDate);
        }

        if (gender) {
            baseQuery += ` AND u.gender = $${index++}`;
            params.push(gender);
        }

        // BAR
        const barResult = await pool.query(`
            SELECT fc.feature_name, COUNT(*) as total
            ${baseQuery}
            GROUP BY fc.feature_name
        `, params);

        // LINE
        const lineResult = await pool.query(`
            SELECT DATE(fc.timestamp) as date, COUNT(*) as count
            ${baseQuery}
            GROUP BY date
            ORDER BY date
        `, params);

        res.json({
            bar: barResult.rows,
            line: lineResult.rows
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};