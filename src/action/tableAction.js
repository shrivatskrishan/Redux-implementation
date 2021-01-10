import { tableData } from "../constant";
import axios from "axios";
const url = "https://5ffa03cb87478d0017d9a3f2.mockapi.io/api/userdata";

const getAllTableData = () => {
  return (dispatch, getState) => {
    axios
      .get(`${url}/users`)
      .then(function (response) {
        return dispatch(success(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  function success(res) {
    return { type: tableData.FETCH_ALL_DATA, res };
  }
};
const editTable = (tableDataDetail) => {
  return (dispatch, getStateis) => {
    return dispatch(success(tableDataDetail));
  };
  function success(res) {
    return { type: tableData.USER_DATA, res };
  }
};

const deleteTableData = (id, tableDataDetail) => {
  let allData = JSON.parse(JSON.stringify(tableDataDetail));
  return (dispatch, getState) => {
    axios
      .delete(`${url}/users/${id}`)
      .then(function (response) {
        allData.splice(
          allData.findIndex((x) => x.id === id),
          1
        );
        return dispatch(success(allData));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  function success(res) {
    return { type: tableData.FETCH_ALL_DATA, res };
  }
};

const getuserData = () => {
  return (dispatch) => {
    return dispatch(sucessUser({}));
  };
  function sucessUser(res) {
    return { type: tableData.USER_DATA, res };
  }
};
const setUserData = (userData, event, name) => {
   userData[name] = event.target.value;
  return (dispatch) => {
    return dispatch(setuser(Object.assign({},userData)));
  };
  function setuser(res) {
    return { type: tableData.USER_DATA, res };
  }
};
const addUserData = (userData) => {
  return (dispatch) => {
    return axios
      .post(`${url}/users`, userData)
      .then(function (response) {
        dispatch(getAllTableData());
        return dispatch(success({}));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  function success(res) {
    return { type: tableData.USER_DATA, res };
  }
};

const updateUserData=(userData)=>{
    return (dispatch)=>{
      return axios.put(`${url}/users/${userData.id}`,userData).then((response)=>{
        dispatch(getAllTableData());
        return dispatch(success({}));
      }).catch(function(error){
        console.log(error)
      })
    }
    function success(res) {
      return { type: tableData.USER_DATA, res };
    }
}

export const tableAction = {
  getAllTableData,
  deleteTableData,
  editTable,
  getuserData,
  setUserData,
  addUserData,
  updateUserData
};
