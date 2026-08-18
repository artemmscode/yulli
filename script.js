/* ═══════════════════════════════════════════════════════════════
   OUR STORY — script.js
   Vanilla JavaScript. No dependencies.
   ═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────
   1. APP_DATA — все персональные данные сайта.
   Меняй всё здесь: имена, даты, тексты, вопросы, подписи.
   ───────────────────────────────────────────────────────────── */
const APP_DATA = {
    girlfriendName: "Юленька",
    yourName: "Кирилл",

    timeline: [
        {
            image: "assets/images/screen-02.jpg",
            date: "26.01.2024",
            title: "тот самый день, когда официально всё началось."
        }
    ],

    memories: [
        {
            image: "assets/images/memory-01.jpg",
            caption: "наша одна из первых или даже первая фотография,\nя закрывал лицо и ты решила сделать также,\nтипо мы такие дед инсайдики"
        },
        {
            image: "assets/images/memory-02.jpg",
            caption: "тут мы в больнице,\nмы прогуливали уроки и шли вместе"
        },
        {
            image: "assets/images/memory-03.jpg",
            caption: "а помнишь как на физкультуре ты не любила играть,\nмы закрывались здесь и смотрели рилсики, тик токи\nили играли в игры.",
            big: true
        },
        {
            image: "assets/images/memory-04.jpg",
            caption: "это ваще моя любимая фотка\nкак ты бобку ешь"
        },
        {
            image: "assets/images/memory-05.jpg",
            caption: "Наталия....\nПоходу мы обосрались",
            big: true
        },
        {
            image: "assets/images/memory-06.jpg",
            caption: "а это было буквально недавно,\nты тут такая ути путя",
            big: true
        }
    ],

    apology: [
        "После первой нашей фотографии прошло уже почти 3 года, за это время многое произошло в наших отношениях.",
        "Было много плохого, я принёс в твою жизнь кучу страданий и мне очень жаль, что тебе пришлось через это пройти.",
        "Слова «прости меня» — уже бессмысленны, ведь то, что я делал — не заслуживает прощения.",
        "Но я искренне продолжаю тебя любить, переживать и желать для тебя всего самого лучшего.",
        "Мне обидно, что наши отношения были для тебя такими и тебе пришлось запомнить меня таким.",
        "Я хочу это исправить"
    ],

    puzzle: [
        {
            icon: "music",
            question: "Помнишь как мы собрались у меня с тобой,\nКсюшей и Андреем? Вы с тобой так уткнулись\nв друг друга и обнимались.\nПод кого мы так обнимались?",
            answers: ["Lil Peep", "Deftones", "MORGENSHTERN"],
            correct: 1
        },
        {
            icon: "heart",
            question: "Какой первый поцелуй был у нас?",
            answers: [
                "Мы оба поцеловались в подъезде",
                "Ты поцеловала меня в щёчку и потом ваще не разговаривала со мной",
                "Чо какие поцелуи их не было"
            ],
            correct: 1
        },
        {
            icon: "coffee",
            question: "Помнишь где мы впервые чаще всего\nпроводили время?",
            answers: [
                "На спорткомплексе",
                "Не было такого",
                "Лавочка на зелёной и подъезды рядом"
            ],
            correct: 2
        },
        {
            icon: "rain",
            question: "Чем я самым вкусным кормил тебя?",
            answers: ["Чокопайки", "Квашеная капуста", "Сырный дошик"],
            correct: 2
        },
        {
            icon: "camera",
            question: "Какой самый нелепый момент был у тебя,\nо котором я даже не сразу понял?",
            answers: [
                "Обманывала меня",
                "Рыгнула как бигфут",
                "Перданула сидя у меня на коленках"
            ],
            correct: 2
        },
        {
            icon: "moon",
            question: "Какой самый классный подарок ты делала\nдля меня?",
            answers: [
                "Все твои подарки классные",
                "Микрофон и синтезатор",
                "Открытка"
            ],
            correct: 0
        }
    ],

    letter: [
        "Дорогая, Юленька.",
        "Я не знаю, простишь ли ты меня.",
        "И я не хочу требовать от тебя ответа.",
        "Но хочу, чтобы ты знала...",
        "Я продолжаю любить тебя, продолжаю переживать за тебя. Я просыпаюсь с мыслью о тебе и засыпаю с мыслью о тебе. В голове так много мыслей и больно за то, что я был таким парнем для тебя. Я многое понял и осознал, жаль, что это пришло через такой ужасный и тяжёлый момент. Мне искренне стыдно за свои поступки, и я не могу подобрать слов ко всему этому, но я так люблю тебя, моя милая девочка.",
        "Я не прошу тебя забыть то, что произошло.",
        "Но я прошу тебя дать мне возможность показать поступками, что я многое осознал."
    ],

    letterSign: "Кирилл",
    letterPs: "p.s. scroll a little more",

    final: {
        loveMessage: "Я очень тебя люблю."
    }
};

