import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/items`;

// Create New item
const createItem = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all items
const getItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const itemService = {
  createItem,
  getItems,
};

export default itemService;