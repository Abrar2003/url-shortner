const shortid = require('shortid');
const validator = require('validator')
const URL = require('../models/url.model');


const shortenURL = async (req, res) => {
    try {
        const { original_url, starting_date, expiration_date, title, description,stats } = req.body;

         // Validate the original_url
        if (!validator.isURL(original_url)) {
            return res.status(400).json({ error: 'Invalid URL format' });
        }

        // Generate a unique short_id
        let short_id;
        do {
            short_id = shortid.generate();
        } while (await URL.exists({ short_id }));

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

        // Check for Invalid shortId
        if (!validator.isAlphanumeric(shortId)) {
            return res.status(400).json({ error: 'Invalid shortId format' });
        }

        // Find the URL in the database using the short_id
        const url = await URL.findOne({ short_id: shortId });


        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        // Handling Expired URLs
        if (url.expiration_date && new Date(url.expiration_date) < new Date()) {
            return res.status(400).json({ error: 'URL has expired' });
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

const updateURL = async (req, res) => {
    try {
        const { shortId } = req.params;
        const updateFields = req.body;

        // Handling Non-Existing URLs
        const url = await URL.findOne({ short_id: shortId });
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        // Update the fields in the database
        for (const [key, value] of Object.entries(updateFields)) {
            url[key] = value;
        }

        // Save the updated URL
        await url.save();

        // Return the updated fields in the response
        res.json(updateFields);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

  

 

module.exports = { shortenURL , redirectToOriginalURL , updateURL};