/* ─────────────────────────────────────────────────────────────
   2. Utilities
   ───────────────────────────────────────────────────────────── */
const $ = (sel) => document.querySelector(sel);

const ICONS = {
    coffee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 10h11a2.6 2.6 0 0 1 0 5.2H5z"/><path d="M6.5 15.2v1.6a2.4 2.4 0 0 0 2.4 2.4h2.2a2.4 2.4 0 0 0 2.4-2.4v-1.6"/><path d="M16.6 11.2a1.8 1.8 0 0 1 0 2.8"/><path d="M7.6 8.6c-.7-.7.1-1.6 0-2.8"/><path d="M11 8.6c-.7-.7.1-1.6 0-2.8"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.6A8.6 8.6 0 1 1 9.4 4a7.1 7.1 0 0 0 10.6 10.6z"/><path d="M16.2 5.6l.9 1.9 1.9.9-1.9.9-.9 1.9-.9-1.9-1.9-.9 1.9-.9z"/><path d="M6.4 14.4l.7 1.5 1.5.7-1.5.7-.7 1.5-.7-1.5-1.5-.7 1.5-.7z"/></svg>',
    music: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18.6V5.8l9-1.8v12.8"/><circle cx="6.4" cy="18.6" r="2.6"/><circle cx="15.4" cy="16.8" r="2.6"/><path d="M9 6.2l9-1.8"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8.6h2.6l1.6-2.6h7.6l1.6 2.6H20a1 1 0 0 1 1 1v8.4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.6a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.4" r="3.2"/><path d="M17.6 7V5.8"/></svg>',
    rain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.8 15.6a4.4 4.4 0 0 1-.8-8.7A5.8 5.8 0 0 1 17.4 8a3.8 3.8 0 0 1-.6 7.6z"/><path d="M8.6 18.4l-1.1 2"/><path d="M12.4 18.4l-1.1 2"/><path d="M16.2 18.4l-1.1 2"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20.4C7.4 16.6 4 13.4 4 10.1 4 7.6 6 5.6 8.4 5.6c1.6 0 3 .9 3.6 2.1.6-1.2 2-2.1 3.6-2.1 2.4 0 4.4 2 4.4 4.5 0 3.3-3.4 6.5-8 10.3z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.4l4.4 4.4L19 7"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c.5 5.6 4.1 9.2 9.7 9.7-5.6.5-9.2 4.1-9.7 9.7-.5-5.6-4.1-9.2-9.7-9.7C7.9 11.2 11.5 7.6 12 2z"/></svg>'
};

const STORAGE_KEY = "ourStory";
const SCREENS = ["start", "story", "moment", "minecraft", "walk", "discord", "time", "memories", "apology", "puzzle", "letter", "final"];
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const FADE_MS = REDUCED_MOTION ? 0 : 600;
/* длительность исчезновения элементов текущей страницы перед показом новой */
const SCREEN_LEAVE_MS = REDUCED_MOTION ? 0 : 800;

/* Telegram Bot API: канал, куда уходят ответы */
const TG_BOT_TOKEN = "8923994058:AAH0VHec3wEY9E8GPbm7KB0mGJ5pRyRm2P4";
const TG_CHAT_ID = "-1003890923485";

function sendToChannel(text) {
    try {
        fetch("https://api.telegram.org/bot" + TG_BOT_TOKEN + "/sendMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: TG_CHAT_ID, text: text })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data && data.ok) {
                    console.log("OUR STORY: отправлено в канал ✔");
                } else {
                    console.error("OUR STORY: Telegram вернул ошибку:", data);
                }
            })
            .catch((err) => {
                console.error("OUR STORY: сетевой сбой при отправке:", err);
            });
    } catch (e) {
        console.error("OUR STORY: исключение при отправке:", e);
    }
}

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const data = raw ? JSON.parse(raw) : {};
        return {
            currentStage: SCREENS.includes(data.currentStage) ? data.currentStage : "start",
            musicEnabled: !!data.musicEnabled,
            musicMuted: !!data.musicMuted,
            puzzleProgress: Array.isArray(data.puzzleProgress) ? data.puzzleProgress : []
        };
    } catch (e) {
        return { currentStage: "start", musicEnabled: false, musicMuted: false, puzzleProgress: [] };
    }
}

function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        /* localStorage может быть недоступен — сайт продолжит работать */
    }
}

function haptic(type = "light") {
    try {
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred(type);
        }
    } catch (e) {
        /* no-op */
    }
}

const state = loadState();

/* ─────────────────────────────────────────────────────────────
   3. initTelegram — безопасная интеграция с Telegram WebApp
   ───────────────────────────────────────────────────────────── */
let tg = null;

