import logService from "../services/log.service.js";

class LogController {
  // Retrieves log data for a specific day.
  async dataPerDay(req, res, next) {
    try {
      const { date } = req.query;
      const dataPerDayService = await logService.dataPerDay(date);
      res.status(200).json(dataPerDayService);
    } catch (e) {
      next(e);
    }
  }

  // Retrieves log data for a specified period.
  async dataForPeriod(req, res, next) {
    try {
      const { from, to } = req.query;
      const dataForPeriodService = await logService.dataForPeriod(from, to);
      res.status(200).json(dataForPeriodService);
    } catch (e) {
      next(e);
    }
  }
}

export default new LogController();
