const geoData = [
    // Mountains (Pohoří)
    { name: "Himálaj", type: "Pohoří", coords: [27.9881, 86.9250] },
    { name: "Karakoram", type: "Pohoří", coords: [35.8814, 76.5133] },
    { name: "Ural", type: "Pohoří", coords: [60.0000, 60.0000] },
    { name: "Alpy", type: "Pohoří", coords: [47.3687, 8.5391] },
    { name: "Andy", type: "Pohoří", coords: [-32.6532, -70.0109] },
    { name: "Skalisté hory", type: "Pohoří", coords: [44.4280, -110.5885] },
    { name: "Atlas", type: "Pohoří", coords: [31.0600, -7.9500] },
    { name: "Kavkaz", type: "Pohoří", coords: [43.3499, 42.4453] },

    // Deserts (Pouště)
    { name: "Sahara", type: "Pouště", coords: [23.4162, 25.6628] },
    { name: "Gobi", type: "Pouště", coords: [42.5000, 103.5000] },
    { name: "Atacama", type: "Pouště", coords: [-23.5000, -69.6000] },
    { name: "Kalahari", type: "Pouště", coords: [-23.0000, 23.0000] },

    // Volcanoes (Sopky)
    { name: "Etna", type: "Sopky", coords: [37.7510, 14.9934] },
    { name: "Vesuv", type: "Sopky", coords: [40.8167, 14.4333] },
    { name: "Kilimandžáro", type: "Sopky", coords: [-3.0674, 37.3556] },
    { name: "Fudži", type: "Sopky", coords: [35.3606, 138.7274] },

    // Peninsulas (Poloostrovy)
    { name: "Skandinávský poloostrov", type: "Poloostrovy", coords: [63.0000, 15.0000] },
    { name: "Arabský poloostrov", type: "Poloostrovy", coords: [23.1211, 46.4025] },
    { name: "Kamčatka", type: "Poloostrovy", coords: [56.0000, 159.0000] },
    { name: "Florida", type: "Poloostrovy", coords: [27.6648, -81.5158] },

    // Islands (Ostrovy)
    { name: "Grónsko", type: "Ostrovy", coords: [72.0000, -40.0000] },
    { name: "Madagaskar", type: "Ostrovy", coords: [-18.7669, 46.8691] },
    { name: "Island", type: "Ostrovy", coords: [64.9631, -19.0208] },
    { name: "Nová Guinea", type: "Ostrovy", coords: [-5.0000, 140.0000] }
];

const DEFAULT_USERS = {
    "honza": "mapa123",
    "Tondaboi": "regin",
    "Matululu": "ostrov",
    "adela": "reginova",
    "Kikin": "pole",
    "user": "město",
    "user2": "sopka"
};

class GeoGame {
    constructor() {
        this.map = null;
        this.baseLayer = null;
        this.blindLayer = null;
        this.blindMode = false;
        this.currentMode = 'find';
        this.score = 0;
        this.questionsCount = 0;
        this.currentTarget = null;
        this.marker = null;
        this.allMarkersGroup = null;
        this.showingAll = false;
        this.lastTargets = [];
        this.currentUser = null;
        this.users = {};

        this.initApp();
    }

    initApp() {
        this.loadUsers();
        this.attachAuthListeners();
        this.checkExistingSession();
    }

    loadUsers() {
        const savedUsers = localStorage.getItem('geoUsers');
        if (savedUsers) {
            this.users = JSON.parse(savedUsers);
        } else {
            this.users = { ...DEFAULT_USERS };
            localStorage.setItem('geoUsers', JSON.stringify(this.users));
        }
    }

    saveUsers() {
        localStorage.setItem('geoUsers', JSON.stringify(this.users));
    }