function initTelegram() {
    if (window.Telegram && window.Telegram.WebApp) {
        tg = window.Telegram.WebApp;
        try {
            tg.ready();
            tg.expand();
        } catch (e) {
            tg = null;
        }
    }
}

/* ─────────────────────────────────────────────────────────────
   4. initNavigation — state + cinematic transitions + back
   ───────────────────────────────────────────────────────────── */
let history = [state.currentStage];

const navBack = () => {
    if (history.length <= 1) return;
    history.pop();
    navigateTo(history[history.length - 1], false);
};

let navigationToken = 0;

function applyScreen(name) {
    const screens = document.querySelectorAll(".screen");
    screens.forEach((s) => {
        s.classList.remove("screen--active", "screen--leaving");
        s.classList.add("screen--exited");
    });
    const target = $("#screen-" + name);
    target.classList.remove("screen--exited");
    target.classList.add("screen--active");

    const scroller = name === "letter" ? $("#letter-scroll") : $("#screen-" + name);
    if (scroller) scroller.scrollTop = 0;

    const girl = $("#bg-girl");
    if (girl) girl.classList.toggle("is-visible", name === "start");

    if (tg && tg.BackButton) {
        try {
            if (name === "start") tg.BackButton.hide();
            else tg.BackButton.show();
        } catch (e) {
            /* no-op */
        }
    }

    if (name === "memories") initMemoriesRender();
    if (name === "puzzle") initPuzzleRender();
    if (name === "letter") initLetterReveal();
    if (name === "apology") initApology();
    if (name === "story") initStoryReveal();
    if (name === "time") initTimeCounters();

    requestAnimationFrame(() => {
        const el = $("#screen-" + name);
        if (el) el.scrollTop = 0;
    });
}

function navigateTo(name, push = true) {
    if (!SCREENS.includes(name)) name = "start";

    if (push && history[history.length - 1] !== name) {
        history.push(name);
    }

    state.currentStage = name;
    saveState();

    const token = ++navigationToken;
    const current = document.querySelector(".screen--active");
    const target = $("#screen-" + name);

    if (!current || current === target) {
        applyScreen(name);
        return;
    }

    /* фаза 1: элементы текущей страницы плавно исчезают */
    current.classList.add("screen--leaving");
    window.setTimeout(() => {
        if (token !== navigationToken) return;
        applyScreen(name);
    }, SCREEN_LEAVE_MS);
}

function initNavigation() {
    if (tg && tg.BackButton) {
        try {
            tg.BackButton.onClick(navBack);
        } catch (e) {
            /* no-op */
        }
    }

    $("#btn-start").addEventListener("click", () => navigateTo("story"));
    $("#btn-story-next").addEventListener("click", () => navigateTo("moment"));
    $("#btn-moment-show").addEventListener("click", () => {
        haptic("light");
        const question = $("#moment-question");
        const photoWrap = $("#moment-photo-wrap");
        question.classList.add("moment-question--hidden");
        photoWrap.hidden = false;
        window.setTimeout(() => photoWrap.classList.add("is-visible"), 40);
    });
    $("#btn-moment-next").addEventListener("click", () => navigateTo("minecraft"));
    $("#btn-minecraft-next").addEventListener("click", () => navigateTo("walk"));
    $("#btn-walk-next").addEventListener("click", () => navigateTo("discord"));
    $("#btn-discord-next").addEventListener("click", () => navigateTo("time"));
    $("#btn-time-next").addEventListener("click", () => navigateTo("memories"));
    $("#btn-memories-next").addEventListener("click", () => navigateTo("apology"));
    $("#btn-apology-next").addEventListener("click", () => {
        if (apologyIndex >= APP_DATA.apology.length - 1) {
            navigateTo("puzzle");
        } else {
            haptic("light");
            showApologyParagraph(apologyIndex + 1);
        }
    });
    $("#btn-puzzle-next").addEventListener("click", () => {
        haptic("light");
        $("#puzzle-done-next").classList.add("is-fading");
        window.setTimeout(() => {
            $("#puzzle-done-next").style.display = "none";
            $("#puzzle-note").hidden = false;
        }, FADE_MS);
    });
    $("#btn-puzzle-note-next").addEventListener("click", () => navigateTo("letter"));
    $("#btn-letter-next").addEventListener("click", () => navigateTo("final"));

    }

/* ─────────────────────────────────────────────────────────────
   5. initMusic — assets/audio/music.mp3, mute/unmute, localStorage
   ───────────────────────────────────────────────────────────── */
let audio = null;

