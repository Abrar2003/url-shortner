const AccessLog = require('../models/accessLog.model');
const URL = require('../models/url.model');
// Analytics Endpoint
const getURLAnalytics= async (req, res) => {
    try {
      const short_url = req.params.shortID;
  
      const urlDetails = await URL.findOne({ short_url });
  
      if (!urlDetails) {
        return res.status(404).json({ error: 'URL not found' });
      }
  
      // Fetch access logs for this URL
      const accessLogs = await AccessLog.find({ url_id: urlDetails._id });
  
      // Assuming you have a function to calculate unique visitors
      const uniqueVisitors = calculateUniqueVisitors(accessLogs);
  
      const analyticsData = {
        original_url: urlDetails.original_url,
        short_url: urlDetails.short_url,
        expiration_date: urlDetails.expiration_date,
        starting_date: urlDetails.starting_date,
        app_id: urlDetails.app_id,
        title: urlDetails.title,
        description: urlDetails.description,
        status: urlDetails.status,
        stats: {
          total_visitors: accessLogs.length,
          unique_visitors: uniqueVisitors,
        },
      };
  
      res.json(analyticsData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //calculating unique visitors
function calculateUniqueVisitors(accessLogs) {
    const uniqueIPs = new Set();
  
    accessLogs.forEach(log => {
      uniqueIPs.add(log.ip_address);
    });
  
    return uniqueIPs.size;
}

// Get All Visitors Endpoint
const getAllVisitors=  async (req, res) => {
    try {
      const short_url = req.params.shortId;
      const page = parseInt(req.query.page) || 1;
      const limit = 10; // Number of visitors per page
  
      const urlDetails = await URL.findOne({ short_url });
  
      if (!urlDetails) {
        return res.status(404).json({ error: 'URL not found' });
      }
  
      const skip = (page - 1) * limit;
  
      const accessLogs = await AccessLog.find({ url_id: urlDetails._id })
        .skip(skip)
        .limit(limit);
  
      res.json(accessLogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {getURLAnalytics, getAllVisitors}
  