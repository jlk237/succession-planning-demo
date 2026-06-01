// IBM Succession Planning Dashboard - Main Script

// Global state
let dashboardData = null;
let currentView = 'overview';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set up navigation
    setupNavigation();
    
    // Set up modal handlers
    setupModalHandlers();
    
    // Check if we should show welcome screen or dashboard
    if (!dashboardData) {
        showWelcomeScreen();
    } else {
        showDashboard();
    }
}

// Welcome Screen Functions
function showWelcomeScreen() {
    document.getElementById('welcome-screen').style.display = 'flex';
    document.getElementById('main-dashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('main-dashboard').style.display = 'block';
    
    // Initialize charts if not already done
    if (!window.chartsInitialized) {
        initializeCharts();
        window.chartsInitialized = true;
    }
    
    // Render versatility widget if data is available
    if (window.rawCandidatesData && typeof renderVersatilityWidget === 'function') {
        const container = document.getElementById('versatility-widget-container');
        if (container) {
            container.innerHTML = renderVersatilityWidget();
        }
    }
}

function loadDummyData() {
    // Show loading state
    showNotification('Loading sample data...', 'info');
    
    // Simulate loading delay
    setTimeout(() => {
        // Create sample raw data for succession chain
        window.rawRolesData = [
            { role_id: 'R0001', role_title: 'VP Technology Strategy', band: 10, business_group: 'Technology', practice: 'Cloud', incumbent_name: 'John Smith', incumbent_tenure: 3.5, retirement_date: null, critical: 'Yes' },
            { role_id: 'R0002', role_title: 'Director Cloud Architecture', band: 9, business_group: 'Technology', practice: 'Cloud', incumbent_name: 'Sarah Jones', incumbent_tenure: 2.5, retirement_date: null, critical: 'Yes' },
            { role_id: 'R0003', role_title: 'CFO Americas', band: 10, business_group: 'Finance', practice: 'Finance', incumbent_name: 'Robert Williams', incumbent_tenure: 5.0, retirement_date: '2027-12-31', critical: 'Yes' },
            { role_id: 'R0004', role_title: 'VP Sales Operations', band: 10, business_group: 'Sales', practice: 'Sales', incumbent_name: 'Michael Brown', incumbent_tenure: 4.2, retirement_date: '2026-12-31', critical: 'Yes' },
            { role_id: 'R0005', role_title: 'Director AI/ML', band: 9, business_group: 'Technology', practice: 'AI', incumbent_name: 'Mike Chen', incumbent_tenure: 3.0, retirement_date: null, critical: 'Yes' },
            { role_id: 'R0006', role_title: 'VP Consulting Services', band: 10, business_group: 'Consulting', practice: 'Strategy', incumbent_name: 'David Wilson', incumbent_tenure: 6.0, retirement_date: null, critical: 'Yes' },
            { role_id: 'R0007', role_title: 'Chief Security Officer', band: 10, business_group: 'Technology', practice: 'Security', incumbent_name: 'James Taylor', incumbent_tenure: 8.0, retirement_date: '2026-11-30', critical: 'Yes' },
            { role_id: 'R0008', role_title: 'Director Data Analytics', band: 9, business_group: 'Technology', practice: 'Data', incumbent_name: 'Lisa Park', incumbent_tenure: 2.0, retirement_date: null, critical: 'Yes' }
        ];
        
        window.rawCandidatesData = [
            { candidate_name: 'Sarah Jones', target_role_id: 'R0001', current_role: 'Director Cloud Architecture', current_role_id: 'R0002', current_band: 9, readiness_timeline: 'Ready Now', readiness_score: 4.5, business_group: 'Technology' },
            { candidate_name: 'Mike Chen', target_role_id: 'R0001', current_role: 'Director AI/ML', current_role_id: 'R0005', current_band: 9, readiness_timeline: 'Ready Now', readiness_score: 4.2, business_group: 'Technology' },
            { candidate_name: 'Lisa Park', target_role_id: 'R0001', current_role: 'Director Data Analytics', current_role_id: 'R0008', current_band: 9, readiness_timeline: '1-2 Years', readiness_score: 4.0, business_group: 'Technology' },
            { candidate_name: 'David Kim', target_role_id: 'R0002', current_role: 'Senior Manager Cloud', current_role_id: 'R0009', current_band: 8, readiness_timeline: 'Ready Now', readiness_score: 4.3, business_group: 'Technology' },
            { candidate_name: 'Tom Wilson', target_role_id: 'R0002', current_role: 'Manager Cloud Infrastructure', current_role_id: 'R0010', current_band: 7, readiness_timeline: 'Ready Now', readiness_score: 4.1, business_group: 'Technology' },
            { candidate_name: 'Jennifer Martinez', target_role_id: 'R0002', current_role: 'Senior Manager DevOps', current_role_id: 'R0011', current_band: 8, readiness_timeline: 'Ready Now', readiness_score: 4.4, business_group: 'Technology' },
            { candidate_name: 'Sarah Jones', target_role_id: 'R0005', current_role: 'Director Cloud Architecture', current_role_id: 'R0002', current_band: 9, readiness_timeline: 'Ready Now', readiness_score: 4.4, business_group: 'Technology' },
            { candidate_name: 'Mike Chen', target_role_id: 'R0008', current_role: 'Director AI/ML', current_role_id: 'R0005', current_band: 9, readiness_timeline: 'Ready Now', readiness_score: 4.3, business_group: 'Technology' },
            { candidate_name: 'Lisa Park', target_role_id: 'R0003', current_role: 'Director Data Analytics', current_role_id: 'R0008', current_band: 9, readiness_timeline: 'Ready Now', readiness_score: 4.2, business_group: 'Finance' }
        ];
        
        dashboardData = {
            source: 'Sample Data',
            loadedAt: new Date(),
            roles: 282,
            candidates: 968,
            coverage: 87,
            // Sample role data
            rolesList: [
                { id: 'R0001', title: 'VP Technology Strategy', band: 10, group: 'Technology', practice: 'Cloud', incumbent: 'John Smith', readyNow: 2, oneTwo: 1, threePlus: 0, health: 'warning' },
                { id: 'R0002', title: 'Director Cloud Architecture', band: 9, group: 'Technology', practice: 'Cloud', incumbent: 'Sarah Jones', readyNow: 3, oneTwo: 0, threePlus: 0, health: 'good' },
                { id: 'R0003', title: 'CFO Americas', band: 10, group: 'Finance', practice: 'Finance', incumbent: 'Robert Williams', readyNow: 1, oneTwo: 0, threePlus: 0, health: 'warning', retirement: '2027-12-31' },
                { id: 'R0004', title: 'VP Sales Operations', band: 10, group: 'Sales', practice: 'Sales', incumbent: 'Michael Brown', readyNow: 0, oneTwo: 0, threePlus: 0, health: 'critical', retirement: '2026-12-31' },
                { id: 'R0005', title: 'Director AI/ML', band: 9, group: 'Technology', practice: 'AI', incumbent: 'Mike Chen', readyNow: 1, oneTwo: 0, threePlus: 0, health: 'warning' },
                { id: 'R0006', title: 'VP Consulting Services', band: 10, group: 'Consulting', practice: 'Strategy', incumbent: 'David Wilson', readyNow: 0, oneTwo: 0, threePlus: 0, health: 'critical' },
                { id: 'R0007', title: 'Chief Security Officer', band: 10, group: 'Technology', practice: 'Security', incumbent: 'James Taylor', readyNow: 0, oneTwo: 0, threePlus: 0, health: 'critical', retirement: '2026-11-30' },
                { id: 'R0008', title: 'Director Data Analytics', band: 9, group: 'Technology', practice: 'Data', incumbent: 'Lisa Park', readyNow: 1, oneTwo: 0, threePlus: 0, health: 'warning' }
            ],
            // Sample high flyers
            highFlyers: [
                { name: 'Sarah Jones', currentRole: 'Director Cloud Services', band: 9, targetRoles: 5, readiness: 'Ready Now' },
                { name: 'Mike Chen', currentRole: 'Senior Manager AI', band: 8, targetRoles: 4, readiness: 'Ready Now' },
                { name: 'Lisa Park', currentRole: 'Director Security', band: 9, targetRoles: 4, readiness: '1-2 Years' },
                { name: 'David Kim', currentRole: 'Senior Manager Finance', band: 8, targetRoles: 3, readiness: 'Ready Now' },
                { name: 'Tom Wilson', currentRole: 'Director Sales', band: 9, targetRoles: 3, readiness: '1-2 Years' }
            ],
            // Business group stats
            businessGroups: [
                { name: 'Technology', roles: 142, coverage: 78, readyNow: 89, oneTwo: 156, threePlus: 198 },
                { name: 'Consulting', roles: 68, coverage: 92, readyNow: 52, oneTwo: 98, threePlus: 124 },
                { name: 'Sales', roles: 45, coverage: 88, readyNow: 38, oneTwo: 67, threePlus: 89 },
                { name: 'Finance', roles: 18, coverage: 91, readyNow: 15, oneTwo: 28, threePlus: 35 },
                { name: 'HR', roles: 9, coverage: 72, readyNow: 6, oneTwo: 12, threePlus: 18 }
            ]
        };
        
        // Update data source indicator
        document.getElementById('dataSource').textContent = 'Sample Data';
        
        // Show dashboard
        showDashboard();
        
        // Populate all views
        console.log('About to populate views. dashboardData:', dashboardData);
        console.log('rolesList exists:', !!dashboardData.rolesList);
        console.log('rolesList length:', dashboardData.rolesList ? dashboardData.rolesList.length : 'undefined');
        populateAllViews();
        console.log('Views populated');
        
        showNotification('✓ Sample data loaded successfully', 'success');
    }, 800);
}

// Modal Functions
function setupModalHandlers() {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    
    if (uploadZone) {
        uploadZone.onclick = () => fileInput.click();
        
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        });
        
        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('dragover');
        });
        
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file) {
                handleFileUpload(file);
            }
        });
    }
    
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                handleFileUpload(file);
            }
        });
    }
}

