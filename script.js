// Navigation between views
document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
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
            document.getElementById(`${viewName}-view`).classList.add('active');
        });
    });
    
    // Initialize charts
    initializeCharts();
});

function initializeCharts() {
    // Coverage by Business Group Chart
    const coverageCtx = document.getElementById('coverageChart');
    if (coverageCtx) {
        new Chart(coverageCtx, {
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
                            }
                        },
                        grid: {
                            color: '#E0E0E0'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Pipeline Health Trend Chart
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx) {
        new Chart(trendCtx, {
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
                    pointRadius: 4,
                    pointHoverRadius: 6
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
                            }
                        },
                        grid: {
                            color: '#E0E0E0'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Pipeline Distribution Chart
    const pipelineCtx = document.getElementById('pipelineChart');
    if (pipelineCtx) {
        new Chart(pipelineCtx, {
            type: 'bar',
            data: {
                labels: ['Cloud', 'AI/ML', 'Security', 'Data', 'Infrastructure'],
                datasets: [
                    {
                        label: 'Ready Now',
                        data: [38, 25, 22, 15, 28],
                        backgroundColor: '#24A148'
                    },
                    {
                        label: '1-2 Years',
                        data: [52, 38, 31, 22, 35],
                        backgroundColor: '#0F62FE'
                    },
                    {
                        label: '3+ Years',
                        data: [67, 45, 38, 28, 42],
                        backgroundColor: '#8D8D8D'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + ' candidates';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: false,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        stacked: false,
                        beginAtZero: true,
                        grid: {
                            color: '#E0E0E0'
                        }
                    }
                }
            }
        });
    }
    
    // Risk Distribution Chart
    const riskCtx = document.getElementById('riskChart');
    if (riskCtx) {
        new Chart(riskCtx, {
            type: 'bar',
            data: {
                labels: ['Consulting', 'Technology', 'Sales', 'Finance', 'HR'],
                datasets: [
                    {
                        label: 'Critical Gaps',
                        data: [2, 5, 1, 3, 1],
                        backgroundColor: '#DA1E28'
                    },
                    {
                        label: 'High Risk',
                        data: [4, 8, 5, 4, 2],
                        backgroundColor: '#F1C21B'
                    },
                    {
                        label: 'Retirement Risk',
                        data: [1, 3, 2, 1, 1],
                        backgroundColor: '#FF832B'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + ' roles';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        grid: {
                            color: '#E0E0E0'
                        },
                        ticks: {
                            stepSize: 2
                        }
                    }
                }
            }
        });
    }
}

// Add interactivity to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-link')) {
        e.preventDefault();
        alert('This would navigate to detailed view in the full application.');
    }
    
    if (e.target.classList.contains('btn-primary') && e.target.textContent === 'Create Plan') {
        e.preventDefault();
        alert('This would open the succession plan creation workflow.');
    }
});

// Add filter functionality
const filterSelects = document.querySelectorAll('.filter-select');
filterSelects.forEach(select => {
    select.addEventListener('change', function() {
        console.log('Filter changed:', this.value);
        // In a real app, this would trigger data refresh
    });
});

// Add search functionality
const searchInputs = document.querySelectorAll('.search-input');
searchInputs.forEach(input => {
    input.addEventListener('input', function() {
        console.log('Search query:', this.value);
        // In a real app, this would filter results
    });
});

// Animate KPI cards on load
window.addEventListener('load', function() {
    const kpiCards = document.querySelectorAll('.kpi-card');
    kpiCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
});

// Made with Bob
