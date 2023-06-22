import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://localhost:8000/`,timeout: 5000,
  headers: {
		Authorization: localStorage.getItem('ACCESS_TOKEN')
			? 'Token ' + localStorage.getItem('ACCESS_TOKEN')
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
})





export default axiosClient