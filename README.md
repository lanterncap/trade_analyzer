# Trade Analyser

FIFO-based trade analysis dashboard for CommSec trade confirmations.

## Features
- **FIFO P&L engine** — matches sells to buy lots chronologically, handles positions carrying across months
- **Overview** — realized P&L, win rate, expectancy, brokerage drag, monthly chart
- **Open positions** — current holdings with FIFO cost basis
- **Closed P&L** — every closed lot with return %, holding period, net P&L
- **Analytics** — holding period vs return scatter, position size analysis, ticker performance
- **Activity** — monthly trade volume and cash flow summary

## Usage

### Option 1: Paste from Google Sheet
1. Open your Trades sheet in Google Sheets
2. Select all data (Ctrl+A) → Copy (Ctrl+C)
3. Open the dashboard → "Paste from Sheet" → Paste → "Parse & Load"

### Option 2: Live API via Apps Script
1. Add the `doGet()` function to your Apps Script (see `doGet.js`)
2. Deploy → New Deployment → Web App (Execute as: Me, Access: Anyone)
3. Copy the URL into the dashboard's "Web App URL" field

## Data format
Expects columns: `Settlement Date, Direction, Ticker, Company Name, Units, Price/Unit, Gross Amount, Total Settlement, Brokerage, Account`

Auto-detects tab-delimited (Google Sheets copy) and comma-delimited (CSV export).
