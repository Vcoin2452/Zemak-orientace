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
    { name: " Kamčatka", type: "Poloostrovy", coords: [56.0000, 159.0000] },
    { name: "Florida", type: "Poloostrovy", coords: [27.6648, -81.5158] },

    // Islands (Ostrovy)
    { name: "Grónsko", type: "Ostrovy", coords: [72.0000, -40.0000] },
    { name: "Madagaskar", type: "Ostrovy", coords: [-18.7669, 46.8691] },
    { name: "Island", type: "Ostrovy", coords: [64.9631, -19.0208] },
    { name: "Nová Guinea", type: "Ostrovy", coords: [-5.0000, 140.0000] }
];

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
        this.currentUser = localStorage.getItem('geoCurrentUserName') || 'Hráč';

        this.initApp();
    }

    initApp() {
        this.initUI();
        this.initMap();
        this.attachGameListeners();
        this.updateStats();
    }

    initUI() {
        document.getElementById('current-user').textContent = this.currentUser;
        document.getElementById('current-user').style.cursor = 'pointer';
        document.getElementById('current-user').addEventListener('click', () => this.changeNickname());
    }

    changeNickname() {
        const newName = prompt("Zadej svou přezdívku:", this.currentUser);
        if (newName && newName.trim() !== "") {
            this.currentUser = newName.trim();
            localStorage.setItem('geoCurrentUserName', this.currentUser);
            document.getElementById('current-user').textContent = this.currentUser;
        }
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

        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentMode = e.target.dataset.mode;
                this.resetGame();
            });
        });
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
            this.allMarkersGroup.clearLayers();
        }
    }

    updateStats() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('total-questions').textContent = this.questionsCount;
    }

    resetGame() {
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