function showUploadModal() {
    const modal = document.getElementById('upload-modal');
    if (modal) {
        modal.classList.add('open');
    }
}

function closeUploadModal() {
    const modal = document.getElementById('upload-modal');
    if (modal) {
        modal.classList.remove('open');
    }
}

function handleFileUpload(file) {
    closeUploadModal();
    showNotification('Processing file...', 'info');
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            console.log('Workbook loaded:', workbook.SheetNames);
            
            // Parse Roles sheet
            const rolesSheet = workbook.Sheets['Roles'];
            const rolesData = XLSX.utils.sheet_to_json(rolesSheet);
            console.log('Roles data:', rolesData);
            
            // Parse Candidates sheet
            const candidatesSheet = workbook.Sheets['Candidates'];
            const candidatesData = XLSX.utils.sheet_to_json(candidatesSheet);
            console.log('Candidates data:', candidatesData);
            
            // Store raw candidates data globally for succession chain navigation
            window.rawCandidatesData = candidatesData;
            window.rawRolesData = rolesData;
            
            // Transform data to match our format
            const rolesList = rolesData.map(row => ({
                id: row.role_id,
                title: row.role_title,
                band: row.band,
                group: row.business_group,
                practice: row.practice,
                incumbent: row.incumbent_name,
                readyNow: 0,
                oneTwo: 0,
                threePlus: 0,
                health: row.critical === 'Yes' ? 'critical' : 'good',
                retirement: row.retirement_date || null
            }));
            
            // Count candidates per role
            candidatesData.forEach(candidate => {
                const role = rolesList.find(r => r.id === candidate.target_role_id);
                if (role) {
                    if (candidate.readiness_timeline === 'Ready Now') {
                        role.readyNow++;
                    } else if (candidate.readiness_timeline === '1-2 Years') {
                        role.oneTwo++;
                    } else if (candidate.readiness_timeline === '3+ Years') {
                        role.threePlus++;
                    }
                }
            });
            
            // Determine health status based on coverage
            rolesList.forEach(role => {
                const total = role.readyNow + role.oneTwo + role.threePlus;
                if (total === 0) {
                    role.health = 'critical';
                } else if (role.readyNow === 0 || (role.readyNow > role.oneTwo && role.oneTwo > 0)) {
                    role.health = 'warning';
                } else {
                    role.health = 'good';
                }
            });
            
            // Find high flyers (candidates with multiple target roles)
            const candidateCounts = {};
            candidatesData.forEach(c => {
                if (!candidateCounts[c.candidate_name]) {
                    candidateCounts[c.candidate_name] = {
                        name: c.candidate_name,
                        currentRole: c.current_role,
                        band: c.current_band,
                        targetRoles: 0,
                        readiness: c.readiness_timeline
                    };
                }
                candidateCounts[c.candidate_name].targetRoles++;
            });
            
            const highFlyers = Object.values(candidateCounts)
                .filter(c => c.targetRoles > 1)
                .sort((a, b) => b.targetRoles - a.targetRoles)
                .slice(0, 10);
            
            // Calculate business group stats
            const groupStats = {};
            rolesList.forEach(role => {
                if (!groupStats[role.group]) {
                    groupStats[role.group] = {
                        name: role.group,
                        roles: 0,
                        readyNow: 0,
                        oneTwo: 0,
                        threePlus: 0
                    };
                }
                groupStats[role.group].roles++;
                groupStats[role.group].readyNow += role.readyNow;
                groupStats[role.group].oneTwo += role.oneTwo;
                groupStats[role.group].threePlus += role.threePlus;
            });
            
            const businessGroups = Object.values(groupStats).map(group => ({
                ...group,
                coverage: Math.round((group.roles > 0 ? (rolesList.filter(r => r.group === group.name && (r.readyNow + r.oneTwo + r.threePlus) > 0).length / group.roles) * 100 : 0))
            }));
            
            // Set dashboard data
            dashboardData = {
                source: file.name,
                loadedAt: new Date(),
                roles: rolesList.length,
                candidates: candidatesData.length,
                coverage: Math.round((rolesList.filter(r => (r.readyNow + r.oneTwo + r.threePlus) > 0).length / rolesList.length) * 100),
                rolesList: rolesList,
                highFlyers: highFlyers,
                businessGroups: businessGroups
            };
            
            console.log('Dashboard data prepared:', dashboardData);
            
            // Update data source indicator
            document.getElementById('dataSource').textContent = file.name;
            
            // Show dashboard
            showDashboard();
            
            // Populate all views
            populateAllViews();
            
            showNotification(`✓ Successfully loaded ${file.name}`, 'success');
            
        } catch (error) {
            console.error('Error parsing file:', error);
            showNotification('Error parsing file. Please check the format.', 'error');
        }
    };
    
    reader.readAsArrayBuffer(file);
}

