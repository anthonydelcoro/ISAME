/* Copy this file over config.js and fill in your own values.
   See SETUP.md for where each of these comes from.

   This file is safe to commit once filled in. The API key identifies your
   Firebase project, it does not grant access to anything. Access is decided
   entirely by the database rules in SETUP.md step 6. */

/* Firebase console, gear icon next to Project Overview, Project settings,
   scroll to Your apps, click the web icon. Copy the whole block it shows. */
export const firebaseConfig = {
  apiKey: "PASTE_YOURS_HERE",
  authDomain: "PASTE_YOURS_HERE",
  databaseURL: "PASTE_YOURS_HERE",
  projectId: "PASTE_YOURS_HERE",
  storageBucket: "PASTE_YOURS_HERE",
  messagingSenderId: "PASTE_YOURS_HERE",
  appId: "PASTE_YOURS_HERE"
};

/* Only Google accounts on this domain can sign in. Use your university domain
   so the whole team is covered without maintaining a list of people. The
   database rules enforce the same thing on the server. */
export const ALLOWED_DOMAIN = "vt.edu";

/* Name given to the chart the first time it is created. After that the name
   lives in the database and is edited in the header. */
export const PROJECT_NAME = "Our Project Schedule";

/* Where the schedule lives in the database. Leave this alone unless you want
   two separate charts inside one Firebase project. */
export const SCHEDULE_PATH = "schedule";
