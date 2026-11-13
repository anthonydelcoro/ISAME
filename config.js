/* Firebase project settings for the ISAME chart.

   Safe to commit. This identifies the project, it does not grant access.
   Access is controlled entirely by the database rules, which restrict reads
   and writes to verified Google accounts on the domain below. */

export const firebaseConfig = {
  apiKey: "AIzaSyDltTZ14QlVclhWydP8wSXN96ZfrvDzCUU",
  authDomain: "isame-d24ed.firebaseapp.com",
  databaseURL: "https://isame-d24ed-default-rtdb.firebaseio.com",
  projectId: "isame-d24ed",
  storageBucket: "isame-d24ed.firebasestorage.app",
  messagingSenderId: "290468484581",
  appId: "1:290468484581:web:35277251d881e12f47cb0c"
};

/* Only accounts on this domain can sign in. The database rules enforce the
   same thing on the server, this just gives a clearer message in the browser. */
export const ALLOWED_DOMAIN = "vt.edu";

/* Name given to the chart the first time it is created. After that the name
   lives in the database and is edited in the header, so changing this later
   has no effect on an existing chart. */
export const PROJECT_NAME = "ISAME";

/* Where the schedule lives in the database. Change this if you ever want a
   second, separate chart in the same Firebase project. */
export const SCHEDULE_PATH = "schedule";
