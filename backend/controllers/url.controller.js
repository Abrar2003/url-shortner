const shortid = require('shortid');
const URL = require('../models/url.model');


const shortenURL = async (req, res) => {
    try {
        const { original_url, starting_date, expiration_date, title, description,stats } = req.body;
        const short_id = shortid.generate();
        const DOMAIN = process.env.DOMAIN
        const PORT = process.env.PORT


        // Create a new URL entry in the database
        const url = new URL({
            original_url,
            short_id,
            starting_date,
            expiration_date,
            title,
            description,
            stats,
        });

        await url.save();

        res.json({ short_url: `${DOMAIN}:${PORT}/url/${short_id}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const redirectToOriginalURL = async (req, res) => {
    try {
        const { shortId } = req.params;

        // Find the URL in the database using the short_id
        const url = await URL.findOne({ short_id: shortId });


        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        // Increment the total_visitor count in the stats
        url.stats.total_visitor += 1;
        await url.save();

        // Redirect to the original URL
        res.redirect(url.original_url);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
 

module.exports = { shortenURL , redirectToOriginalURL};
