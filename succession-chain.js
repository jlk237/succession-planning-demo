// Succession Chain Navigation and Profile Views

// Get all successors for a role
function getSuccessorsForRole(roleId) {
    if (!window.rawCandidatesData) return [];
    
    return window.rawCandidatesData
        .filter(c => c.target_role_id === roleId)
        .sort((a, b) => {
            const tierOrder = {'Ready Now': 1, '1-2 Years': 2, '3+ Years': 3};
            return tierOrder[a.readiness_timeline] - tierOrder[b.readiness_timeline];
        });
}

// Get all opportunities for a candidate
function getOpportunitiesForCandidate(candidateName) {
    if (!window.rawCandidatesData) return [];
    
    return window.rawCandidatesData
        .filter(c => c.candidate_name === candidateName)
        .sort((a, b) => {
            const tierOrder = {'Ready Now': 1, '1-2 Years': 2, '3+ Years': 3};
            return tierOrder[a.readiness_timeline] - tierOrder[b.readiness_timeline];
        });
}

// Get role details
function getRoleDetails(roleId) {
    if (!window.rawRolesData) return null;
    return window.rawRolesData.find(r => r.role_id === roleId);
}

// Get who could replace the current incumbent
function getMySuccessors(personName) {
    if (!window.rawRolesData) return [];
    
    // Find their current role
    const currentRole = window.rawRolesData.find(r => r.incumbent_name === personName);
    if (!currentRole) return [];
    
    // Find who could replace them
    return getSuccessorsForRole(currentRole.role_id);
}

