document.getElementById('translateBtn').addEventListener('click', async () => {
  const text = document.getElementById('inputText').value;
  const src = document.getElementById('sourceLang').value;
  const dest = document.getElementById('targetLang').value;

  const response = await fetch('/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, src, dest })
  });

  const data = await response.json();
  if (data.translated_text) {
    document.getElementById('outputText').innerText = data.translated_text;
  } else {
    alert("Error: " + data.error);
  }
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const text = document.getElementById('outputText').innerText;
  navigator.clipboard.writeText(text);
  alert('Copied!');
});

document.getElementById('speakBtn').addEventListener('click', async () => {
  const text = document.getElementById('outputText').innerText;
  const language = document.getElementById('targetLang').value;

  const response = await fetch('/speak', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, language })
  });

  const data = await response.json();
  if (data.audio_path) {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = data.audio_path;
    audioPlayer.hidden = false;
    audioPlayer.play();
  }
});