// Navigation
function setupNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const views = document.querySelectorAll('.view');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const viewName = this.getAttribute('data-view');
            
            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active view
            views.forEach(v => v.classList.remove('active'));
            const targetView = document.getElementById(`${viewName}-view`);
            if (targetView) {
                targetView.classList.add('active');
            }
            
            currentView = viewName;
        });
    });
}

// Charts
function initializeCharts() {
    initializeCoverageChart();
    initializeTrendChart();
}

function initializeCoverageChart() {
    const ctx = document.getElementById('coverageChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Consulting', 'Technology', 'Sales', 'Finance', 'HR'],
            datasets: [{
                label: 'Coverage %',
                data: [92, 78, 88, 91, 72],
                backgroundColor: [
                    '#24A148',
                    '#F1C21B',
                    '#24A148',
                    '#24A148',
                    '#F1C21B'
                ],
                borderRadius: 4,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#262626',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        family: 'IBM Plex Sans'
                    },
                    bodyFont: {
                        size: 13,
                        family: 'IBM Plex Sans'
                    },
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + '% coverage';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        font: {
                            family: 'IBM Plex Sans'
                        }
                    },
                    grid: {
                        color: '#E0E0E0',
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'IBM Plex Sans'
                        }
                    }
                }
            }
        }
    });
}

function initializeTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'],
            datasets: [{
                label: 'Overall Coverage',
                data: [78, 82, 85, 87],
                borderColor: '#0F62FE',
                backgroundColor: 'rgba(15, 98, 254, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: '#0F62FE',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#262626',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        family: 'IBM Plex Sans'
                    },
                    bodyFont: {
                        size: 13,
                        family: 'IBM Plex Sans'
                    },
                    callbacks: {
                        label: function(context) {
                            return 'Coverage: ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 70,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        font: {
                            family: 'IBM Plex Sans'
                        }
                    },
                    grid: {
                        color: '#E0E0E0',
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'IBM Plex Sans'
                        }
                    }
                }
            }
        }
    });
}

// Notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        success: '#24A148',
        error: '#DA1E28',
        info: '#0F62FE'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        z-index: 10000;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Chat toggle
function toggleChat() {
    if (typeof chatbot !== 'undefined') {
        chatbot.toggleChat();
    } else {
        showNotification('Chat feature loading...', 'info');
    }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('upload-modal');
    if (modal && e.target === modal) {
        closeUploadModal();
    }
});

// Export functions to global scope
window.showUploadModal = showUploadModal;
window.closeUploadModal = closeUploadModal;
window.loadDummyData = loadDummyData;
window.toggleChat = toggleChat;

