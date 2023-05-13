function applyBoldToText(text) {
	return text?.replace(/\b(\w{1,})(\w*)\b/g, (match, p1, p2) => {
		const halfLength = Math.ceil(p1.length / 2);
		const firstHalf = p1.slice(0, halfLength);
		const secondHalf = p1.slice(halfLength) + p2;
		return `<strong style="font-size: 1.1em;">${firstHalf}</strong>${secondHalf}`;
	});
}

function applyBoldToElement(element) {
	if (element.childNodes.length === 0) {
		element.innerHTML = applyBoldToText(element.innerHTML);
	} else {
		element.childNodes.forEach((child) => {
			if (child.nodeType === Node.TEXT_NODE) {
				if (child.parentElement.classList.contains('read-x')) {
					return;
				}
				const newNode = document.createElement('span');
				newNode.classList.add('read-x')
				child.parentElement.classList.add('read-x');
				newNode.innerHTML = applyBoldToText(child.textContent);
				child.replaceWith(newNode);
			} else {
				applyBoldToElement(child);
			}
		});
	}
}


function applyBoldToArticle() {
	const articleElements = document.querySelectorAll('article, summary, p, li, h1, h2, h3, h4, h5, h6');
	articleElements.forEach((element) => {
		applyBoldToElement(element);
	});
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'applyBold') {
		applyBoldToArticle();
	}
});

// window.addEventListener('DOMContentLoaded', function () {
// 	applyBoldToArticle();
// });

try{
	chrome.storage.sync.get('applyBold', (data) => {
		if (!data.applyBold) return;
		applyBoldToArticle();
	});
} catch (ex) {
	console.warn('read-x: Error while attempting to auto-run: ', ex);
}