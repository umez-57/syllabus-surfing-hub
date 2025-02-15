import axios from "axios";

// Google API credentials
const GOOGLE_CLIENT_ID = "958919298508-rseom4shgrq90sr3kh2qhtnjkgvg9560.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const REFRESH_TOKEN = "1//04Sn0ksV4VAVwCgYIARAAGAQSNwF-L9IrPUHU0wN9oru1f6jpBbhHN96sTAckZ_gzdR_tAeJJUHAXoUj0rpur5Iox5kufHd5ii7k";

let accessToken: string | null = null;

// Function to get a new access token
export const getAccessToken = async (): Promise<string> => {
  if (accessToken) {
    console.log("Using cached access token.");
    return accessToken;
  }
  try {
    console.log("Requesting new access token...");
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: "refresh_token",
    });

    accessToken = response.data.access_token;
    console.log("Access Token Retrieved Successfully:", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error fetching access token:", error.response?.data || error.message);
    throw new Error("Failed to fetch access token");
  }
};

// Function to fetch files from a specific course folder
export const fetchFileFromDrive = async (courseCode: string, notesBy: string): Promise<string> => {
  try {
    const hardcodedRootFolderId = "1t6HfubzJ3pomW7l6ulHe39AwSC8PtOhF"; // Root folder ID
    if (!courseCode || !notesBy) throw new Error("Course code or notesBy is missing.");

    const token = await getAccessToken();
    console.log("Access Token for Fetching Files:", token);

    // Fetch course folder
    const folderQuery = `'${hardcodedRootFolderId}' in parents and name = '${courseCode}' and mimeType = 'application/vnd.google-apps.folder'`;
    const folderResponse = await axios.get(
      `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(folderQuery)}&fields=files(id,name)`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!folderResponse.data.files || folderResponse.data.files.length === 0) {
      throw new Error(`Folder for course code '${courseCode}' not found.`);
    }

    const courseFolderId = folderResponse.data.files[0].id;

    // Fetch file within the course folder
    const fileQuery = `'${courseFolderId}' in parents and name = '${notesBy}.zip'`;
    const fileResponse = await axios.get(
      `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(fileQuery)}&fields=files(id,name,webViewLink)`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!fileResponse.data.files || fileResponse.data.files.length === 0) {
      throw new Error(`File '${notesBy}.zip' not found in folder '${courseCode}'.`);
    }

    return fileResponse.data.files[0].webViewLink;
  } catch (error) {
    console.error("Error fetching file from Google Drive:", error.response?.data || error.message);
    throw new Error("Failed to fetch file. Please verify permissions and configurations.");
  }
};
