// Paste this into Extensions > Apps Script inside your Google Sheet.
const HEADERS = ['timestamp','tester_code','event','age_band','income_band','goal',
  'savings_band','emi_band','insurance','actions_done','progress_pct','week','confidence','note'];

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName('Entries') || ss.insertSheet('Entries');
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  const d = JSON.parse(e.postData.contents);
  sh.appendRow(HEADERS.map(h => h === 'timestamp' ? new Date() : (d[h] === undefined ? '' : d[h])));
  return ContentService.createTextOutput('ok');
}
