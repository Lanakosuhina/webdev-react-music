import { DataTrack } from "@/app/api/trackAPI";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TrackListType = {
  tracks: DataTrack[],
  isShuffled: boolean,
  shuffledTracks: DataTrack[],
  currentTrack: null | DataTrack,
  isPlaying: boolean,
  filterOptions: {
    authors: string[];
    years: string[];
    genres: string[];
    searchValue: string;
  }; filteredTracks: [] | DataTrack[];
}

type SetCurrentTrack = {
  currentTrack: DataTrack;
  tracks: DataTrack[],
}

const initialState: TrackListType = {
  tracks: [],
  isShuffled: false,
  shuffledTracks: [],
  currentTrack: null,
  isPlaying: true,
  filterOptions: {
    authors: [],
    years: [],
    genres: [],
    searchValue: "",
  },
  filteredTracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setTracks: (state, action: PayloadAction<DataTrack[]>) => {
      state.tracks = action.payload; // полезная нагрузка
    },
    toggleShuffled: (state) => {
      state.isShuffled = !state.isShuffled;
    },
    setCurrentTrack: (state, action: PayloadAction<SetCurrentTrack>) => {
      state.currentTrack = action.payload.currentTrack;
      state.tracks = action.payload.tracks;
      state.shuffledTracks = [...action.payload.tracks].sort(
        () => 0.5 - Math.random(),
      )
    },
    nextTrack: changeTrack(1),
    prevTrack: changeTrack(-1),
    toggleIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setFilteredTracks: (
      state,
      action: PayloadAction<{
        authors?: string[];
        years?: string[];
        genre?: string[];
        searchValue?: string;
      }>
    ) => {
      state.filterOptions = {
        authors: action.payload.authors || state.filterOptions.authors,
        years: action.payload.years || state.filterOptions.years,
        genres: action.payload.genre || state.filterOptions.genres,
        searchValue: action.payload.searchValue || state.filterOptions.searchValue,
      };
      state.filteredTracks = state.tracks.filter((track) => {
        const hasAuthor = state.filterOptions.authors.length !== 0;
        const hasYear = state.filterOptions.years.length !== 0;
        const hasGenre = state.filterOptions.genres.length !== 0;
        const hasSearchValue = state.filterOptions.searchValue !== "";
        const isSearchValueIncluded =
          track.name
            .toLowerCase()
            .includes(state.filterOptions.searchValue.toLowerCase());

        if (hasAuthor && hasYear && hasGenre && hasSearchValue) {
          return (
            state.filterOptions.authors.includes(track.author) &&
            state.filterOptions.years.includes(track.release_date) &&
            state.filterOptions.genres.includes(track.genre) &&
            isSearchValueIncluded
          );
        }

        if (hasAuthor && hasYear && hasGenre) {
          return (
            state.filterOptions.authors.includes(track.author) &&
            state.filterOptions.years.includes(track.release_date) &&
            state.filterOptions.genres.includes(track.genre)
          );
        }

        if (hasAuthor && hasYear && hasSearchValue) {
          return (
            state.filterOptions.authors.includes(track.author) &&
            state.filterOptions.years.includes(track.release_date) &&
            isSearchValueIncluded
          );
        }

        if (hasAuthor && hasGenre && hasSearchValue) {
          return (
            state.filterOptions.authors.includes(track.author) &&
            state.filterOptions.genres.includes(track.genre) &&
            isSearchValueIncluded
          );
        }

        if (hasYear && hasGenre && hasSearchValue) {
          return (
            state.filterOptions.years.includes(track.release_date) &&
            state.filterOptions.genres.includes(track.genre) &&
            isSearchValueIncluded
          );
        }

        if (hasAuthor && hasYear) {
          return (
            state.filterOptions.authors.includes(track.author) &&
            state.filterOptions.years.includes(track.release_date)
          );
        }

        if (hasAuthor && hasGenre) {
          return (
            state.filterOptions.authors.includes(track.author) &&
            state.filterOptions.genres.includes(track.genre)
          );
        }

        if (hasYear && hasGenre) {
          return (
            state.filterOptions.years.includes(track.release_date) &&
            state.filterOptions.genres.includes(track.genre)
          );
        }

        if (hasAuthor) {
          return state.filterOptions.authors.includes(track.author);
        }

        if (hasYear) {
          return state.filterOptions.years.includes(track.release_date);
        }

        if (hasGenre) {
          return state.filterOptions.genres.includes(track.genre);
        }

        if (hasSearchValue) {
          return isSearchValueIncluded
        }

        return true;
      });
    },
  },
});

function changeTrack(direction: number) {
  return (state: TrackListType) => {
    const currentTracks = state.isShuffled ? state.shuffledTracks : state.tracks;
    let newIndex = currentTracks.findIndex(item => item.id === state.currentTrack?.id) + direction;

    // Циклическое переключение. Ищет остаток от деления. Если достигаем конца - идем в начало списка
    newIndex = (newIndex + currentTracks.length) % currentTracks.length;

    state.currentTrack = currentTracks[newIndex];
    state.isPlaying = true;
  };
}

export const {
  setTracks,
  toggleShuffled,
  setCurrentTrack,
  nextTrack,
  toggleIsPlaying,
  prevTrack,
  setFilteredTracks
} = playlistSlice.actions;
export const PlaylistReducer = playlistSlice.reducer;