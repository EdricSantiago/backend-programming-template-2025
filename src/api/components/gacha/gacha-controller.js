const gachaService = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getPrizes(request, response, next) {
  try {
    const prize = await gachaService.getPrizes();
    return response.status(200).json(prize);
  } catch (error) {
    return next(error);
  }
}

async function doGacha(request, response, next) {
  try {
    const { username } = request.body;

    if (!username) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Username is required');
    }

    const result = await gachaService.doGacha(username);
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getHistory(request, response, next) {
  try {
    const { username } = request.params;
    const history = await gachaService.getHistory(username);
    return response.status(200).json(history);
  } catch (error) {
    return next(error);
  }
}

async function getWinners(request, response, next) {
  try {
    const winners = await gachaService.getWinners();
    return response.status(200).json(winners);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getPrizes,
  doGacha,
  getHistory,
  getWinners,
};
