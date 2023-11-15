// function test_URL_Controller(req,res){

//     res.send("Hello URL");
// }

// function new_sort_url(req,res){

//     res.send("new Url created URL");
// }

// Controller to get short URLs by App Id

const URL= require("../models/url.model");

const getShortUrlsByAppId = async (req, res) => {
    const { app_id } = req.query;
    const { page } = req.query;
  
    try {
      const pageSize = 10; // Adjust the page size as needed
   //   const result = await URL.getByAppId(app_id, page, pageSize);
   
   const result = await URL.find({
    app_id
   }).skip(page*pageSize).limit(pageSize)

      res.json(result);
    } catch (error) {
      console.error("Error fetching URLs by App Id:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // Controller to delete short URL by shortId
const deleteShortUrl = async (req, res) => {
    const { shortId } = req.params;
  
    try {
      const deletedUrl = await URL.findOneAndDelete({ short_id: shortId });
  
      if (deletedUrl) {
        res.json({
          success: true,
          message: "URL deleted successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "URL not found",
        });
      }
    } catch (error) {
      console.error("Error deleting URL by shortId:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
  module.exports = {
    // test_URL_Controller,
    // new_sort_url,
    getShortUrlsByAppId,
    deleteShortUrl
  };