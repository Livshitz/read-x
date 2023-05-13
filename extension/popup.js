document.getElementById('applyBold').addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, { action: 'applyBold' });
	});
});

const applyBoldCheckbox = document.getElementById('applyBoldCheckbox');

applyBoldCheckbox.addEventListener('change', () => {
	chrome.storage.sync.set({ applyBold: applyBoldCheckbox.checked });
});

chrome.storage.sync.get('applyBold', (data) => {
  	applyBoldCheckbox.checked = data.applyBold || false;
});