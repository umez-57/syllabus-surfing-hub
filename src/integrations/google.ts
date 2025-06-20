// src/integrations/google.ts

import axios from "axios";

// Google API credentials
const GOOGLE_CLIENT_ID = "958919298508-rseom4shgrq90sr3kh2qhtnjkgvg9560.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const REFRESH_TOKEN = "1//04tyZbWM7hhFXCgYIARAAGAQSNwF-L9IrVLkzsC4tsWbzoP1HnNLMFks6jX4xlut0d-0sUNKp8cfeMNG6fgORByLPpVztPDMuNaQ";

// Cached token
let accessToken: string | null = null;

/**
 * 1) Get or refresh the access token
 */
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
  } catch (error: any) {
    console.error("Error fetching access token:", error.response?.data || error.message);
    throw new Error("Failed to fetch access token");
  }
};

/**
 * 2) Function for NOTES (unchanged)
 *    Looks for {courseCode} folder -> file named {notesBy}.zip
 */
export const fetchFileFromDrive = async (courseCode: string, notesBy: string): Promise<string> => {
  try {
    // Root folder ID for NOTES
    const hardcodedRootFolderId = "1t6HfubzJ3pomW7l6ulHe39AwSC8PtOhF";
    if (!courseCode || !notesBy) throw new Error("Course code or notesBy is missing.");

    const token = await getAccessToken();
    console.log("[fetchFileFromDrive] Access Token:", token);

    // 2a) Find folder named {courseCode} under root
    const folderQuery = `'${hardcodedRootFolderId}' in parents and name = '${courseCode}' and mimeType = 'application/vnd.google-apps.folder'`;
    const folderResponse = await axios.get(
      `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(folderQuery)}&fields=files(id,name)`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!folderResponse.data.files || folderResponse.data.files.length === 0) {
      throw new Error(`Folder for course code '${courseCode}' not found (NOTES).`);
    }
    const courseFolderId = folderResponse.data.files[0].id;

    // 2b) Look for a file named "{notesBy}.zip"
    const fileQuery = `'${courseFolderId}' in parents and name = '${notesBy}.zip'`;
    const fileResponse = await axios.get(
      `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(fileQuery)}&fields=files(id,name,webViewLink)`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!fileResponse.data.files || fileResponse.data.files.length === 0) {
      throw new Error(`File '${notesBy}.zip' not found in folder '${courseCode}'.`);
    }
    return fileResponse.data.files[0].webViewLink;
  } catch (error: any) {
    console.error("Error fetching file from Google Drive (NOTES):", error.response?.data || error.message);
    throw new Error("Failed to fetch file. Please verify permissions and configurations for NOTES.");
  }
};

/**
 * 3) Function for PYQs
 *    Looks for {courseCode} folder -> file named "pyq.zip"
 *    If found, returns its webViewLink
 */
export const fetchFileFromDrivePyq = async (courseCode: string): Promise<string> => {
  try {
    // If you want a separate root folder for PYQ, you can change this ID
    const hardcodedRootFolderId = "1t6HfubzJ3pomW7l6ulHe39AwSC8PtOhF";

    if (!courseCode) throw new Error("Course code is missing for PYQ search.");

    const token = await getAccessToken();
    console.log("[fetchFileFromDrivePyq] Access Token:", token);

    // 3a) Find folder for this course
    const folderQuery = `'${hardcodedRootFolderId}' in parents and name = '${courseCode}' and mimeType = 'application/vnd.google-apps.folder'`;
    const folderRes = await axios.get(
      `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(folderQuery)}&fields=files(id,name)`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!folderRes.data.files || folderRes.data.files.length === 0) {
      throw new Error(`Course folder '${courseCode}' not found in root for PYQ.`);
    }
    const courseFolderId = folderRes.data.files[0].id;

    // 3b) Look for "pyq.zip" inside that folder
    const fileQuery = `'${courseFolderId}' in parents and name = 'pyq.zip'`;
    const fileRes = await axios.get(
      `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(fileQuery)}&fields=files(id,name,webViewLink)`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!fileRes.data.files || fileRes.data.files.length === 0) {
      throw new Error(`File 'pyq.zip' not found in folder '${courseCode}'.`);
    }

    const pyqFile = fileRes.data.files[0];
    if (!pyqFile.webViewLink) {
      // If no webViewLink, build a direct link:
      return `https://drive.google.com/file/d/${pyqFile.id}/view`;
    }
    return pyqFile.webViewLink;
  } catch (error: any) {
    console.error("Error fetching folder from Google Drive (PYQ):", error.response?.data || error.message);
    throw new Error("Failed to fetch PYQ file. Please verify permissions and configurations.");
  }
};
