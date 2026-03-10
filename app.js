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

// Pre-defined users
const USERS = {
    "honza": "mapa123",
    "petr": "kopka",
    "jana": "geodez",
    "martin": "svět",
    "lenka": "hory",
    "lukas": "ostrov",
    "adela": "reka",
    "pavel": "pole",
    "ivana": "město",
    "david": "sopka"
};

class GeoGame {
    constructor() {
        this.map = null;
        this.currentMode = 'find';
        this.score = 0;
        this.questionsCount = 0;
        this.currentTarget = null;
        this.marker = null;
        this.allMarkersGroup = null;
        this.showingAll = false;
        this.lastTargets = [];
        this.currentUser = null;

        this.initApp();
    }

    initApp() {
        this.attachAuthListeners();
        this.checkExistingSession();
    }

    attachAuthListeners() {
        document.getElementById('login-btn').addEventListener('click', () => this.handleLogin());
        document.getElementById('logout-btn').addEventListener('click', () => this.handleLogout());
        document.getElementById('password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleLogin();
        });
    }

    checkExistingSession() {
        const savedUser = localStorage.getItem('geoCurrentUser');
        if (savedUser && USERS[savedUser]) {
            this.loginUser(savedUser);
        }
    }

    handleLogin() {
        const user = document.getElementById('username').value.trim().toLowerCase();
        const pass = document.getElementById('password').value;
        const errorMsg = document.getElementById('login-error');

        if (USERS[user] && USERS[user] === pass) {
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

        // Lazy and safe map initialization
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
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }

    initMap() {
        this.map = L.map('map', {
            center: [20, 0],
            zoom: 3,
            zoomControl: false,
            attributionControl: false
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19
        }).addTo(this.map);

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

        document.getElementById('toggle-all').addEventListener('click', (e) => this.toggleAllMarkers(e));
        document.getElementById('show-leaderboard').addEventListener('click', () => this.showLeaderboard());
        document.getElementById('close-leaderboard').addEventListener('click', () => this.hideLeaderboard());

        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentMode = e.target.dataset.mode;
                this.resetGame();
            });
        });
    }

    toggleAllMarkers(e) {
        this.showingAll = !this.showingAll;
        if (this.showingAll) {
            e.target.classList.add('active');
            e.target.textContent = "Skrýt vše";
            this.allMarkersGroup.clearLayers();
            geoData.forEach(item => {
                const marker = L.circleMarker(item.coords, {
                    radius: 5,
                    color: '#00d2ff',
                    fillOpacity: 0.8
                });

                marker.bindTooltip(item.name, {
                    permanent: true,
                    direction: 'right',
                    className: 'marker-label'
                });

                this.allMarkersGroup.addLayer(marker);
            });
            this.allMarkersGroup.addTo(this.map);
        } else {
            e.target.classList.remove('active');
            e.target.textContent = "Zobrazit vše";
            this.map.removeLayer(this.allMarkersGroup);
        }
    }

    showLeaderboard() {
        const scores = JSON.parse(localStorage.getItem('geoScores') || '{}');
        const list = Object.keys(USERS).map(name => ({
            name: name,
            score: scores[name] || 0
        })).sort((a, b) => b.score - a.score);

        const tbody = document.getElementById('leaderboard-body');
        tbody.innerHTML = '';
        list.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}.</td>
                <td style="${entry.name === this.currentUser ? 'color: var(--primary); font-weight: 800;' : ''}">${entry.name}</td>
                <td>${entry.score}</td>
            `;
            tbody.appendChild(row);
        });

        document.getElementById('leaderboard-overlay').classList.remove('hidden');
    }

    hideLeaderboard() {
        document.getElementById('leaderboard-overlay').classList.add('hidden');
    }

    saveCurrentScore() {
        if (!this.currentUser) return;
        const scores = JSON.parse(localStorage.getItem('geoScores') || '{}');
        const best = scores[this.currentUser] || 0;
        if (this.score > best) {
            scores[this.currentUser] = this.score;
            localStorage.setItem('geoScores', JSON.stringify(scores));
        }
    }

    resetGame() {
        this.saveCurrentScore();
        this.score = 0;
        this.questionsCount = 0;
        this.currentTarget = null;
        if (this.marker) this.map.removeLayer(this.marker);
        this.updateStats();

        const qPanel = document.getElementById('question-panel');
        qPanel.querySelector('#question-text').textContent = "Připraven?";
        qPanel.querySelector('#sub-text').textContent = "Tvé skóre se ukládá do žebříčku!";

        document.getElementById('start-game').classList.remove('hidden');
        document.getElementById('identify-options').classList.add('hidden');
        document.getElementById('type-in-container').classList.add('hidden');
        document.getElementById('feedback-panel').classList.add('hidden');
    }

    startNewGame() {
        this.score = 0;
        this.questionsCount = 0;
        document.getElementById('start-game').classList.add('hidden');
        this.nextQuestion();
    }

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
        } else if (this.currentMode === 'identify') {
            this.setupIdentifyMode();
        } else if (this.currentMode === 'typein') {
            this.setupTypeinMode();
        }
    }

    setupIdentifyMode() {
        document.getElementById('question-text').textContent = "Co je to?";
        document.getElementById('sub-text').textContent = "Vyber z nabídky";
        this.marker = L.marker(this.currentTarget.coords).addTo(this.map);
        this.map.panTo(this.currentTarget.coords);

        const options = this.generateOptions(this.currentTarget);
        const container = document.getElementById('options-container');
        container.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt.name;
            btn.addEventListener('click', () => this.checkIdentifyAnswer(opt));
            container.appendChild(btn);
        });
        document.getElementById('identify-options').classList.remove('hidden');
    }

    setupTypeinMode() {
        document.getElementById('question-text').textContent = "Napiš název";
        document.getElementById('sub-text').textContent = "Bydliště?";
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
        if (normalize(input) === normalize(correct)) {
            this.handleCorrect();
        } else {
            this.handleWrong();
        }
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
        const threshold = 8 / Math.pow(1.5, this.map.getZoom());
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
        if (selected.name === this.currentTarget.name) {
            this.handleCorrect();
        } else {
            this.handleWrong();
        }
        setTimeout(() => this.nextQuestion(), 1500);
    }

    handleCorrect() {
        this.score += 10;
        this.showFeedback("Správně!", "correct");
        this.saveCurrentScore();
        this.updateStats();
    }

    handleWrong() {
        this.showFeedback(`Špatně! Je to: ${this.currentTarget.name}`, "wrong");
    }

    showFeedback(text, type) {
        const panel = document.getElementById('feedback-panel');
        const msg = document.getElementById('feedback-message');
        msg.textContent = text;
        msg.className = type;
        panel.classList.remove('hidden');
        panel.classList.add('active');
        setTimeout(() => {
            panel.classList.add('hidden');
            panel.classList.remove('active');
        }, 1400);
    }

    updateStats() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('total-questions').textContent = this.questionsCount;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new GeoGame();
});
