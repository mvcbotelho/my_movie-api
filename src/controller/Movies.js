import api from '../services/api';

const LIKES = {};

class Movies {
  async index(req, res) {
    const { title } = req.query;
    const fullDataArray = [];
    let year = new Date().getFullYear();
    if (title === undefined)
      return res.status(400).json({ message: 'Insira um título' });

    const verify = await api.get(
      `/?s=${title}&apikey=${process.env.API_KEY}&type=movie&plot=full`,
    );

    if (verify.status === 200 && verify.data.Error === 'Movie not found!')
      return res.status(404).json({ message: 'Filme não encotnrado' });

    const totalResultVerify = verify.data.totalResults;

    if (totalResultVerify < 15) {
      if (totalResultVerify < 10) {
        fullDataArray = verify.data.Search;
      } else {
        const response = await api.get(
          `/?s=${title}&apikey=${process.env.API_KEY}&type=movie&plot=full&page=2`,
        );
        fullDataArray = [...verify.data.Search, response.data.Search];
      }
    } else {
      async function loadTheList() {
        const response = await api.get(
          `/?s=${title}&apikey=${process.env.API_KEY}&type=movie&plot=full&y=${year}`,
        );

        if (response.data.Search) fullDataArray.push(...response.data.Search);

        year--;
        if (fullDataArray.length < 15) return loadTheList();
      }
      await loadTheList();
    }

    fullDataArray.length = 15;

    const ids = fullDataArray.map(el => el.imdbID);

    const arrayOfPromises = [];
    for (let id of ids) {
      arrayOfPromises.push(
        new Promise(async (resolve, reject) => {
          const response = await api.get(
            `/?apikey=${process.env.API_KEY}&i=${id}&plot=full`,
          );
          resolve(response.data);
        }),
      );
    }

    const arrayOfPromisesResolved = await Promise.all(arrayOfPromises);

    let result = [];
    function associateResponseByIndex() {
      fullDataArray.forEach((data, index) => {
        result[index] = arrayOfPromisesResolved[index];

        const like = LIKES[data.imdbID];
        result[index].like = like;
      });
    }
    associateResponseByIndex();

    return res.json(result);
  }

  async show(req, res) {
    const { id } = req.params;

    const response = await api.get(
      `/?apikey=${process.env.API_KEY}&i=${id}&plot=full`,
    );

    if (
      response.status === 200 &&
      response.data.Error === 'Error getting data.'
    )
      return res.status(404).json({ message: 'Filme não encotnrado' });

    const findLike = LIKES[id];
    if (response.data.imdbID === id) response.data.like = findLike;

    return res.json(response.data);
  }

  async store(req, res) {
    const { id } = req.params;

    const response = await api.get(
      `/?apikey=${process.env.API_KEY}&i=${id}&plot=full`,
    );

    if (
      response.status === 200 &&
      response.data.Error === 'Error getting data.'
    )
      return res.status(404).json({ message: 'Filme não encotnrado' });

    const findLike = LIKES[id];

    if (findLike) {
      delete LIKES[id];
      return res.status(204).json();
    } else {
      LIKES[id] = {
        count: 1,
      };
    }

    return res.status(201).json();
  }
}

export default new Movies();