function initMusic() {
    /* Трек: "Classic Love Scene" — Steve Oxen (Fesliyan Studios).
       Royalty-free, free для некоммерческого использования.
       https://www.fesliyanstudios.com/royalty-free-music/downloads-c/violin-music/81 */
    audio = new Audio("assets/audio/music.mp3");
    audio.preload = "none";
    audio.addEventListener("ended", () => {
        if (state.musicEnabled && !state.musicMuted) {
            audio.currentTime = 0;
            audio.play().catch(() => {
                /* no-op */
            });
        }
    });

    const btn = $("#music-toggle");

    const paint = () => {
        btn.classList.toggle("is-on", state.musicEnabled);
        btn.setAttribute(
            "aria-label",
            state.musicEnabled ? "Выключить музыку" : "Включить музыку"
        );
    };

    const play = () => {
        if (state.musicMuted) return;
        audio.play().catch(() => {
            /* аудиофайл может отсутствовать — не ломаем сайт */
        });
    };

    btn.addEventListener("click", () => {
        haptic("light");
        state.musicEnabled = !state.musicEnabled;
        if (state.musicEnabled) {
            audio.muted = false;
            play();
        } else {
            audio.pause();
            audio.muted = true;
        }
        saveState();
        paint();
    });

    const resume = () => {
        if (state.musicEnabled && !state.musicMuted && audio && audio.paused) {
            audio.muted = false;
            play();
        }
    };

    document.addEventListener("pointerdown", resume, { once: true });
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden && state.musicEnabled) resume();
    });

    audio.muted = true;
    paint();
}

/* ─────────────────────────────────────────────────────────────
   6. initStory — timeline reveal on scroll
   ───────────────────────────────────────────────────────────── */
let storyObserver = null;

function buildTimeline() {
    const list = $("#timeline");
    list.innerHTML = "";
    APP_DATA.timeline.forEach((item, i) => {
        const li = document.createElement("li");
        li.className = "timeline-item" +
            (item.image ? " timeline-item--photo" : "") +
            (item.date.toUpperCase() === "TODAY" ? " is-today" : "");

        const dot = document.createElement("span");
        dot.className = "timeline-dot";
        dot.setAttribute("aria-hidden", "true");
        li.appendChild(dot);

        if (item.image) {
            const frame = document.createElement("div");
            frame.className = "timeline-photo-frame";

            const photo = document.createElement("img");
            photo.className = "timeline-photo";
            photo.alt = item.title || "Фотография";
            photo.loading = "lazy";

            const fallback = document.createElement("div");
            fallback.className = "timeline-photo-fallback";
            fallback.setAttribute("aria-hidden", "true");
            fallback.innerHTML = ICONS.sparkle;
            fallback.classList.add("is-visible");

            frame.append(photo, fallback);
            li.appendChild(frame);

            photo.onload = () => {
                fallback.classList.remove("is-visible");
                frame.classList.remove("timeline-photo-fallback-active");
                photo.classList.add("is-loaded");
            };
            photo.onerror = () => {
                photo.style.display = "none";
                fallback.classList.add("is-visible");
                frame.classList.add("timeline-photo-fallback-active");
            };
            photo.src = item.image;
        }

        const date = document.createElement("p");
        date.className = "timeline-date";
        date.textContent = item.date;

        const title = document.createElement("h3");
        title.className = "timeline-title";
        title.textContent = item.title;

        li.append(date, title);

        if (item.description) {
            const desc = document.createElement("p");
            desc.className = "timeline-desc";
            desc.textContent = item.description;
            li.appendChild(desc);
        }

        list.appendChild(li);
    });

    if (list.children.length === 1) {
        list.classList.add("timeline--single");
    }
}

function initStoryReveal() {
    if (storyObserver) storyObserver.disconnect();
    const items = document.querySelectorAll("#timeline .timeline-item");
    storyObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add("is-visible");
                    storyObserver.unobserve(e.target);
                }
            });
        },
        { root: $("#screen-story"), threshold: 0.25 }
    );
    items.forEach((el) => storyObserver.observe(el));
}

function initStory() {
    buildTimeline();
}

/* счётчики на экране "сколько времени прошло": быстрая прокрутка от 1 до цели */
let timeCounterToken = 0;

function initTimeCounters() {
    const targets = {
        days: 1900,
        months: 62,
        years: 5
    };
    const duration = 2200;
    const token = ++timeCounterToken;
    const start = performance.now();
    const elDays = $("#time-days");
    const elMonths = $("#time-months");
    const elYears = $("#time-years");
    if (!elDays) return;

    const step = (now) => {
        if (token !== timeCounterToken) return;
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        elDays.textContent = Math.max(1, Math.round(1 + (targets.days - 1) * eased));
        elMonths.textContent = Math.max(1, Math.round(1 + (targets.months - 1) * eased));
        elYears.textContent = Math.max(1, Math.round(1 + (targets.years - 1) * eased));
        if (t < 1) {
            requestAnimationFrame(step);
        } else {
            elDays.textContent = targets.days;
            elMonths.textContent = targets.months;
            elYears.textContent = targets.years;
        }
    };
    requestAnimationFrame(step);
}

