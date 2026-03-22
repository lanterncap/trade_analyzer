// ================================================================
//  ADD THIS TO YOUR EXISTING Apps Script
//  Then: Deploy → New Deployment → Web App
//        Execute as: Me | Access: Anyone
//        Copy the URL into the React dashboard
// ================================================================

function doGet(e) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = ss.getSheetByName(CONFIG.SHEET_TRADES);
    const lastRow = sheet.getLastRow();

    if (lastRow < 2) {
      return ContentService.createTextOutput(JSON.stringify({ trades: [], count: 0 }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Grab columns A-J (exclude Email Date & Message ID — not needed for analysis)
    const data = sheet.getRange(2, 1, lastRow - 1, 10).getValues();

    const trades = data.map(row => {
      // Handle date: could be Date object or string
      let dateStr = "";
      if (row[0] instanceof Date) {
        dateStr = Utilities.formatDate(row[0], Session.getScriptTimeZone(), "yyyy-MM-dd");
      } else {
        dateStr = String(row[0]);
      }

      return {
        date: dateStr,
        direction: String(row[1]).toUpperCase(),
        ticker: String(row[2]).toUpperCase(),
        company: String(row[3]),
        units: Number(row[4]),
        price: Number(row[5]),
        gross: Number(row[6]),
        settlement: Number(row[7]) || null,
        brokerage: Number(row[8]) || 0,
        account: String(row[9]),
      };
    });

    return ContentService.createTextOutput(JSON.stringify({ trades, count: trades.length }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
