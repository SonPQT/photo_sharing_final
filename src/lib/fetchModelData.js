/**
 * Fetches model data from the backend API
 * @param {string} modelURL - The API endpoint URL to fetch from (e.g. "/user/list")
 * @returns {Promise} - Promise that resolves to the JSON response data
 */
async function fetchModel(modelURL) {
  try {
    // Add base API URL
    const baseURL = "https://rdtv54-8081.csb.app/api";
    const response = await fetch(`${baseURL}${modelURL}`);

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse and return JSON data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default fetchModel;