/* ─────────────────────────────────────────────────────────────
   7. initMemories — cinematic swipe gallery + preload + fallback
   ───────────────────────────────────────────────────────────── */
const memories = {
    index: 0,
    total: 0,
    card: null,
    frame: null,
    img: null,
    fallback: null,
    caption: null,
    counter: null,
    dots: [],
    dragging: false,
    startX: 0,
    dx: 0
};

function memorySrc(i) {
    return (APP_DATA.memories[i] && APP_DATA.memories[i].image) || "";
}

function showFallback(visible) {
    if (!memories.fallback) return;
    memories.fallback.classList.toggle("is-visible", visible);
    if (memories.img) {
        memories.img.style.opacity = visible ? "0" : "";
    }
}

let memorySwapSeq = 0;

function memoryIsBig(index) {
    return !!(APP_DATA.memories[index] && APP_DATA.memories[index].big);
}

/* пропорции рамок: 16:9 остаются, 9:16 подрезаются до 3:4 */
const MEMORY_RATIOS = ["16 / 9", "3 / 4", "3 / 4", "16 / 9", "3 / 4", "3 / 4"];

function memoryRatio(index) {
    return (MEMORY_RATIOS[index] || "3 / 4");
}

function loadMemoryImage(index, animate) {
    const img = memories.img;
    const src = memorySrc(index);
    const caption = APP_DATA.memories[index] && APP_DATA.memories[index].caption;

    memories.caption.textContent = caption || "";
    memories.counter.textContent =
        String(index + 1).padStart(2, "0") + " / " + String(memories.total).padStart(2, "0");

    memories.dots.forEach((d, i) => d.classList.toggle("is-active", i === index));

    memories.frame.style.aspectRatio = memoryRatio(index);
    memories.frame.classList.toggle("memory-photo--portrait", memoryRatio(index) !== "16 / 9");

    if (!src) {
        memories.card.classList.toggle("memory-card--big", memoryIsBig(index));
        showFallback(true);
        img.removeAttribute("src");
        memories.frame.classList.remove("is-fading");
        return;
    }

    const seq = ++memorySwapSeq;
    const frame = memories.frame;

    const swap = () => {
        if (seq !== memorySwapSeq) return;
        /* рамка уже невидима — форму меняем здесь, чтобы не было скачка при видимой фотке */
        memories.card.classList.toggle("memory-card--big", memoryIsBig(index));
        img.classList.remove("is-exiting", "is-entering", "is-visible");
        img.classList.add("is-loading");
        img.src = src;
        img.onload = () => {
            if (seq !== memorySwapSeq) return;
            showFallback(false);
            img.classList.remove("is-loading");
            img.classList.add("is-entering");
            void img.offsetWidth;
            img.classList.remove("is-entering");
            img.classList.add("is-visible");
            /* короткая пауза с пустым экраном, затем кадр плавно проявляется */
            window.setTimeout(() => {
                if (seq !== memorySwapSeq) return;
                frame.classList.remove("is-fading");
                preloadNext();
            }, 250);
        };
        img.onerror = () => {
            if (seq !== memorySwapSeq) return;
            img.classList.remove("is-entering", "is-visible");
            img.removeAttribute("src");
            frame.classList.remove("is-fading");
            showFallback(true);
        };
    };

    if (animate) {
        frame.classList.add("is-fading");
        /* ждём, пока рамка полностью растворится, затем скрыто подгружаем новую */
        window.setTimeout(swap, 560);
    } else {
        frame.classList.remove("is-fading");
        memories.card.classList.toggle("memory-card--big", memoryIsBig(index));
        swap();
    }
}

function preloadNext() {
    const next = (memories.index + 1) % memories.total;
    const src = memorySrc(next);
    if (src) {
        const probe = new Image();
        probe.src = src;
    }
}

function snapBack() {
    memories.card.style.transition = "transform 0.45s var(--ease-out)";
    memories.card.style.transform = "translateX(0)";
}

function goMemory(to) {
    if (to === memories.index) return;
    memories.index = ((to % memories.total) + memories.total) % memories.total;
    haptic("light");
    memories.card.style.transition = "";
    memories.card.style.transform = "translateX(0)";
    loadMemoryImage(memories.index, true);
}