// Made with Bob


// Populate all dashboard views with data
function populateAllViews() {
    if (!dashboardData) return;
    
    populateRolesView();
    populateBusinessView();
    populateHighFlyersView();
    populateGapsView();
    setupTableInteractions();
}

// Populate Roles View
function populateRolesView() {
    console.log('populateRolesView called');
    const rolesView = document.getElementById('roles-view');
    console.log('rolesView element:', rolesView);
    console.log('dashboardData.rolesList:', dashboardData.rolesList);
    if (!rolesView || !dashboardData.rolesList) {
        console.log('Exiting populateRolesView - missing element or data');
        return;
    }
    console.log('Populating roles view with', dashboardData.rolesList.length, 'roles');
    
    const html = `
        <div class="view-header">
            <h2>Role Succession Details</h2>
            <div class="search-bar">
                <input type="text" id="roleSearch" placeholder="Search for a role..." class="search-input">
                <button class="btn-primary" onclick="filterRoles()">Search</button>
            </div>
        </div>
        
        <div class="filters-bar">
            <select id="bandFilter" onchange="filterRoles()" class="filter-select">
                <option value="">All Bands</option>
                <option value="10">Band 10</option>
                <option value="9">Band 9</option>
            </select>
            <select id="groupFilter" onchange="filterRoles()" class="filter-select">
                <option value="">All Business Groups</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
                <option value="Consulting">Consulting</option>
            </select>
            <select id="healthFilter" onchange="filterRoles()" class="filter-select">
                <option value="">All Health Status</option>
                <option value="good">Good</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
            </select>
        </div>
        
        <div class="table-card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Role ID</th>
                            <th>Role Title</th>
                            <th>Band</th>
                            <th>Business Group</th>
                            <th>Incumbent</th>
                            <th>Ready Now</th>
                            <th>1-2 Years</th>
                            <th>3+ Years</th>
                            <th>Health</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="rolesTableBody">
                        ${dashboardData.rolesList.map(role => `
                            <tr data-band="${role.band}" data-group="${role.group}" data-health="${role.health}">
                                <td><strong>${role.id}</strong></td>
                                <td>${role.title}</td>
                                <td>${role.band}</td>
                                <td>${role.group}</td>
                                <td>${role.incumbent}${role.retirement ? ' <span class="badge warning">Retiring</span>' : ''}</td>
                                <td>${role.readyNow}</td>
                                <td>${role.oneTwo}</td>
                                <td>${role.threePlus}</td>
                                <td><span class="badge ${role.health}">${role.health}</span></td>
                                <td><button class="btn-link" onclick="viewRoleDetails('${role.id}')">View Details →</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    rolesView.innerHTML = html;
}

