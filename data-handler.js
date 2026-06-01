// Data Handler for Excel Upload and Export
class DataHandler {
    constructor() {
        this.currentData = null;
        this.initializeHandlers();
    }

    initializeHandlers() {
        // Add export button
        const exportButton = document.createElement('button');
        exportButton.className = 'export-button';
        exportButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17 12v5H3v-5H1v5a2 2 0 002 2h14a2 2 0 002-2v-5h-2z" fill="currentColor"/>
                <path d="M10 2L6 6h3v8h2V6h3l-4-4z" fill="currentColor"/>
            </svg>
            Export
        `;
        exportButton.onclick = () => this.toggleExportMenu();
        document.body.appendChild(exportButton);

        // Add export menu
        const exportMenu = document.createElement('div');
        exportMenu.className = 'export-menu';
        exportMenu.innerHTML = `
            <button class="export-option" onclick="dataHandler.exportToExcel()">
                📊 Export to Excel
            </button>
            <button class="export-option" onclick="dataHandler.exportToPDF()">
                📄 Export to PDF
            </button>
            <button class="export-option" onclick="dataHandler.exportToCSV()">
                📋 Export to CSV
            </button>
            <button class="export-option" onclick="dataHandler.generateReport()">
                📈 Generate Full Report
            </button>
        `;
        document.body.appendChild(exportMenu);

        // Add upload area
        const uploadArea = document.createElement('div');
        uploadArea.className = 'upload-area';
        uploadArea.innerHTML = `
            <div class="upload-icon">📁</div>
            <div class="upload-text">Drop Excel file here or click to upload</div>
            <div class="upload-subtext">Supports .xlsx, .xls files with succession data</div>
            <input type="file" id="fileInput" accept=".xlsx,.xls" onchange="dataHandler.handleFileUpload(event)">
        `;
        uploadArea.onclick = () => document.getElementById('fileInput').click();
        
        // Drag and drop handlers
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file) {
                this.processFile(file);
            }
        });
        
        document.body.appendChild(uploadArea);

        // Close export menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.export-button') && !e.target.closest('.export-menu')) {
                document.querySelector('.export-menu').classList.remove('open');
            }
        });
    }

    toggleExportMenu() {
        const menu = document.querySelector('.export-menu');
        menu.classList.toggle('open');
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    processFile(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                // In a real implementation, you would use a library like SheetJS (xlsx)
                // to parse the Excel file. For this demo, we'll simulate it.
                
                this.showNotification('Processing file...', 'info');
                
                setTimeout(() => {
                    // Simulate successful file processing
                    this.currentData = {
                        fileName: file.name,
                        uploadDate: new Date().toISOString(),
                        rowCount: 1250,
                        roles: 282,
                        candidates: 968
                    };
                    
                    this.showNotification(`✓ Successfully loaded ${file.name}`, 'success');
                    this.updateDashboardWithNewData();
                }, 1500);
                
            } catch (error) {
                this.showNotification('Error processing file. Please check the format.', 'error');
            }
        };
        
        reader.readAsArrayBuffer(file);
    }

    updateDashboardWithNewData() {
        // In a real implementation, this would update all charts and tables
        // For demo, we'll just show a notification
        const notification = document.createElement('div');
        notification.className = 'data-notification';
        notification.innerHTML = `
            <div style="background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); max-width: 400px;">
                <h3 style="margin: 0 0 1rem 0; color: #24A148;">✓ Data Updated Successfully</h3>
                <p style="margin: 0 0 0.5rem 0; color: #525252;">File: ${this.currentData.fileName}</p>
                <p style="margin: 0 0 0.5rem 0; color: #525252;">Roles: ${this.currentData.roles}</p>
                <p style="margin: 0 0 1rem 0; color: #525252;">Candidates: ${this.currentData.candidates}</p>
                <button onclick="this.parentElement.parentElement.remove()" style="background: #0F62FE; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
                    Close
                </button>
            </div>
        `;
        notification.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10000;';
        document.body.appendChild(notification);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: '#24A148',
            error: '#DA1E28',
            info: '#0F62FE'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 6rem;
            right: 2rem;
            background: ${colors[type]};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    exportToExcel() {
        this.showNotification('Generating Excel file...', 'info');
        
        setTimeout(() => {
            // In a real implementation, use SheetJS to generate Excel
            const data = this.generateExportData();
            
            // Simulate download
            this.simulateDownload('succession-planning-report.xlsx', 'Excel');
            this.showNotification('✓ Excel file downloaded', 'success');
        }, 1000);
        
        this.toggleExportMenu();
    }

    exportToPDF() {
        this.showNotification('Generating PDF report...', 'info');
        
        setTimeout(() => {
            // In a real implementation, use jsPDF or similar
            this.simulateDownload('succession-planning-report.pdf', 'PDF');
            this.showNotification('✓ PDF report downloaded', 'success');
        }, 1500);
        
        this.toggleExportMenu();
    }

    exportToCSV() {
        this.showNotification('Generating CSV file...', 'info');
        
        setTimeout(() => {
            const data = this.generateCSVData();
            
            // Create actual CSV download
            const blob = new Blob([data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'succession-planning-data.csv';
            a.click();
            window.URL.revokeObjectURL(url);
            
            this.showNotification('✓ CSV file downloaded', 'success');
        }, 800);
        
        this.toggleExportMenu();
    }

    generateReport() {
        this.showNotification('Generating comprehensive report...', 'info');
        
        setTimeout(() => {
            // Open a new window with a formatted report
            const reportWindow = window.open('', '_blank');
            reportWindow.document.write(this.generateHTMLReport());
            reportWindow.document.close();
            
            this.showNotification('✓ Report opened in new tab', 'success');
        }, 1000);
        
        this.toggleExportMenu();
    }

    generateExportData() {
        // Generate sample data structure for export
        return {
            summary: {
                totalRoles: 282,
                coveredRoles: 245,
                coveragePercentage: 87,
                highFlyers: 34,
                criticalGaps: 12
            },
            businessGroups: [
                { name: 'Consulting', coverage: 92, roles: 65 },
                { name: 'Technology', coverage: 78, roles: 158 },
                { name: 'Sales', coverage: 88, roles: 42 },
                { name: 'Finance', coverage: 91, roles: 12 },
                { name: 'HR', coverage: 72, roles: 5 }
            ]
        };
    }

    generateCSVData() {
        // Generate CSV format data
        let csv = 'Role Title,Band,Business Group,Ready Now,1-2 Years,3+ Years,Coverage Status\n';
        
        const sampleData = [
            ['VP Technology Strategy', '10', 'Technology', '0', '0', '0', 'Critical Gap'],
            ['Director Cloud Services', '9', 'Technology', '1', '2', '3', 'At Risk'],
            ['CFO Americas', '10', 'Finance', '3', '2', '1', 'Inverted Funnel'],
            ['VP Sales Operations', '10', 'Sales', '2', '3', '4', 'Good'],
            ['Director Cloud Architecture', '9', 'Technology', '3', '4', '2', 'Warning']
        ];
        
        sampleData.forEach(row => {
            csv += row.map(cell => `"${cell}"`).join(',') + '\n';
        });
        
        return csv;
    }

    generateHTMLReport() {
        const date = new Date().toLocaleDateString();
        
        return `
<!DOCTYPE html>
<html>
<head>
    <title>IBM Succession Planning Report</title>
    <style>
        body {
            font-family: 'IBM Plex Sans', Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            color: #161616;
        }
        h1 { color: #0F62FE; border-bottom: 3px solid #0F62FE; padding-bottom: 0.5rem; }
        h2 { color: #161616; margin-top: 2rem; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 2rem 0; }
        .metric { background: #F4F4F4; padding: 1.5rem; border-left: 4px solid #0F62FE; }
        .metric-value { font-size: 2rem; font-weight: 300; color: #161616; }
        .metric-label { font-size: 0.9rem; color: #525252; margin-top: 0.5rem; }
        table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
        th { background: #F4F4F4; padding: 1rem; text-align: left; font-weight: 500; }
        td { padding: 1rem; border-bottom: 1px solid #E0E0E0; }
        .status-good { color: #24A148; font-weight: 500; }
        .status-warning { color: #F1C21B; font-weight: 500; }
        .status-critical { color: #DA1E28; font-weight: 500; }
        .footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #E0E0E0; color: #8D8D8D; font-size: 0.9rem; }
        @media print { body { padding: 1rem; } }
    </style>
</head>
<body>
    <h1>IBM Succession Planning Report</h1>
    <p><strong>Generated:</strong> ${date}</p>
    
    <h2>Executive Summary</h2>
    <div class="summary">
        <div class="metric">
            <div class="metric-value">87%</div>
            <div class="metric-label">Overall Coverage</div>
        </div>
        <div class="metric">
            <div class="metric-value">245/282</div>
            <div class="metric-label">Roles Covered</div>
        </div>
        <div class="metric">
            <div class="metric-value">34</div>
            <div class="metric-label">High Flyers</div>
        </div>
        <div class="metric">
            <div class="metric-value">12</div>
            <div class="metric-label">Critical Gaps</div>
        </div>
    </div>
    
    <h2>Coverage by Business Group</h2>
    <table>
        <thead>
            <tr>
                <th>Business Group</th>
                <th>Coverage</th>
                <th>Total Roles</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Consulting</td>
                <td>92%</td>
                <td>65</td>
                <td class="status-good">✓ Good</td>
            </tr>
            <tr>
                <td>Technology</td>
                <td>78%</td>
                <td>158</td>
                <td class="status-warning">⚠ Needs Attention</td>
            </tr>
            <tr>
                <td>Sales</td>
                <td>88%</td>
                <td>42</td>
                <td class="status-good">✓ Good</td>
            </tr>
            <tr>
                <td>Finance</td>
                <td>91%</td>
                <td>12</td>
                <td class="status-good">✓ Good</td>
            </tr>
            <tr>
                <td>HR</td>
                <td>72%</td>
                <td>5</td>
                <td class="status-warning">⚠ Needs Attention</td>
            </tr>
        </tbody>
    </table>
    
    <h2>Critical Roles Requiring Attention</h2>
    <table>
        <thead>
            <tr>
                <th>Role Title</th>
                <th>Band</th>
                <th>Business Group</th>
                <th>Issue</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>VP Technology Strategy</td>
                <td>10</td>
                <td>Technology</td>
                <td class="status-critical">No candidates</td>
            </tr>
            <tr>
                <td>Director Cloud Services</td>
                <td>9</td>
                <td>Technology</td>
                <td class="status-warning">Only 1 ready now</td>
            </tr>
            <tr>
                <td>CFO Americas</td>
                <td>10</td>
                <td>Finance</td>
                <td class="status-warning">Inverted funnel</td>
            </tr>
            <tr>
                <td>VP Sales Operations</td>
                <td>10</td>
                <td>Sales</td>
                <td class="status-warning">Retirement risk</td>
            </tr>
        </tbody>
    </table>
    
    <h2>High Flyers (Top 5)</h2>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Current Role</th>
                <th>Band</th>
                <th># Roles</th>
                <th>Readiness</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Sarah Jones</strong></td>
                <td>Dir Cloud Ops</td>
                <td>8</td>
                <td>5</td>
                <td class="status-good">Ready Now</td>
            </tr>
            <tr>
                <td><strong>Mike Chen</strong></td>
                <td>Sr Architect</td>
                <td>7</td>
                <td>4</td>
                <td class="status-good">Ready Now</td>
            </tr>
            <tr>
                <td><strong>Lisa Park</strong></td>
                <td>Practice Lead</td>
                <td>8</td>
                <td>4</td>
                <td class="status-warning">1-2 Years</td>
            </tr>
            <tr>
                <td><strong>Tom Wilson</strong></td>
                <td>Dir AI/ML</td>
                <td>8</td>
                <td>3</td>
                <td class="status-good">Ready Now</td>
            </tr>
            <tr>
                <td><strong>Amy Liu</strong></td>
                <td>Tech Lead</td>
                <td>7</td>
                <td>3</td>
                <td class="status-warning">1-2 Years</td>
            </tr>
        </tbody>
    </table>
    
    <div class="footer">
        <p>IBM Succession Planning Dashboard | Generated ${date}</p>
        <p>This report contains confidential succession planning data. Handle according to IBM data classification policies.</p>
    </div>
    
    <script>
        // Auto-print dialog
        window.onload = function() {
            setTimeout(function() {
                if (confirm('Would you like to print this report?')) {
                    window.print();
                }
            }, 500);
        };
    </script>
</body>
</html>
        `;
    }

    simulateDownload(filename, type) {
        console.log(`Downloading ${filename} (${type} format)`);
        // In a real implementation, this would trigger an actual download
    }
}

// Initialize data handler when page loads
let dataHandler;
document.addEventListener('DOMContentLoaded', function() {
    dataHandler = new DataHandler();
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Made with Bob
