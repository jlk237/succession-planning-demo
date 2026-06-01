// Visual Succession Chain Diagram

function renderSuccessionDiagram(roleId) {
    const role = getRoleDetails(roleId);
    if (!role) return '';
    
    const successors = getSuccessorsForRole(roleId);
    
    // Group by readiness
    const readyNow = successors.filter(s => s.readiness_timeline === 'Ready Now');
    const oneTwo = successors.filter(s => s.readiness_timeline === '1-2 Years');
    const threePlus = successors.filter(s => s.readiness_timeline === '3+ Years');
    
    return `
        <div class="succession-diagram">
            <!-- Current Incumbent (Top) -->
            <div class="diagram-level incumbent-level">
                <div class="diagram-node incumbent-node" onclick="showCandidateProfile('${role.incumbent_name}')">
                    <div class="node-icon">👤</div>
                    <div class="node-content">
                        <div class="node-title">${role.role_title}</div>
                        <div class="node-name">${role.incumbent_name}</div>
                        <div class="node-meta">Current Incumbent • ${role.incumbent_tenure}yr</div>
                        ${role.retirement_date ? `<div class="node-badge warning">Retiring ${role.retirement_date}</div>` : ''}
                    </div>
                </div>
            </div>
            
            <!-- Connector Lines -->
            ${successors.length > 0 ? '<div class="diagram-connector"></div>' : ''}
            
            <!-- Successors (Bottom) -->
            ${successors.length > 0 ? `
            <div class="diagram-levels">
                ${readyNow.length > 0 ? `
                <div class="diagram-level">
                    <div class="level-label ready-now">Ready Now (${readyNow.length})</div>
                    <div class="diagram-nodes">
                        ${readyNow.map(successor => `
                            <div class="diagram-node successor-node ready-now" onclick="showCandidateProfile('${successor.candidate_name}')">
                                <div class="node-icon">⭐</div>
                                <div class="node-content">
                                    <div class="node-name">${successor.candidate_name}</div>
                                    <div class="node-meta">${successor.current_role}</div>
                                    <div class="node-score">Score: ${successor.readiness_score}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${oneTwo.length > 0 ? `
                <div class="diagram-level">
                    <div class="level-label one-two">1-2 Years (${oneTwo.length})</div>
                    <div class="diagram-nodes">
                        ${oneTwo.map(successor => `
                            <div class="diagram-node successor-node one-two" onclick="showCandidateProfile('${successor.candidate_name}')">
                                <div class="node-icon">📈</div>
                                <div class="node-content">
                                    <div class="node-name">${successor.candidate_name}</div>
                                    <div class="node-meta">${successor.current_role}</div>
                                    <div class="node-score">Score: ${successor.readiness_score}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${threePlus.length > 0 ? `
                <div class="diagram-level">
                    <div class="level-label three-plus">3+ Years (${threePlus.length})</div>
                    <div class="diagram-nodes">
                        ${threePlus.map(successor => `
                            <div class="diagram-node successor-node three-plus" onclick="showCandidateProfile('${successor.candidate_name}')">
                                <div class="node-icon">🌱</div>
                                <div class="node-content">
                                    <div class="node-name">${successor.candidate_name}</div>
                                    <div class="node-meta">${successor.current_role}</div>
                                    <div class="node-score">Score: ${successor.readiness_score}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
            ` : `
            <div class="diagram-empty">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" stroke="#E0E0E0" stroke-width="2"/>
                    <path d="M24 16v16M16 24h16" stroke="#E0E0E0" stroke-width="2"/>
                </svg>
                <p>No succession candidates identified</p>
            </div>
            `}
        </div>
    `;
}

function showSuccessionDiagram(roleId) {
    const role = getRoleDetails(roleId);
    if (!role) {
        showNotification('Role not found', 'error');
        return;
    }
    
    const modalHTML = `
        <div class="profile-modal-overlay" onclick="closeProfileModal(event)">
            <div class="profile-modal diagram-modal" onclick="event.stopPropagation()">
                <div class="profile-modal-header">
                    <div>
                        <button class="btn-back" onclick="closeProfileModal()">← Back</button>
                        <h2>Succession Chain: ${role.role_title}</h2>
                        <p class="role-meta">Visual representation of succession pipeline</p>
                    </div>
                    <button class="btn-close" onclick="closeProfileModal()">×</button>
                </div>
                
                <div class="profile-modal-body">
                    ${renderSuccessionDiagram(roleId)}
                    
                    <div class="diagram-legend">
                        <h4>Legend</h4>
                        <div class="legend-items">
                            <div class="legend-item">
                                <div class="legend-icon ready-now">⭐</div>
                                <span>Ready Now - Can assume role immediately</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-icon one-two">📈</div>
                                <span>1-2 Years - Development needed</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-icon three-plus">🌱</div>
                                <span>3+ Years - Long-term potential</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="diagram-actions">
                        <button class="btn-secondary" onclick="closeProfileModal(); showRoleProfile('${roleId}')">
                            View Detailed Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Export functions
window.renderSuccessionDiagram = renderSuccessionDiagram;
window.showSuccessionDiagram = showSuccessionDiagram;

// Made with Bob
