var bible = {
    content: [],
    key: 'kja',
    name: 'King James Atualizada',
    translation: {
        name:"Português",
        ptName:"Português",
        enName:"Portuguese",
        langKey:"pt"
    }
};


const books = [
{testament: 'new', key: 'mt'},
{testament: 'new', key: 'mc'},
{testament: 'new', key: 'lc'},
{testament: 'new', key: 'jo'},
{testament: 'new', key: 'atos'},
{testament: 'new', key: 'rm'},
{testament: 'new', key: '1co'},
{testament: 'new', key: '2co'},
{testament: 'new', key: 'gl'},
{testament: 'new', key: 'ef'},
{testament: 'new', key: 'fp'},
{testament: 'new', key: 'cl'},
{testament: 'new', key: '1ts'},
{testament: 'new', key: '2ts'},
{testament: 'new', key: '1tm'},
{testament: 'new', key: '2tm'},
{testament: 'new', key: 'tt'},
{testament: 'new', key: 'fm'},
{testament: 'new', key: 'hb'},
{testament: 'new', key: 'tg'},
{testament: 'new', key: '1pe'},
{testament: 'new', key: '2pe'},
{testament: 'new', key: '1jo'},
{testament: 'new', key: '2jo'},
{testament: 'new', key: '3jo'},
{testament: 'new', key: 'jd'},
{testament: 'new', key: 'ap'}];

async function timer(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function loadVerse(chapterList, url, currentVerse = 1) {
    console.info('waiting 1s');
    timer(1000);

    let htmlString = '';
    try {
        const response = await fetch(url + currentVerse);
        htmlString = await response.text();
    } catch (e) {
        console.info('waiting 10s');
        timer(10000);
        return loadVerse(chapterList, url, currentVerse);
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const element = doc.querySelector('.mdl-card__supporting-text');

    if (element) {
        const text = element.innerText.trim();
        if (text) {
            console.info(currentVerse, text);
            chapterList.push({
                verse: String(currentVerse), text
            });

            await loadVerse(chapterList, url, ++currentVerse);
        } else {
            console.info(':: chapter end');
        }
    }
}

async function fillChapter(book, bookNumber, chapterNumber = 1) {
    const chapterList = [];
    const bookNumberZerofilled = bookNumber < 10? `0${bookNumber}` : bookNumber;
    const chapterUrl = `https://bibliajfa.com.br/app/kja/${bookNumberZerofilled}N/${chapterNumber}/`;

    await loadVerse(chapterList, chapterUrl);
    if (chapterList.length) {
        book.content.push(chapterList);
        book.chapter = chapterNumber;
        await fillChapter(book, bookNumber, ++chapterNumber);
        console.info(`:: chapter ${chapterNumber} loaded`);
    }

    console.info(':: book end');
}

async function fill(bookNumber = 1){
    for await (let book of books) {
        let currentBook = {};
        currentBook.testament = book.testament;
        currentBook.key = book.key;
        currentBook.chapter = 0;
        currentBook.content = [];
        bible.content.push(currentBook);

        await fillChapter(currentBook, bookNumber);
        bookNumber++;
    }
};

fill(40);