// Show role profile modal
function showRoleProfile(roleId) {
    const role = getRoleDetails(roleId);
    if (!role) {
        showNotification('Role not found', 'error');
        return;
    }
    
    const successors = getSuccessorsForRole(roleId);
    
    // Group successors by readiness
    const readyNow = successors.filter(s => s.readiness_timeline === 'Ready Now');
    const oneTwo = successors.filter(s => s.readiness_timeline === '1-2 Years');
    const threePlus = successors.filter(s => s.readiness_timeline === '3+ Years');
    
    // Find who could move into roles held by successors (downstream)
    const downstreamRoles = new Set();
    successors.forEach(successor => {
        if (successor.current_role_id) {
            downstreamRoles.add(successor.current_role_id);
        }
    });
    
    const modalHTML = `
        <div class="profile-modal-overlay" onclick="closeProfileModal(event)">
            <div class="profile-modal" onclick="event.stopPropagation()">
                <div class="profile-modal-header">
                    <div>
                        <button class="btn-back" onclick="closeProfileModal()">← Back</button>
                        <h2>${role.role_title}</h2>
                        <p class="role-meta">Band ${role.band} • ${role.business_group} • ${role.practice}</p>
                    </div>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <button class="btn-secondary" onclick="closeProfileModal(); showSuccessionDiagram('${roleId}')" title="View visual succession chain">
                            📊 View Diagram
                        </button>
                        <button class="btn-close" onclick="closeProfileModal()">×</button>
                    </div>
                </div>
                
                <div class="profile-modal-body">
                    <!-- Current Incumbent -->
                    <div class="profile-section">
                        <h3>Current Incumbent</h3>
                        <div class="incumbent-card">
                            <div class="incumbent-info">
                                <strong>${role.incumbent_name}</strong>
                                <span>Tenure: ${role.incumbent_tenure} years</span>
                                ${role.retirement_date ? `<span class="badge warning">Retiring ${role.retirement_date}</span>` : ''}
                            </div>
                            <button class="btn-link" onclick="showCandidateProfile('${role.incumbent_name}')">
                                View Profile →
                            </button>
                        </div>
                    </div>
                    
                    <!-- Succession Pipeline -->
                    <div class="profile-section">
                        <h3>Succession Pipeline (${successors.length} candidates)</h3>
                        
                        ${readyNow.length > 0 ? `
                        <div class="succession-tier">
                            <h4>Ready Now (${readyNow.length})</h4>
                            <div class="candidates-list">
                                ${readyNow.map(c => `
                                    <div class="candidate-card">
                                        <div class="candidate-info">
                                            <strong>${c.candidate_name}</strong>
                                            <span>${c.current_role} (Band ${c.current_band})</span>
                                            <span class="score">Score: ${c.readiness_score}</span>
                                        </div>
                                        <button class="btn-link" onclick="showCandidateProfile('${c.candidate_name}')">
                                            View Profile →
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                        
                        ${oneTwo.length > 0 ? `
                        <div class="succession-tier">
                            <h4>1-2 Years (${oneTwo.length})</h4>
                            <div class="candidates-list">
                                ${oneTwo.map(c => `
                                    <div class="candidate-card">
                                        <div class="candidate-info">
                                            <strong>${c.candidate_name}</strong>
                                            <span>${c.current_role} (Band ${c.current_band})</span>
                                            <span class="score">Score: ${c.readiness_score}</span>
                                        </div>
                                        <button class="btn-link" onclick="showCandidateProfile('${c.candidate_name}')">
                                            View Profile →
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                        
                        ${threePlus.length > 0 ? `
                        <div class="succession-tier">
                            <h4>3+ Years (${threePlus.length})</h4>
                            <div class="candidates-list">
                                ${threePlus.map(c => `
                                    <div class="candidate-card">
                                        <div class="candidate-info">
                                            <strong>${c.candidate_name}</strong>
                                            <span>${c.current_role} (Band ${c.current_band})</span>
                                            <span class="score">Score: ${c.readiness_score}</span>
                                        </div>
                                        <button class="btn-link" onclick="showCandidateProfile('${c.candidate_name}')">
                                            View Profile →
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                        
                        ${successors.length === 0 ? '<p class="empty-state">No succession candidates identified</p>' : ''}
                    </div>
                    
                    <!-- Downstream Roles -->
                    ${downstreamRoles.size > 0 ? `
                    <div class="profile-section">
                        <h3>Downstream Roles (Feeder Positions)</h3>
                        <p class="section-description">Roles currently held by candidates for this position</p>
                        <div class="roles-list">
                            ${Array.from(downstreamRoles).map(roleId => {
                                const downstreamRole = getRoleDetails(roleId);
                                if (!downstreamRole) return '';
                                return `
                                    <div class="role-card">
                                        <div class="role-info">
                                            <strong>${downstreamRole.role_title}</strong>
                                            <span>Band ${downstreamRole.band} • ${downstreamRole.business_group}</span>
                                        </div>
                                        <button class="btn-link" onclick="showRoleProfile('${roleId}')">
                                            View Role →
                                        </button>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Show candidate profile modal
function showCandidateProfile(candidateName) {
    const opportunities = getOpportunitiesForCandidate(candidateName);
    
    if (opportunities.length === 0) {
        showNotification('No succession data found for this candidate', 'info');
        return;
    }
    
    // Get candidate's current role info from first opportunity
    const candidateInfo = opportunities[0];
    const mySuccessors = getMySuccessors(candidateName);
    
    // Group opportunities by readiness
    const readyNow = opportunities.filter(o => o.readiness_timeline === 'Ready Now');
    const oneTwo = opportunities.filter(o => o.readiness_timeline === '1-2 Years');
    const threePlus = opportunities.filter(o => o.readiness_timeline === '3+ Years');
    
    const isHighFlyer = opportunities.length >= 3;
    
    const modalHTML = `
        <div class="profile-modal-overlay" onclick="closeProfileModal(event)">
            <div class="profile-modal" onclick="event.stopPropagation()">
                <div class="profile-modal-header">
                    <div>
                        <button class="btn-back" onclick="closeProfileModal()">← Back</button>
                        <h2>${candidateName}</h2>
                        <p class="role-meta">
                            ${candidateInfo.current_role} (Band ${candidateInfo.current_band})
                            ${isHighFlyer ? ' • <span class="badge good">🌟 High Flyer</span>' : ''}
                        </p>
                    </div>
                    <button class="btn-close" onclick="closeProfileModal()">×</button>
                </div>
                
                <div class="profile-modal-body">
                    <!-- Current Position -->
                    <div class="profile-section">
                        <h3>Current Position</h3>
                        <div class="current-role-card">
                            <div class="role-info">
                                <strong>${candidateInfo.current_role}</strong>
                                <span>Band ${candidateInfo.current_band} • ${candidateInfo.business_group}</span>
                            </div>
                            ${candidateInfo.current_role_id ? `
                                <button class="btn-link" onclick="showRoleProfile('${candidateInfo.current_role_id}')">
                                    View Role →
                                </button>
                            ` : ''}
                        </div>
                    </div>
                    
                    <!-- Target Roles -->
                    <div class="profile-section">
                        <h3>Target Roles (${opportunities.length} opportunities)</h3>
                        
                        ${readyNow.length > 0 ? `
                        <div class="succession-tier">
                            <h4>Ready Now (${readyNow.length})</h4>
                            <div class="roles-list">
                                ${readyNow.map(opp => {
                                    const targetRole = getRoleDetails(opp.target_role_id);
                                    return `
                                        <div class="role-card">
                                            <div class="role-info">
                                                <strong>${targetRole ? targetRole.role_title : opp.target_role_id}</strong>
                                                <span>Score: ${opp.readiness_score}</span>
                                                ${targetRole ? `<span>Band ${targetRole.band} • ${targetRole.business_group}</span>` : ''}
                                            </div>
                                            <button class="btn-link" onclick="showRoleProfile('${opp.target_role_id}')">
                                                View Role →
                                            </button>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                        ` : ''}
                        
                        ${oneTwo.length > 0 ? `
                        <div class="succession-tier">
                            <h4>1-2 Years (${oneTwo.length})</h4>
                            <div class="roles-list">
                                ${oneTwo.map(opp => {
                                    const targetRole = getRoleDetails(opp.target_role_id);
                                    return `
                                        <div class="role-card">
                                            <div class="role-info">
                                                <strong>${targetRole ? targetRole.role_title : opp.target_role_id}</strong>
                                                <span>Score: ${opp.readiness_score}</span>
                                                ${targetRole ? `<span>Band ${targetRole.band} • ${targetRole.business_group}</span>` : ''}
                                            </div>
                                            <button class="btn-link" onclick="showRoleProfile('${opp.target_role_id}')">
                                                View Role →
                                            </button>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                        ` : ''}
                        
                        ${threePlus.length > 0 ? `
                        <div class="succession-tier">
                            <h4>3+ Years (${threePlus.length})</h4>
                            <div class="roles-list">
                                ${threePlus.map(opp => {
                                    const targetRole = getRoleDetails(opp.target_role_id);
                                    return `
                                        <div class="role-card">
                                            <div class="role-info">
                                                <strong>${targetRole ? targetRole.role_title : opp.target_role_id}</strong>
                                                <span>Score: ${opp.readiness_score}</span>
                                                ${targetRole ? `<span>Band ${targetRole.band} • ${targetRole.business_group}</span>` : ''}
                                            </div>
                                            <button class="btn-link" onclick="showRoleProfile('${opp.target_role_id}')">
                                                View Role →
                                            </button>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    
                    <!-- My Successors -->
                    ${mySuccessors.length > 0 ? `
                    <div class="profile-section">
                        <h3>My Potential Successors (${mySuccessors.length})</h3>
                        <p class="section-description">Candidates identified for my current role</p>
                        <div class="candidates-list">
                            ${mySuccessors.map(successor => `
                                <div class="candidate-card">
                                    <div class="candidate-info">
                                        <strong>${successor.candidate_name}</strong>
                                        <span>${successor.readiness_timeline} • Score: ${successor.readiness_score}</span>
                                    </div>
                                    <button class="btn-link" onclick="showCandidateProfile('${successor.candidate_name}')">
                                        View Profile →
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Close profile modal
function closeProfileModal(event) {
    if (event && event.target.className !== 'profile-modal-overlay') return;
    
    const modal = document.querySelector('.profile-modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Export functions to global scope
window.showRoleProfile = showRoleProfile;
window.showCandidateProfile = showCandidateProfile;
window.closeProfileModal = closeProfileModal;
window.getSuccessorsForRole = getSuccessorsForRole;
window.getOpportunitiesForCandidate = getOpportunitiesForCandidate;

// Made with Bob
