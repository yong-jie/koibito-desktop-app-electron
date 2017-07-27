import filter from 'async/filter';
import map from 'async/map';
import whilst from 'async/whilst';

export const filterAsync = (arr, truthTest) =>
  new Promise((resolve, reject) => {
    filter(arr, truthTest, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });

export const mapAsync = (arr, transform) =>
  new Promise((resolve, reject) => {
    map(arr, transform, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });

export const whilstAsync = (test, iteratee) => {
  return new Promise((resolve, reject) => {
    whilst(test, iteratee, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};
