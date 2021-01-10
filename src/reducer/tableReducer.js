import { tableData } from "../constant";
const intialState = {
  tableDataDetail: [],
  tablePaginateData: [],
  userData: {},
};

export const tableDataReducer = (state = intialState, action) => {
  switch (action.type) {
    case tableData.FETCH_ALL_DATA:
      return {
        ...state,
        tableDataDetail: action.res,
      };
    case tableData.USER_DATA:
      return {
        ...state,
        userData: action.res,
      };

    default:
      return state;
  }
};
