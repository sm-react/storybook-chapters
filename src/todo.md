// todo: Next

- отправлять currentChapter в addon
там сверять с текущем выбраным StoryKind
если не совпадают, обнулять chapter path

- export chapterSelect только с текущим значением автоматически (аналог link)
вопрос как это использовать в stories по объекту? как его получать? тогда возвращать сразу функцию?

- .bookmark((bmk) => {myBmk = bmk})
чтобы потом myBmk() - перейти на это часть
можно добавить пункт .bookmarkList(TOC) - со всеми закладками
TOC = ([{bookmark, toBookmark}])

- .tags(['tag1', 'tag2']) - список тэгов
.tagList(TOC) - список тэгов. TOC = ([{tag, toTag}])

- то же самое сделать для TOC:
    breadcrumps: {bredName: toBred}
    subchap:
    stories
- .enable / .disable - чтобы управлять стори с верхнего уровня
enable((enbl) => {widgetA.push(enbl)})

- добавить возможность управлять enable/disable через панель

- enable/disable через store - просто объект с true/false
