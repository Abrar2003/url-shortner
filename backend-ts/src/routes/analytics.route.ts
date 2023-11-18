import express from "express";
import { getURLAnalytics, getAllVisitors } from "../controllers/analytics.controller";

const Router = express.Router();

Router.get('/:short_id', getURLAnalytics);
Router.get('/visitors/:short_id', getAllVisitors);

export default Router;