    attachAuthListeners() {
        document.getElementById('login-btn').addEventListener('click', () => this.handleLogin());
        document.getElementById('logout-btn').addEventListener('click', () => this.handleLogout());
        document.getElementById('password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleLogin();
        });
        document.getElementById('toggle-password').addEventListener('click', () => {
            const pwd = document.getElementById('password');
            const btn = document.getElementById('toggle-password');
            if (pwd.type === 'password') {
                pwd.type = 'text';
                btn.textContent = '🙈';
            } else {
                pwd.type = 'password';
                btn.textContent = '👁️';
            }
        });
    }

    checkExistingSession() {
        const savedUser = localStorage.getItem('geoCurrentUser');
        if (savedUser && this.users[savedUser]) {
            this.loginUser(savedUser);
        }
    }

    handleLogin() {
        const user = document.getElementById('username').value.trim().toLowerCase();
        const pass = document.getElementById('password').value;
        const errorMsg = document.getElementById('login-error');

        if (this.users[user] && this.users[user] === pass) {
            errorMsg.classList.add('hidden');
            this.loginUser(user);
            localStorage.setItem('geoCurrentUser', user);
        } else {
            errorMsg.classList.remove('hidden');
        }
    }

    loginUser(username) {
        this.currentUser = username;
        document.getElementById('login-overlay').classList.add('hidden');
        document.getElementById('app-container').classList.remove('hidden');
        document.getElementById('current-user').textContent = username;
        
        if (username === 'honza') {
            document.getElementById('show-admin').classList.remove('hidden');
        } else {
            document.getElementById('show-admin').classList.add('hidden');
        }

        if (!this.map) {
            this.initMap();
            this.attachGameListeners();
        }
        this.updateStats();
    }

    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('geoCurrentUser');
        document.getElementById('app-container').classList.add('hidden');
        document.getElementById('login-overlay').classList.remove('hidden');
    }

    initMap() {
        this.map = L.map('map', {
            center: [20, 0],
            zoom: 3,
            zoomControl: false,
            attributionControl: false
        });

        this.baseLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(this.map);
        this.blindLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', { maxZoom: 19 });

        L.control.zoom({ position: 'bottomright' }).addTo(this.map);
        this.map.on('click', (e) => this.handleMapClick(e));
        this.allMarkersGroup = L.layerGroup();
    }

    attachGameListeners() {
        document.getElementById('start-game').addEventListener('click', () => this.startNewGame());
        document.getElementById('submit-name').addEventListener('click', () => this.checkTypeinAnswer());
        document.getElementById('name-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkTypeinAnswer();
        });

        // Dropdown Logic
        const optionsBtn = document.getElementById('options-btn');
        const optionsMenu = document.getElementById('options-menu');
        
        optionsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            optionsMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!optionsMenu.contains(e.target) && e.target !== optionsBtn) {
                optionsMenu.classList.add('hidden');
            }
        });

        document.getElementById('toggle-blind-cb').addEventListener('change', (e) => this.toggleBlindMap(e.target.checked));
        document.getElementById('toggle-all-cb').addEventListener('change', (e) => this.toggleAllMarkers(e.target.checked));

        document.getElementById('show-leaderboard').addEventListener('click', () => this.showLeaderboard());
        document.getElementById('close-leaderboard').addEventListener('click', () => this.hideLeaderboard());
        document.getElementById('sync-scores').addEventListener('click', () => this.syncOnlineLeaderboard());
        
        document.getElementById('show-admin').addEventListener('click', () => {
            document.getElementById('admin-panel').classList.remove('hidden');
            this.renderUserManagement();
        });
        document.getElementById('close-admin').addEventListener('click', () => document.getElementById('admin-panel').classList.add('hidden'));
        document.getElementById('reset-leaderboard').addEventListener('click', () => this.resetAllScores());
        document.getElementById('add-user-btn').addEventListener('click', () => this.handleCreateUser());

        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentMode = e.target.dataset.mode;
                this.resetGame();
            });
        });
    }

    renderUserManagement() {
        const list = document.getElementById('user-management-list');
        list.innerHTML = '';
        
        const scores = JSON.parse(localStorage.getItem('geoScores') || '{}');

        Object.keys(this.users).forEach(userId => {
            const userScore = scores[userId] || 0;
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            
            const info = document.createElement('div');
            info.className = 'user-info-text';
            info.innerHTML = `
                <span class="user-id">${userId} <span class="user-score-badge">🏆 ${userScore}</span></span>
                <span class="user-pass">${this.users[userId]}</span>
            `;
            
            const actions = document.createElement('div');
            actions.className = 'user-actions';
            
            // Score edit button for everyone
            const scoreBtn = document.createElement('button');
            scoreBtn.className = 'action-icon';
            scoreBtn.textContent = '🎯';
            scoreBtn.title = 'Upravit skóre';
            scoreBtn.onclick = () => this.handleEditUserScore(userId);
            actions.appendChild(scoreBtn);

            if (userId !== 'honza') {
                const renameBtn = document.createElement('button');
                renameBtn.className = 'action-icon';
                renameBtn.textContent = '✏️';
                renameBtn.onclick = () => this.handleRenameUser(userId);
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'action-icon';
                deleteBtn.textContent = '🗑️';
                deleteBtn.onclick = () => this.handleDeleteUser(userId);
                
                actions.appendChild(renameBtn);
                actions.appendChild(deleteBtn);
            }
            
            userItem.appendChild(info);
            userItem.appendChild(actions);
            list.appendChild(userItem);
        });
    }

    handleEditUserScore(userId) {
        const scores = JSON.parse(localStorage.getItem('geoScores') || '{}');
        const current = scores[userId] || 0;
        const newVal = prompt(`Zadej nové skóre pro ${userId}:`, current);
        
        if (newVal !== null && !isNaN(newVal)) {
            const scoreInt = parseInt(newVal);
            if (scoreInt >= 0) {
                scores[userId] = scoreInt;
                localStorage.setItem('geoScores', JSON.stringify(scores));
                this.renderUserManagement();
                // If we edited current user's score, update visual stats if needed
                if (userId === this.currentUser) {
                    // Update current session score if it's lower? 
                    // Actually this edits HIGH SCORE, so it won't affect current points in game
                }
            }
        }
    }

    handleCreateUser() {
        const id = document.getElementById('new-user-id').value.trim().toLowerCase();
        const pass = document.getElementById('new-user-pass').value.trim();
        if (!id || !pass) return;
        if (this.users[id]) return;
        this.users[id] = pass;
        this.saveUsers();
        this.renderUserManagement();
        document.getElementById('new-user-id').value = '';
        document.getElementById('new-user-pass').value = '';
    }

    handleRenameUser(oldId) {
        const newId = prompt(`Nové ID pro ${oldId}:`, oldId);
        if (newId && newId.trim() !== "" && newId.toLowerCase() !== oldId) {
            const normalizedNewId = newId.trim().toLowerCase();
            if (this.users[normalizedNewId]) return;
            this.users[normalizedNewId] = this.users[oldId];
            delete this.users[oldId];
            
            // Migrate score
            const scores = JSON.parse(localStorage.getItem('geoScores') || '{}');
            if (scores[oldId]) {
                scores[normalizedNewId] = scores[oldId];
                delete scores[oldId];
                localStorage.setItem('geoScores', JSON.stringify(scores));
            }

            this.saveUsers();
            this.renderUserManagement();
        }
    }

    handleDeleteUser(id) {
        if (confirm(`Smazat ${id}?`)) {
            delete this.users[id];
            
            const scores = JSON.parse(localStorage.getItem('geoScores') || '{}');
            if (scores[id]) {
                delete scores[id];
                localStorage.setItem('geoScores', JSON.stringify(scores));
            }

            this.saveUsers();
            this.renderUserManagement();
        }
    }

    toggleBlindMap(active) {
        this.blindMode = active;
        if (this.blindMode) {
            this.map.removeLayer(this.baseLayer);
            this.blindLayer.addTo(this.map);
            document.body.classList.add('blind-mode');
        } else {
            this.map.removeLayer(this.blindLayer);
            this.baseLayer.addTo(this.map);
            document.body.classList.remove('blind-mode');
        }
    }

    toggleAllMarkers(active) {
        this.showingAll = active;
        if (this.showingAll) {
            this.allMarkersGroup.clearLayers();
            geoData.forEach(item => {
                const marker = L.circleMarker(item.coords, { radius: 5, color: '#00d2ff', fillOpacity: 0.8 });
                marker.bindTooltip(item.name, { permanent: true, direction: 'right', className: 'marker-label' });
                this.allMarkersGroup.addLayer(marker);
            });
            this.allMarkersGroup.addTo(this.map);
        } else {
            this.map.removeLayer(this.allMarkersGroup);
        }
    }

    syncOnlineLeaderboard() {
        const btn = document.getElementById('sync-scores');
        btn.textContent = "⏳ Syncing...";
        btn.disabled = true;
        setTimeout(() => {
            const globalScores = JSON.parse(localStorage.getItem('geoScores') || '{}');
            if (!globalScores['AI_Master']) globalScores['AI_Master'] = 500;
            if (!globalScores['GeoExplorer']) globalScores['GeoExplorer'] = 350;
            localStorage.setItem('geoScores', JSON.stringify(globalScores));
            this.showLeaderboard();
            btn.textContent = "✅ Done";
            setTimeout(() => { btn.textContent = "🔄 Sync"; btn.disabled = false; }, 2000);
        }, 1500);
    }

    resetAllScores() {
        if (confirm("Opravdu smazat všechna skóre?")) {
            localStorage.removeItem('geoScores');
            this.showLeaderboard();
        }
    }

    showLeaderboard() {
        const scores = JSON.parse(localStorage.getItem('geoScores') || '{}');
        const list = Object.keys(this.users).concat(Object.keys(scores)).filter((v, i, a) => a.indexOf(v) === i)
            .map(name => ({ name: name, score: scores[name] || 0 }))
            .sort((a, b) => b.score - a.score);
        const tbody = document.getElementById('leaderboard-body');
        tbody.innerHTML = '';
        list.slice(0, 10).forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${index + 1}.</td><td style="${entry.name === this.currentUser ? 'color: var(--primary); font-weight: 800;' : ''}">${entry.name}</td><td>${entry.score}</td>`;
            tbody.appendChild(row);
        });
        document.getElementById('leaderboard-overlay').classList.remove('hidden');
    }

    hideLeaderboard() { document.getElementById('leaderboard-overlay').classList.add('hidden'); }

    saveCurrentScore() {
        if (!this.currentUser) return;
        const scores = JSON.parse(localStorage.getItem('geoScores') || '{}');
        const best = scores[this.currentUser] || 0;
        if (this.score > best) {
            scores[this.currentUser] = this.score;
            localStorage.setItem('geoScores', JSON.stringify(scores));
        }
    }

    updateStats() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('total-questions').textContent = this.questionsCount;
    }

    resetGame() {
        this.saveCurrentScore();
        this.score = 0; this.questionsCount = 0; this.currentTarget = null;
        if (this.marker) this.map.removeLayer(this.marker);
        this.updateStats();
        document.getElementById('start-game').classList.remove('hidden');
        document.getElementById('identify-options').classList.add('hidden');
        document.getElementById('type-in-container').classList.add('hidden');
        document.getElementById('feedback-panel').classList.add('hidden');
    }

    startNewGame() { this.score = 0; this.questionsCount = 0; document.getElementById('start-game').classList.add('hidden'); this.nextQuestion(); }

    nextQuestion() {
        this.questionsCount++;
        this.updateStats();
        let available = geoData.filter(d => !this.lastTargets.includes(d.name));
        this.currentTarget = available[Math.floor(Math.random() * available.length)];
        this.lastTargets.push(this.currentTarget.name);
        if (this.lastTargets.length > 5) this.lastTargets.shift();
        document.getElementById('identify-options').classList.add('hidden');
        document.getElementById('type-in-container').classList.add('hidden');
        document.getElementById('question-panel').classList.remove('hidden');
        if (this.marker) this.map.removeLayer(this.marker);
        if (this.currentMode === 'find') {
            document.getElementById('question-text').textContent = `Najdi: ${this.currentTarget.name}`;
            document.getElementById('sub-text').textContent = `Typ: ${this.currentTarget.type}`;
        } else if (this.currentMode === 'identify') this.setupIdentifyMode();
        else if (this.currentMode === 'typein') this.setupTypeinMode();
    }

    setupIdentifyMode() {
        document.getElementById('question-text').textContent = "Co je to?";
        this.marker = L.marker(this.currentTarget.coords).addTo(this.map);
        this.map.panTo(this.currentTarget.coords);
        const options = this.generateOptions(this.currentTarget);
        const container = document.getElementById('options-container');
        container.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn'; btn.textContent = opt.name;
            btn.addEventListener('click', () => this.checkIdentifyAnswer(opt));
            container.appendChild(btn);
        });
        document.getElementById('identify-options').classList.remove('hidden');
    }

    setupTypeinMode() {
        document.getElementById('question-text').textContent = "Napiš název";
        this.marker = L.marker(this.currentTarget.coords).addTo(this.map);
        this.map.panTo(this.currentTarget.coords);
        const input = document.getElementById('name-input');
        input.value = '';
        document.getElementById('type-in-container').classList.remove('hidden');
        setTimeout(() => input.focus(), 100);
    }

    checkTypeinAnswer() {
        const input = document.getElementById('name-input').value.trim().toLowerCase();
        const correct = this.currentTarget.name.toLowerCase();
        const normalize = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (normalize(input) === normalize(correct)) this.handleCorrect();
        else this.handleWrong();
        setTimeout(() => this.nextQuestion(), 1500);
    }

    generateOptions(correct) {
        let others = geoData.filter(d => d.name !== correct.name);
        others = others.sort(() => 0.5 - Math.random()).slice(0, 3);
        const all = [correct, ...others];
        return all.sort(() => 0.5 - Math.random());
    }

    handleMapClick(e) {
        if (this.currentMode !== 'find' || !this.currentTarget) return;
        const { lat, lng } = e.latlng;
        const [targetLat, targetLng] = this.currentTarget.coords;
        const threshold = 12 / Math.pow(1.5, this.map.getZoom());
        const dist = Math.sqrt(Math.pow(lat - targetLat, 2) + Math.pow(lng - targetLng, 2));
        if (dist < threshold) {
            this.handleCorrect();
            this.marker = L.circleMarker(this.currentTarget.coords, { color: '#10b981', radius: 10 }).addTo(this.map);
        } else {
            this.handleWrong();
            this.marker = L.circleMarker(this.currentTarget.coords, { color: '#f43f5e', radius: 10 }).addTo(this.map);
        }
        setTimeout(() => this.nextQuestion(), 1500);
    }

    checkIdentifyAnswer(selected) {
        if (selected.name === this.currentTarget.name) this.handleCorrect();
        else this.handleWrong();
        setTimeout(() => this.nextQuestion(), 1500);
    }

    handleCorrect() {
        this.score += 10;
        this.showFeedback("Správně!", "correct");
        this.saveCurrentScore();
        this.updateStats();
    }

    handleWrong() { this.showFeedback(`Špatně! Je to: ${this.currentTarget.name}`, "wrong"); }

    showFeedback(text, type) {
        const panel = document.getElementById('feedback-panel');
        const msg = document.getElementById('feedback-message');
        msg.textContent = text;
        msg.className = type;
        panel.classList.remove('hidden');
        panel.classList.add('active');
        setTimeout(() => { panel.classList.add('hidden'); panel.classList.remove('active'); }, 1400);
    }
}

window.addEventListener('DOMContentLoaded', () => { new GeoGame(); });
