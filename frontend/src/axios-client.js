import axios from "axios";

const axiosClient = axios.create({
  baseURL: `https://aplicatie-adeverinte-backend.azurewebsites.net/`,timeout: 5000,
  headers: {
		Authorization: localStorage.getItem('ACCESS_TOKEN')
			? 'Token ' + localStorage.getItem('ACCESS_TOKEN')
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
})





export default axiosClient