function initMemoriesSwipe() {
    const stage = $("#memories-stage");
    const card = $("#memory-card");

    stage.addEventListener("touchstart", (e) => {
        if (memories.total === 0) return;
        memories.dragging = true;
        memories.startX = e.touches[0].clientX;
        memories.dx = 0;
        card.classList.add("is-dragging");
        card.style.transition = "none";
    });

    stage.addEventListener("touchmove", (e) => {
        if (!memories.dragging) return;
        memories.dx = e.touches[0].clientX - memories.startX;
        const bound = Math.max(-window.innerWidth * 0.5, Math.min(window.innerWidth * 0.5, memories.dx));
        card.style.transform = "translateX(" + bound + "px)";
    });

    const endDrag = () => {
        if (!memories.dragging) return;
        memories.dragging = false;
        card.classList.remove("is-dragging");
        const threshold = Math.max(60, window.innerWidth * 0.12);
        if (memories.dx < -threshold) {
            blockNextClick();
            goMemory(memories.index + 1);
        } else if (memories.dx > threshold) {
            blockNextClick();
            goMemory(memories.index - 1);
        } else snapBack();
    };

    stage.addEventListener("touchend", endDrag);
    stage.addEventListener("touchcancel", endDrag);

    let suppressClick = false;

    const blockNextClick = () => {
        suppressClick = true;
        window.setTimeout(() => (suppressClick = false), 350);
    };

    card.addEventListener("click", () => {
        if (suppressClick) return;
        goMemory(memories.index + 1);
    });

    card.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            goMemory(memories.index - 1);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            goMemory(memories.index + 1);
        }
    });

    /* поддержка drag мышью на desktop */
    stage.addEventListener("mousedown", (e) => {
        if (window.innerWidth < 768) return;
        memories.dragging = true;
        memories.startX = e.clientX;
        memories.dx = 0;
        card.classList.add("is-dragging");
        card.style.transition = "none";
    });

    document.addEventListener("mousemove", (e) => {
        if (!memories.dragging) return;
        memories.dx = e.clientX - memories.startX;
        const bound = Math.max(-window.innerWidth * 0.5, Math.min(window.innerWidth * 0.5, memories.dx));
        card.style.transform = "translateX(" + bound + "px)";
    });

    document.addEventListener("mouseup", endDrag);
}

function initMemoriesRender() {
    memories.total = APP_DATA.memories.length;
    if (memories.total === 0) {
        showFallback(true);
        return;
    }
    memories.index = Math.min(memories.index, memories.total - 1);
    memories.card.style.transform = "translateX(0)";
    loadMemoryImage(memories.index, false);
}

function initMemories() {
    memories.card = $("#memory-card");
    memories.frame = $("#memory-photo");
    memories.img = $("#memory-img");
    memories.fallback = $("#memory-fallback");
    memories.caption = $("#memory-caption");
    memories.counter = $("#memories-counter");
    memories.total = APP_DATA.memories.length;

    const dots = $("#memories-dots");
    APP_DATA.memories.forEach((_, i) => {
        const d = document.createElement("span");
        d.setAttribute("aria-hidden", "true");
        dots.appendChild(d);
        memories.dots.push(d);
    });

    initMemoriesSwipe();
}

/* ─────────────────────────────────────────────────────────────
   8. initApology — спокойный чёрный экран, части текста по скроллу
   ───────────────────────────────────────────────────────────── */
let apologyIndex = 0;
let apologyTimer = null;

function buildApology() {
    const box = $("#apology-text");
    box.innerHTML = "";
    APP_DATA.apology.forEach((text) => {
        const p = document.createElement("p");
        p.className = "apology-paragraph";
        p.textContent = text;
        p.style.fontSize = "18px";
        p.style.lineHeight = "1.9";
        p.style.fontFamily = "var(--font-display)";
        p.style.color = "rgba(251,231,240,0.95)";
        p.style.opacity = "0";
        p.style.transition = "opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out)";
        p.style.display = "none";
        box.appendChild(p);
    });
}

function showApologyParagraph(index, initial) {
    const ps = document.querySelectorAll("#apology-text .apology-paragraph");
    if (!ps[index]) return;

    if (initial || index === apologyIndex) {
        ps[index].style.display = "block";
        ps[index].style.opacity = "0";
        void ps[index].offsetWidth;
        ps[index].style.opacity = "1";
        apologyIndex = index;
        updateApologyButton();
        return;
    }

    window.clearTimeout(apologyTimer);

    const prev = ps[apologyIndex];
    const next = ps[index];

    prev.style.opacity = "0";
    apologyTimer = window.setTimeout(() => {
        prev.style.display = "none";
        next.style.display = "block";
        next.style.opacity = "0";
        void next.offsetWidth;
        next.style.opacity = "1";
    }, 500);

    apologyIndex = index;
    updateApologyButton();
}

function updateApologyButton() {
    const btn = $("#btn-apology-next");
    btn.textContent = apologyIndex >= APP_DATA.apology.length - 1
        ? "Листать дальше"
        : "Далее";
}

function initApology() {
    buildApology();
    showApologyParagraph(0, true);
}

/* ─────────────────────────────────────────────────────────────
   9. initPuzzle — MEMORY PUZZLE
   ───────────────────────────────────────────────────────────── */
const puzzle = {
    current: -1,
    answered: 0
};
let modalHideTimer = null;

