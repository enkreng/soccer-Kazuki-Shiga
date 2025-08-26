// 年を自動で更新
document.getElementById('year').textContent = new Date().getFullYear();

// PWA インストール対応
let deferredPrompt;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});

installBtn && installBtn.addEventListener('click', async () => {
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.hidden = true;
});

// デモ用アプリ起動
document.getElementById('open-app').addEventListener('click', (e) => {
  e.preventDefault();
  alert('ここに実際のアプリページへのリンクを追加してください。');
});

// ニュースサンプル
document.getElementById('news').textContent =
  '次の観戦予定: 2025-09-14 名古屋グランパス vs ○○ at 豊田スタジアム';
