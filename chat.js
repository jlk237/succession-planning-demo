// Rule-Based Chat Assistant for Succession Planning Dashboard
// Note: This is a rule-based system, not AI. For production, consider integrating
// with IBM watsonx Assistant or similar AI service for natural language understanding.

class SuccessionChatbot {
    constructor() {
        this.conversationHistory = [];
        this.initializeChat();
    }

    initializeChat() {
        // Add chat window
        const chatWindow = document.createElement('div');
        chatWindow.className = 'chat-window';
        chatWindow.id = 'chatWindow';
        chatWindow.innerHTML = `
            <div class="chat-header">
                <h3>Succession Assistant</h3>
                <button class="chat-close" onclick="chatbot.toggleChat()">×</button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="chat-message bot">
                    <div class="message-content">
                        Hi! I can help you explore your succession data. Try asking:
                        <ul>
                            <li>"What roles have no succession candidates?"</li>
                            <li>"Who are the high flyers?"</li>
                            <li>"Show me Technology coverage"</li>
                            <li>"Which roles have inverted funnels?"</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="chat-note">
                💡 Rule-based assistant • For production, integrate with IBM watsonx Assistant for AI
            </div>
            <div class="chat-input-container">
                <input type="text" id="chatInput" class="chat-input" placeholder="Ask a question...">
                <button class="chat-send" onclick="chatbot.sendMessage()">Send</button>
            </div>
            <div class="chat-suggestions">
                <button class="suggestion-chip" onclick="chatbot.askQuestion('What roles have no succession candidates?')">Critical Gaps</button>
                <button class="suggestion-chip" onclick="chatbot.askQuestion('Who are the high flyers?')">High Flyers</button>
                <button class="suggestion-chip" onclick="chatbot.askQuestion('Show me Technology coverage')">Tech Coverage</button>
            </div>
        `;
        document.body.appendChild(chatWindow);

        // Add enter key support
        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    toggleChat() {
        const chatWindow = document.querySelector('.chat-window');
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open')) {
            document.getElementById('chatInput').focus();
        }
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Simulate thinking
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 500);
    }

    askQuestion(question) {
        document.getElementById('chatInput').value = question;
        this.sendMessage();
    }

    addMessage(content, type) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;
        messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateResponse(question) {
        const lowerQuestion = question.toLowerCase();

        // Critical gaps / no candidates
        if (lowerQuestion.includes('no candidate') || lowerQuestion.includes('critical gap') || lowerQuestion.includes('no succession')) {
            return `I found <strong>12 critical roles</strong> with no succession candidates:
                <ul>
                    <li><strong>VP Technology Strategy</strong> (Band 10, Technology)</li>
                    <li><strong>CFO Americas</strong> (Band 10, Finance)</li>
                    <li><strong>Chief Security Officer</strong> (Band 10, Security)</li>
                    <li>...and 9 more roles</li>
                </ul>
                These require immediate attention. Would you like to see the Gap Analysis view?`;
        }

        // High flyers
        if (lowerQuestion.includes('high flyer') || lowerQuestion.includes('multiple role')) {
            return `I found <strong>34 high flyers</strong> identified for multiple roles:
                <br><br>
                <strong>Top performers:</strong>
                <ul>
                    <li><strong>Sarah Jones</strong> - Ready for 5 roles (Dir Cloud Ops, Band 8)</li>
                    <li><strong>Mike Chen</strong> - Ready for 4 roles (Sr Architect, Band 7)</li>
                    <li><strong>Lisa Park</strong> - Ready for 4 roles (Practice Lead, Band 8)</li>
                </ul>
                These are your key retention priorities. View the High Flyers tab for details.`;
        }

        // Coverage questions
        if (lowerQuestion.includes('coverage') || lowerQuestion.includes('how many')) {
            if (lowerQuestion.includes('technology') || lowerQuestion.includes('tech')) {
                return `<strong>Technology Business Group Coverage:</strong>
                    <ul>
                        <li>Overall: <strong>78%</strong> (needs improvement)</li>
                        <li>Cloud Practice: 82% ✓</li>
                        <li>AI/ML Practice: 75%</li>
                        <li>Security Practice: 71% ⚠️</li>
                        <li>Infrastructure: 69% ⚠️</li>
                    </ul>
                    Security and Infrastructure practices need attention.`;
            }
            return `<strong>Overall IBM Coverage: 87%</strong>
                <br><br>
                By Business Group:
                <ul>
                    <li>Consulting: 92% ✓</li>
                    <li>Finance: 91% ✓</li>
                    <li>Sales: 88% ✓</li>
                    <li>Technology: 78% ⚠️</li>
                    <li>HR: 72% ⚠️</li>
                </ul>
                Technology and HR need focus to reach 90% target.`;
        }

        // Retirement risk
        if (lowerQuestion.includes('retirement') || lowerQuestion.includes('retiring')) {
            return `<strong>8 roles</strong> have incumbents retiring within 2 years:
                <ul>
                    <li>VP Operations (J. Brown, retiring 2027-03) - 5 candidates ✓</li>
                    <li>CFO EMEA (K. White, retiring 2027-08) - 2 candidates ⚠️</li>
                    <li>VP Sales Operations - needs attention</li>
                </ul>
                Most have adequate succession plans, but 2 need immediate focus.`;
        }

        // Inverted funnel
        if (lowerQuestion.includes('inverted') || lowerQuestion.includes('funnel')) {
            return `<strong>2 roles</strong> have inverted funnels (more ready now than 3+ years):
                <ul>
                    <li><strong>CFO Americas:</strong> 3 ready now, 2 in 1-2yr, 1 in 3+yr</li>
                    <li><strong>VP Marketing:</strong> 4 ready now, 3 in 1-2yr, 2 in 3+yr</li>
                </ul>
                This means we're not building enough pipeline. Recommend identifying more 3+ year candidates.`;
        }

        // Band/level questions
        if (lowerQuestion.includes('band') || lowerQuestion.includes('level')) {
            return `<strong>Coverage by Band Level:</strong>
                <ul>
                    <li>Band 10+: 95% ✓ (Executive level well covered)</li>
                    <li>Band 9: 85% ✓</li>
                    <li>Band 8: 75% ⚠️</li>
                    <li>Band 7: 82% ✓</li>
                    <li>Band 6: 90% ✓</li>
                </ul>
                Band 8 (Director level) needs the most attention.`;
        }

        // Specific person
        if (lowerQuestion.includes('sarah jones')) {
            return `<strong>Sarah Jones</strong> is one of our top high flyers:
                <ul>
                    <li>Current: Director Cloud Operations (Band 8)</li>
                    <li>Performance: Exceptional</li>
                    <li>Flight Risk: Low</li>
                    <li>Identified for <strong>5 roles</strong>:</li>
                </ul>
                <ol>
                    <li>VP Cloud Strategy (Band 10) - Ready Now</li>
                    <li>Director Cloud Architecture (Band 9) - Ready Now</li>
                    <li>VP Technology Operations (Band 10) - 1-2 Years</li>
                    <li>Director Infrastructure (Band 9) - Ready Now</li>
                    <li>VP Digital Transformation (Band 10) - 1-2 Years</li>
                </ol>
                She's a key retention priority!`;
        }

        // Export/report
        if (lowerQuestion.includes('export') || lowerQuestion.includes('report') || lowerQuestion.includes('download')) {
            return `You can export data from any view:
                <ul>
                    <li>Click the <strong>"Export"</strong> button at the top right</li>
                    <li>Choose format: Excel, PDF, or CSV</li>
                    <li>Select what to include: current view, filtered data, or all data</li>
                </ul>
                Would you like me to generate a specific report?`;
        }

        // Help/what can you do
        if (lowerQuestion.includes('help') || lowerQuestion.includes('what can you')) {
            return `I can help you with:
                <ul>
                    <li><strong>Find gaps:</strong> "What roles have no candidates?"</li>
                    <li><strong>Identify talent:</strong> "Who are the high flyers?"</li>
                    <li><strong>Check coverage:</strong> "What's the Technology coverage?"</li>
                    <li><strong>Assess risk:</strong> "Show me retirement risks"</li>
                    <li><strong>Analyze funnels:</strong> "Which roles have inverted funnels?"</li>
                    <li><strong>View by level:</strong> "How's Band 8 coverage?"</li>
                    <li><strong>Find people:</strong> "Tell me about Sarah Jones"</li>
                </ul>
                Try clicking the suggestion chips below for quick questions!`;
        }

        // Default response
        return `I understand you're asking about "${question}". 
            <br><br>
            I can help you with:
            <ul>
                <li>Finding succession gaps and critical roles</li>
                <li>Identifying high flyers and talent</li>
                <li>Analyzing coverage by business group or band</li>
                <li>Assessing retirement and flight risks</li>
            </ul>
            Try asking: "What roles have no succession candidates?" or "Who are the high flyers?"`;
    }
}

// Initialize chatbot when page loads
let chatbot;
document.addEventListener('DOMContentLoaded', function() {
    chatbot = new SuccessionChatbot();
});

// Made with Bob
