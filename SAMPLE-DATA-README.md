# Sample Data Files for Testing

## Quick Start

1. **Open the CSV files in Excel:**
   - `sample-data-roles.csv`
   - `sample-data-candidates.csv`

2. **Create an Excel workbook:**
   - Open Excel
   - Create a new workbook
   - Import or copy the data from each CSV

3. **Set up the sheets:**
   - Rename Sheet1 to "Roles"
   - Paste the roles data (from sample-data-roles.csv)
   - Create Sheet2 and name it "Candidates"
   - Paste the candidates data (from sample-data-candidates.csv)

4. **Save as Excel:**
   - File → Save As
   - Choose "Excel Workbook (.xlsx)"
   - Name it: `succession-planning-sample.xlsx`

5. **Upload to dashboard:**
   - Open `demo/index.html`
   - Click "Upload Your Data"
   - Select your Excel file
   - Dashboard will load with your data!

## What's Included

### Roles Sheet (20 roles)
- **VP and Director level positions** across:
  - Technology (10 roles)
  - Finance (3 roles)
  - Sales (3 roles)
  - Consulting (2 roles)
  - HR (1 role)
  - Operations (1 role)

- **Key fields:**
  - Role ID, Title, Band (9-10)
  - Business Group, Practice, Specialty
  - Location, Critical status
  - Incumbent name, tenure
  - Retirement dates (some roles)

### Candidates Sheet (43 candidates)
- **Succession candidates** for various roles
- **Readiness levels:**
  - Ready Now: 15 candidates
  - 1-2 Years: 18 candidates
  - 3+ Years: 10 candidates

- **High Flyers** (identified for multiple roles):
  - Sarah Jones: 5 roles
  - Mike Chen: 4 roles
  - Lisa Park: 4 roles
  - David Kim: 3 roles
  - Tom Wilson: 3 roles

- **Key fields:**
  - Candidate ID, Name
  - Target Role ID (links to Roles sheet)
  - Current Role, Band
  - Readiness Timeline, Score (3.4-4.5)
  - Nomination Date, Business Group

## Data Highlights

### Coverage Examples
- **Good Coverage:** R0002 (Director Cloud Architecture) - 9 candidates
- **Inverted Funnel:** R0003 (CFO Americas) - 3 ready now, 2 in 1-2yr, 1 in 3+yr
- **No Coverage:** R0007 (Chief Security Officer) - 0 candidates (critical gap!)

### Retirement Risks
- James Taylor (Chief Security Officer) - Retiring 2026-11-30
- Robert Williams (CFO Americas) - Retiring 2027-12-31
- Brian Lewis (VP Operations) - Retiring 2027-03-10

### High Flyers to Watch
- **Sarah Jones** - Ready for 5 different VP/Director roles
- **Mike Chen** - Ready for 4 roles across Technology
- **Lisa Park** - Identified for 4 roles, mostly 1-2 years out

## Customization

Want to modify the data? Easy!

### Add More Roles
1. Open `sample-data-roles.csv`
2. Add rows with format:
   ```
   R0021,Your Role Title,9,Technology,Practice,Specialty,Location,Yes,Incumbent Name,3.5,
   ```

### Add More Candidates
1. Open `sample-data-candidates.csv`
2. Add rows with format:
   ```
   E00164,Candidate Name,R0001,Current Role,8,Ready Now,4.2,2025-01-15,Technology
   ```

### Change Names
- Use Find & Replace in Excel
- Keep the same format (First Last)
- Maintain diversity in names

## Tips for Excel

### Method 1: Import CSV
1. Excel → Data → From Text/CSV
2. Select the CSV file
3. Click "Load"
4. Repeat for second sheet

### Method 2: Copy/Paste
1. Open CSV in text editor or Excel
2. Select all (Ctrl+A / Cmd+A)
3. Copy (Ctrl+C / Cmd+C)
4. Paste into Excel sheet
5. Repeat for second sheet

### Method 3: Open Directly
1. Right-click CSV file
2. Open With → Excel
3. Copy data to new workbook
4. Repeat for second CSV
5. Save as .xlsx

## Troubleshooting

### "File format not supported"
- Make sure you saved as .xlsx (not .csv)
- Check that you have two sheets: "Roles" and "Candidates"

### "Missing required columns"
- Verify column headers match exactly (case-sensitive)
- Check for typos in column names

### "Invalid readiness timeline"
- Use only: "Ready Now", "1-2 Years", or "3+ Years"
- Check for extra spaces

### "Duplicate IDs"
- Ensure all role_id values are unique (R0001, R0002, etc.)
- Ensure all candidate_id values are unique (E00123, E00124, etc.)

## Data Statistics

- **Total Roles:** 20
- **Total Candidates:** 43
- **Average Candidates per Role:** 2.15
- **Roles with Coverage:** 10 (50%)
- **Roles without Coverage:** 10 (50%)
- **Critical Roles:** 20 (100%)
- **Retirement Risk (next 2 years):** 3 roles

## Next Steps

1. ✅ Create Excel file from CSVs
2. ✅ Upload to dashboard
3. ✅ Explore the visualizations
4. ✅ Test the chatbot with questions
5. ✅ Export reports
6. ✅ Share feedback!

---

**Need help?** See `DATA-UPLOAD-GUIDE.md` for detailed format specifications.