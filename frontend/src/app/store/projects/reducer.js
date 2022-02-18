import { CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, FETCH_PROJECT, FETCH_PROJECTS } from "./types";

const initialState = {
  byId: {},
  ids: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS: {
      const data = action.payload || [];

      return {
        ...state,
        byId: data.reduce((byId, p) => ({ ...byId, [p.id]: p }), state.byId),
        ids: data.map((p) => p.id),
      };
    }
    case FETCH_PROJECT: {
      const data = action.payload;

      if (!data) return state;

      return {
        ...state,
        byId: {
          ...state.byId,
          [data.id]: data,
        },
      };
    }
    case CREATE_PROJECT: {
      const data = action.payload;

      if (!data) return state;

      return {
        ...state,
        byId: { 
          ...state.byId, 
          ...{[data.id]: data}
        },
        ids: [...state.ids, data.id],
      };
    }
    case UPDATE_PROJECT: {
      const data = action.payload;

      if (!data) return state;

      return {
        ...state,
        byId: {
          ...state.byId,
          [data.id]: data,
        },
      }

    }
    case DELETE_PROJECT: {

      const deleteById = (byId, id) => {
        let objToDelete = {}
        for (let entry in byId) {
          if(byId[entry]['id'] === id) {
            objToDelete = entry;
            break;
          }
        }

        delete byId[objToDelete]
        return byId
      }
      return {
        ...state,
        byId: deleteById(state.byId, action.id),
        ids: state.ids.filter((p) => p !== action.id),
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
