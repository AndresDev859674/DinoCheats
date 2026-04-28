(function () {
    'use strict';

    // --- CONFIG/Labels ---
    const labels = {
        en: {
            logo: "DinoCheats",
            general: "General",
            world: "World",
            player: "Player",
            settings: "Settings",
            about: "About",
            godmode: "God Mode",
            pause: "Pause Game",
            speed: "Speed",
            ver: "Alpha 0.2",
            branch: "Alpha",
            jump: "Jump Force",
            gravity: "Gravity",
            distance: "Distance (Score)",
 apply: "Apply",
 resetScore: "Reset Score",
 die: "Die",
 revive: "Revive",
 projectInfo: "Project Info",
 desc: "Drag the title bar to move. [Tab] toggles the menu. Use <code>DinoCheats.setSpeed(value)</code> etc. in DevTools.",
 close: "Close",
 minimize: "Minimize",
 animLabel: "Panel Animation",
 animScale: "Scale In",
 animFade: "Fade In/Out",
 animNone: "None",
 safeMode: "Safe Mode (No Ban)"
        }
    };
    let lang = "en";

    // ======== SPRITE MANAGEMENT additions ========
    // (just after labels/lang and before DinoEngine definition)
    const SPRITE_DEFAULT = "https://chromedino.com/assets/offline-sprite-1x.png";
    const SPRITE_PRESETS = [
        {name:"Default", url: "data:image/png;base64,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"},
        {name:"Minecraft", url: "https://i.imgur.com/vhUjTZL.png';document.getElementById('offline-resources-2x').src='https://i.imgur.com/y27zIvC.png"},
        {name:"Stick", url: "https://i.imgur.com/X58GzPw.png"},
        {name:"Kirby", url: "https://i.imgur.com/5nnYgMR.png"},
    ];

    const COM_SPRITE_PRESETS = [
        {name:"Default", url: SPRITE_DEFAULT},
        {name:"Godzilla", url:"https://raw.githubusercontent.com/AndresDev859674/DinoCheats/refs/heads/main/runners/godzilla.png"},
        {name:"Naruto", url: "https://raw.githubusercontent.com/AndresDev859674/DinoCheats/refs/heads/main/runners/offline-sprite-1x-naruto.png"},
        {name:"Mario", url: "https://chromedino.com/assets/offline-sprite-1x-mario.png"},
        {name:"Batman", url: "https://chromedino.com/assets/batman1x.png"},
        {name:"Joker", url: "https://chromedino.com/assets/joker1x.png"},
        {name:"Hallowen", url: "https://dinorunner.com/static/images/halloween/offline-sprite-1x-halloween.png"},
        {name:"Lil Nezuko chan", url: "https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fzr5cyrz50orsb0ej1a9v.png"},
    ];

    // Utility to run sprite replace only on chromedino.com
    function canSwapSprites() {
        return location.hostname === "chromedino.com";
    }

    // --- ENGINE ---
    class DinoEngine {
        constructor() {
            this.instance = window.Runner.instance_;
            this.originalGameOver = this.instance.gameOver;
            this.safeModeInterval = null;
            this._currentTexture = SPRITE_DEFAULT;
            this._originalSpriteSrc = SPRITE_DEFAULT;

            // v1. Sprite element for chromedino.com
            this._imageElement = null;
            // v2. Sprite element for chrome://dino (ID=offline-resources-1x)
            this._imageElementById = null;

            // Busca variaciones comunes de sprites:
            // chromedino.com o forks (por src)
            let img = document.querySelector('img[src*="offline-sprite"]');
            // chrome://dino (por id)
            let imgById = document.getElementById('offline-resources-1x');

            if (img) {
                this._imageElement = img;
                this._originalSpriteSrc = img.src;
                this._currentTexture = img.src;
            }
            if (imgById) {
                this._imageElementById = imgById;
                this._originalSpriteSrc = imgById.src;
                this._currentTexture = imgById.src;
            }

            this._dashEnabled = true;
            this._dashBoost = 25;
            this._defaultSpeed = (
                (this.instance && typeof this.instance.currentSpeed !== "undefined") ? this.instance.currentSpeed :
                (this.instance && typeof this.instance.speed !== "undefined") ? this.instance.speed :
                13
            );
            this._dashActive = false;

            window.addEventListener('keydown', this._dashHandler = (e) => {
                if (!this._dashEnabled) return;
                if ((e.key === "Shift" || e.key === "ShiftLeft" || e.key === "ShiftRight") && !this._dashActive) {
                    this._dashActive = true;
                    this._defaultSpeed = this.instance.currentSpeed; // capture actual in-game speed
                    this.setSpeed(Number(this._defaultSpeed) + Number(this._dashBoost));
                }
            });
            window.addEventListener('keyup', this._dashReleaseHandler = (e) => {
                if (!this._dashEnabled) return;
                if ((e.key === "Shift" || e.key === "ShiftLeft" || e.key === "ShiftRight") && this._dashActive) {
                    this.setSpeed(this._defaultSpeed);
                    this._dashActive = false;
                }
            });
        }
        enableDash(on) { this._dashEnabled = !!on; }
        setDashBoost(boost) { this._dashBoost = Number(boost); }
        getDashBoost() { return this._dashBoost; }
        setGodMode(on) { this.instance.gameOver = on ? ()=>{} : this.originalGameOver; }
        setSpeed(val) { this.instance.setSpeed(Number(val)); }
        setJump(val) { this.instance.tRex.config.JUMP_VELOCITY = Number(val);}
        setGravity(val) { this.instance.tRex.config.GRAVITY = Number(val);}
        setDistance(val) {
            this.instance.distanceRan = Number(val) / this.instance.distanceMeter.config.COEFFICIENT;
            if (this.instance.distanceMeter.setDistance) this.instance.distanceMeter.setDistance(Number(val));
        }
        togglePause(on) { on ? this.instance.stop() : this.instance.play(); }
        resetScore() { this.setDistance(0); }
        die() { this.instance.gameOver(); }
        revive() { if(this.instance.activated) this.instance.restart(); }
        setSafeMode(on) {
            if (on) {
                this.safeModeInterval = setInterval(() => {
                    this.setDistance(0);
                    this.revive();
                }, 100);
            } else {
                if (this.safeModeInterval) {
                    clearInterval(this.safeModeInterval);
                    this.safeModeInterval = null;
                }
            }
        }

        // Cambia setTextures para soportar ambas variantes
        setTextures(url) {
            let changed = false;
            if (this._imageElement) {
                this._imageElement.src = url;
                changed = true;
            }
            if (this._imageElementById) {
                this._imageElementById.src = url;
                changed = true;
            }
            if (changed) {
                this._currentTexture = url;
            } else {
                alert("Couldn't find the dino sprite image element.");
            }
        }

        // Y en reset():
        reset() {
            // Restaurar ambos si existen
            if (this._imageElement || this._imageElementById) {
                this.setTextures(this._originalSpriteSrc || SPRITE_DEFAULT);
            }
        }

        showTextures() {
            if (!canSwapSprites()) {
                alert("Only available on chromedino.com");
                return;
            }
            console.log(`[DinoCheats] Current Sprite Sheet URL:`, this._currentTexture);
            return this._currentTexture;
        }

    }

    // API
    function exposeCheatAPI(engine) {
        window.DinoCheats = {
            setGodMode: v=>engine.setGodMode(v),
 setSpeed: v=>engine.setSpeed(v),
 setJump: v=>engine.setJump(v),
 setGravity: v=>engine.setGravity(v),
 setDistance: v=>engine.setDistance(v),
 pause: ()=>engine.togglePause(true),
 resume: ()=>engine.togglePause(false),
 resetScore: ()=>engine.resetScore(),
 die: ()=>engine.die(),
 revive: ()=>engine.revive(),
 setSafeMode: v=>engine.setSafeMode(v),
 // --- Sprite API ---
 setTextures: url => engine.setTextures(url),
 showTextures: ()=>engine.showTextures(),
 reset: ()=>engine.reset(),
 enableDash: v => engine.enableDash(v),
 setDashBoost: v => engine.setDashBoost(v),
 getDashBoost: ()=> engine.getDashBoost(),
        };
        console.log(
            `%cDINOCHEATS
            %c
            ▸ Toggle panel: [Tab]
            ▸ Drag header to move panel
            ▸ DevTools API: DinoCheats.setSpeed(value); .setGodMode(true); .pause(); .revive(); .setSafeMode(true); etc.

            Have fun!`,
            "font-weight:bold;color:#ff4d4d;font-size:1.25em;",
            "color:#babec3;font-size:1.01em"
        );
    }

    // --- UI ---
    class DinoUI {
        constructor(engine) {
            this.engine = engine;
            this.minimized = false;
            this.activeTab = 'general';
            this.anim = localStorage.getItem("dc_anim") || "scale";
            this.init();
        }
        get L() { return labels[lang]; }
        injectStyles() {
            const css = `
            :root {
                --bg-dark: #181a20ee;
                --panel-glass: blur(14px);
                --accent: #ff4d4d;
                --sidebar-bg: #131314ee;
                --shade: #26262d;
                --text-dim: #c6c9d0;
                --text: #ffffff;
                --border: rgba(255,255,255,0.07);
                --soft: rgba(255,255,255,0.15);
            }

            #dc-wrapper {
            position: fixed;
            top: 40%;
            left: 50%;
            margin-left: -320px;
            width: 640px;
            height: 440px;
            min-height: 440px;
            z-index: 99999;
            font-family: 'Segoe UI', Roboto, Arial, sans-serif;
            background: var(--bg-dark);
            color:var(--text); border-radius:13px;
            border: 1.7px solid var(--border);
            box-shadow:0 17px 45px #000c,0 1.5px 8px #000c;
            display: flex; flex-direction:column;
            backdrop-filter: var(--panel-glass);
            overflow: visible;
            display: flex;
            flex-direction: column;
            overflow: hidden
            }

            #dc-header {
            width: 100%; background: var(--sidebar-bg);
            border-radius:13px 13px 0 0;
            padding: 0; display: flex; align-items:center;
            cursor: move; position: relative;
            user-select:none;
            }

            #dc-logo {
            margin-left:24px; font-size:20px; letter-spacing:1.1px;
            font-weight:900; color:var(--accent); flex: 1 0 auto;
            padding:15px 0;
            }

            .dc-logo-2 {color:var(--text-dim); margin-left:24px; font-size:16px; font-weight:600;}

            .dc-btn-action img {
                margin-right: 7px;
                vertical-align: middle;
                height: 28px;
                width: auto;
                border-radius: 4px;
                background: #222;
                box-shadow: 0 0 2px #000a;
            }

            #dc-header-btns {
            margin-right:18px; display:flex; align-items:center; gap:8px;
            }
            .dc-header-btn {
                font-size:18px; color:var(--text-dim); cursor:pointer;
                margin-left:2px; background:none; border:none; outline:none;
                border-radius:6px; padding:3px 7px; transition:.23s;
                user-select:none;
            }
            .dc-header-btn:hover { color: var(--accent); background:var(--shade);}
            #dc-layout-btn, #dc-lang-btn {
            font-size:13px; color:var(--accent); border: none; background:var(--shade);
            font-weight: bold; margin-left:8px; padding:5px 13px;
            border-radius:7px; cursor:pointer; transition:.2s;
            }

            #dc-main {
            display:flex; flex-direction:column; position:relative; flex:1;
            min-height:350px; background:none;
            }

            #dc-sidebar {
            display:flex; flex-direction:row;
            background: var(--sidebar-bg);
            border-bottom:1.2px solid var(--border);
            padding: 0 0 0 14px;
            align-items: center;
            }

            .dc-tab-btn {
                font-size: 15px; padding:15px 23px 13px 23px; margin:0 0 0 0;
                background:none; border:none; border-bottom:2.7px solid transparent;
                color:var(--text-dim); font-weight:600; cursor:pointer; transition:.22s;
                letter-spacing:.15em; outline:none;
            }
            .dc-tab-btn.active, .dc-tab-btn:hover {
                color:var(--accent); border-color:var(--accent); background:none;
            }

            #dc-content {
            padding: 30px 35px 22px 30px;
            flex: 1;
            overflow-y: auto;
            min-height: 0;
            scrollbar-width: thin;
            scrollbar-color: var(--accent) var(--shade);
            }

            #dc-content::-webkit-scrollbar {width:11px;}
            #dc-content::-webkit-scrollbar-thumb {background:var(--accent); border-radius:7px;}
            #dc-content::-webkit-scrollbar-track {background:var(--shade);}

            .dc-section { display:none;}
            .dc-section.active { display:block;}
            h2 { margin:0 0 17px 0;font-size:22px;color:var(--accent); font-weight:800;}
            .dc-row {
                display:flex; align-items:center; justify-content:space-between;
                background:var(--shade); border-radius:8px;
                padding: 12px 17px; margin-bottom:13px;
                box-shadow:0 2px 7px #0003;
            }
            .dc-label {color:var(--text-dim); font-size:16px; font-weight:600;}
            .dc-btn-action {
                background:var(--accent); color:#fff;
                border:none; border-radius:7px;
                font-size:15px; padding:6px 16px;
                cursor:pointer; font-weight:bold;letter-spacing:1px;
                transition: background .18s;
                margin-left:6px;
            }
            .dc-btn-action:hover { background:#ff2323;}
            .dc-range { accent-color:var(--accent); width:120px; margin: 0 8px;}
            .dc-input {
                background: #252532; color: white;
                border: 1.3px solid var(--soft);
                border-radius:5px; width:72px;
                padding:6px 10px; font-size:15px;
                text-align: center;
            }
            .dc-switch { position:relative; width:52px; height:23px;}
            .dc-switch input { opacity:0; width:0; height:0;}
            .dc-slider {
                position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;
                background: #333a; border-radius:26px; transition:.27s;
            }
            .dc-slider:before {
                position:absolute; content:""; height:17px; width:17px; left:3px; bottom:3px;
                background:#fff; border-radius:85px; transition:.24s;
            }
            .dc-switch input:checked + .dc-slider { background:var(--accent);}
            .dc-switch input:checked + .dc-slider:before { transform:translateX(27px);}
            small {color:var(--text-dim);}
            @media (max-width: 700px) {
                #dc-wrapper { width:96vw; min-width:0;}
                #dc-content { padding:12px;}
            }
            @keyframes dc-scale-in { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }
            @keyframes dc-scale-out { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.7); } }

            .dc-anim-scale-in { animation: dc-scale-in 0.15s ease-out forwards; }
            .dc-anim-scale-out { animation: dc-scale-out 0.15s ease-out forwards; }

            @keyframes dc-fade-in { from { opacity: 0; } to { opacity: 1; } }
            @keyframes dc-fade-out { from { opacity: 1; } to { opacity: 0; } }
            .dc-anim-fade-in { animation: dc-fade-in 0.15s ease-out forwards; }
            .dc-anim-fade-out { animation: dc-fade-out 0.15s ease-out forwards; }
            `;
            const s = document.createElement('style');
            s.innerHTML = css;
            document.head.appendChild(s);
        }

        createDOM() {
            this.container = document.createElement('div');
            this.container.id = "dc-wrapper";
            if (this.anim === "scale") {
                this.container.classList.add("dc-anim-scale");
            } else if (this.anim === "fade") {
                this.container.classList.add("dc-anim-fade-in");
            }
            this.container.innerHTML = `
            <div id="dc-header">
            <svg class="dc-logo-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19.875 6.27c.7.398 1.13 1.143 1.125 1.948v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.27 2.27 0 0 1-2.184 0l-6.75-4.27A2.23 2.23 0 0 1 3 15.502V8.217c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98z"/><path d="M15.5 9.422c.312.18.503.515.5.876v3.277c0 .364-.197.7-.515.877l-3 1.922a1 1 0 0 1-.97 0l-3-1.922A1 1 0 0 1 8 13.576v-3.278c0-.364.197-.7.514-.877l3-1.79c.311-.174.69-.174 1 0l3 1.79H15.5z"/></g></svg>
            <div id="dc-logo">${this.L.logo}</div>
            <p class="dc-label">${this.L.branch}</p>
            <p></p>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#f5de19" d="M18.774 19.7a3.73 3.73 0 0 0 3.376 2.078c1.418 0 2.324-.709 2.324-1.688c0-1.173-.931-1.589-2.491-2.272l-.856-.367c-2.469-1.052-4.11-2.37-4.11-5.156c0-2.567 1.956-4.52 5.012-4.52A5.06 5.06 0 0 1 26.9 10.52l-2.665 1.711a2.33 2.33 0 0 0-2.2-1.467a1.49 1.49 0 0 0-1.638 1.467c0 1.027.636 1.442 2.1 2.078l.856.366c2.908 1.247 4.549 2.518 4.549 5.376c0 3.081-2.42 4.769-5.671 4.769a6.58 6.58 0 0 1-6.236-3.5ZM6.686 20c.538.954 1.027 1.76 2.2 1.76c1.124 0 1.834-.44 1.834-2.15V7.975h3.422v11.683c0 3.543-2.078 5.156-5.11 5.156A5.31 5.31 0 0 1 3.9 21.688Z"/></svg>
            <i class="fa-brands fa-js"></i>
            <div id="dc-header-btns">
            <a href="https://ko-fi.com/andrew4630" id="dc-lang-btn" class="button">Support us</a>
            <button class="dc-header-btn" id="dc-min" title="${this.L.minimize}">─</button>
            <button class="dc-header-btn" id="dc-close" title="${this.L.close}">✕</button>
            </div>
            </div>
            <div id="dc-main">
            <div id="dc-sidebar">
            <button class="dc-tab-btn active" data-tab="general">${this.L.general}</button>
            <button class="dc-tab-btn" data-tab="world">${this.L.world}</button>
            <button class="dc-tab-btn" data-tab="player">${this.L.player}</button>
            <button class="dc-tab-btn" data-tab="settings">${this.L.settings}</button>
            <button class="dc-tab-btn" data-tab="about">${this.L.about}</button>
            </div>
            <div id="dc-content">${this.genSections()}</div>
            </div>
            `;
            document.body.appendChild(this.container);
        }

        genSections() {
            // Helper to generate official sprite preset buttons
            const spritePresetsHtml = SPRITE_PRESETS.map(s => `
            <button class="preset-sprite dc-btn-action" data-url="${s.url}" title="${s.name}">
            <img src="${s.url}" alt="${s.name}" style="height:28px; width:auto; vertical-align:middle; margin-right:7px; border-radius:4px; background:#222;">
            ${s.name}
            </button>
            `).join('');

            // Helper to generate community sprite preset buttons
            const comSpritePresetsHtml = COM_SPRITE_PRESETS.map(s => `
            <button class="preset-sprite dc-btn-action" data-url="${s.url}" title="${s.name}">
            <img src="${s.url}" alt="${s.name}" style="height:28px; width:auto; vertical-align:middle; margin-right:7px; border-radius:4px; background:#222;">
            ${s.name}
            </button>
            `).join('');

            return `
            <div class="dc-section active" id="section-general">
            <h2>${this.L.general}</h2>
            <div class="dc-row">
            <span class="dc-label">${this.L.godmode}</span>
            <label class="dc-switch"><input type="checkbox" id="chk-god"><span class="dc-slider"></span></label>
            </div>
            <div class="dc-row">
            <span class="dc-label">${this.L.pause}</span>
            <label class="dc-switch"><input type="checkbox" id="chk-pause"><span class="dc-slider"></span></label>
            </div>
            <div class="dc-row">
            <span class="dc-label">${this.L.speed}</span>
            <input type="range" id="rng-speed" class="dc-range" min="10" max="500" value="13">
            <input type="number" id="num-speed" class="dc-input" value="13">
            </div>
            <div class="dc-row">
            <span class="dc-label">${this.L.distance}</span>
            <input type="range" id="rng-dist" class="dc-range" min="0" max="99999" value="0">
            <input type="number" id="num-dist" class="dc-input" value="0">
            <button id="btn-dist" class="dc-btn-action">${this.L.apply}</button>
            </div>
            <div class="dc-row">
            <span class="dc-label">${this.L.resetScore}</span>
            <button id="btn-reset" class="dc-btn-action">${this.L.resetScore}</button>
            </div>
            <div class="dc-row">
            <span class="dc-label">${this.L.die}</span>
            <button id="btn-kill" class="dc-btn-action">${this.L.die}</button>
            <span class="dc-label" style="margin-left:10px">${this.L.revive}</span>
            <button id="btn-revive" class="dc-btn-action">${this.L.revive}</button>
            </div>
            <div class="dc-row">
            <span class="dc-label">${this.L.safeMode}</span>
            <label class="dc-switch"><input type="checkbox" id="chk-safe"><span class="dc-slider"></span></label>
            </div>
            </div>

            <div class="dc-section" id="section-world">
            <h2>${this.L.world}</h2>
            <div class="dc-row">
            <span class="dc-label">${this.L.gravity}</span>
            <input type="range" id="rng-grav" class="dc-range" min="0.05" max="9999" value="0.6" step="0.01">
            <input type="number" id="num-grav" class="dc-input" value="0.6" step="0.01">
            </div>

            <div style="margin:25px 0 8px 0; border-top:1px solid var(--soft); padding-top:15px;">
            <h3 style="color:var(--accent); margin:0 0 12px 0; font-size:18px;">
            Sprite Manager <span style="font-size:11px; opacity:0.7;">(chromedino.com only)</span>
            </h3>

            <div class="dc-row" style="gap:10px; flex-wrap:wrap; margin-bottom:10px;">
            <span class="dc-label">Sprite Sheet URL:</span>
            <input id="sprite-url" type="url" value="${SPRITE_DEFAULT}" style="flex:2 1 180px; min-width:75px;" class="dc-input">
            <button id="btn-apply-sprite" class="dc-btn-action">Apply</button>
            <button id="btn-reset-sprite" class="dc-btn-action">Reset</button>
            </div>

            <div class="dc-row" style="gap:10px; flex-wrap:wrap; margin-bottom:10px;">
            <span class="dc-label">Presets:</span>
            ${spritePresetsHtml}
            </div>

            <div class="dc-row" style="gap:10px; flex-wrap:wrap;">
            <span class="dc-label">Chrome Dino 2023 :</span>
            ${comSpritePresetsHtml}
            </div>
            </div>
            </div>

            <div class="dc-section" id="section-player">
            <h2>${this.L.player}</h2>
            <div class="dc-row">
            <span class="dc-label">${this.L.jump}</span>
            <input type="range" id="rng-jump" class="dc-range" min="5" max="30" value="10">
            <input type="number" id="num-jump" class="dc-input" value="10">
            </div>
            <div class="dc-row">
            <span class="dc-label">Dash (Shift)</span>
            <label class="dc-switch"><input type="checkbox" id="chk-dash" checked><span class="dc-slider"></span></label>
            <span class="dc-label" style="margin-left:15px;">Boost</span>
            <input type="range" id="rng-dash-boost" class="dc-range" min="5" max="200" value="25">
            <input type="number" id="num-dash-boost" class="dc-input" value="25">
            </div>
            <p style="font-size:11px; margin-top:5px; color:var(--soft-text);">
            Hold <b>Shift</b> while playing to dash! (Boosts speed by set amount)
            </p>
            </div>

            <div class="dc-section" id="section-settings">
            <h2>${this.L.projectInfo}</h2>
            <div class="dc-row">
            <span class="dc-label">${this.L.animLabel}</span>
            <select id="anim-select" class="dc-input">
            <option value="scale" ${this.anim == "scale" ? "selected" : ""}>${this.L.animScale}</option>
            <option value="fade" ${this.anim == "fade" ? "selected" : ""}>${this.L.animFade}</option>
            <option value="none" ${this.anim == "none" ? "selected" : ""}>${this.L.animNone}</option>
            </select>
            </div>
            <div style="color:#babec3; font-size:13px; line-height:1.7; margin-top:15px;">
            ${this.L.desc}
            <br><br>
            <b>DevTools:</b><br>
            <code>DinoCheats.setSpeed(value)</code>, <code>DinoCheats.setGodMode(true)</code>, etc.
            </div>
            </div>

            <div class="dc-section" id="section-about" style="text-align:center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 32 32" style="margin-bottom:10px;">
            <path fill="currentColor" d="M30.48 25.145H32v1.52h-1.52ZM32 14.475v-3.05h-1.52v1.53h-1.53v-3.05h-1.52v6.1H25.9v-1.53h-1.52v3.05h3.05v4.57h-7.62v1.53H32v-1.53h-3.05v-7.62zM28.95.765H32v1.52h-3.05Zm-3.05 24.38h1.53v1.52H25.9Zm-1.52-21.33h3.05v1.52h-3.05Zm-4.57 21.33h1.52v1.52h-1.52Zm0-15.24h-4.57v1.52h4.57v1.53h1.52v-7.62h-1.52zm-6.1 6.1h-3.04v1.52h3.04v1.52h-3.04v-1.52H9.14v6.1h4.57v1.52H9.14v1.52H4.57V28.2H6.1v3.04h3.04v-1.52H7.62V28.2h4.57v-1.53h1.52v1.53h3.05v-1.53h-1.52v-6.09h1.52v1.52h1.53v-3.05h-3.05v-4.57h4.57v-1.52h-6.1Zm0 6.09h-3.04v-1.52h3.04ZM10.67.765h3.04v1.52h-3.04Zm-1.53 6.09h1.53v3.05H9.14Z"/>
            <path fill="currentColor" d="M7.62 3.815h12.19v1.52H7.62Zm0 19.81h1.52v1.52H7.62ZM6.1 5.335h1.52v10.67H6.1Zm-1.53 10.67H6.1v4.57H4.57Zm-1.52 9.14h1.52v1.52H3.05Zm0-4.57h1.52v1.52H3.05Zm-1.53 3.05h1.53v1.52H1.52ZM0 5.335h3.05v1.52H0Zm1.52 15.24h1.53v-1.53H1.52v-1.52H0v6.1h1.52z"/>
            </svg>
            <h2>${this.L.logo}</h2>
            <span class="dc-label">Alpha 0.1</span><br><br>

            <p style="font-size:13px; line-height:1.4; color:#babec3;">
            This is not made to cheat the game, I created this for fun.<br>
            If you are using this really for Cheats, I'm not responsible for these actions.
            </p>

            <hr style="border:0; border-top:1px solid var(--soft); margin:15px 0;">
            <div style="margin-bottom:15px;">
            <a href="https://ko-fi.com/andrew4630" target="_blank" class="dc-btn-action" style="text-decoration:none; display:inline-block; padding:8px 20px;">Support us</a>
            </div>
            <hr style="border:0; border-top:1px solid var(--soft); margin:15px 0;">

            <h2>Supported Sites</h2>
            <div style="font-size:12px; color:#babec3; text-align:left; display:inline-block;">
            • chromedpino.com (Use Safe Mode)<br>
            • chrome://dino (Currently In Working)<br>
            • pwa-dino.github.io (Currently In Working)
            </div>
            </div>
            `;
        }

        setupEvents() {
            const C = this.container;
            // Tabs
            C.querySelectorAll('.dc-tab-btn').forEach(btn=>{
                btn.onclick = ()=>{
                    C.querySelectorAll('.dc-tab-btn').forEach(b=>b.classList.remove('active'));
                    C.querySelectorAll('.dc-section').forEach(s=>s.classList.remove('active'));
                    btn.classList.add('active');
                    C.querySelector(`#section-${btn.dataset.tab}`).classList.add('active');
                };
            });
            // Godmode
            C.querySelector('#chk-god').onchange = e=>this.engine.setGodMode(e.target.checked);
            // Pause
            C.querySelector('#chk-pause').onchange = e=>this.engine.togglePause(e.target.checked);
            // Safe Mode
            C.querySelector('#chk-safe').onchange = e=>this.engine.setSafeMode(e.target.checked);
            // Speed
            let sldS = C.querySelector('#rng-speed'), inpS = C.querySelector('#num-speed');
            sldS.oninput = e=>{inpS.value=e.target.value;this.engine.setSpeed(e.target.value);}
            inpS.onchange = e=>{
                let v = Math.max(10,Math.min(500,Number(e.target.value)||13));
                sldS.value = v; e.target.value = v; this.engine.setSpeed(v);
            };
            // Distance
            let sldD = C.querySelector('#rng-dist'), inpD = C.querySelector('#num-dist');
            sldD.oninput = e=>{inpD.value=e.target.value;this.engine.setDistance(e.target.value);}
            inpD.onchange = e=>{
                let v = Math.max(0,Math.min(99999,Number(e.target.value)||0));
                sldD.value = v; e.target.value = v; this.engine.setDistance(v);
            };
            C.querySelector('#btn-dist').onclick = ()=> {
                let v = Math.max(0,Math.min(99999,Number(inpD.value)||0));
                this.engine.setDistance(v);
                sldD.value = inpD.value = v;
            };
            // Reset
            C.querySelector('#btn-reset').onclick = ()=> this.engine.resetScore();
            // Gravity (slider+input)
            // Gravity (already present)
            let sldG = C.querySelector('#rng-grav'), inpG = C.querySelector('#num-grav');
            // ...

            // ==== Sprite Manager (World Tab) ====
            const spriteUrl = C.querySelector('#sprite-url');
            const btnApplySprite = C.querySelector('#btn-apply-sprite');
            const btnResetSprite = C.querySelector('#btn-reset-sprite');
            const presetBtns = C.querySelectorAll('.preset-sprite');

            // URL input and apply
            btnApplySprite.onclick = () => {
                if (!spriteUrl.value.trim()) return alert("Enter a valid sprite URL!");
                this.engine.setTextures(spriteUrl.value.trim());
            };
            // Reset to default
            btnResetSprite.onclick = () => {
                this.engine.reset();
                spriteUrl.value = SPRITE_DEFAULT; // update input, for UX
            };
            // Preset buttons
            presetBtns.forEach(btn =>
            btn.onclick = () => {
                const url = btn.getAttribute("data-url");
                spriteUrl.value = url;
                this.engine.setTextures(url);
            }
            );
            // Optionally: set input to current
            if (canSwapSprites() && this.engine._currentTexture) spriteUrl.value = this.engine._currentTexture;

            sldG.oninput = e=>{inpG.value=e.target.value;this.engine.setGravity(e.target.value);}
            inpG.onchange = e=>{
                let v = Math.max(0.05,Math.min(2,parseFloat(e.target.value)||0.6));
                sldG.value = v; e.target.value = v; this.engine.setGravity(v);
            };
            // Jump
            let sldJ = C.querySelector('#rng-jump'), inpJ = C.querySelector('#num-jump');
            sldJ.oninput = e=>{inpJ.value=e.target.value;this.engine.setJump(e.target.value);}
            inpJ.onchange = e=>{
                let v = Math.max(5,Math.min(30,Number(e.target.value)||10));
                sldJ.value = v; e.target.value = v; this.engine.setJump(v);
            };
            // Die / Revive
            C.querySelector('#btn-kill').onclick = ()=>this.engine.die();
            C.querySelector('#btn-revive').onclick = ()=>this.engine.revive();

            // Settings — Animation
            const animSel = C.querySelector("#anim-select");
            if (animSel) animSel.onchange = e=>{
                localStorage.setItem("dc_anim", e.target.value);
                this.anim = e.target.value;
                C.remove(); setTimeout(()=>new DinoUI(this.engine),60);
            };

            // Show/hide [Tab]
            window.addEventListener('keydown', e => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const isHidden = this.container.style.display === 'none';

                    if (!isHidden) {
                        const animClass = this.anim === "scale" ? "dc-anim-scale-out" : (this.anim === "fade" ? "dc-anim-fade-out" : "");

                        if (animClass) {
                            this.container.classList.remove("dc-anim-scale-in", "dc-anim-fade-in");
                            this.container.classList.add(animClass);

                            setTimeout(() => {
                                this.container.style.display = 'none';
                                this.container.classList.remove(animClass);
                            }, 150);
                        }
                    } else {
                        this.container.style.display = '';
                        this.container.classList.remove("dc-anim-scale-out", "dc-anim-fade-out");

                        if (this.anim === "scale") {
                            this.container.classList.add("dc-anim-scale-in");
                        } else if (this.anim === "fade") {
                            this.container.classList.add("dc-anim-fade-in");
                        }
                    }
                }
            });

            // Minimize: Only show header; restore on header click
            const minimize = ()=>{
                this.minimized = !this.minimized;
                if(this.minimized){
                    C.classList.add('minimized');
                    C.querySelector('#dc-header').onclick = ()=>{ if(this.minimized) minimize(); };
                }
                else{
                    C.classList.remove('minimized');
                    C.querySelector('#dc-header').onclick = null;
                }
            };
            C.querySelector('#dc-min').onclick = minimize;
            C.querySelector('#dc-close').onclick = ()=>C.style.display='none';

            // Drag/move window by header
            this.enableDragWindow(C.querySelector('#dc-header'));
            C.style.display='';

            // Dash (checkbox, slider, input)
            const dashCheck = C.querySelector('#chk-dash');
            dashCheck.onchange = e => this.engine.enableDash(e.target.checked);

            let dashSlider = C.querySelector('#rng-dash-boost'), dashInput = C.querySelector('#num-dash-boost');
            dashSlider.oninput = e => { dashInput.value = e.target.value; this.engine.setDashBoost(e.target.value); }
            dashInput.onchange = e => {
                let v = Math.max(5, Math.min(200, Number(e.target.value)||25));
                dashSlider.value = v; e.target.value = v;
                this.engine.setDashBoost(v);
            };
            // On UI show, sync with engine config
            dashCheck.checked = typeof this.engine._dashEnabled !== "undefined" ? !!this.engine._dashEnabled : true;
            dashSlider.value = dashInput.value = this.engine.getDashBoost();
        }
        enableDragWindow(header) {
            const C = this.container;
            let drag = false, sx = 0, sy = 0, startLeft = 0, startTop = 0;

            header.addEventListener('mousedown', e => {
                if (this.minimized && e.target !== header) return;
                drag = true;
                sx = e.clientX;
                sy = e.clientY;

                const rect = C.getBoundingClientRect();
                startLeft = rect.left;
                startTop = rect.top;

                document.body.style.userSelect = 'none';
            });

            document.addEventListener('mousemove', e => {
                if (!drag) return;
                C.style.left = (startLeft + (e.clientX - sx)) + 'px';
                C.style.top = (startTop + (e.clientY - sy)) + 'px';
                C.style.marginLeft = '0px';
            });

            document.addEventListener('mouseup', () => {
                drag = false;
                document.body.style.userSelect = '';
            });
        }
        init(){ this.injectStyles(); this.createDOM(); this.setupEvents();}
    }

    // ========== INIT ==========
    if(window.Runner && window.Runner.instance_){
        const engine = new DinoEngine();
        new DinoUI(engine);
        exposeCheatAPI(engine);
    } else {
        alert("First launch the dino game, then run this script!");
        console.error("Start the game before executing DinoCheats.");
    }
})();
