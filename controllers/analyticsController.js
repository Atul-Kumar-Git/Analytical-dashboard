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

        // 🔥 FIXED DATE FILTER (MAIN FIX)
        if (startDate && endDate) {
            baseQuery += ` AND DATE(fc.timestamp) BETWEEN $${index} AND $${index + 1}`;
            params.push(startDate, endDate);
            index += 2;
        }

        // OPTIONAL GENDER FILTER
        if (gender) {
            baseQuery += ` AND u.gender = $${index++}`;
            params.push(gender);
        }

        // ===== BAR CHART =====
        const barResult = await pool.query(`
            SELECT fc.feature_name, COUNT(*) as total
            ${baseQuery}
            GROUP BY fc.feature_name
        `, params);

        // ===== LINE CHART =====
        const lineResult = await pool.query(`
            SELECT DATE(fc.timestamp) as date, COUNT(*) as count
            ${baseQuery}
            GROUP BY DATE(fc.timestamp)
            ORDER BY DATE(fc.timestamp)
        `, params);

        res.json({
            bar: barResult.rows,
            line: lineResult.rows
        });

    } catch (err) {
        console.error("Analytics Error:", err);
        res.status(500).json({ error: err.message });
    }
};