const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const glob = require('glob');
const xml2js = require('xml2js');

const COLUMNS_PER_PAGE = 3;
const ROWS_PER_PAGE = 3;

exports.generateCardsPDF = function() {

  const doc = new PDFDocument({
    autoFirstPage: false,
    margins: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    }
  });

  // List card decks
  const cardFiles = glob.sync(__dirname+'/cards/*.yml');

  // Iterate over selected decks
  for(let c = 0; c < cardFiles.length; ++c) {

    // Load deck data
    let deck = yaml.safeLoad(fs.readFileSync(cardFiles[c]));

    if(!deck || !Array.isArray(deck.cards)) continue;

    doc.addPage();

    // Compute card sizes
    const pageContentHeight = doc.page.height - doc.page.margins.top - doc.page.margins.bottom;
    const pageContentWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const cardWidth = pageContentWidth/COLUMNS_PER_PAGE;
    const cardHeight = pageContentHeight/ROWS_PER_PAGE;

    let xPos = doc.page.margins.left;
    let yPos = doc.page.margins.top;

    deck.cards.forEach((card, i) => {

      // Line break
      if(i !== 0 && i%COLUMNS_PER_PAGE === 0) {
        yPos += cardHeight;
        xPos = doc.page.margins.left;
      }

      // Page break
      if(i !== 0 && i%(ROWS_PER_PAGE*COLUMNS_PER_PAGE) === 0) {
        doc.addPage();
        xPos = doc.page.margins.left;
        yPos = doc.page.margins.top;
      }

      drawCard({ doc, card, xPos, yPos, cardHeight, cardWidth });

      // Shift insertion point
      xPos += cardWidth;

    });

  }

  doc.pipe(fs.createWriteStream(__dirname + '/dist/cards.pdf'));
  doc.end();

};

function drawCard(opts) {

  const {doc, card, xPos, yPos, cardHeight, cardWidth} = opts;

  const CARD_MARGIN = 10;
  const CARD_CONTENT_WIDTH = cardWidth-CARD_MARGIN*2;
  const XP_ICON_PATH = loadIconSVGPath('icons/lorc/originals/svg/000000/transparent/moebius-triangle.svg');

  doc.save();

  // Draw card
  doc.rect(
      xPos,
      yPos,
      cardWidth,
      cardHeight
    )
    .stroke()
  ;

  doc
    .fontSize(14)
    .text(card.title, xPos + CARD_MARGIN, yPos + CARD_MARGIN)
  ;

  if(card.icon) {

    let iconSVGPath = loadIconSVGPath(card.icon);

    doc
      .translate(xPos + CARD_CONTENT_WIDTH/2 - CARD_CONTENT_WIDTH/4, yPos + CARD_MARGIN * 3)
      .scale(0.2)
      .path(iconSVGPath)
      .fill('black')
      .restore()
    ;

  }

  if(Array.isArray(card.types)) {
    doc
      .fontSize(7)
      .text(card.types.join(', '), xPos + CARD_MARGIN, yPos + CARD_MARGIN + cardHeight/2)
    ;
  }

  doc.moveDown();

  doc
    .fontSize(9)
    .text(card.effect, {
      width: cardWidth - CARD_MARGIN*2,
      align: 'left'
    })
    .restore()
  ;

  doc.save();

  doc.translate(
      xPos + cardWidth - CARD_MARGIN * 5,
      yPos + cardHeight - CARD_MARGIN * 2
    )
    .scale(0.03)
    .path(XP_ICON_PATH)
    .fill('black')
  ;

  doc.restore();

  doc
    .fontSize(12)
    .text(
      ("00" + card.cost).slice(-3),
      xPos + cardWidth - CARD_MARGIN * 3,
      yPos + cardHeight - CARD_MARGIN * 1.6,
      {
        width: CARD_MARGIN*3,
        align: 'left'
      }
    )
  ;

}

function loadIconSVGPath(iconPath) {
  let svg = fs.readFileSync(iconPath, 'utf8');
  xml2js.parseString(svg, (err, result) => { svg = result; });
  return svg.svg.path[0]['$'].d;
}

exports.generateCardsPDF();