function puzzleCardTemplate(icon, index) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "puzzle-card";
    card.setAttribute("data-puzzle", index);
    card.setAttribute("aria-label", "Вопрос " + (index + 1));

    const span = document.createElement("span");
    span.className = "puzzle-card-icon";
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = ICONS[icon] || "";

    const check = document.createElement("span");
    check.className = "puzzle-check";
    check.setAttribute("aria-hidden", "true");
    check.innerHTML = ICONS.check;

    card.append(span, check);
    return card;
}

function buildPuzzle() {
    const grid = $("#puzzle-grid");
    grid.innerHTML = "";
    APP_DATA.puzzle.forEach((item, i) => {
        const card = puzzleCardTemplate(item.icon, i);
        card.addEventListener("click", () => openPuzzleQuestion(i));
        grid.appendChild(card);
    });
}

function initPuzzleRender() {
    const done = new Set(state.puzzleProgress);
    const cards = document.querySelectorAll(".puzzle-card");
    cards.forEach((c, i) => {
        c.classList.toggle("is-done", done.has(i));
        c.disabled = done.has(i);
    });
    puzzle.answered = state.puzzleProgress.length;
    checkPuzzleDone();
}

function openPuzzleQuestion(index) {
    if (state.puzzleProgress.includes(index)) return;
    puzzle.current = index;
    const q = APP_DATA.puzzle[index];

    $("#puzzle-q-icon").innerHTML = ICONS[q.icon] || "";
    $("#puzzle-q").textContent = q.question;

    const answers = $("#puzzle-answers");
    answers.innerHTML = "";

    q.answers.forEach((text, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "puzzle-answer";
        btn.textContent = text;
        btn.addEventListener("click", () => answerPuzzle(i));
        answers.appendChild(btn);
    });

    const modal = $("#puzzle-modal");
    window.clearTimeout(modalHideTimer);
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("is-open"));
    haptic("light");
}

function closePuzzleQuestion() {
    const modal = $("#puzzle-modal");
    modal.classList.remove("is-open");
    window.clearTimeout(modalHideTimer);
    modalHideTimer = window.setTimeout(() => {
        modal.hidden = true;
    }, FADE_MS);
    puzzle.current = -1;
}

function answerPuzzle(answerIndex) {
    const q = APP_DATA.puzzle[puzzle.current];
    const btns = document.querySelectorAll("#puzzle-answers .puzzle-answer");

    btns.forEach((b) => (b.disabled = true));

    if (answerIndex === q.correct) {
        haptic("light");
        btns[answerIndex].classList.add("is-correct");
        const doneIndex = puzzle.current;
        state.puzzleProgress.push(doneIndex);
        saveState();
        window.setTimeout(() => {
            closePuzzleQuestion();
            revealPuzzleCard(doneIndex);
        }, 500);
    } else {
        haptic("medium");
        btns[answerIndex].classList.add("is-wrong");
        window.setTimeout(() => {
            btns.forEach((b) => {
                b.disabled = false;
                b.classList.remove("is-wrong");
            });
        }, 700);
    }
}

function revealPuzzleCard(index) {
    const card = document.querySelector('.puzzle-card[data-puzzle="' + index + '"]');
    if (!card) return;
    card.classList.add("is-reveal", "is-done");
    card.disabled = true;
    puzzle.answered += 1;
    checkPuzzleDone();
}

function checkPuzzleDone() {
    const total = APP_DATA.puzzle.length;
    const done = state.puzzleProgress.length;
    if (done !== total) return;

    $("#puzzle-score").textContent = done + " / " + total;
    const grid = $("#puzzle-grid");

    if (grid.style.display === "none") {
        $("#puzzle-done").hidden = false;
        return;
    }

    grid.classList.add("is-fading");
    window.setTimeout(() => {
        grid.style.display = "none";
        grid.classList.remove("is-fading");
        $("#puzzle-done").hidden = false;
    }, FADE_MS);
}

function initPuzzle() {
    buildPuzzle();
    $("#puzzle-close").addEventListener("click", closePuzzleQuestion);
    $("#puzzle-modal").addEventListener("click", (e) => {
        if (e.target === $("#puzzle-modal")) closePuzzleQuestion();
    });
}

/* ─────────────────────────────────────────────────────────────
   10. initLetter — письмо, reveal по скроллу, p.s. секрет
   ───────────────────────────────────────────────────────────── */
let letterObserver = null;

function buildLetter() {
    $("#letter-name").textContent = APP_DATA.girlfriendName;
    $("#letter-ps").textContent = APP_DATA.letterPs;

    const body = $("#letter-body");
    body.innerHTML = "";

    APP_DATA.letter.forEach((text) => {
        const p = document.createElement("p");
        p.textContent = text;
        body.appendChild(p);
    });

    const sign = document.createElement("p");
    sign.className = "letter-sign";
    sign.textContent = APP_DATA.letterSign;
    body.appendChild(sign);
}

