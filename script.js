/* ═══════════════════════════════════════════════════════════════
   OUR STORY — script.js
   Vanilla JavaScript. No dependencies.
   ═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────
   1. APP_DATA — все персональные данные сайта.
   Меняй всё здесь: имена, даты, тексты, вопросы, подписи.
   ───────────────────────────────────────────────────────────── */
const APP_DATA = {
    girlfriendName: "[ИМЯ]",
    yourName: "[ТВОЁ ИМЯ]",

    timeline: [
        {
            image: "assets/images/memory-02.jpg",
            date: "26.01.2024",
            title: "тот самый день, когда официально всё началось."
        }
    ],

    memories: [
        {
            image: "assets/images/memory-01.jpg",
            caption: "Ты тогда даже не заметила,\nчто я сделал эту фотографию."
        },
        {
            image: "assets/images/memory-02.jpg",
            caption: "Твоё любимое место.\nЯ запомнил, почему ты его любишь."
        },
        {
            image: "assets/images/memory-03.jpg",
            caption: "Наш общий вечер.\nПодставь сюда свою подпись.",
            big: true
        },
        {
            image: "assets/images/memory-04.jpg",
            caption: "[ПОДПИСЬ: что происходит на фото]"
        },
        {
            image: "assets/images/memory-05.jpg",
            caption: "[ПОДПИСЬ: что происходит на фото]",
            big: true
        },
        {
            image: "assets/images/memory-06.jpg",
            caption: "И всё это — только начало.",
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
            icon: "☕",
            question: "Где мы провели один\nиз наших самых долгих разговоров?",
            answers: ["Кафе", "Парк", "Машина"],
            correct: 0
        },
        {
            icon: "🌙",
            question: "Что мы делали,\nкогда не могли уснуть?",
            answers: ["Считали звёзды", "Смотрели фильмы", "Ничего не делали"],
            correct: 1
        },
        {
            icon: "🎵",
            question: "[ВОПРОС: какая песня что-то для вас значит?]",
            answers: ["Первый вариант", "Второй вариант", "Третий вариант"],
            correct: 0
        },
        {
            icon: "📸",
            question: "Кто первым предложил\nсделать общее фото?",
            answers: ["Я", "Ты", "Никто из нас"],
            correct: 1
        },
        {
            icon: "🌧",
            question: "Что мы делали,\nкогда попали под дождь?",
            answers: ["Прятались", "Спорили", "Танцевали"],
            correct: 2
        },
        {
            icon: "❤️",
            question: "[ВОПРОС: самый важный момент?]",
            answers: ["Первый вариант", "Второй вариант", "Третий вариант"],
            correct: 0
        }
    ],

    letter: [
        "Я не знаю, простишь ли ты меня.",
        "И я не хочу требовать от тебя ответа.",
        "Но хочу, чтобы ты знала...",
        "[ПЕРСОНАЛЬНЫЙ ТЕКСТ: напиши здесь от себя. Спокойно, без оправданий. Скажи, что ты понял и что тебе важно — словами, которые идут от тебя.]",
        "Я не прошу тебя забыть произошедшее.",
        "Я прошу только дать мне возможность\nпоказать поступками,\nчто я всё понял."
    ],

    letterSign: "[ПОДПИСЬ: твоё имя]",
    letterPs: "p.s. scroll a little more",

    final: {
        loveMessage: "Я очень тебя люблю."
    }
};

/* ─────────────────────────────────────────────────────────────
   2. Utilities
   ───────────────────────────────────────────────────────────── */
const $ = (sel) => document.querySelector(sel);

const STORAGE_KEY = "ourStory";
const SCREENS = ["start", "story", "memories", "apology", "puzzle", "letter", "final"];
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

function navigateTo(name, push = true) {
    if (!SCREENS.includes(name)) name = "start";

    if (push && history[history.length - 1] !== name) {
        history.push(name);
    }

    state.currentStage = name;
    saveState();

    const screens = document.querySelectorAll(".screen");
    screens.forEach((s) => s.classList.remove("screen--active"));
    $("#screen-" + name).classList.add("screen--active");

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

    requestAnimationFrame(() => {
        const el = $("#screen-" + name);
        if (el) el.scrollTop = 0;
    });
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
    $("#btn-story-next").addEventListener("click", () => navigateTo("memories"));
    $("#btn-memories-next").addEventListener("click", () => navigateTo("apology"));
    $("#btn-apology-next").addEventListener("click", () => {
        if (apologyIndex >= APP_DATA.apology.length - 1) {
            navigateTo("puzzle");
        } else {
            haptic("light");
            showApologyParagraph(apologyIndex + 1);
        }
    });
    $("#btn-puzzle-next").addEventListener("click", () => navigateTo("letter"));
    $("#btn-letter-next").addEventListener("click", () => navigateTo("final"));

    }

/* ─────────────────────────────────────────────────────────────
   5. initMusic — assets/audio/music.mp3, mute/unmute, localStorage
   ───────────────────────────────────────────────────────────── */
let audio = null;

