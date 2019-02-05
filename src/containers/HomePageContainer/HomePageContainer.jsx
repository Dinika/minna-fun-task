import React, { Component } from 'react';
import axios from 'axios';

class HomePageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios
      .get(
        'https://www.omdbapi.com/?t=Silicon%20Valley&Season=1&apikey=a7da74f5'
      )
      .then(response => {
        const episodes = response.data.Episodes;
        const sumOfRating = episodes.reduce((sum, episode) => {
          const { imdbRating } = episode;
          return sum + +imdbRating;
        }, 0);
        const addenda = episodes.length;
        const average = sumOfRating / addenda;
        console.log(average.toFixed(2));

        const listOfPromises = episodes.map(episode => {
          const url = `https://www.omdbapi.com/?i=${
            episode.imdbID
          }&plot=short&r=json&apikey=a7da74f5`;
          return axios.get(url);
        });

        Promise.all(listOfPromises).then(episodes => {
          const totalRunTime = episodes.reduce((runTime, episode) => {
            const episodeRuntime = +episode.data.Runtime.split(' ')[0];
            return runTime + episodeRuntime;
          }, 0);
          console.log(`${totalRunTime} minutes`);

          const plotsOfEpisodes = episodes.map(episode => ({
            title: episode.data.Title,
            plot: episode.data.Plot
          }));

          const wordWithHighesCount = HomePageContainer.getWordWithHighesCount(
            plotsOfEpisodes
          );
          const episodeTitle = HomePageContainer.getEpisodeWithMostOccurencesOf(
            wordWithHighesCount,
            plotsOfEpisodes
          );

          console.log('Most used word - ', wordWithHighesCount);
          console.log(
            'Episode with most occurences of this word - ',
            episodeTitle
          );
        });
      })
      .catch(error => {
        console.log(error.response, error.request);
      });
  }

  static getWordWithHighesCount(plotsOfEpisodes) {
    const wordsByCount = HomePageContainer.getADictionaryOfWordsByCount(
      plotsOfEpisodes
    );

    let wordWithHighestCount;
    let highestCount = 0;
    Object.keys(wordsByCount).forEach(key => {
      if (wordsByCount[key] > highestCount) {
        wordWithHighestCount = key;
        highestCount = wordsByCount[key];
      }
    });
    return wordWithHighestCount;
  }

  static getADictionaryOfWordsByCount([...plotsOfEpisodes]) {
    return plotsOfEpisodes.reduce(
      (acc, episode) =>
        episode.plot
          .toLowerCase()
          .trim()
          .split(' ')
          .reduce((wordsByFrequency, word) => {
            const wordCount = wordsByFrequency[word]
              ? wordsByFrequency[word] + 1
              : 1;
            const updatedWordsByFrequency = {
              ...wordsByFrequency,
              [word]: wordCount
            };
            return updatedWordsByFrequency;
          }, acc),
      {}
    );
  }

  static getEpisodeWithMostOccurencesOf(word, [...plotsOfEpisodes]) {
    let episodeTitle = '';
    let maxCount = 0;
    plotsOfEpisodes.forEach(episode => {
      const plot = episode.plot.toLowerCase();
      const count = plot.split(` ${word} `).length - 1;
      if (count >= maxCount) {
        maxCount = count;
        episodeTitle = episode.title;
      }
    });
    return episodeTitle;
  }

  render() {
    return <div>Invictus!</div>;
  }
}

export default HomePageContainer;