function initLetterReveal() {
    if (letterObserver) letterObserver.disconnect();
    const ps = document.querySelectorAll("#letter-body p");
    const secret = $("#letter-secret");

    letterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add("is-visible");
                    letterObserver.unobserve(e.target);
                }
            });
        },
        { root: $("#letter-scroll"), threshold: 0.35 }
    );

    ps.forEach((p) => letterObserver.observe(p));
    letterObserver.observe(secret);
}

function initLetter() {
    buildLetter();
}

/* ─────────────────────────────────────────────────────────────
   11. initFinal — три варианта ответа
   ───────────────────────────────────────────────────────────── */
function initFinal() {
    $("#btn-final-time").addEventListener("click", () => {
        haptic("light");
        sendToChannel("ответила: мне нужно подумать");
        hideFinalOptions();
        $("#final-time").hidden = false;
    });

    $("#btn-final-talk").addEventListener("click", () => {
        haptic("light");
        hideFinalOptions();
        $("#final-talk").hidden = false;
    });

    $("#btn-talk-send").addEventListener("click", handleMessageSubmit);
}

function hideFinalOptions() {
    const opts = document.querySelector(".final-options");
    opts.classList.add("is-fading");
    window.setTimeout(() => {
        opts.style.display = "none";
    }, FADE_MS);
}

function handleMessageSubmit() {
    const textarea = $("#talk-textarea");
    const value = textarea.value.trim();

    if (!value) return;
    haptic("light");
    const sendBtn = $("#btn-talk-send");
    [textarea, sendBtn].forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(8px)";
    });
    window.setTimeout(() => {
        textarea.style.display = "none";
        sendBtn.style.display = "none";
        $("#talk-sent").hidden = false;
    }, FADE_MS);

    sendToChannel("ответила: " + value);
}

/* ─────────────────────────────────────────────────────────────
   12. initEasterEgg — 7 нажатий на маленькое ❤
   ───────────────────────────────────────────────────────────── */
let eggClicks = 0;
let eggTimer = null;

function showEggMessage(lines) {
    const overlay = document.createElement("div");
    overlay.className = "puzzle-modal";
    overlay.style.zIndex = "60";
    const card = document.createElement("div");
    card.className = "puzzle-modal-card";
    card.style.textAlign = "center";

    lines.forEach((line) => {
        const p = document.createElement("p");
        p.style.fontSize = "17px";
        p.style.lineHeight = "1.8";
        p.style.marginBottom = "12px";
        p.style.color = "#FBE7F0";
        p.textContent = line;
        card.appendChild(p);
    });

    overlay.appendChild(card);
    document.body.appendChild(overlay);
    overlay.classList.add("is-open");
    haptic("light");

    window.setTimeout(() => {
        overlay.classList.remove("is-open");
        window.setTimeout(() => overlay.remove(), FADE_MS);
    }, REDUCED_MOTION ? 1200 : 3200);
}

function initEasterEgg() {
    const egg = $("#easter-egg");
    const click = () => {
        eggClicks += 1;
        window.clearTimeout(eggTimer);
        eggTimer = window.setTimeout(() => (eggClicks = 0), 3000);

        if (eggClicks === 7) {
            eggClicks = 0;
            showEggMessage(["Ты нашла секрет."]);
            window.setTimeout(() => {
                showEggMessage([
                    "Если ты действительно нажала сюда семь раз,",
                    "то теперь официально обязана улыбнуться."
                ]);
            }, REDUCED_MOTION ? 1300 : 3500);
        }
    };
    egg.addEventListener("click", click);
    egg.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            click();
        }
    });
}

/* ─────────────────────────────────────────────────────────────
   13. initApp — запуск
   ───────────────────────────────────────────────────────────── */
function hideLoader() {
    const loader = $("#app-loader");
    loader.classList.add("loader--done");
    window.setTimeout(() => loader.remove(), 700);
}

function initApp() {
    /* при перезагрузке страницы сайт всегда начинается заново */
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        /* no-op */
    }
    state.currentStage = "start";
    state.musicEnabled = false;
    state.musicMuted = false;
    state.puzzleProgress = [];

    initTelegram();
    initMusic();
    initStory();
    initMemories();
    initApology();
    initPuzzle();
    initLetter();
    initFinal();
    initEasterEgg();
    initNavigation();

    navigateTo("start", false);

    window.setTimeout(hideLoader, REDUCED_MOTION ? 50 : 350);
}

/* reset для разработчика: window.resetOurStory() в консоли */
window.resetOurStory = function resetApp() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        /* no-op */
    }
    try {
        if (audio) audio.pause();
    } catch (e) {
        /* no-op */
    }
    location.reload();
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}
