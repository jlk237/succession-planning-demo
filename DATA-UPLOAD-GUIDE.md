# Excel Data Upload Guide

## For Aneisa's Team (Tuca & vcassey)

This guide explains how to prepare your succession planning data for upload to the dashboard.

---

## Quick Start

1. **Export your data from SuccessFactors** (as you normally do)
2. **Create fake names** using the template below
3. **Upload the Excel file** to the dashboard by dragging and dropping it onto the upload area

---

## Required Excel Format

### Sheet 1: Roles

Your Excel file should have a sheet named "Roles" with these columns:

| Column Name | Description | Example |
|------------|-------------|---------|
| role_id | Unique identifier | R0001 |
| role_title | Job title | Director of Cloud Architecture |
| band | Job level | 9 |
| business_group | Business unit | Technology |
| practice | Practice area | Cloud |
| specialty | Specialty (optional) | Architecture |
| location | Primary location | New York |
| is_critical | Critical role? (Yes/No) | Yes |
| incumbent_name | Current person in role | John Smith |
| incumbent_tenure | Years in role | 3.5 |
| retirement_date | Expected retirement (optional) | 2028-06-30 |

### Sheet 2: Succession Candidates

A sheet named "Candidates" with these columns:

| Column Name | Description | Example |
|------------|-------------|---------|
| candidate_id | Unique identifier | E00123 |
| candidate_name | Employee name | Sarah Jones |
| target_role_id | Role they could fill | R0001 |
| current_role | Their current position | Director Cloud Ops |
| current_band | Their current level | 8 |
| readiness_timeline | When ready | Ready Now |
| readiness_score | Score 1-5 | 4.5 |
| nomination_date | When nominated | 2025-01-15 |
| business_group | Their current group | Technology |

**Readiness Timeline Options:**
- `Ready Now` or `ready_now`
- `1-2 Years` or `1-2_years`
- `3+ Years` or `3+_years`

---

## Creating Fake Data with Copilot

### Option 1: Use Microsoft Copilot in Excel

1. Open your real data in Excel
2. Select the name columns
3. Ask Copilot: "Replace these names with fake names but keep the same format"
4. Review and save as a new file

### Option 2: Use ChatGPT/Claude

Copy this prompt:

```
I have succession planning data with real employee names. Please help me create fake names that maintain the same diversity and format. Here are 10 real names:

[Paste your names here]

Please generate 10 fake names with similar characteristics (first name, last name, cultural diversity).
```

### Option 3: Manual Replacement

Use Excel Find & Replace:
1. Create a mapping table (Real Name → Fake Name)
2. Use Find & Replace for each name
3. Save as a new file with "_DEMO" suffix

---

## Example Excel File Structure

### Roles Sheet Example:

```
role_id    | role_title                      | band | business_group | practice | is_critical | incumbent_name
-----------|----------------------------------|------|----------------|----------|-------------|---------------
R0001      | Director Cloud Architecture      | 9    | Technology     | Cloud    | Yes         | John Smith
R0002      | VP Technology Strategy           | 10   | Technology     | Strategy | Yes         | Jane Doe
R0003      | CFO Americas                     | 10   | Finance        | Finance  | Yes         | Bob Johnson
```

### Candidates Sheet Example:

```
candidate_id | candidate_name | target_role_id | current_role        | readiness_timeline | readiness_score
-------------|----------------|----------------|---------------------|-------------------|----------------
E00123       | Sarah Jones    | R0001          | Director Cloud Ops  | Ready Now         | 4.5
E00124       | Mike Chen      | R0001          | Sr Architect        | 1-2 Years         | 4.0
E00125       | Lisa Park      | R0002          | Practice Lead       | 3+ Years          | 3.5
```

---

## Data Quality Checklist

Before uploading, verify:

- ✅ All required columns are present
- ✅ role_id values are unique
- ✅ candidate_id values are unique
- ✅ target_role_id matches a role_id in the Roles sheet
- ✅ readiness_timeline uses one of the three valid options
- ✅ readiness_score is between 1 and 5
- ✅ band is a number (6, 7, 8, 9, 10, etc.)
- ✅ All names are fake/anonymized
- ✅ No sensitive personal information included

---

## What Happens After Upload

Once you upload the file:

1. **Processing** - The dashboard will parse your Excel file (takes 1-2 seconds)
2. **Validation** - It checks for required columns and data quality
3. **Update** - All charts and tables refresh with your data
4. **Confirmation** - You'll see a success message with row counts

The dashboard will show:
- Total roles and candidates loaded
- Coverage calculations
- High flyers identification
- Gap analysis
- All visualizations updated with your data

---

## Troubleshooting

### "Error processing file"
- Check that column names match exactly (case-sensitive)
- Ensure file is .xlsx or .xls format
- Verify no empty required columns

### "Invalid readiness timeline"
- Use only: "Ready Now", "1-2 Years", or "3+ Years"
- Check for typos or extra spaces

### "Missing required columns"
- Compare your columns to the required list above
- Column names must match exactly

### "Duplicate IDs found"
- Ensure all role_id values are unique
- Ensure all candidate_id values are unique

---

## Sample Data Template

I've created a sample Excel template you can use as a reference:

**Download:** [succession-planning-template.xlsx](#)

This template includes:
- Correct column headers
- Sample data with fake names
- Formulas for calculating metrics
- Data validation rules

---

## Privacy & Security

**Important Notes:**
- ✅ Always use fake names when sharing data
- ✅ Remove any sensitive personal information
- ✅ Don't include SSNs, employee IDs that could identify people
- ✅ Consider using generic locations if needed
- ✅ This demo runs entirely in your browser - no data is sent to servers

---

## Need Help?

If you have questions about:
- **Data format**: Contact Josh
- **Creating fake data**: Use Copilot or the methods above
- **SuccessFactors export**: Follow your normal process
- **Dashboard features**: See the main demo guide

---

## Quick Reference: Column Names

Copy these exact column names for your Excel sheets:

**Roles Sheet:**
```
role_id, role_title, band, business_group, practice, specialty, location, is_critical, incumbent_name, incumbent_tenure, retirement_date
```

**Candidates Sheet:**
```
candidate_id, candidate_name, target_role_id, current_role, current_band, readiness_timeline, readiness_score, nomination_date, business_group
```

---

**Questions?** Reach out to Josh - happy to help get your data formatted correctly!