import Pelicula from '../models/Peliculas.js';
import Reservacion from '../models/Reservacion.js';


const moviesUserModeling = async usuario => {
    userPreference = {
      genero: {},
      director: {},
    };
  
    const userReservacions = JSON.parse(
      JSON.stringify(await Reservacion.find({ usuario: usuario }))
    );
    const Allmovies = JSON.parse(JSON.stringify(await Pelicula.find({})));
  
    const moviesWatched = userReservacions.map(reservacion => {
      for (let movie of Allmovies) {
        if (movie.id == reservacion.peliculaid) {
          return movie;
        }
      }
    });

    moviesWatched.map(movie => {
        let genres = movie.genero.replace(/\s*,\s*/g, ',').split(',');
        let directors = movie.director.replace(/\s*,\s*/g, ',').split(',');
        for (let genre of genres) {
          userPreference.genre[genre]
            ? ++userPreference.genre[genre]
            : (userPreference.genre[genre] = 1);
        }
        for (let director of directors) {
          userPreference.director[director]
            ? ++userPreference.director[director]
            : (userPreference.director[director] = 1);
        }
    });

      //find movies that are available for booking
  const availableMovies = availableMoviesFilter(Allmovies);
  //console.log(availableMovies)
  const moviesNotWatched = moviesNotWatchedFilter(availableMovies, userReservations);
  //console.log(moviesNotWatched)

  const moviesRated = findRates(moviesNotWatched, userPreference);

  moviesRated.sort((a, b) => {
    return b[1] - a[1];
  });
  // console.log(moviesRated)

  const moviesToObject = moviesRated.map(array => {
    return array[0];
  });
  return moviesToObject;
};

const findRates = (moviesNotWatched, userPreference) => {
    const result = [];
    let rate;
    for (let movie of moviesNotWatched) {
      rate = 0;
      for (let pref in userPreference) {
        rate += getRateOfProperty(pref, userPreference, movie);
        //TODO we can use weights here
        console.log(rate, pref);
      }
      if (rate !== 0) result.push([movie, rate]);
    }
    console.log(result);
    return result;
  };

  const getRateOfProperty = (pref, userPreference, movie) => {
    let rate = 0;
    const values = Object.keys(userPreference[pref]).map(key => {
      return [key, userPreference[pref][key]];
    });
    let movieValues = movie[pref].replace(/\s*,\s*/g, ',').split(',');
    for (value of values) {
      if (movieValues.length) {
        for (movieValue of movieValues) {
          if (movieValue == value[0]) {
            rate += value[1];
          }
        }
      }
    }
  
    return rate;
  };

  const availableMoviesFilter = Allmovies => {
    const today = new Date();
    const returnMovies = [];
    Allmovies.map(movie => {
      let releaseDate = new Date(movie.releaseDate);
      let endDate = new Date(movie.endDate);
      if (today >= releaseDate && today <= endDate) {
        returnMovies.push(movie);
      }
    });
    return returnMovies;
  };

  const reservationSeatsUserModeling = async (usuario, newSeats) => {
    let numberOfTicketsArray = [];
    let numberOfTickets = 1;
    const positions = {
      front: 0,
      center: 0,
      back: 0,
    };


    userReservations.map(reservation => {
        for (let cinema of cinemas) {
          if (cinema._id == reservation.cinemaId) {
            //find how many rows the cinema has
            const position = getPosition(cinema.seats.length, reservation.seats);
            ++positions[position];
            numberOfTicketsArray.push(reservation.seats.length);
          }
        }
      });
      numberOfTickets = Math.round(
        numberOfTicketsArray.reduce((a, b) => a + b, 0) / numberOfTicketsArray.length
      );
    
      return {
        numberOfTickets,
        positions,
      };
    };