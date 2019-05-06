require.config({
    paths: {
        "mui": "libs/mui.min"
    }
})
require(['mui'], function(mui) {
    var page = 0;
    var key;
    // console.log(mui);
    function init() {
        mui.init({
            pullRefresh: {
                container: "#scroll", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
                up: {

                    callback: addevent //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                }
            }
        });

        addevent();
        Click()

    }
    //写better-scroll时(加tab切换)，要注意排版，不然点不了
    function Click() {
        var ultops = [...document.querySelectorAll('.ultop li')];
        ultops.forEach(function(item, index) {
            item.onclick = function() {
                page = 0;

                for (var i = 0; i < ultops.length; i++) {
                    ultops[i].classList.remove('active')
                }
                item.classList.add('active');

                document.querySelector('#ulis').innerHTML = '';
                addevent()
            }
        })

    }

    function addevent() {
        page++;
        var htm = document.querySelector('.active').innerHTML;
        mui.ajax('/api/getdata', {
            data: {
                "style": htm,
                "page": page,
                "pageSize": 2,
                "key": key
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            success: function(res) {
                if (res.data.length === 0) {
                    mui('#scroll').pullRefresh().endPullupToRefresh(true);
                } else {
                    mui('#scroll').pullRefresh().endPullupToRefresh(false);
                    mui('#scroll').pullRefresh().refresh(true);
                    var html = '';
                    var ulis = document.querySelector('#ulis')
                    console.log(res.data);
                    res.data.forEach(function(item) {
                        html += `
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<img class="mui-media-object mui-pull-left" src="${item.img}">
								<div class="mui-media-body">
									${item.name}
									<p class='mui-ellipsis'>${item.title}</p>
								</div>
							</a>
						</li>
						`
                    })
                    ulis.innerHTML += html;
                }

            },

        });

    }
    init()



})