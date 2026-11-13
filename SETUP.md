# Setting up your own copy

This walks through standing up your own chart from scratch. It takes about
fifteen minutes and costs nothing. You need a GitHub account and a Google
account, and one person on the team to do the setup once.

When you are done you will have a Gantt chart at
`https://YOUR-USERNAME.github.io/gantt/` that your whole team signs into with
their university Google account, with everyone's edits appearing live.

Your data lives in your own Firebase project. It is not shared with anyone
else who uses this code.

---

## 1. Make your own copy of the repository

Fork this repository, or download it and push it to a new one of your own.

**Do not edit `config.js` yet.** The version in the repo points at someone
else's Firebase project. You will replace it in step 7.

## 2. Turn on GitHub Pages

In your repository: **Settings**, **Pages**, and under Build and deployment set
Source to **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.

After a minute your site is live. The URL is shown on that same page and looks
like `https://YOUR-USERNAME.github.io/gantt/`. Write it down, you need it in
step 6.

Opening it now will say the copy has not been set up yet. That is expected.

## 3. Create a Firebase project

Go to [console.firebase.google.com](https://console.firebase.google.com) and
click **Create a project**. Name it whatever you like.

Turn **off** Google Analytics when it offers. You do not need it.

This puts you on the free Spark plan, which requires no payment method. For a
schedule like this you will not come close to the limits.

## 4. Create the database

In the left sidebar under Build, click **Realtime Database**.

> This is the step people get wrong. The console pushes **Firestore** much
> harder and the two are different products. You want **Realtime Database**.

Click **Create Database**, pick the region closest to you, and choose
**Start in locked mode**. You will replace the rules in step 8.

## 5. Turn on Google sign-in

Build, **Authentication**, **Get started**. On the Sign-in method tab choose
**Google**, toggle it on, set a support email, and save.

## 6. Authorize your site

Still in Authentication, go to the **Settings** tab, then **Authorized
domains**, then **Add domain**.

Enter just the domain from step 2, with no `https://` and no path:

```
YOUR-USERNAME.github.io
```

`localhost` is already in the list, which is what lets you test locally.

> Skip this and sign-in fails with `auth/unauthorized-domain`. It is the most
> commonly missed step.

## 7. Copy your settings into `config.js`

Click the gear next to **Project Overview**, then **Project settings**. Scroll
to **Your apps** and click the web icon `</>`. Register the app with any
nickname and skip the Firebase Hosting offer, since GitHub Pages is doing the
hosting.

You will be shown a block starting with `const firebaseConfig = {`. If you see
`npm install firebase` instead, switch the toggle above the code from "Use npm"
to "Use a `<script> `tag".

> Make sure you take the **web** config. If what you are looking at mentions
> `firebase-admin` or a `serviceAccountKey.json`, that is the server-side one.
> That file is a private key with full access to your project and must never be
> committed or shared.

Now open `config.example.js` in your repository, fill in your values, and save
it over `config.js`. Set `ALLOWED_DOMAIN` to your university domain and
`PROJECT_NAME` to whatever your project is called. Commit the change.

The API key in that file is safe to commit. It identifies your project, it does
not grant access to anything. Access is decided entirely by the next step.
GitHub's secret scanner will probably email you about it anyway, because it
cannot tell a Firebase web key apart from a billed Google Cloud key. You can
close that alert as a false positive.

## 8. Set the database rules

Back in Realtime Database, **Rules** tab. Replace what is there with this,
putting your own domain in place of `vt.edu` in both lines:

```json
{
  "rules": {
    "schedule": {
      ".read": "auth != null && auth.token.email_verified == true && auth.token.email.matches(/.*@vt[.]edu$/)",
      ".write": "auth != null && auth.token.email_verified == true && auth.token.email.matches(/.*@vt[.]edu$/)"
    }
  }
}
```

Click **Publish**.

> The `== true` is load-bearing. The rules parser will not accept a bare
> boolean on the left of `&&` and gives you
> `Left operand of && must be boolean` if you drop it.
>
> `[.]` matches a literal dot. A plain `.` in a regular expression matches any
> character, which would also let through `@vtXedu`.

Use the **Rules Playground** button on that page to check it. Set the location
to `/schedule`, turn on Authenticated, put an address on your domain in the
email field, and confirm it comes back allowed.

## 9. Open it

Go to your GitHub Pages URL and sign in. The first person to sign in creates a
starter schedule with a few example phases so you can see how dependencies and
milestones behave. Rename or delete all of it and build your own plan.

Everyone else on the team just opens the same link and signs in. There is
nothing for them to install and no token to paste or renew.

---

## Mixed email domains

If your team is not all on one domain, use an allow list instead of step 8:

```json
{
  "rules": {
    "schedule": {
      ".read": "auth != null && auth.token.email_verified == true && root.child('members').child(auth.token.email.replace('.', ',')).exists()",
      ".write": "auth != null && auth.token.email_verified == true && root.child('members').child(auth.token.email.replace('.', ',')).exists()"
    },
    "members": { ".read": "auth != null", ".write": false }
  }
}
```

Then in the Data tab add a `members` node with one key per person, set to
`true`. Dots become commas, because Firebase keys cannot contain a dot:

```
members
  jsmith@vt,edu: true
  alopez@gmail,com: true
```

Also set `ALLOWED_DOMAIN` in `config.js` to `""` so the browser stops
pre-filtering by domain.

## Running it on your own machine

Do not open `index.html` by double-clicking it. Browsers block module loading
and sign-in popups from `file://`, so you will get a blank page.

Run a server in the folder instead:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

---

## When something does not work

| What you see | What it is |
| --- | --- |
| "This copy has not been set up yet" | `config.js` still has the placeholder values from step 7 |
| Sign-in popup opens then closes with `auth/unauthorized-domain` | Step 6. Your Pages domain is not in the authorized list |
| `Left operand of && must be boolean` when publishing rules | Step 8. You need `== true` after `email_verified` |
| Signs in, then the chart is empty and edits do not stick | The rules do not match your account. Check the domain in step 8 matches your email, and that you signed in with that account rather than a personal one |
| Blank page, console mentions modules or CORS | You opened the file directly instead of through a server. See above |
| Changes you pushed are not showing up | The browser cached the old `app.js`. Reload with Ctrl+Shift+R, or Cmd+Shift+R on a Mac. The Account menu shows a build stamp so you can tell which version you are on |
| Firestore does not have a Realtime Database option | You created a Firestore database in step 4. Go back and create a **Realtime Database** instead, they are separate products |

If you are stuck on something not in that table, open an issue on the
repository with what you did and what you saw.