// Populate Business Groups View
function populateBusinessView() {
    const businessView = document.getElementById('business-view');
    if (!businessView || !dashboardData.businessGroups) return;
    
    const html = `
        <div class="view-header">
            <h2>Business Group Analysis</h2>
        </div>
        
        <div class="kpi-grid">
            ${dashboardData.businessGroups.map(group => `
                <div class="kpi-card">
                    <div class="kpi-header">
                        <span class="kpi-label">${group.name}</span>
                    </div>
                    <div class="kpi-value">${group.coverage}%</div>
                    <div class="kpi-change">${group.roles} roles</div>
                    <div class="kpi-progress">
                        <div class="progress-fill" style="width: ${group.coverage}%"></div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="table-card">
            <div class="card-header">
                <h3>Detailed Breakdown by Business Group</h3>
            </div>
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Business Group</th>
                            <th>Total Roles</th>
                            <th>Coverage %</th>
                            <th>Ready Now</th>
                            <th>1-2 Years</th>
                            <th>3+ Years</th>
                            <th>Total Pipeline</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${dashboardData.businessGroups.map(group => `
                            <tr>
                                <td><strong>${group.name}</strong></td>
                                <td>${group.roles}</td>
                                <td><span class="badge ${group.coverage >= 85 ? 'good' : group.coverage >= 70 ? 'warning' : 'critical'}">${group.coverage}%</span></td>
                                <td>${group.readyNow}</td>
                                <td>${group.oneTwo}</td>
                                <td>${group.threePlus}</td>
                                <td>${group.readyNow + group.oneTwo + group.threePlus}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    businessView.innerHTML = html;
}

// Populate High Flyers View
function populateHighFlyersView() {
    const highFlyersView = document.getElementById('highflyers-view');
    if (!highFlyersView || !dashboardData.highFlyers) return;
    
    const html = `
        <div class="view-header">
            <h2>High Flyers & Talent Pool</h2>
        </div>
        
        <div class="alert-banner info">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
            </svg>
            <span>High Flyers are candidates identified for multiple succession opportunities across the organization</span>
        </div>
        
        <div class="table-card">
            <div class="card-header">
                <h3>Top High Flyers (Identified for Multiple Roles)</h3>
            </div>
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Candidate Name</th>
                            <th>Current Role</th>
                            <th>Band</th>
                            <th>Target Roles</th>
                            <th>Readiness</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${dashboardData.highFlyers.map(candidate => `
                            <tr>
                                <td><strong>${candidate.name}</strong></td>
                                <td>${candidate.currentRole}</td>
                                <td>${candidate.band}</td>
                                <td><span class="badge good">${candidate.targetRoles} roles</span></td>
                                <td><span class="badge ${candidate.readiness === 'Ready Now' ? 'good' : 'warning'}">${candidate.readiness}</span></td>
                                <td><button class="btn-link" onclick="viewCandidateDetails('${candidate.name}')">View Profile →</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="chart-card">
            <div class="card-header">
                <h3>High Flyer Distribution</h3>
            </div>
            <p style="padding: 2rem; text-align: center; color: #525252;">
                ${dashboardData.highFlyers.length} high flyers identified across ${dashboardData.businessGroups.length} business groups
            </p>
        </div>
    `;
    
    highFlyersView.innerHTML = html;
}

// Populate Gaps View
function populateGapsView() {
    const gapsView = document.getElementById('gaps-view');
    if (!gapsView || !dashboardData.rolesList) return;
    
    const criticalRoles = dashboardData.rolesList.filter(r => r.health === 'critical');
    const warningRoles = dashboardData.rolesList.filter(r => r.health === 'warning');
    const retirementRoles = dashboardData.rolesList.filter(r => r.retirement);
    
    const html = `
        <div class="view-header">
            <h2>Gap Analysis & Risk Assessment</h2>
        </div>
        
        <div class="kpi-grid">
            <div class="kpi-card alert">
                <div class="kpi-header">
                    <span class="kpi-label">Critical Gaps</span>
                </div>
                <div class="kpi-value">${criticalRoles.length}</div>
                <div class="kpi-change negative">Requires immediate action</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-label">Warning Status</span>
                </div>
                <div class="kpi-value">${warningRoles.length}</div>
                <div class="kpi-change">Needs attention</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-label">Retirement Risk</span>
                </div>
                <div class="kpi-value">${retirementRoles.length}</div>
                <div class="kpi-change">Next 24 months</div>
            </div>
        </div>
        
        <div class="table-card">
            <div class="card-header">
                <h3>Critical Succession Gaps</h3>
            </div>
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Role Title</th>
                            <th>Band</th>
                            <th>Business Group</th>
                            <th>Issue</th>
                            <th>Ready Now</th>
                            <th>Pipeline</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${criticalRoles.map(role => `
                            <tr>
                                <td><strong>${role.title}</strong></td>
                                <td>${role.band}</td>
                                <td>${role.group}</td>
                                <td><span class="badge critical">${role.readyNow === 0 ? 'No candidates' : 'Insufficient pipeline'}</span></td>
                                <td>${role.readyNow}</td>
                                <td>${role.oneTwo + role.threePlus}</td>
                                <td><button class="btn-link" onclick="viewRoleDetails('${role.id}')">View Plan →</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        
        ${retirementRoles.length > 0 ? `
        <div class="table-card">
            <div class="card-header">
                <h3>Retirement Risk Roles</h3>
            </div>
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Role Title</th>
                            <th>Incumbent</th>
                            <th>Retirement Date</th>
                            <th>Ready Now</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${retirementRoles.map(role => `
                            <tr>
                                <td><strong>${role.title}</strong></td>
                                <td>${role.incumbent}</td>
                                <td>${role.retirement}</td>
                                <td>${role.readyNow}</td>
                                <td><span class="badge ${role.readyNow > 0 ? 'warning' : 'critical'}">${role.readyNow > 0 ? 'Covered' : 'At Risk'}</span></td>
                                <td><button class="btn-link" onclick="viewRoleDetails('${role.id}')">View Plan →</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        ` : ''}
    `;
    
    gapsView.innerHTML = html;
}

// Filter roles based on search and filters
function filterRoles() {
    const searchTerm = document.getElementById('roleSearch')?.value.toLowerCase() || '';
    const bandFilter = document.getElementById('bandFilter')?.value || '';
    const groupFilter = document.getElementById('groupFilter')?.value || '';
    const healthFilter = document.getElementById('healthFilter')?.value || '';
    
    const rows = document.querySelectorAll('#rolesTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const band = row.getAttribute('data-band');
        const group = row.getAttribute('data-group');
        const health = row.getAttribute('data-health');
        
        const matchesSearch = !searchTerm || text.includes(searchTerm);
        const matchesBand = !bandFilter || band === bandFilter;
        const matchesGroup = !groupFilter || group === groupFilter;
        const matchesHealth = !healthFilter || health === healthFilter;
        
        if (matchesSearch && matchesBand && matchesGroup && matchesHealth) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// View role details
function viewRoleDetails(roleId) {
    // Open the role profile modal
    showRoleProfile(roleId);
}

// View candidate details
function viewCandidateDetails(candidateName) {
    // Open the candidate profile modal
    showCandidateProfile(candidateName);
}

// Setup table interactions
function setupTableInteractions() {
    // Add click handlers to "View Plan" buttons in overview
    document.querySelectorAll('.btn-link').forEach(btn => {
        if (!btn.onclick) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const row = this.closest('tr');
                const roleTitle = row.querySelector('td:first-child strong')?.textContent;
                if (roleTitle) {
                    const role = dashboardData.rolesList.find(r => r.title === roleTitle);
                    if (role) {
                        viewRoleDetails(role.id);
                    }
                }
            });
        }
    });
}

// Export functions to global scope
window.filterRoles = filterRoles;
window.viewRoleDetails = viewRoleDetails;
window.viewCandidateDetails = viewCandidateDetails;
