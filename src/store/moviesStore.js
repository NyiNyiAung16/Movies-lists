import { defineStore } from "pinia";

export const useMoviesStore = defineStore('movies',{
    state:() => {
        return {
            movies:[],
            movie:null,
            originData:[],
            similarMovies:[],
            genres:[],
            error:null,
            searchData:'',
            options:{
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2QxYjZkZTA5YTU2OTgzNDRjOGQ4YWNlMjBhMzdlNyIsInN1YiI6IjY0YWZjZGZlOGEwZTliMDBhZGFjZTFkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.klo3n6spFXI2akKWV3Cm0WLZ3IeOvuBl5WOikXhEE2c'
                }
            }
        }
    },
    getters:{
        filteredData:function(){
            const reg = new RegExp(this.searchData,'gi');
            this.movies = this.originData.filter((data)=>{
                return data.title.match(reg) || data.release_date.match(reg);
            })
        }
    },
    actions:{
        async fetchMovies(){
            try{
                const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', this.options)
                const data = await res.json();
                this.movies = data.results.map(item => ({
                    id:item.id,
                    title:item.title,
                    poster_path:item.poster_path,
                    release_date:item.release_date,
                    genres:item.genre_ids.map(genreId => {
                        const genre = this.genres.find(g => g.id === genreId);
                        return genre ?? null;
                    }),
                    rating:item.vote_average
                }));
                this.originData = this.movies;
                if(!res){
                    throw new Error("Your internet connection is not stable")
                }
            }catch(err){
                this.error = err.message;
            }
        },

        async fetchSimilarMovies(id){
            try{
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`, this.options)
                const data = await res.json();
                this.similarMovies = data.results;
                if(!res){
                    throw new Error("Your internet connection is not stable")
                }
            }catch(err){
                this.error = err.message;
                console.log(err.message)
            }
        },

        async fetchGenre(){
            try{
                const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', this.options)
                const data = await res.json();
                this.genres = data.genres;
                if(!res){
                    throw new Error("Your internet connection is not stable")
                }
            }catch(err){
                this.error = err.message;
            }
        },

        async fetchDetails(id){
            try{
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, this.options)
                const data = await res.json();
                this.movie = data;
                if(!res){
                    throw new Error("Your internet connection is not stable")
                }
            }catch(err){
                this.error = err.message;
            }
        },

        filteredGenre(genre){
            this.movies = this.originData.filter((data)=>{
                return data.genres.includes(genre)
            })
        },

        sorting(sortName){
            function compareByName(a, b) {
                if(sortName === 'title'){
                    return a.title.localeCompare(b.title);
                }else if(sortName === 'release_date'){
                    return a.release_date.localeCompare(b.release_date);
                }else if(sortName === 'rating'){
                    return a.rating - b.rating;
                }
            }
           this.movies.sort(compareByName);
        }
    }
})