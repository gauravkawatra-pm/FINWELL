Finwell MVP

A free, no-backend prototype for testing one idea with 5-10 people: do employees set a financial goal, come back, and make progress on it?

Testers use a simple web app. Every entry lands in a Google Sheet in real time, so you can watch activity and aggregate results as they come in.

How it works
Tester's browser (index.html)  --->  Google Apps Script  --->  Google Sheet
   hosted free on GitHub Pages        checks tester code         "Entries" tab
App: a single static page (index.html) with onboarding, goal selection, a rule-based three-action plan, a weekly check-in, and a progress bar.
Backend: a Google Apps Script web app that validates each entry and appends it to the Sheet.
Storage: each tester's own progress is kept in their browser (localStorage). The Sheet holds the shared record.
Files
File	Purpose
index.html	The app. Set ENDPOINT near the top of the script to your Apps Script URL.
finwell-apps-script.js	Code to paste into Apps Script. Rejects entries from unknown tester codes.
README.md	This guide.
Setup (about 20 minutes, no coding)
1. Create the Google Sheet
Go to sheets.new and name it "Finwell Entries".
Add a tab named Testers. Put tester_code in cell A1, then one code per row from A2 down (for example T01 to T10).
2. Add the script
In the Sheet, open Extensions > Apps Script.
Delete the placeholder code and paste in the contents of finwell-apps-script.js. Save.
Click Deploy > New deployment, choose type Web app.
Set Execute as to Me and Who has access to Anyone. Deploy and approve the permissions.
Copy the Web app URL.
3. Connect the app

Open index.html in a text editor and replace PASTE_APPS_SCRIPT_URL_HERE with the URL you copied. Save.

4. Host it on GitHub Pages
Create a free account at github.com.
Click New repository, name it finwell, and set it to Public.
Click Add file > Upload files, upload index.html, and commit.
Go to Settings > Pages, choose Deploy from a branch, select main and / (root), then Save.
After a minute or two, your link appears as https://<your-username>.github.io/finwell.
5. Test before inviting anyone
Open the link and complete the form with a valid tester code.
Save a check-in.
Confirm new rows appear in the Entries tab within a few seconds.
Try an invalid code and confirm no row is added.
Data collected

Each row in Entries is one event.

Column	Meaning
timestamp	Added by the script when the entry arrives
tester_code	Anonymous code you assigned (no names or contact details)
event	plan_created or checkin
age_band, income_band	Self-reported ranges
goal	The goal the tester chose
savings_band, emi_band, insurance	Self-reported ranges and status
actions_done	Number of the three actions completed (0-3)
progress_pct	Share of the plan completed
week	Weeks since the tester started
confidence	Tester's own 1-5 confidence score (check-ins only)
note	Free-text feedback (check-ins only)
Aggregating results

Create a second tab and use formulas such as:

Testers who started: =COUNTIF(Entries!C2:C,"plan_created")
Check-ins logged: =COUNTIF(Entries!C2:C,"checkin")
Average progress by goal: a pivot table with goal as rows and the average of progress_pct, filtered to checkin
Return rate: testers with two or more check-ins divided by testers who started
Success signals to watch
Signal	Early target
Completed onboarding	80%+ of invitees
Returned for a second check-in	50%+
Completed at least one action	50%+
Confidence scores trending up	Week over week

Follow up with a 20-minute call per tester. Ask what they did after seeing the plan and what made them return or stop.

Privacy and security
No names, PAN, or account numbers are collected. Everything is banded or approximate.
A consent notice is shown before the plan is created, and testers can ask you to delete their rows.
The page source is public. This is unavoidable for any browser app. Nobody can change your hosted page, and nobody can read your Sheet through the app.
Junk-entry protection: the script accepts only entries with a code listed in the Testers tab, only the two known event types, and truncates long text. Remove a code from the tab to block it.
Guidance, not advice: the plans are general rule-based suggestions, not regulated financial advice.
Maintenance
Update the app: upload the changed index.html to the repository and commit.
Update the script: after editing, use Deploy > Manage deployments > Edit > New version > Deploy. Otherwise the old code keeps running.
Add or remove testers: edit the Testers tab. Changes apply immediately.
Known limitations
A tester's progress lives in their browser, so they should use the same device and browser each week.
If the Apps Script URL is wrong, the app cannot show an error to testers. Always run a test entry first.
There is no live dashboard inside the app. Use the Sheet for aggregation.
This is built for 5-10 trusted testers, not a public launch.
Next steps after the feedback round
Decide whether testers and HR contacts need a shared dashboard.
If yes, move to real accounts with a proper database and tighten security and DPDP compliance before collecting anything beyond banded, self-reported data.
