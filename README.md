# Job Finder App  

A cross-platform mobile application built with React Native and Expo to help users browse, bookmark, and manage job listings seamlessly.  

---

## Features  

- Bottom Navigation UI:  
  - Two main sections: **Jobs** and **Bookmarks**.  
- **Job Listings**:  
  - Fetches job data from an API with infinite scrolling.  
  - Displays job details like title, location, salary, and phone number.  
- **Job Details Screen**:  
  - View detailed information about a selected job.  
- **Bookmark Functionality**:  
  - Save jobs for future reference.  
  - Bookmarked jobs are stored locally for offline access.  
- **State Management**:  
  - Handles loading, errors, and empty states to ensure a smooth user experience.  

---

## **Technologies Used**  

- **React Native**  
- **Expo**  
- **Axios** (or Fetch API for data fetching)  
- **SQLite** (for offline storage)  

---

## **How to Run the Project**  

1. Clone the repository:  
   ```bash
   git clone  https://github.com/Aksingh45/LokalApp_Project.git
   cd job-finder-app
   ```  

2. Install dependencies:  
   ```bash
   npm install
   ```  

3. Start the app using Expo:  
   ```bash
   npx expo start
   ```
   
## **API Details**  

- **Endpoint**:  
  `https://testapi.getlokalapp.com/common/jobs?page=1`  
- Used for fetching job data dynamically.  

 ## Reference Video
 https://www.loom.com/share/da53eeff16d9491487ab06d458844ae0?sid=cb7d9c61-8e3e-450f-ae7e-431ba5aa7ad0
