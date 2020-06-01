let Bangumi = options => {
    let vmid = options.vmid;
    let pn = 1;
    let ps = options.hasOwnProperty('ps')?options.ps:15;
    let followStatus = options.hasOwnProperty('defaultStatus')?options.defaultStatus:3;
    let showScore = options.hasOwnProperty('showScore')?options.showScore:true;
    let showBar = options.hasOwnProperty('showBar')?options.showBar:true;
    let isEnd = false;
    let isLoading = false;
    let container = document.getElementsByClassName(options.container)[0];
    let XHR = new XMLHttpRequest();

    let bangumiList = document.createElement('div');
    bangumiList.className = 'bangumi_list';
    container.append(bangumiList);

    if (showBar) {
        let bangumiBar = document.createElement('div');

        bangumiBar.className = 'bangumi_bar';

        menus = [
            document.createElement('span'),
            document.createElement('span'),
            document.createElement('span'),
            document.createElement('span')
        ];

        for(let i = 0; i < menus.length; i++){
            menus[i].className = 'bangumi_menu';
            menus[i].dataset['status'] = i;
            menus[i].addEventListener('click', e => changeStatus(e));
        };

        menus[0].innerText = '全部';
        menus[1].innerText = '想看';
        menus[2].innerText = '看过';
        menus[3].innerText = '在看';


        menus[followStatus].className = 'bangumi_menu bangumi_menu_current';

        bangumiBar.append(menus[0], menus[1], menus[2], menus[3]);

        container.insertBefore(bangumiBar, bangumiList);

    };

    XHR.onreadystatechange = () => {
        if (XHR.readyState==4 && XHR.status==200)
		{
            addList();
            isLoading = false;
        };
    };

    let docHeight;
    let scrollHeight;
    let scrollY;

    document.onscroll = () => {
        if ((document.scrollHeight || document.body.scrollHeight) <= (window.innerHeight || document.clientHeight || document.body.clientHeight) + (window.pageYOffset || document.scrollTop || document.body.scrollTop)) {
            if (isLoading) {
                return;
            };
            pn++;
            getList(pn);
        };
    };
    getList(pn);

    function getList(page){
        if (isEnd){
            return;
        };
        isLoading = true;
        XHR.open('GET', 'https://api.thebearsoft.cn/bilibangumi?ps=' + ps + '&pn=' + page + '&follow_status=' + followStatus + '&vmid=' + vmid, true);
        XHR.send();
    };
    
    function addList(){
        data = JSON.parse(XHR.responseText);
        total = data.data.total;
        data.data.list.forEach(item => {
            let itemBox = document.createElement('div');
            let itemCover = document.createElement('img');
            let itemTitle = document.createElement('h3');
            let itemA = document.createElement('a');
            itemBox.className = 'bangumi_item';
            itemCover.className = 'bangumi_cover';
            itemTitle.className = 'bangumi_title';
            itemA.target = '_blank';
            itemA.href = item.url;
            itemCover.src = item.cover.replace(/^http\:\/\//, 'https://');
            itemTitle.innerText = item.title;


            if (showScore) {
                let itemScore = document.createElement('span');
                itemScore.className = 'bangumi_score';
                if (item.hasOwnProperty('rating')) {
                    itemScore.innerText = item.rating.score;
                    itemBox.appendChild(itemScore);
                };
            };

            itemA.append(itemCover, itemTitle);
            itemBox.appendChild(itemA);
            bangumiList.appendChild(itemBox);
        });
        if (document.getElementsByClassName('bangumi_item').length >= total) {
            isEnd = true;
        }
    };

    function changeStatus(e){
        if(followStatus == e.target.dataset.status) {
            return;
        };
        isEnd = false;
        menus[followStatus].className = 'bangumi_menu';
        followStatus = e.target.dataset.status;
        menus[followStatus].className = 'bangumi_menu bangumi_menu_current';
        pn = 1;
        bangumiList.innerHTML = null;

        getList(pn);
    };

};
