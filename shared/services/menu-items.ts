import axios from 'axios';

const BASE_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

export const fetchMenuItems = async () => {
  const configurationObject = {
    method: 'get',
    url: `${BASE_URL}`,
  };
  const {data} = await axios(configurationObject);
  return data.menu;
};
