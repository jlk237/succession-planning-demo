// Versatility Statistics Widget

function calculateVersatilityStats() {
    if (!window.rawCandidatesData) return null;
    
    // Group candidates by name and count their opportunities
    const candidateMap = {};
    
    window.rawCandidatesData.forEach(opp => {
        if (!candidateMap[opp.candidate_name]) {
            candidateMap[opp.candidate_name] = {
                name: opp.candidate_name,
                currentRole: opp.current_role,
                currentBand: opp.current_band,
                readyNow: [],
                oneTwo: [],
                threePlus: []
            };
        }
        
        if (opp.readiness_timeline === 'Ready Now') {
            candidateMap[opp.candidate_name].readyNow.push(opp);
        } else if (opp.readiness_timeline === '1-2 Years') {
            candidateMap[opp.candidate_name].oneTwo.push(opp);
        } else if (opp.readiness_timeline === '3+ Years') {
            candidateMap[opp.candidate_name].threePlus.push(opp);
        }
    });
    
    // Calculate statistics
    const candidates = Object.values(candidateMap);
    
    const stats = {
        readyNow: {
            candidates: candidates.filter(c => c.readyNow.length > 0).length,
            totalRoles: candidates.reduce((sum, c) => sum + c.readyNow.length, 0),
            avgRoles: 0
        },
        oneTwo: {
            candidates: candidates.filter(c => c.oneTwo.length > 0).length,
            totalRoles: candidates.reduce((sum, c) => sum + c.oneTwo.length, 0),
            avgRoles: 0
        },
        threePlus: {
            candidates: candidates.filter(c => c.threePlus.length > 0).length,
            totalRoles: candidates.reduce((sum, c) => sum + c.threePlus.length, 0),
            avgRoles: 0
        }
    };
    
    // Calculate averages
    stats.readyNow.avgRoles = stats.readyNow.candidates > 0 
        ? (stats.readyNow.totalRoles / stats.readyNow.candidates).toFixed(1) 
        : 0;
    stats.oneTwo.avgRoles = stats.oneTwo.candidates > 0 
        ? (stats.oneTwo.totalRoles / stats.oneTwo.candidates).toFixed(1) 
        : 0;
    stats.threePlus.avgRoles = stats.threePlus.candidates > 0 
        ? (stats.threePlus.totalRoles / stats.threePlus.candidates).toFixed(1) 
        : 0;
    
    // Find top versatile candidates
    const topCandidates = candidates
        .map(c => ({
            ...c,
            totalRoles: c.readyNow.length + c.oneTwo.length + c.threePlus.length
        }))
        .filter(c => c.totalRoles > 1)
        .sort((a, b) => b.totalRoles - a.totalRoles)
        .slice(0, 5);
    
    return {
        stats,
        topCandidates
    };
}

