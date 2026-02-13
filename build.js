const fs = require('fs');
const path = require('path');

const talks = require('./talks.json');
const templateHtml = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
const styleCss = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
const scriptJs = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');

function generateTalkScheduleHtml(talksData) {
    let html = '<table class="talk-table"><thead><tr><th>Time</th><th>Title</th><th>Speakers</th><th>Category</th><th>Description</th></tr></thead><tbody>';
    
    talksData.forEach(talk => {
        const isLunch = talk.title === "Lunch Break";
        const rowClass = isLunch ? 'talk-row lunch-break' : 'talk-row';
        const categoryHtml = talk.category.map(cat => `<span>${cat}</span>`).join('');

        html += `<tr class="${rowClass}">`;
        html += `<td>${talk.time}</td>`;
        html += `<td><h3>${talk.title}</h3></td>`;
        html += `<td>${talk.speakers.join(', ')}</td>`;
        html += `<td class="category">${categoryHtml}</td>`;
        html += `<td>${talk.description}</td>`;
        html += `</tr>`;
    });

    html += '</tbody></table>';
    return html;
}

const scheduleHtml = generateTalkScheduleHtml(talks);

let finalHtml = templateHtml
    .replace('<!-- Talks will be injected here by the build script -->', scheduleHtml)
    .replace('<style id="event-styles"></style>', `<style id="event-styles">${styleCss}</style>`)
    .replace('<script id="event-scripts"></script>', `<script id="event-scripts">${scriptJs}</script>`);

fs.writeFileSync(path.join(__dirname, 'index.html'), finalHtml, 'utf8');

console.log('index.html generated successfully!');