function initMusic() {
    audio = new Audio("assets/audio/music.mp3");
    audio.loop = true;
    audio.preload = "none";

    const btn = $("#music-toggle");
    const label = btn.querySelector(".music-label");

    const paint = () => {
        btn.classList.toggle("is-on", state.musicEnabled);
        label.textContent = state.musicEnabled ? "Выключить музыку" : "Включить музыку";
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
            fallback.textContent = "✦";

            frame.append(photo, fallback);
            li.appendChild(frame);

            photo.onload = () => {
                fallback.style.display = "none";
                frame.classList.remove("timeline-photo-fallback-active");
                photo.classList.add("is-loaded");
            };
            photo.onerror = () => {
                photo.style.display = "none";
                fallback.style.display = "flex";
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

/* ─────────────────────────────────────────────────────────────
   7. initMemories — cinematic swipe gallery + preload + fallback
   ───────────────────────────────────────────────────────────── */
const memories = {
    index: 0,
    total: 0,
    card: null,
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
    memories.fallback.style.display = visible ? "flex" : "none";
    if (memories.img) {
        memories.img.style.opacity = visible ? "0" : "";
    }
}

function loadMemoryImage(index, animate) {
    const img = memories.img;
    const src = memorySrc(index);
    const caption = APP_DATA.memories[index] && APP_DATA.memories[index].caption;

    memories.caption.textContent = caption || "";
    memories.counter.textContent =
        String(index + 1).padStart(2, "0") + " / " + String(memories.total).padStart(2, "0");

    memories.dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    memories.card.classList.toggle(
        "memory-card--big",
        !!(APP_DATA.memories[index] && APP_DATA.memories[index].big)
    );

    if (!src) {
        showFallback(true);
        img.removeAttribute("src");
        return;
    }

    const fadeOut = () => {
        if (animate) {
            img.classList.add("is-exiting");
            img.classList.remove("is-visible");
        }
        window.setTimeout(() => {
            img.classList.remove("is-exiting", "is-entering", "is-visible");
            img.classList.add("is-loading");
            img.src = src;
            img.onload = () => {
                showFallback(false);
                img.classList.remove("is-loading");
                img.classList.add("is-entering");
                void img.offsetWidth;
                img.classList.remove("is-entering");
                img.classList.add("is-visible");
                preloadNext();
            };
            img.onerror = () => {
                img.classList.remove("is-entering", "is-visible");
                img.removeAttribute("src");
                showFallback(true);
            };
        }, animate ? 200 : 0);
    };

    fadeOut();
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
    memories.card.style.transition = "transform 0.25s var(--ease-out)";
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
        p.style.fontSize = "16px";
        p.style.lineHeight = "1.85";
        p.style.color = "rgba(59,42,50,0.9)";
        p.style.opacity = "0";
        p.style.transition = "opacity 0.35s ease";
        p.style.display = "none";
        box.appendChild(p);
    });
}

function showApologyParagraph(index, initial) {
    const ps = document.querySelectorAll("#apology-text .apology-paragraph");
    if (!ps[index]) return;

    if (initial || index === apologyIndex) {
        ps[index].style.display = "block";
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
    }, 350);

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

function puzzleCardTemplate(icon, index) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "puzzle-card";
    card.setAttribute("data-puzzle", index);
    card.setAttribute("aria-label", "Вопрос " + (index + 1));

    const span = document.createElement("span");
    span.textContent = icon;

    const check = document.createElement("span");
    check.className = "puzzle-check";
    check.setAttribute("aria-hidden", "true");
    check.textContent = "✓";

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

    $("#puzzle-q-icon").textContent = q.icon;
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

    $("#puzzle-modal").hidden = false;
    haptic("light");
}

function closePuzzleQuestion() {
    $("#puzzle-modal").hidden = true;
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
        }, 450);
    } else {
        haptic("medium");
        btns[answerIndex].classList.add("is-wrong");
        window.setTimeout(() => {
            btns.forEach((b) => {
                b.disabled = false;
                b.classList.remove("is-wrong");
            });
        }, 600);
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
    if (done === total) {
        $("#puzzle-score").textContent = done + " / " + total;
        $("#puzzle-done").hidden = false;
        const grid = $("#puzzle-grid");
        grid.style.display = "none";
    }
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
    $("#final-love").textContent = APP_DATA.final.loveMessage;

    $("#btn-final-time").addEventListener("click", () => {
        haptic("light");
        hideFinalOptions();
        $("#final-time").hidden = false;
    });

    $("#btn-final-talk").addEventListener("click", () => {
        haptic("light");
        hideFinalOptions();
        $("#final-talk").hidden = false;
    });

    $("#btn-final-heart").addEventListener("click", () => {
        haptic("light");
        hideFinalOptions();
        $("#final-heart").hidden = false;
        spawnHeartParticles();
    });

    $("#btn-talk-send").addEventListener("click", handleMessageSubmit);
}

function hideFinalOptions() {
    document.querySelector(".final-options").style.display = "none";
}

function handleMessageSubmit(message) {
    const textarea = $("#talk-textarea");
    const value = (message || textarea.value).trim();

    if (!value) return;
    haptic("light");
    textarea.style.display = "none";
    const sendBtn = $("#btn-talk-send");
    sendBtn.style.display = "none";
    $("#talk-sent").hidden = false;

    // TODO:
    // Подключить backend / Telegram Bot API,
    // когда серверная часть будет готова.
    console.log("OUR STORY message:", value);
}

function spawnHeartParticles() {
    const wrap = document.createElement("div");
    wrap.className = "heart-particles";
    wrap.setAttribute("aria-hidden", "true");
    document.body.appendChild(wrap);

    const count = REDUCED_MOTION ? 0 : 8;
    for (let i = 0; i < count; i++) {
        const p = document.createElement("span");
        p.className = "heart-particle";
        p.style.left = Math.round(15 + Math.random() * 70) + "%";
        p.style.animationDuration = (2 + Math.random() * 1.5) + "s";
        p.style.animationDelay = (Math.random() * 0.6) + "s";
        wrap.appendChild(p);
    }

    window.setTimeout(() => {
        wrap.remove();
    }, 6000);
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
        p.textContent = line;
        card.appendChild(p);
    });

    overlay.appendChild(card);
    document.body.appendChild(overlay);
    haptic("light");

    window.setTimeout(() => overlay.remove(), REDUCED_MOTION ? 1200 : 3200);
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