function renderVersatilityWidget() {
    const data = calculateVersatilityStats();
    if (!data) return '';
    
    const { stats, topCandidates } = data;
    
    return `
        <div class="versatility-widget">
            <div class="widget-header">
                <h3>Candidate Versatility Analysis</h3>
                <button class="btn-icon-small" onclick="showVersatilityDetails()">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 4a1 1 0 110-2 1 1 0 010 2zm0 5a1 1 0 110-2 1 1 0 010 2zm0 5a1 1 0 110-2 1 1 0 010 2z"/>
                    </svg>
                </button>
            </div>
            
            <div class="versatility-grid">
                <div class="versatility-card">
                    <div class="versatility-label">Ready Now</div>
                    <div class="versatility-value">${stats.readyNow.candidates}</div>
                    <div class="versatility-meta">candidates</div>
                    <div class="versatility-detail">${stats.readyNow.totalRoles} roles • Avg: ${stats.readyNow.avgRoles}</div>
                </div>
                
                <div class="versatility-card">
                    <div class="versatility-label">1-2 Years</div>
                    <div class="versatility-value">${stats.oneTwo.candidates}</div>
                    <div class="versatility-meta">candidates</div>
                    <div class="versatility-detail">${stats.oneTwo.totalRoles} roles • Avg: ${stats.oneTwo.avgRoles}</div>
                </div>
                
                <div class="versatility-card">
                    <div class="versatility-label">3+ Years</div>
                    <div class="versatility-value">${stats.threePlus.candidates}</div>
                    <div class="versatility-meta">candidates</div>
                    <div class="versatility-detail">${stats.threePlus.totalRoles} roles • Avg: ${stats.threePlus.avgRoles}</div>
                </div>
            </div>
            
            ${topCandidates.length > 0 ? `
            <div class="top-candidates">
                <h4>Top Versatile Candidates</h4>
                <div class="candidates-list-compact">
                    ${topCandidates.map((c, i) => `
                        <div class="candidate-item" onclick="showCandidateProfile('${c.name}')">
                            <span class="rank">${i + 1}</span>
                            <div class="candidate-compact-info">
                                <strong>${c.name}</strong>
                                <span>${c.totalRoles} roles (${c.readyNow.length} now, ${c.oneTwo.length} 1-2yr, ${c.threePlus.length} 3+yr)</span>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M6 4l4 4-4 4"/>
                            </svg>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    `;
}

function showVersatilityDetails() {
    const data = calculateVersatilityStats();
    if (!data) return;
    
    const { stats, topCandidates } = data;
    
    const modalHTML = `
        <div class="profile-modal-overlay" onclick="closeProfileModal(event)">
            <div class="profile-modal" onclick="event.stopPropagation()">
                <div class="profile-modal-header">
                    <div>
                        <button class="btn-back" onclick="closeProfileModal()">← Back</button>
                        <h2>Candidate Versatility Analysis</h2>
                        <p class="role-meta">Detailed breakdown of candidate readiness across roles</p>
                    </div>
                    <button class="btn-close" onclick="closeProfileModal()">×</button>
                </div>
                
                <div class="profile-modal-body">
                    <div class="profile-section">
                        <h3>Summary Statistics</h3>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-label">Ready Now</div>
                                <div class="stat-value">${stats.readyNow.candidates} candidates</div>
                                <div class="stat-detail">${stats.readyNow.totalRoles} total roles</div>
                                <div class="stat-detail">Average: ${stats.readyNow.avgRoles} roles per candidate</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-label">1-2 Years</div>
                                <div class="stat-value">${stats.oneTwo.candidates} candidates</div>
                                <div class="stat-detail">${stats.oneTwo.totalRoles} total roles</div>
                                <div class="stat-detail">Average: ${stats.oneTwo.avgRoles} roles per candidate</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-label">3+ Years</div>
                                <div class="stat-value">${stats.threePlus.candidates} candidates</div>
                                <div class="stat-detail">${stats.threePlus.totalRoles} total roles</div>
                                <div class="stat-detail">Average: ${stats.threePlus.avgRoles} roles per candidate</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="profile-section">
                        <h3>Top Versatile Candidates (${topCandidates.length})</h3>
                        <p class="section-description">Candidates identified for multiple succession opportunities</p>
                        <div class="table-container">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Candidate</th>
                                        <th>Current Role</th>
                                        <th>Band</th>
                                        <th>Total Roles</th>
                                        <th>Ready Now</th>
                                        <th>1-2 Years</th>
                                        <th>3+ Years</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${topCandidates.map((c, i) => `
                                        <tr>
                                            <td><strong>${i + 1}</strong></td>
                                            <td><strong>${c.name}</strong></td>
                                            <td>${c.currentRole}</td>
                                            <td>${c.currentBand}</td>
                                            <td><span class="badge good">${c.totalRoles}</span></td>
                                            <td>${c.readyNow.length}</td>
                                            <td>${c.oneTwo.length}</td>
                                            <td>${c.threePlus.length}</td>
                                            <td><button class="btn-link" onclick="closeProfileModal(); showCandidateProfile('${c.name}')">View Profile →</button></td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Export functions
window.calculateVersatilityStats = calculateVersatilityStats;
window.renderVersatilityWidget = renderVersatilityWidget;
window.showVersatilityDetails = showVersatilityDetails;

// Made with Bob
