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
    { name: "Hindúkuš", type: "Pohoří", coords: [35.0000, 71.0000] },
    { name: "Pamir", type: "Pohoří", coords: [38.2000, 73.0000] },
    { name: "Ťan-šan", type: "Pohoří", coords: [42.0000, 80.0000] },
    { name: "Altaj", type: "Pohoří", coords: [49.0000, 89.0000] },
    { name: "Zagros", type: "Pohoří", coords: [33.0000, 47.0000] },
    { name: "Taurus", type: "Pohoří", coords: [37.0000, 33.0000] },
    { name: "Dračí hory", type: "Pohoří", coords: [-29.0000, 29.0000] },
    { name: "Tibesti", type: "Pohoří", coords: [20.0000, 18.0000] },
    { name: "Etiopská vysočina", type: "Pohoří", coords: [9.0000, 39.0000] },
    { name: "Skandinávské pohoří", type: "Pohoří", coords: [65.0000, 14.0000] },
    { name: "Pyreneje", type: "Pohoří", coords: [42.6700, 1.0000] },
    { name: "Apeniny", type: "Pohoří", coords: [43.0000, 13.0000] },
    { name: "Karpaty", type: "Pohoří", coords: [47.0000, 25.0000] },
    { name: "Dinárské hory", type: "Pohoří", coords: [43.0000, 18.0000] },
    { name: "Balkán", type: "Pohoří", coords: [43.2000, 25.0000] },
    { name: "Sierra Nevada (Španělsko)", type: "Pohoří", coords: [37.0500, -3.3000] },
    { name: "Appalačské pohoří", type: "Pohoří", coords: [36.0000, -82.0000] },
    { name: "Kordillery", type: "Pohoří", coords: [45.0000, -115.0000] },
    { name: "Guyanská vysočina", type: "Pohoří", coords: [5.0000, -60.0000] },
    { name: "Brazilská vysočina", type: "Pohoří", coords: [-15.0000, -45.0000] },
    { name: "Patagonské Andy", type: "Pohoří", coords: [-45.0000, -72.0000] },
    { name: "Velké předělové pohoří", type: "Pohoří", coords: [-25.0000, 147.0000] },

    // Volcanoes (Sopky / Vrcholy)
    { name: "Etna", type: "Sopky", coords: [37.7510, 14.9934] },
    { name: "Vesuv", type: "Sopky", coords: [40.8167, 14.4333] },
    { name: "Kilimandžáro", type: "Sopky", coords: [-3.0674, 37.3556] },
    { name: "Fudži", type: "Sopky", coords: [35.3606, 138.7274] },
    { name: "Stromboli", type: "Sopky", coords: [38.7892, 15.2131] },
    { name: "Hekla", type: "Sopky", coords: [63.9922, -19.6658] },
    { name: "Mount Kenya", type: "Sopky", coords: [-0.1500, 37.3000] },
    { name: "Krakatoa", type: "Sopky", coords: [-6.1020, 105.4230] },
    { name: "Mount St. Helens", type: "Sopky", coords: [46.1914, -122.1944] },
    { name: "Mount Rainier", type: "Sopky", coords: [46.8523, -121.7603] },
    { name: "Popocatépetl", type: "Sopky", coords: [19.0225, -98.6278] },
    { name: "Cotopaxi", type: "Sopky", coords: [-0.6830, -78.4380] },
    { name: "Chimborazo", type: "Sopky", coords: [-1.4693, -78.8169] },
    { name: "Mauna Kea", type: "Sopky", coords: [19.8206, -155.4681] },

    // Peninsulas (Poloostrovy)
    { name: "Skandinávský poloostrov", type: "Poloostrovy", coords: [63.0000, 15.0000] },
    { name: "Arabský poloostrov", type: "Poloostrovy", coords: [23.1211, 46.4025] },
    { name: "Kamčatka", type: "Poloostrovy", coords: [56.0000, 159.0000] },
    { name: "Florida", type: "Poloostrovy", coords: [27.6648, -81.5158] },
    { name: "Somálský poloostrov", type: "Poloostrovy", coords: [9.0000, 49.0000] },
    { name: "Labrador", type: "Poloostrovy", coords: [54.0000, -62.0000] },
    { name: "Kalifornský poloostrov", type: "Poloostrovy", coords: [26.0000, -112.0000] },
    { name: "Aljašský poloostrov", type: "Poloostrovy", coords: [57.0000, -158.0000] },
    { name: "Yucatán", type: "Poloostrovy", coords: [20.0000, -89.0000] },
    { name: "Arnhemská země", type: "Poloostrovy", coords: [-13.0000, 134.0000] },
    { name: "Yorský poloostrov", type: "Poloostrovy", coords: [-13.0000, 143.0000] },
    { name: "Jutský poloostrov", type: "Poloostrovy", coords: [56.0000, 9.0000] },
    { name: "Pyrenejský poloostrov", type: "Poloostrovy", coords: [40.0000, -4.0000] },
    { name: "Apeninský poloostrov", type: "Poloostrovy", coords: [42.0000, 14.0000] },
    { name: "Balkánský poloostrov", type: "Poloostrovy", coords: [42.0000, 22.0000] },
    { name: "Peloponés", type: "Poloostrovy", coords: [37.5000, 22.0000] },
    { name: "Krymský poloostrov", type: "Poloostrovy", coords: [45.0000, 34.0000] },
    { name: "Kola", type: "Poloostrovy", coords: [67.0000, 36.0000] },
    { name: "Bretaňský poloostrov", type: "Poloostrovy", coords: [48.0000, -3.0000] },
    { name: "Malá Asie (Anatolie)", type: "Poloostrovy", coords: [39.0000, 33.0000] },
    { name: "Sinajský poloostrov", type: "Poloostrovy", coords: [29.5000, 33.8000] },
    { name: "Přední Indie", type: "Poloostrovy", coords: [20.0000, 78.0000] },
    { name: "Zadní Indie", type: "Poloostrovy", coords: [15.0000, 102.0000] },
    { name: "Tajmyr", type: "Poloostrovy", coords: [74.0000, 100.0000] },
    { name: "Jamal", type: "Poloostrovy", coords: [70.0000, 70.0000] },
    { name: "Korejský poloostrov", type: "Poloostrovy", coords: [37.5000, 127.0000] },
    { name: "Čukotský poloostrov", type: "Poloostrovy", coords: [66.0000, -172.0000] },

    // Islands (Ostrovy)
    { name: "Grónsko", type: "Ostrovy", coords: [72.0000, -40.0000] },
    { name: "Madagaskar", type: "Ostrovy", coords: [-18.7669, 46.8691] },
    { name: "Island", type: "Ostrovy", coords: [64.9631, -19.0208] },
    { name: "Nová Guinea", type: "Ostrovy", coords: [-5.0000, 140.0000] },
    { name: "Velká Británie", type: "Ostrovy", coords: [54.0000, -2.0000] },
    { name: "Irsko", type: "Ostrovy", coords: [53.0000, -8.0000] },
    { name: "Sicílie", type: "Ostrovy", coords: [37.5000, 14.2000] },
    { name: "Sardinie", type: "Ostrovy", coords: [40.0000, 9.0000] },
    { name: "Korsika", type: "Ostrovy", coords: [42.1500, 9.1400] },
    { name: "Kréta", type: "Ostrovy", coords: [35.2000, 24.8000] },
    { name: "Kypr", type: "Ostrovy", coords: [35.0000, 33.0000] },
    { name: "Nová Země", type: "Ostrovy", coords: [74.0000, 56.0000] },
    { name: "Špicberky", type: "Ostrovy", coords: [78.0000, 20.0000] },
    { name: "Srí Lanka", type: "Ostrovy", coords: [7.8731, 80.7718] },
    { name: "Sumatra", type: "Ostrovy", coords: [-0.5897, 101.3431] },
    { name: "Jáva", type: "Ostrovy", coords: [-7.4897, 110.0000] },
    { name: "Borneo", type: "Ostrovy", coords: [0.9619, 114.5548] },
    { name: "Sulawesi", type: "Ostrovy", coords: [-2.0000, 121.0000] },
    { name: "Tchaj-wan", type: "Ostrovy", coords: [23.5000, 121.0000] },
    { name: "Honšú", type: "Ostrovy", coords: [36.0000, 138.0000] },
    { name: "Hokkaidó", type: "Ostrovy", coords: [43.0000, 142.0000] },
    { name: "Kjúšú", type: "Ostrovy", coords: [33.0000, 131.0000] },
    { name: "Šikoku", type: "Ostrovy", coords: [33.7500, 133.5000] },
    { name: "Sachalin", type: "Ostrovy", coords: [51.0000, 143.0000] },
    { name: "Tasmánie", type: "Ostrovy", coords: [-42.0000, 147.0000] },
    { name: "Nový Zéland", type: "Ostrovy", coords: [-41.0000, 174.0000] },
    { name: "Kuba", type: "Ostrovy", coords: [21.5000, -80.0000] },
    { name: "Hispaniola", type: "Ostrovy", coords: [19.0000, -71.0000] },
    { name: "Jamajka", type: "Ostrovy", coords: [18.1667, -77.3] },
    { name: "Portoriko", type: "Ostrovy", coords: [18.2208, -66.5901] },
    { name: "Newfoundland", type: "Ostrovy", coords: [49.0000, -56.0000] },
    { name: "Falklandy", type: "Ostrovy", coords: [-51.7500, -59.1667] },
    { name: "Galapágy", type: "Ostrovy", coords: [0.0000, -90.5000] },
    { name: "Kanárské ostrovy", type: "Ostrovy", coords: [28.0000, -15.5000] },
    { name: "Azory", type: "Ostrovy", coords: [38.5000, -28.0000] },
    { name: "Madeira", type: "Ostrovy", coords: [32.7500, -17.0000] },
    { name: "Maledivy", type: "Ostrovy", coords: [3.2028, 73.2207] },
    { name: "Havajské ostrovy", type: "Ostrovy", coords: [21.0000, -157.0000] },
    { name: "Fidži", type: "Ostrovy", coords: [-18.0000, 178.0000] },
    { name: "Samoa", type: "Ostrovy", coords: [-14.0000, -172.0000] },
    { name: "Tonga", type: "Ostrovy", coords: [-20.0000, -175.0000] },
    { name: "Bahamy", type: "Ostrovy", coords: [24.2500, -76.0000] },

    // Deserts and Basins (Pouště a pánve)
    { name: "Sahara", type: "Pouště", coords: [23.4162, 25.6628] },
    { name: "Gobi", type: "Pouště", coords: [42.5000, 103.5000] },
    { name: "Atacama", type: "Pouště", coords: [-23.5000, -69.6000] },
    { name: "Kalahari", type: "Pouště", coords: [-23.0000, 23.0000] },
    { name: "Namib", type: "Pouště", coords: [-24.7000, 15.3000] },
    { name: "Karakum", type: "Pouště", coords: [39.0000, 60.0000] },
    { name: "Kyzylkum", type: "Pouště", coords: [42.0000, 63.0000] },
    { name: "Taklamakan", type: "Pouště", coords: [38.5000, 82.2000] },
    { name: "Velká písečná poušť", type: "Pouště", coords: [-20.0000, 125.0000] },
    { name: "Údolí smrti", type: "Pouště", coords: [36.2419, -116.8258] },
    { name: "Tarimská pánev", type: "Pouště", coords: [39.0000, 83.0000] },
    { name: "Čadská pánev", type: "Pouště", coords: [14.0000, 14.0000] },
    { name: "Konžská pánev", type: "Pouště", coords: [-1.0000, 20.0000] },
    { name: "Sečuánská pánev", type: "Pouště", coords: [30.5000, 105.5000] },

    // Lowlands (Nížiny)
    { name: "Východoevropská nížina", type: "Nížiny", coords: [55.0000, 40.0000] },
    { name: "Západosibiřská nížina", type: "Nížiny", coords: [60.0000, 75.0000] },
    { name: "Mezopotámská nížina", type: "Nížiny", coords: [32.0000, 45.0000] },
    { name: "Indoganžská nížina", type: "Nížiny", coords: [27.0000, 80.0000] },
    { name: "Pádská nížina", type: "Nížiny", coords: [45.0000, 10.0000] },
    { name: "Panonská nížina", type: "Nížiny", coords: [46.5000, 19.5000] },
    { name: "Velká čínská nížina", type: "Nížiny", coords: [35.0000, 116.0000] },
    { name: "Nilská nížina", type: "Nížiny", coords: [30.0000, 31.0000] },
    { name: "Atlantská nížina", type: "Nížiny", coords: [35.0000, -77.0000] },
    { name: "Mississippská (Pobřežní) nížina", type: "Nížiny", coords: [32.0000, -90.0000] },
    { name: "Arktická nížina", type: "Nížiny", coords: [70.0000, -150.0000] },
    { name: "Amazonská nížina", type: "Nížiny", coords: [-3.0000, -60.0000] },
    { name: "Orinocká nížina", type: "Nížiny", coords: [7.0000, -67.0000] },
    { name: "Laplatská nížina", type: "Nížiny", coords: [-25.0000, -58.0000] }
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
