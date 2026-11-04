/**
 * Puzzle Blocks – پازل بلوکی
 * A bilingual block puzzle game
 */

(() => {
  'use strict';

  // ========== Translations ==========
  const i18n = {
    en: {
      title: 'Puzzle Blocks',
      titleSub: 'پازل بلوکی',
      tagline: 'Place blocks. Clear lines. Chase the high score.',
      selectMode: 'Select Mode',
      easyMode: 'Easy',
      easyDesc: 'Rotate pieces by clicking',
      hardMode: 'Hard',
      hardDesc: 'No rotation – place as is',
      startGame: 'Start Game',
      continueGame: 'Continue',
      highScore: 'High Score',
      score: 'Score',
      nextPieces: 'Next Pieces',
      gameOver: 'Game Over',
      yourScore: 'Your Score',
      newHighScore: 'New High Score!',
      playAgain: 'Play Again',
      backToMenu: 'Back to Menu',
      yes: 'Yes',
      no: 'No',
      undo: 'Undo',
      save: 'Save',
      menu: 'Menu',
      saved: 'Game saved!',
      cannotPlace: 'Cannot place any piece!',
      confirmMenu: 'Return to menu? Progress will be saved.',
      confirmRestart: 'Start a new game?',
      linesCleared: (n) => n === 1 ? '1 line cleared!' : `${n} lines cleared!`,
      combo: (n) => `Combo ×${n}!`,
      rotateHint: 'Click to rotate'
    },
    fa: {
      title: 'پازل بلوکی',
      titleSub: 'Puzzle Blocks',
      tagline: 'قطعات را قرار دهید. خطوط را پاک کنید. رکورد بزنید.',
      selectMode: 'انتخاب مود بازی',
      easyMode: 'آسان',
      easyDesc: 'با کلیک قطعات را بچرخانید',
      hardMode: 'سخت',
      hardDesc: 'بدون چرخش – همان‌طور که هست',
      startGame: 'شروع بازی',
      continueGame: 'ادامه بازی',
      highScore: 'بالاترین امتیاز',
      score: 'امتیاز',
      nextPieces: 'قطعات بعدی',
      gameOver: 'بازی تمام شد',
      yourScore: 'امتیاز شما',
      newHighScore: 'رکورد جدید!',
      playAgain: 'بازی دوباره',
      backToMenu: 'بازگشت به منو',
      yes: 'بله',
      no: 'خیر',
      undo: 'برگشت',
      save: 'ذخیره',
      menu: 'منو',
      saved: 'بازی ذخیره شد!',
      cannotPlace: 'هیچ قطعه‌ای قابل قرار دادن نیست!',
      confirmMenu: 'بازگشت به منو؟ پیشرفت ذخیره می‌شود.',
      confirmRestart: 'شروع بازی جدید؟',
      linesCleared: (n) => n === 1 ? '۱ خط پاک شد!' : `${toPersianNum(n)} خط پاک شد!`,
      combo: (n) => `ترکیب ×${toPersianNum(n)}!`,
      rotateHint: 'کلیک برای چرخش'
    }
  };

  function toPersianNum(n) {
    const map = '۰۱۲۳۴۵۶۷۸۹';
    return String(n).replace(/\d/g, d => map[d]);
  }

  // ========== Piece Definitions ==========
  // Each shape is an array of [row, col] offsets from top-left of bounding box
  const PIECES = [
    // Monomino
    { shape: [[0,0]], color: '#e74c3c' },
    // Dominoes
    { shape: [[0,0],[0,1]], color: '#3498db' },
    { shape: [[0,0],[1,0]], color: '#3498db' },
    // Trominoes
    { shape: [[0,0],[0,1],[0,2]], color: '#2ecc71' },
    { shape: [[0,0],[1,0],[2,0]], color: '#2ecc71' },
    { shape: [[0,0],[0,1],[1,0]], color: '#9b59b6' }, // L
    { shape: [[0,0],[0,1],[1,1]], color: '#9b59b6' },
    // Tetrominoes
    { shape: [[0,0],[0,1],[0,2],[0,3]], color: '#1abc9c' },
    { shape: [[0,0],[1,0],[2,0],[3,0]], color: '#1abc9c' },
    { shape: [[0,0],[0,1],[1,0],[1,1]], color: '#f1c40f' }, // Square
    { shape: [[0,0],[1,0],[2,0],[2,1]], color: '#e67e22' }, // L
    { shape: [[0,1],[1,1],[2,0],[2,1]], color: '#e67e22' },
    { shape: [[0,0],[0,1],[0,2],[1,0]], color: '#e67e22' },
    { shape: [[0,0],[0,1],[0,2],[1,2]], color: '#e67e22' },
    { shape: [[0,0],[0,1],[1,1],[2,1]], color: '#e67e22' },
    { shape: [[0,1],[1,0],[1,1],[2,0]], color: '#16a085' }, // S/Z
    { shape: [[0,0],[1,0],[1,1],[2,1]], color: '#16a085' },
    { shape: [[0,1],[1,0],[1,1],[1,2]], color: '#8e44ad' }, // T
    { shape: [[0,0],[1,0],[1,1],[2,0]], color: '#8e44ad' },
    // Pentomino-ish
    { shape: [[0,0],[0,1],[0,2],[0,3],[0,4]], color: '#c0392b' },
    { shape: [[0,0],[1,0],[2,0],[3,0],[4,0]], color: '#c0392b' },
    { shape: [[0,0],[0,1],[0,2],[1,0],[2,0]], color: '#d35400' }, // big L
    { shape: [[0,0],[0,1],[0,2],[1,2],[2,2]], color: '#d35400' },
    { shape: [[0,0],[1,0],[2,0],[2,1],[2,2]], color: '#d35400' },
    { shape: [[0,2],[1,2],[2,0],[2,1],[2,2]], color: '#d35400' },
    { shape: [[0,0],[0,1],[1,0],[1,1],[2,0]], color: '#27ae60' }, // P
    { shape: [[0,0],[0,1],[1,0],[1,1],[0,2]], color: '#27ae60' },
    { shape: [[0,1],[1,0],[1,1],[1,2],[2,1]], color: '#2980b9' }, // Plus / X
    { shape: [[0,0],[1,0],[1,1],[1,2],[2,1]], color: '#2980b9' },
  ];

  // ========== State ==========
  let lang = localStorage.getItem('pb_lang') || 'fa';
  let gridSize = 10;
  let gameMode = 'easy'; // 'easy' | 'hard'
  let board = [];
  let score = 0;
  let highScore = 0;
  let currentPieces = []; // {shape, color, used}
  let selectedPieceIndex = -1;
  let undoStack = null; // only one level
  let isDragging = false;
  let dragPieceIndex = -1;
  let ghostEl = null;
  let cellSize = 30;
  let pointerDownTime = 0;
  let pointerDownPos = { x: 0, y: 0 };
  let didDrag = false;

  // DOM refs
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ========== Init ==========
  function init() {
    loadHighScore();
    applyLanguage();
    bindEvents();
    checkSavedGame();
    updateMenuHighScore();
  }

  function bindEvents() {
    // Language buttons on start
    $('#btn-lang-en').addEventListener('click', () => setLanguage('en'));
    $('#btn-lang-fa').addEventListener('click', () => setLanguage('fa'));
    $('#btn-lang-toggle').addEventListener('click', () => setLanguage(lang === 'en' ? 'fa' : 'en'));

    // Mode selection
    $$('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.mode-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        gameMode = btn.dataset.mode;
        $('#btn-start').disabled = false;
      });
    });

    $('#btn-start').addEventListener('click', () => startNewGame());
    $('#btn-continue').addEventListener('click', () => continueGame());
    $('#btn-undo').addEventListener('click', undo);
    $('#btn-save').addEventListener('click', () => {
      saveGame();
      showMessage(t('saved'));
    });
    $('#btn-menu').addEventListener('click', () => {
      showConfirm(t('confirmMenu'), () => {
        saveGame();
        showScreen('start');
        checkSavedGame();
      });
    });
    $('#btn-restart').addEventListener('click', () => {
      hideOverlay('gameover');
      startNewGame();
    });
    $('#btn-to-menu').addEventListener('click', () => {
      hideOverlay('gameover');
      showScreen('start');
      checkSavedGame();
    });

    // Global pointer + touch events for drag (non-passive so we can prevent scroll)
    document.addEventListener('pointermove', onPointerMove, { passive: false });
    document.addEventListener('pointerup', onPointerUp, { passive: false });
    document.addEventListener('pointercancel', onPointerUp, { passive: false });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd, { passive: false });
    document.addEventListener('touchcancel', onTouchEnd, { passive: false });
  }

  // ========== Language ==========
  function t(key, ...args) {
    const val = i18n[lang][key];
    return typeof val === 'function' ? val(...args) : val;
  }

  function setLanguage(l) {
    lang = l;
    localStorage.setItem('pb_lang', lang);
    applyLanguage();
  }

  function applyLanguage() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.body.dir = lang === 'fa' ? 'rtl' : 'ltr';

    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (i18n[lang][key] && typeof i18n[lang][key] === 'string') {
        el.textContent = i18n[lang][key];
      }
    });

    $$('[data-i18n-title]').forEach(el => {
      const key = el.dataset.i18nTitle;
      if (i18n[lang][key]) el.title = i18n[lang][key];
    });

    $('#btn-lang-en').classList.toggle('active', lang === 'en');
    $('#btn-lang-fa').classList.toggle('active', lang === 'fa');
    $('#lang-indicator').textContent = lang === 'en' ? 'FA' : 'EN';
  }

  // ========== Screens & Overlays ==========
  function showScreen(name) {
    $$('.screen').forEach(s => s.classList.remove('active'));
    $(`#${name}-screen`).classList.add('active');
  }

  function showOverlay(id) {
    $(`#${id}-overlay`).classList.add('active');
  }

  function hideOverlay(id) {
    $(`#${id}-overlay`).classList.remove('active');
  }

  function showConfirm(text, onYes) {
    $('#confirm-text').textContent = text;
    showOverlay('confirm');
    const yes = $('#confirm-yes');
    const no = $('#confirm-no');
    const cleanup = () => {
      yes.onclick = null;
      no.onclick = null;
      hideOverlay('confirm');
    };
    yes.onclick = () => { cleanup(); onYes(); };
    no.onclick = cleanup;
  }

  function showMessage(msg, duration = 1800) {
    const el = $('#message');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove('show'), duration);
  }

  // ========== High Score & Storage ==========
  function loadHighScore() {
    highScore = parseInt(localStorage.getItem('pb_highscore') || '0', 10);
  }

  function updateHighScore() {
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('pb_highscore', String(highScore));
      return true;
    }
    return false;
  }

  function updateMenuHighScore() {
    $('#menu-highscore').textContent = highScore;
  }

  function saveGame() {
    const data = {
      gridSize,
      gameMode,
      board,
      score,
      currentPieces,
      lang
    };
    localStorage.setItem('pb_save', JSON.stringify(data));
  }

  function loadGame() {
    try {
      const raw = localStorage.getItem('pb_save');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function clearSave() {
    localStorage.removeItem('pb_save');
  }

  function checkSavedGame() {
    const saved = loadGame();
    const btn = $('#btn-continue');
    if (saved && saved.board && saved.board.length > 0) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  }

  // ========== Game Logic ==========
  function startNewGame() {
    clearSave();
    score = 0;
    undoStack = null;
    gridSize = 10;
    board = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));
    currentPieces = generatePieces();
    updateScoreUI();
    $('#btn-undo').disabled = true;
    showScreen('game');
    renderBoard();
    renderPieces();
    requestAnimationFrame(fitBoard);
  }

  function continueGame() {
    const data = loadGame();
    if (!data) return;
    gridSize = data.gridSize || 10;
    gameMode = data.gameMode || 'easy';
    board = data.board;
    score = data.score || 0;
    currentPieces = data.currentPieces || generatePieces();
    if (data.lang) setLanguage(data.lang);
    undoStack = null;
    updateScoreUI();
    $('#btn-undo').disabled = true;
    showScreen('game');
    renderBoard();
    renderPieces();
    requestAnimationFrame(fitBoard);
  }

  function generatePieces() {
    const pieces = [];
    for (let i = 0; i < 3; i++) {
      const p = PIECES[Math.floor(Math.random() * PIECES.length)];
      pieces.push({
        shape: p.shape.map(([r, c]) => [r, c]),
        color: p.color,
        used: false
      });
    }
    return pieces;
  }

  function updateScoreUI() {
    $('#score').textContent = score;
    $('#highscore').textContent = highScore;
  }

  // ========== Board Rendering ==========
  function fitBoard() {
    const wrapper = $('#board-wrapper');
    const boardEl = $('#board');
    if (!wrapper || !boardEl) return;

    const availW = wrapper.clientWidth - 8;
    const availH = wrapper.clientHeight - 8;
    const gap = 2;
    const padding = 8; // board padding

    const maxCell = Math.floor(
      Math.min(
        (availW - padding - gap * (gridSize - 1)) / gridSize,
        (availH - padding - gap * (gridSize - 1)) / gridSize
      )
    );
    cellSize = Math.max(8, Math.min(maxCell, 42));

    boardEl.style.gridTemplateColumns = `repeat(${gridSize}, ${cellSize}px)`;
    boardEl.style.gridTemplateRows = `repeat(${gridSize}, ${cellSize}px)`;
    boardEl.style.gap = `${Math.max(1, Math.floor(cellSize / 12))}px`;
  }

  function renderBoard() {
    const boardEl = $('#board');
    boardEl.innerHTML = '';
    boardEl.style.gridTemplateColumns = `repeat(${gridSize}, ${cellSize}px)`;
    boardEl.style.gridTemplateRows = `repeat(${gridSize}, ${cellSize}px)`;

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.r = r;
        cell.dataset.c = c;
        if (board[r][c]) {
          cell.classList.add('filled');
          cell.style.background = board[r][c];
        }
        boardEl.appendChild(cell);
      }
    }
  }

  function getCellAt(x, y) {
    const boardEl = $('#board');
    const rect = boardEl.getBoundingClientRect();
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return null;
    const gap = parseFloat(getComputedStyle(boardEl).gap) || 2;
    const pad = 4;
    const relX = x - rect.left - pad;
    const relY = y - rect.top - pad;
    const step = cellSize + gap;
    const c = Math.floor(relX / step);
    const r = Math.floor(relY / step);
    if (r < 0 || r >= gridSize || c < 0 || c >= gridSize) return null;
    return { r, c };
  }

  // ========== Pieces Rendering ==========
  function renderPieces() {
    const container = $('#pieces-container');
    container.innerHTML = '';
    const pieceCellSize = window.innerWidth < 480 ? 15 : (window.innerWidth >= 700 ? 22 : 18);

    currentPieces.forEach((piece, idx) => {
      const slot = document.createElement('div');
      slot.className = 'piece-slot' + (piece.used ? ' used' : '');
      slot.dataset.index = idx;

      if (!piece.used) {
        const { rows, cols, grid } = shapeToGrid(piece.shape);
        const pieceGrid = document.createElement('div');
        pieceGrid.className = 'piece-grid';
        pieceGrid.setAttribute('dir', 'ltr');
        pieceGrid.style.gridTemplateColumns = `repeat(${cols}, ${pieceCellSize}px)`;
        pieceGrid.style.gridTemplateRows = `repeat(${rows}, ${pieceCellSize}px)`;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.className = 'piece-cell';
            cell.style.width = pieceCellSize + 'px';
            cell.style.height = pieceCellSize + 'px';
            if (grid[r][c]) {
              cell.style.background = piece.color;
            } else {
              cell.style.visibility = 'hidden';
            }
            pieceGrid.appendChild(cell);
          }
        }
        slot.appendChild(pieceGrid);

        // Prefer pointer events; fall back to touch for older mobile browsers
        if (window.PointerEvent) {
          slot.addEventListener('pointerdown', (e) => startDrag(e, idx));
        } else {
          slot.addEventListener('touchstart', (e) => startDrag(e, idx), { passive: false });
          slot.addEventListener('mousedown', (e) => startDrag(e, idx));
        }
      }
      container.appendChild(slot);
    });
  }

  function shapeToGrid(shape) {
    let maxR = 0, maxC = 0;
    shape.forEach(([r, c]) => {
      maxR = Math.max(maxR, r);
      maxC = Math.max(maxC, c);
    });
    const rows = maxR + 1;
    const cols = maxC + 1;
    const grid = Array.from({ length: rows }, () => Array(cols).fill(false));
    shape.forEach(([r, c]) => { grid[r][c] = true; });
    return { rows, cols, grid };
  }

  /** Rotate shape 90° clockwise and normalize to (0,0) top-left */
  function rotateShape(shape) {
    // (r, c) -> (c, maxR - r)
    let maxR = 0;
    shape.forEach(([r]) => { maxR = Math.max(maxR, r); });
    const rotated = shape.map(([r, c]) => [c, maxR - r]);
    // Normalize
    let minR = Infinity, minC = Infinity;
    rotated.forEach(([r, c]) => {
      minR = Math.min(minR, r);
      minC = Math.min(minC, c);
    });
    return rotated.map(([r, c]) => [r - minR, c - minC]);
  }

  // ========== Drag & Drop ==========
  function startDrag(e, idx) {
    if (currentPieces[idx].used) return;
    e.preventDefault();
    e.stopPropagation();

    const point = getEventPoint(e);
    pointerDownTime = Date.now();
    pointerDownPos = { x: point.x, y: point.y };
    didDrag = false;
    dragPieceIndex = idx;
    selectedPieceIndex = idx;
    isDragging = true;

    const slot = e.currentTarget;
    if (e.pointerId != null && slot.setPointerCapture) {
      try { slot.setPointerCapture(e.pointerId); } catch (_) {}
    }
  }

  function getEventPoint(e) {
    if (e.touches && e.touches.length) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    if (e.changedTouches && e.changedTouches.length) {
      return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  function createGhost(piece, x, y) {
    removeGhost();
    const { rows, cols, grid } = shapeToGrid(piece.shape);
    ghostEl = document.createElement('div');
    ghostEl.className = 'drag-ghost';
    const size = Math.max(14, Math.min(cellSize - 2, 36));
    ghostEl.style.setProperty('--ghost-size', size + 'px');
    ghostEl.style.gridTemplateColumns = `repeat(${cols}, ${size}px)`;
    ghostEl.style.gridTemplateRows = `repeat(${rows}, ${size}px)`;
    ghostEl.style.gap = '2px';

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement('div');
        cell.className = 'piece-cell';
        if (grid[r][c]) {
          cell.style.background = piece.color;
        } else {
          cell.style.visibility = 'hidden';
        }
        ghostEl.appendChild(cell);
      }
    }
    ghostEl.setAttribute('dir', 'ltr');
    document.body.appendChild(ghostEl);
    moveGhost(x, y);
  }

  function moveGhost(x, y) {
    if (!ghostEl) return;
    // Use transform with physical viewport coords so RTL never inverts X
    ghostEl.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
  }

  function removeGhost() {
    if (ghostEl) {
      ghostEl.remove();
      ghostEl = null;
    }
  }

  function onPointerMove(e) {
    if (dragPieceIndex < 0 || !isDragging) return;
    e.preventDefault();
    handleMove(getEventPoint(e));
  }

  function onTouchMove(e) {
    if (dragPieceIndex < 0 || !isDragging) return;
    e.preventDefault();
    handleMove(getEventPoint(e));
  }

  function handleMove(point) {
    const dx = point.x - pointerDownPos.x;
    const dy = point.y - pointerDownPos.y;
    if (!didDrag && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      didDrag = true;
      const slot = document.querySelector(`.piece-slot[data-index="${dragPieceIndex}"]`);
      if (slot) slot.classList.add('dragging');
      createGhost(currentPieces[dragPieceIndex], point.x, point.y);
    }

    if (didDrag) {
      moveGhost(point.x, point.y);
      updatePreview(point.x, point.y);
    }
  }

  function onPointerUp(e) {
    if (dragPieceIndex < 0) return;
    e.preventDefault();
    handleUp(getEventPoint(e));
  }

  function onTouchEnd(e) {
    if (dragPieceIndex < 0) return;
    e.preventDefault();
    handleUp(getEventPoint(e));
  }

  function handleUp(point) {
    const idx = dragPieceIndex;
    const slot = document.querySelector(`.piece-slot[data-index="${idx}"]`);
    if (slot) slot.classList.remove('dragging');

    const elapsed = Date.now() - pointerDownTime;
    const dx = point.x - pointerDownPos.x;
    const dy = point.y - pointerDownPos.y;
    const isClick = !didDrag && elapsed < 400 && Math.abs(dx) < 12 && Math.abs(dy) < 12;

    if (isClick && gameMode === 'easy') {
      currentPieces[idx].shape = rotateShape(currentPieces[idx].shape);
      renderPieces();
      showMessage(t('rotateHint'), 1000);
    } else if (didDrag) {
      const pos = getCellAt(point.x, point.y);
      if (pos) {
        tryPlace(idx, pos.r, pos.c);
      }
    }

    clearPreview();
    removeGhost();
    isDragging = false;
    dragPieceIndex = -1;
    didDrag = false;
  }

  // ========== Placement & Preview ==========
  function canPlace(shape, startR, startC) {
    for (const [dr, dc] of shape) {
      const r = startR + dr;
      const c = startC + dc;
      if (r < 0 || r >= gridSize || c < 0 || c >= gridSize) return false;
      if (board[r][c]) return false;
    }
    return true;
  }

  function updatePreview(x, y) {
    clearPreview();
    if (dragPieceIndex < 0) return;
    const pos = getCellAt(x, y);
    if (!pos) return;

    const piece = currentPieces[dragPieceIndex];
    const valid = canPlace(piece.shape, pos.r, pos.c);
    const cells = $$('.cell');

    for (const [dr, dc] of piece.shape) {
      const r = pos.r + dr;
      const c = pos.c + dc;
      if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
        const idx = r * gridSize + c;
        const cell = cells[idx];
        if (cell) {
          cell.classList.add(valid ? 'preview' : 'preview-invalid');
        }
      }
    }
  }

  function clearPreview() {
    $$('.cell.preview, .cell.preview-invalid').forEach(c => {
      c.classList.remove('preview', 'preview-invalid');
    });
  }

  function tryPlace(pieceIdx, startR, startC) {
    const piece = currentPieces[pieceIdx];
    if (piece.used || !canPlace(piece.shape, startR, startC)) return false;

    // Save undo state
    undoStack = {
      board: board.map(row => row.slice()),
      score,
      currentPieces: currentPieces.map(p => ({
        shape: p.shape.map(s => [...s]),
        color: p.color,
        used: p.used
      }))
    };
    $('#btn-undo').disabled = false;

    // Place
    for (const [dr, dc] of piece.shape) {
      board[startR + dr][startC + dc] = piece.color;
    }
    piece.used = true;

    // Update board DOM first so animation can run on the new cells
    renderBoard();
    renderPieces();

    // Clear lines
    const cleared = clearLines();
    if (cleared > 0) {
      const points = cleared * 10 * (cleared > 1 ? cleared : 1) + piece.shape.length;
      score += points;
      if (cleared >= 2) {
        showMessage(t('combo', cleared));
      } else {
        showMessage(t('linesCleared', cleared));
      }
    } else {
      score += piece.shape.length;
    }

    updateScoreUI();
    updateHighScore();

    // Check if all pieces used
    if (currentPieces.every(p => p.used)) {
      currentPieces = generatePieces();
      renderPieces();
    }

    // Check game over (after potential clear animation delay is handled inside clearLines)
    const checkEnd = () => {
      if (!hasAnyValidMove()) {
        endGame();
      }
      saveGame();
    };

    if (cleared > 0) {
      setTimeout(checkEnd, 350);
    } else {
      checkEnd();
    }

    return true;
  }

  function clearLines() {
    const rowsToClear = [];
    const colsToClear = [];

    for (let r = 0; r < gridSize; r++) {
      if (board[r].every(cell => cell !== null)) rowsToClear.push(r);
    }
    for (let c = 0; c < gridSize; c++) {
      let full = true;
      for (let r = 0; r < gridSize; r++) {
        if (!board[r][c]) { full = false; break; }
      }
      if (full) colsToClear.push(c);
    }

    if (rowsToClear.length === 0 && colsToClear.length === 0) return 0;

    // Animate existing cells
    const cells = $$('.cell');
    const toAnimate = new Set();
    rowsToClear.forEach(r => {
      for (let c = 0; c < gridSize; c++) toAnimate.add(r * gridSize + c);
    });
    colsToClear.forEach(c => {
      for (let r = 0; r < gridSize; r++) toAnimate.add(r * gridSize + c);
    });

    toAnimate.forEach(idx => {
      if (cells[idx]) cells[idx].classList.add('clearing');
    });

    // Clear data and re-render after animation
    setTimeout(() => {
      rowsToClear.forEach(r => {
        for (let c = 0; c < gridSize; c++) board[r][c] = null;
      });
      colsToClear.forEach(c => {
        for (let r = 0; r < gridSize; r++) board[r][c] = null;
      });
      renderBoard();
    }, 320);

    return rowsToClear.length + colsToClear.length;
  }

  function hasAnyValidMove() {
    for (const piece of currentPieces) {
      if (piece.used) continue;
      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          if (canPlace(piece.shape, r, c)) return true;
        }
      }
    }
    return false;
  }

  function undo() {
    if (!undoStack) return;
    board = undoStack.board;
    score = undoStack.score;
    currentPieces = undoStack.currentPieces;
    undoStack = null;
    $('#btn-undo').disabled = true;
    updateScoreUI();
    renderBoard();
    renderPieces();
    saveGame();
  }

  function endGame() {
    const isNew = updateHighScore();
    updateMenuHighScore();
    $('#final-score').textContent = score;
    const msg = $('#new-high-msg');
    msg.style.display = isNew ? 'block' : 'none';
    clearSave();
    showOverlay('gameover');
  }

  // ========== Resize ==========
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if ($('#game-screen').classList.contains('active')) {
        fitBoard();
        renderBoard();
      }
    }, 100);
  });

  // Start
  init();
})();

