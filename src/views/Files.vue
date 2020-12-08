<template>
    <div>
        <div class="topheader" v-bind:class="[needFixed ? 'fixTop' : 'unfixed' ,'']">
            <div id="opeartionBar">
                <div class="iconBtn">
                    <input class="file-upload-input" id="file-upload-button" type="file" accept="*" @change="uploadFile"/>
                    <svg t="1606891653726" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3988" width="128" height="128"><path d="M274.432 377.855999q-27.648 0-35.328-14.848t10.752-38.4q19.456-24.576 45.056-59.392t53.248-72.192 53.76-72.704 46.592-60.928q18.432-23.552 35.328-24.576t36.352 21.504q19.456 23.552 44.544 56.832t51.712 69.632 52.736 71.168 46.592 60.416q22.528 27.648 17.408 46.08t-33.792 17.408q-17.408 0-45.056 1.024t-46.08 1.024q-20.48 1.024-25.088 12.8t-4.608 32.256l0 50.176q0 27.648 0.512 56.32t0.512 56.32l0 51.2q0 10.24-1.536 21.504t-7.168 20.48-16.384 15.36-29.184 6.144q-21.504 0-39.424 0.512t-42.496 0.512q-33.792 0-45.568-15.872t-11.776-50.688l0-39.936q0-23.552-0.512-50.176t-0.512-53.248l0-48.128q0-30.72-6.144-48.64t-27.648-16.896q-15.36 0-37.376-1.024t-39.424-1.024zM961.535999 901.119998q6.144 24.576-2.56 47.104t-27.136 39.424-45.056 26.624-57.344 9.728l-694.271999 0q-36.864 0-65.024-13.312t-45.056-32.768-22.528-42.496 1.536-41.472q6.144-14.336 12.288-29.696 5.12-13.312 12.288-30.208t15.36-34.304l38.912-94.208 116.736 0-44.032 129.024 659.455999 0-44.032-129.024 111.616 0q21.504 52.224 38.912 94.208 7.168 18.432 14.336 35.84t12.8 31.232 9.216 23.552 3.584 10.752z" p-id="3989" fill="#ffffff"></path></svg>
                    <p>上传</p>
                </div>

                <div class="iconBtn" @click="newFolderVisible=true">
                    <svg t="1606903568218" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2856" width="200" height="200"><path d="M1018.23488 882.664107c0 0 0-559.342933 0-621.01504 0-83.749547-76.26752-75.97056-76.26752-75.97056s-363.779413 0.539307-339.69152 0c-26.170027 0.58368-39.03488-13.70112-39.03488-13.70112s-18.10432-31.20128-50.72896-80.530773c-34.194773-51.725653-73.786027-43.277653-73.786027-43.277653L102.85056 48.16896c-93.057707 0-94.08512 89.51808-94.08512 89.51808s0 675.874133 0 740.3008c0 99.853653 75.421013 87.487147 75.421013 87.487147s807.857493 0 864.679253 0C1029.533013 965.471573 1018.23488 882.664107 1018.23488 882.664107zM857.091413 873.68704c-56.825173 0-681.12384 0-681.12384 0s-75.424427 12.36992-75.424427-87.487147c0-64.41984 0-556.73856 0-556.73856s1.030827-89.51808 94.088533-89.51808l175.264427 0c0 0 39.594667-8.448 73.78944 43.281067 32.62464 49.329493 50.72896 80.52736 50.72896 80.52736s12.858027 14.288213 39.031467 13.704533c-24.087893 0.535893 316.740267 0 316.740267 0s76.27776-7.775573 76.27776 75.97056c0 61.672107 0 437.46304 0 437.46304S937.751893 873.68704 857.091413 873.68704z" p-id="2857" fill="#ffffff"></path><path d="M685.605547 553.079467l-149.138773 0 0-149.138773c0-6.331733-5.13024-11.472213-11.472213-11.472213l-22.944427 0c-6.33856 0-11.472213 5.14048-11.472213 11.472213l0 149.138773-149.138773 0c-6.341973 0-11.472213 5.143893-11.472213 11.472213l0 22.94784c0 6.335147 5.126827 11.461973 11.472213 11.461973l149.138773 0 0 149.1456c0 6.341973 5.133653 11.472213 11.472213 11.472213l22.944427 0c6.341973 0 11.472213-5.13024 11.472213-11.472213l0-149.1456 149.138773 0c6.341973 0 11.475627-5.126827 11.475627-11.461973l0-22.94784C697.084587 558.22336 691.950933 553.079467 685.605547 553.079467z" p-id="2858" fill="#ffffff"></path></svg>
                    <p>新建文件夹</p>
                </div>

                <div id="mutilOpBar" ref="mutilOpBar">
                    <div class="iconBtnWithoutFrame">
                        <svg t="1606893478813" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4866" width="200" height="200"><path d="M705.1776 338.4832C684.9536 249.2928 605.184 184.32 512 184.32c-93.184 0-172.9536 64.9728-193.1776 154.1632C241.9712 353.2288 184.32 421.1712 184.32 501.1968c0 91.4432 74.3936 165.8368 165.8368 165.8368h18.944c14.1312 0 25.6-11.4688 25.6-25.6s-11.4688-25.6-25.6-25.6h-18.944C286.976 615.8848 235.52 564.4288 235.52 501.1968c0-60.0576 47.0016-110.2848 106.9568-114.2272l21.1456-1.3824 2.56-21.0432C375.1936 290.9696 437.8624 235.52 512 235.52s136.8064 55.4496 145.8176 129.024l2.56 21.0432 21.1456 1.3824c59.9552 3.9936 106.9568 54.1696 106.9568 114.2272 0 63.232-51.4048 114.6368-114.6368 114.6368h-18.944c-14.1312 0-25.6 11.4688-25.6 25.6s11.4688 25.6 25.6 25.6h18.944c91.4432 0 165.8368-74.3936 165.8368-165.8368 0-80.0256-57.6512-147.968-134.5024-162.7136z" p-id="4867" fill="#ffffff"></path><path d="M576.4608 713.4208l-38.8608 38.8608v-235.2128c0-14.1312-11.4688-25.6-25.6-25.6s-25.6 11.4688-25.6 25.6v235.2128l-38.8608-38.8608a25.61536 25.61536 0 0 0-36.1984 0 25.61536 25.61536 0 0 0 0 36.1984l82.5856 82.5856a25.4976 25.4976 0 0 0 18.1248 7.4752c6.5536 0 13.1072-2.5088 18.1248-7.4752l82.5856-82.5856a25.61536 25.61536 0 0 0 0-36.1984c-10.0864-10.0352-26.3168-10.0352-36.3008 0z" p-id="4868" fill="#ffffff"></path></svg>
                        <p>下载</p>
                    </div>
                    <div class="iconBtnWithoutFrame">
                        <svg t="1606893899946" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2158" width="200" height="200"><path d="M561.1 708.454V413.798c0-47.155 49.102-47.155 49.102 0v294.708c0.05 34.099-49.101 38.656-49.101-0.052z m-147.302 0V413.798c0-47.155 49.101-47.155 49.101 0v294.708c0 38.656-49.1 34.099-49.1-0.052z m442.01-442.01H708.454v-49.151c0-71.731-22.988-98.253-98.252-98.253H413.798c-74.035 0-98.252 24.166-98.252 98.253v49.152H168.192c-53.094 0-53.094 49.1 0 49.1h687.616c53.094 0 53.094-49.1 0-49.1z m-491.162-49.151c0-47.667 2.97-49.101 49.101-49.101h196.455c46.08 0 49.1 1.126 49.1 49.1v49.153H364.646v-49.152z m343.91 687.616h-393.01c-70.964 0-98.253-27.239-98.253-98.253V413.798c0-49.612 49.1-49.612 49.1 0v392.91c0 47.718-0.102 49.151 49.101 49.151h392.91c47.718 0 49.1 0.154 49.1-49.152V413.798c0-48.486 49.1-48.486 49.1 0v392.91c0.103 69.426-23.96 98.2-98.047 98.2z" p-id="2159" fill="#ffffff"></path></svg>
                        <p>删除</p>
                    </div>
                    <div class="iconBtnWithoutFrame">
                        <svg t="1606893791095" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5761" width="200" height="200"><path d="M913.792 67.648h-634.112a44.416 44.416 0 0 0-44.608 44.608v634.112c0 24.768 19.84 44.608 44.608 44.608h634.112c24.768 0 44.608-19.84 44.608-44.608v-634.112c0.96-24.832-19.84-44.608-44.608-44.608z m-638.336 683.648V107.776h644.608v643.52H275.456z m499.52 76.288h-9.856c13.888 0 25.792 10.88 23.808 24.768v59.456c0 24.768-19.84 44.608-44.608 44.608h-634.112a44.416 44.416 0 0 1-44.608-44.608v-634.112c0-24.768 19.84-44.608 44.608-44.608h67.392c13.888 0 20.16 4.8 20.16 18.688 0 13.888-6.272 23.488-20.16 23.488h-74.112v640h649.216v-62.912c0-13.888 8.384-24.768 22.272-24.768z" p-id="5762" fill="#ffffff"></path><path d="M569.408 384h-128v44.8h128v128h44.8v-128h128v-44.8h-128v-128h-44.8v128z" p-id="5763" fill="#ffffff"></path></svg>
                        <p>复制到</p>
                    </div>
                    <div class="iconBtnWithoutFrame">
                        <svg t="1606893870811" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8892" width="200" height="200"><path d="M604.16 716.8c-5.12 0-15.36 0-15.36-5.12-10.24-10.24-10.24-25.6 0-35.84l189.44-199.68-189.44-199.68c-10.24-10.24-10.24-25.6 0-35.84 10.24-10.24 25.6-10.24 35.84 0l225.28 235.52-225.28 230.4c-5.12 10.24-10.24 10.24-20.48 10.24z" fill="#ffffff" p-id="8893"></path><path d="M808.96 501.76H179.2c-15.36 0-25.6-10.24-25.6-25.6s10.24-25.6 25.6-25.6h629.76c15.36 0 25.6 10.24 25.6 25.6s-10.24 25.6-25.6 25.6z" fill="#ffffff" p-id="8894"></path></svg>
                        <p>移动到</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="content">
            <ul id="filePath">
                <li><router-link :to="{path: '/files/' + root}"><a>全部文件</a></router-link></li>
                <li v-for="item in paths" :key="item.id">
                    / <router-link :to="{path: '/files/' + item.path}"><a>{{item.name}}</a></router-link>
                </li>
            </ul>
            <div id="fileHeader">
                <div id="title-fileName">文件</div>
                <div id="title-fileSize">大小</div>
                <div id="title-fileDate">修改日期</div>
            </div>
          <el-table v-if="loading" v-loading="loading" style="height: 200px;width: 100%;"></el-table>
            <form action="" method="get">
            <ul>
                <li v-for="item in files" :key="item.attributes.id">

                    <div class="fileItem" v-if="item.attributes.type==='text/directory'" @dblclick="enterFolder(item.attributes.name)">
                        <input class="fileCheck" v-model="item.selected" @change="checkboxOnclick(item)" type="checkbox"/>
                        <div class="fileIcon">
                            <svg t="1606829000232" class="icon" viewBox="0 0 1185 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16670" width="48" height="48"><path d="M107.789474 0h319.218526A129.347368 129.347368 0 0 1 529.246316 50.176L840.757895 452.715789H0V107.789474a107.789474 107.789474 0 0 1 107.789474-107.789474z" fill="#EB9B00" p-id="16671"></path><path d="M138.186105 183.242105h909.312c48.074105 0 65.482105 5.012211 82.997895 14.389895 17.623579 9.377684 31.420632 23.174737 40.798316 40.744421 9.377684 17.569684 14.389895 35.031579 14.389895 82.997895v564.439579c0 48.074105-5.012211 65.482105-14.389895 82.997894-9.377684 17.623579-23.174737 31.420632-40.744421 40.798316-17.569684 9.377684-35.031579 14.389895-82.997895 14.389895H138.132211c-48.074105 0-65.482105-5.012211-82.997895-14.389895a97.926737 97.926737 0 0 1-40.798316-40.744421C5.012211 951.242105 0 933.834105 0 885.867789V321.374316c0-48.074105 5.012211-65.482105 14.389895-82.997895 9.377684-17.623579 23.174737-31.420632 40.744421-40.798316 17.569684-9.377684 35.031579-14.389895 82.997895-14.389894z" fill="#F8B700" p-id="16672"></path></svg>
                        </div>
                        <div class="file-fileName"><div class="vertical-middle-align"><p>{{item.attributes.name}}</p></div></div>
                        <div class="opBtn">
                            <div class="downloadBtn"><svg class="icon" viewBox="0 0 1068 1024"></svg></div>
                            <div class="deleteBtn" @click="deleteFile(item.attributes.id)"><svg t="1606827398890" class="icon" viewBox="0 0 1030 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4913" width="32" height="32"><path d="M409.6 896c-19.2 0-32-12.8-32-32V364.8c0-19.2 12.8-32 32-32s32 12.8 32 32v492.8c0 25.6-12.8 38.4-32 38.4zM614.4 889.6c-19.2 0-32-12.8-32-32V371.2c0-19.2 12.8-32 32-32s32 12.8 32 32v480c0 25.6-12.8 38.4-32 38.4z" p-id="4914" fill="#515151"></path><path d="M755.2 1024H268.8c-44.8 0-76.8-38.4-76.8-89.6V339.2c0-19.2 12.8-38.4 38.4-38.4s38.4 19.2 38.4 38.4v595.2c0 6.4 6.4 12.8 6.4 12.8h486.4V339.2c0-19.2 19.2-38.4 38.4-38.4s32 19.2 32 38.4v595.2c0 51.2-32 89.6-76.8 89.6zM985.6 185.6h-243.2V83.2C742.4 38.4 704 0 652.8 0H371.2C320 0 281.6 38.4 281.6 83.2V185.6H38.4c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4H992c19.2 0 38.4-19.2 38.4-38.4s-25.6-38.4-44.8-38.4zM358.4 83.2c0-6.4 6.4-12.8 12.8-12.8h288c6.4 0 12.8 6.4 12.8 12.8v89.6c0 6.4-6.4 12.8-12.8 12.8H371.2c-6.4 0-12.8-6.4-12.8-12.8V83.2z" p-id="4915" fill="#515151"></path></svg></div>
                            <div class="share"><svg class="icon" viewBox="0 0 1068 1024"></svg></div>
                        </div>
                        <div class="file-fileSize"><div class="vertical-middle-align"><p id="fileSize"></p></div></div>
                        <div class="file-fileDate"><div class="vertical-middle-align"><p>{{new Date(item.attributes.updated_at).toLocaleString()}}</p></div></div>
                    </div>

                    <div class="fileItem" v-if="item.attributes.type!=='text/directory'">
                        <input class="fileCheck" v-model="item.selected" @change="checkboxOnclick(item)" type="checkbox"/>
                        <div class="fileIcon">
                            <svg t="1606829013394" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="818" width="32" height="32"><path d="M896 256v662.741333c-0.298667 34.944-4.266667 48.213333-11.392 61.610667-7.424 13.909333-18.346667 24.832-32.256 32.256l-1.536 0.810667c-13.184 6.784-27.050667 10.453333-62.122667 10.581333H237.397333c-38.058667 0-51.84-3.968-65.706666-11.392a77.525333 77.525333 0 0 1-32.298667-32.256l-0.853333-1.578667C131.84 965.632 128.170667 951.765333 128 916.693333V109.397333c0-38.058667 3.968-51.84 11.392-65.706666 7.424-13.952 18.346667-24.874667 32.256-32.298667l1.578667-0.853333C186.368 3.84 200.234667 0.170667 235.306667 0H640l256 256z" fill="#EDEDEE" p-id="819"></path><path d="M523.306667 691.754667v-5.888c0-10.112 2.090667-18.944 6.314666-27.392a65.28 65.28 0 0 1 16.853334-21.034667c20.224-17.706667 32.426667-29.098667 36.224-33.28 10.112-13.482667 15.573333-30.762667 15.573333-51.84 0-25.685333-8.405333-45.909333-25.258667-60.672-16.853333-15.146667-39.210667-22.314667-66.56-22.314667-31.189333 0-55.637333 8.832-73.728 26.538667-18.56 17.706667-27.392 42.112-27.392 73.301333h48.042667c0-17.706667 3.370667-31.573333 10.496-41.301333 8.021333-11.776 21.077333-17.237333 39.637333-17.237333 14.293333 0 25.685333 3.754667 33.706667 11.776 7.552 8.021333 11.776 18.944 11.776 32.853333 0 10.538667-3.797333 20.650667-11.392 29.909333l-5.034667 5.888c-27.392 24.448-43.818667 42.154667-49.28 53.504-5.930667 11.392-8.448 25.301333-8.448 41.301334v5.888h48.469334z m-24.448 84.266666a32.426667 32.426667 0 0 0 23.168-8.832 30.805333 30.805333 0 0 0 9.685333-23.168 31.146667 31.146667 0 0 0-9.258667-22.784 33.493333 33.493333 0 0 0-23.594666-8.832 32.426667 32.426667 0 0 0-23.168 8.832 29.568 29.568 0 0 0-9.258667 22.784c0 9.258667 2.944 16.853333 9.258667 22.741334a32.853333 32.853333 0 0 0 23.168 9.258666z" fill="#919191" p-id="820"></path><path d="M640 0l256 256h-184.874667c-24.746667 0-33.706667-2.56-42.752-7.424a50.389333 50.389333 0 0 1-20.949333-20.949333l-0.725333-1.365334c-4.394667-8.618667-6.698667-17.877333-6.698667-41.386666V0z" fill="#CCCDCF" p-id="821"></path></svg>
                        </div>
                        <div class="file-fileName"><div class="vertical-middle-align"><p>{{item.attributes.name}}</p></div></div>
                        <div class="opBtn">
                            <div class="downloadBtn" @click="downloadFile(item.attributes.id)"><svg t="1606827330754" class="icon" viewBox="0 0 1068 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3922" width="32" height="32"><path d="M252.622237 809.004596a252.614304 252.614304 0 0 1-31.486765-503.2587v-4.352863a301.406611 301.406611 0 0 1 594.880633-68.660847 288.877568 288.877568 0 0 1-36.146765 575.488683 31.529129 31.529129 0 0 1 0-63.047667 225.819311 225.819311 0 0 0 8.472726-451.479758l-26.244267-0.974363-3.812726-25.990085a238.358944 238.358944 0 0 0-474.176071 34.664037 243.040125 243.040125 0 0 0 1.874591 30.035812l4.501135 35.786673-37.163491-0.3495h-0.730773c-104.521657 0-189.577228 85.034389-189.577228 189.577228s85.034389 189.577228 189.577228 189.577228a31.529129 31.529129 0 0 1 0 63.047667z" fill="#515151" p-id="3923"></path><path d="M500.417679 442.421546m10.590906 0l46.599989 0q10.590907 0 10.590907 10.590906l0 528.878103q0 10.590907-10.590907 10.590907l-46.599989 0q-10.590907 0-10.590906-10.590907l0-528.878103q0-10.590907 10.590906-10.590906Z" fill="#515151" p-id="3924"></path><path d="M487.406543 980.472843m7.488902-7.488902l171.982631-171.982631q7.488902-7.488902 14.977804 0l32.951168 32.951168q7.488902 7.488902 0 14.977804l-171.982631 171.982631q-7.488902 7.488902-14.977804 0l-32.951168-32.951168q-7.488902-7.488902 0-14.977804Z" fill="#515151" p-id="3925"></path><path d="M344.966294 837.223674m7.488902-7.488902l32.951168-32.951168q7.488902-7.488902 14.977804 0l176.198883 176.198883q7.488902 7.488902 0 14.977804l-32.951168 32.951168q-7.488902 7.488902-14.977804 0l-176.198883-176.198883q-7.488902-7.488902 0-14.977804Z" fill="#515151" p-id="3926"></path></svg></div>
                            <div class="deleteBtn" @click="deleteFile(item.attributes.id)"><svg t="1606827398890" class="icon" viewBox="0 0 1030 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4913" width="32" height="32"><path d="M409.6 896c-19.2 0-32-12.8-32-32V364.8c0-19.2 12.8-32 32-32s32 12.8 32 32v492.8c0 25.6-12.8 38.4-32 38.4zM614.4 889.6c-19.2 0-32-12.8-32-32V371.2c0-19.2 12.8-32 32-32s32 12.8 32 32v480c0 25.6-12.8 38.4-32 38.4z" p-id="4914" fill="#515151"></path><path d="M755.2 1024H268.8c-44.8 0-76.8-38.4-76.8-89.6V339.2c0-19.2 12.8-38.4 38.4-38.4s38.4 19.2 38.4 38.4v595.2c0 6.4 6.4 12.8 6.4 12.8h486.4V339.2c0-19.2 19.2-38.4 38.4-38.4s32 19.2 32 38.4v595.2c0 51.2-32 89.6-76.8 89.6zM985.6 185.6h-243.2V83.2C742.4 38.4 704 0 652.8 0H371.2C320 0 281.6 38.4 281.6 83.2V185.6H38.4c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4H992c19.2 0 38.4-19.2 38.4-38.4s-25.6-38.4-44.8-38.4zM358.4 83.2c0-6.4 6.4-12.8 12.8-12.8h288c6.4 0 12.8 6.4 12.8 12.8v89.6c0 6.4-6.4 12.8-12.8 12.8H371.2c-6.4 0-12.8-6.4-12.8-12.8V83.2z" p-id="4915" fill="#515151"></path></svg></div>
                            <div class="share" @click="shareFile(item.attributes.id)"><svg t="1606827448233" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5873" width="32" height="32"><path d="M865.756441 667.199735c-28.940123-16.71059-61.819974-25.544793-95.083565-25.544793-32.857339 0-65.347311 8.540514-93.959975 24.701588-20.801768 11.749602-38.921451 27.079752-53.967122 45.644573l-198.915375-114.840538c20.915355-41.703821 25.780153-89.055269 13.617136-134.458341-3.331885-12.423961-7.882528-24.454972-13.573133-35.887348l198.871373-114.815979c15.041578 18.561751 33.159214 33.888831 53.967122 45.644573 28.612665 16.159028 61.102636 24.701588 93.959975 24.701588 33.261545 0 66.141396-8.834202 95.083565-25.544793 44.058448-25.434276 75.575256-66.506716 88.744183-115.647927 13.168927-49.14428 6.40999-100.474342-19.029402-144.527674-17.024745-29.489638-41.624003-53.887304-71.136154-70.555939-28.612665-16.161075-61.102636-24.703635-93.955882-24.703635-33.261545 0-66.141396 8.834202-95.083565 25.544793-40.827871 23.573905-71.321372 61.300135-85.863576 106.231463-13.46671 41.609677-12.300141 86.215594 3.14769 126.632095l-204.067722 117.818359c-11.818163-11.841699-25.178449-22.093181-39.808658-30.53955-28.946262-16.71059-61.826114-25.542746-95.083565-25.542746-32.861432 0-65.351404 8.54256-93.957929 24.701588-29.514197 16.670681-54.111408 41.068348-71.134107 70.557986-25.438369 44.056402-32.196283 95.383394-19.029402 144.525628 13.168927 49.140187 44.683688 90.210581 88.742137 115.649973 28.946262 16.71059 61.826114 25.542746 95.087659 25.542746 32.855292 0 65.345264-8.540514 93.955882-24.699542 15.081487-8.518001 28.89612-19.067264 41.164538-31.416524l204.107631 117.837802c-14.4542 37.530778-16.550954 77.861322-6.001691 117.228935 13.166881 49.140187 44.683688 90.212628 88.742137 115.649973 28.938076 16.71059 61.815881 25.542746 95.081519 25.546839l0.008186 0c32.855292 0 65.343217-8.54256 93.951789-24.701588 29.512151-16.670681 54.109362-41.068348 71.134107-70.557986 25.438369-44.056402 32.19833-95.383394 19.029402-144.525628C941.331697 733.708498 909.816936 692.636057 865.756441 667.199735zM661.501454 769.199827c22.426779-38.841633 64.258513-62.97324 109.172445-62.97324 21.940708 0 43.656289 5.842055 62.797231 16.894785 29.120224 16.812921 49.951669 43.958164 58.655911 76.43995 8.704243 32.483832 4.237511 66.407456-12.577456 95.52768-22.424732 38.841633-64.256466 62.971194-109.170398 62.971194-21.942755 0-43.658336-5.842055-62.795185-16.892739-29.124318-16.817014-49.953715-43.964304-58.657958-76.441996C640.223848 832.245721 644.69058 798.320051 661.501454 769.199827zM362.495476 574.941518c-22.424732 38.84368-64.25442 62.97324-109.172445 62.97324-21.938662 0-43.654242-5.842055-62.797231-16.892739-29.122271-16.814967-49.951669-43.962258-58.653865-76.441996-8.704243-32.477692-4.237511-66.403363 12.57541-95.525634 22.426779-38.84368 64.258513-62.97324 109.172445-62.97324 21.940708 0 43.656289 5.842055 62.797231 16.894785 29.120224 16.810874 49.951669 43.956118 58.655911 76.437903C383.773082 511.896646 379.30635 545.82334 362.495476 574.941518zM770.379187 65.938782c44.911886 0 86.745666 24.127514 109.170398 62.971194 16.814967 29.118178 21.281699 63.044872 12.577456 95.52768-8.704243 32.479739-29.535687 59.628052-58.655911 76.43995-19.138896 11.05273-40.854477 16.892739-62.797231 16.892739-44.913932 0-86.745666-24.127514-109.172445-62.971194-16.782222-29.068036-21.227464-62.989613-12.514012-95.509261s29.52443-59.673078 58.59656-76.458369C726.722898 71.780837 748.438479 65.938782 770.379187 65.938782z" p-id="5874" fill="#515151"></path></svg></div>
                        </div>
                        <div class="file-fileSize"><div class="vertical-middle-align"><p>{{formatSize(item.attributes.size)}}</p></div></div>
                        <div class="file-fileDate"><div class="vertical-middle-align"><p>{{new Date(item.attributes.updated_at).toLocaleString()}}</p></div></div>
                    </div>

                </li>
            </ul>
            </form>
        </div>
      <el-dialog
          title="请输入文件夹名"
          width="30%"
          :visible="newFolderVisible"
          @close="newFolderVisible=false">
        <el-input v-model="newFolderName"></el-input>
        <div style="text-align: center;margin-top: 1em;">
          <el-button type="primary" size="small" @click="handleNewFolderReturn">确认</el-button>
        </div>
      </el-dialog>
      <el-dialog title="分享信息" :visible="setShareInfoVisible" @close="setShareInfoVisible=false">
        <SetShareInfo @handleShareReturn="handleShareReturn"></SetShareInfo>
      </el-dialog>
    </div>
</template>

<script>
// function getPaths(path){
//     var ret=[];
//     var str='';
//     var items = path.split('/');
//     for(var i=0;i<items.size;i++){
//         ret.push({id:i,name:items[i],path:str});
//         str=str+'/'+items[i];
//     }
//     return ret;
// }
import store from '../store/index'
import axios from 'axios'
import { dzq } from '@/public'
import SetShareInfo from "@/components/SetShareInfo";
// import IncludedHelper from '../helpers/includedHelper'
import {globalErrorNotify} from "@/helpers/globalNotify";

export default {
  components: {SetShareInfo},
  data(){
      return {
        loading: true,
        newFolderVisible:false,
        newFolderName: '',
        setShareInfoVisible:false,
        shareFileId: -1,
        selectedCount:0,
        needFixed:false,
        root:"",
        paths:[
        ],
        files:[

        ]
      }
  },
  beforeRouteEnter(to, from, next) {
    let path = to.params.path;
    console.log(path);
    next((vm) => {
          vm.getData(path);
    })
  },
  beforeRouteUpdate(to, from, next){
    let path = to.params.path;
    console.log(path);
    this.getData(path);
    next();
  },
  methods:{
    handleScroll: function(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop>80)this.needFixed=true;
        else this.needFixed=false;
        console.log(scrollTop);
    },
    checkboxOnclick: function(item){
        if(item.selected)this.selectedCount++;
        else this.selectedCount--;
        if(this.selectedCount==1)this.$refs.mutilOpBar.style.opacity=1;
        else if(this.selectedCount==0)this.$refs.mutilOpBar.style.opacity=0;
    },
    getData: function(path){

        if (typeof(path) === 'undefined' || path === null || path === '') {
            path = '';
        }

        let folder = '/users/' + store.state.userInfo.id + '/' + path;
        folder = folder.replace(/\/+/g, "/");
        while (folder.length > 0 && folder[folder.length - 1] === '/') {
            folder = folder.substring(0, folder.length - 1);
        }
        folder += '/';

        axios.get(
            dzq({
                name: 'sourcelay/file',
                include: [

                ],
                filter: {
                    'folder': folder
                },
                sort: 'name',
                page: {
                    number: 1,
                    limit: 200
                }
            })
        ).then((data) => {
            let paths = path.split("/")
            let tmp = '';
            let tmpPaths = [];
            for (let i = 0; i < paths.length; i++) {
                let s = paths[i];
                tmp += s + '/'
                tmpPaths.push({id:i, name:s, path:tmp})
            }
            this.paths = tmpPaths;

            let tmpFiles = [];
            for (let fileInfo of data.data.data) {
                tmpFiles.push(fileInfo);
            }
            this.files = tmpFiles;
            console.log(this.data);

            this.loading = false;
        });

    },
    formatSize: function(size){
        let ret = "";
        if (size < 1024) {
            ret = size + " Bytes";
        } else if (size < 1024 * 1024) {
            ret = (size / 1024).toFixed(2) + "Kb"
        } else if (size < 1024 * 1024 * 1024) {
            ret = (size / 1024 / 1024).toFixed(2) + "Mb"
        } else {
            ret = (size / 1024 / 1024 / 1024).toFixed(2) + "Gb"
        }
        return ret;
    },
    downloadFile: function(fileId){
        axios.get(
            dzq({
                name: 'sourcelay/file/' + fileId,
            }
        )
        ).then((data) => {
            data = data.data;
            axios.get(data.data.attributes.downloadUrl, { responseType: 'blob' })
            .then(response => {
                const blob = new Blob([response.data], { type: data.data.attributes.type ?? 'application/octet-stream' })
                const link = document.createElement('a')
                link.href = URL.createObjectURL(blob)
                link.download = data.data.attributes.name
                link.click()
                URL.revokeObjectURL(link.href)
            }).catch((err) => {
                globalErrorNotify(this, err);
            })
        }).catch(() => {
            globalErrorNotify(this, "请刷新页面后重试。");
        });
    },
    deleteFile: function(fileId){
        axios.delete(
            dzq({
                name: 'sourcelay/file/' + fileId,
            })
        ).then(() => {
            let tmpFiles = [];
            for (let s of this.files) {
                if (s.attributes.id !== fileId) {
                    tmpFiles.push(s);
                }
            }
            this.files = tmpFiles;
        }).catch((err) => {
            globalErrorNotify(this, err);
        });
    },
    enterFolder: function(folder){
        if (folder.length > 0 && folder[0] == '/') {
            folder.substring(1);
        }
        console.log(folder);

        let path = this.$route.path;
        console.log(path);

        while (path.length > 0 && path[path.length - 1] == '/') {
            path = path.substring(0, path.length - 1);
        }

        path = path + '/' + folder;
        console.log(path);

        this.$router.push({path: path});
    },
    uploadFile: function(e){
        console.log(e);
        if (e.target.files.length <= 0) {
            return;
        }

        let step = this.paths[this.paths.length - 1].path;
        if (step[0] !== '/') {
            step = '/' + step;
        }
        let folder = '/users/' + store.state.userInfo.id + step;

        axios.post(
            dzq({
                name: 'sourcelay/file',
            }),
            {
                data: {
                    attributes: {
                        name: e.target.files[0].name,
                        type: e.target.files[0].type,
                        size: e.target.files[0].size,
                        folder: folder,
                    }
                }
            }
        ).then((data) => {
            console.log(data);

            let uploadUrl = data.data.data.attributes.uploadUrl;

            let file = e.target.files[0];
            //let param = new FormData();
            //param.append('file',file);
            //console.log(param.get('file'));

            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            };

            axios.put(uploadUrl, file, config)
            .then(()=>{

                 axios.put(
                    dzq({
                        name: 'sourcelay/file',
                    }),
                    data.data
                ).then((data) => {
                    this.files.push(data.data.data);
                }).catch((err) => {
                    globalErrorNotify(this, err);
                });

            }).catch(() => {
                globalErrorNotify(this, "请刷新页面后重试。");
            });

        }).catch((err) => {
            globalErrorNotify(this, err);
        });

    },
    // 点击确认新建文件夹后的逻辑
    handleNewFolderReturn() {
        // TODO 判定输入是否有效
        if (this.newFolderName === '') {
            alert('文件夹不能为空')
            return
        }
        // 业务逻辑
        console.log(this.newFolderName);

            let step = this.paths[this.paths.length - 1].path;
            if (step[0] !== '/') {
                step = '/' + step;
            }
            let folder = '/users/' + store.state.userInfo.id + step;

        axios.post(
            dzq({
                name: 'sourcelay/file',
            }),
            {
                data: {
                    attributes: {
                        name: this.newFolderName,
                        type: 'text/directory',
                        size: 0,
                        folder: folder,
                    }
                }
            }
        ).then((response) => {
            this.files.push(response.data.data);
        });

        // 关闭弹窗 还原状态
        this.newFolderName = '';
        this.newFolderVisible = false;
    },
    // 点击分享按钮触发的事件 传入fileId参数
    shareFile(fileId) {
      this.setShareInfoVisible = true;
      this.shareFileId = fileId;
      console.log(fileId);
    },
    // 处理设置分享的返回函数
    handleShareReturn(ret) {
        let data = {};
        data.file_id = this.shareFileId;
        data.shared_desc = ret.description;
        data.shared_type = ret.type;
        data.password = ret.password;
        data.cost = ret.cost * 100;

        console.log(ret);
        console.log(data);

        axios.post(
            dzq({
                name: 'sourcelay/fileshare',
            }),
            {
                data: {
                    attributes: data
                }
            }
        ).then((response) => {
            console.log(response.data);
        });

        this.setShareInfoVisible = false;
    }
  },
  mounted(){
      window.addEventListener('scroll', this.handleScroll);
  }
}
</script>

<style scoped>
*, *::after, *::before {
  box-sizing: border-box;
  position: relative;
}
    .topheader.fixTop{
        position: fixed;
        padding:10px;
        left:4em;
        top:0px;
        right:0px;
        z-index: 1;
        background-image: linear-gradient(to right bottom, rgb(0, 132, 255) , rgb(0, 247, 255));
    }
    .topheader.unfixed{
        background-image: linear-gradient(to right bottom, rgb(0, 132, 255) , rgb(0, 247, 255));
        margin-top:4em;
        padding:10px;
        margin-left:4em;
    }
    .iconBtn{
        border:2px solid white;
        padding:10px;
        margin:5px;
        border-radius: 10px;
        color: white;
        background: rgba(82, 79, 79, 0.192);
        transition: all 100ms;
        position:relative;
    }
    .iconBtn:hover{
        background: rgba(255, 255, 255, 0.199);
    }
    .iconBtn:active{
        background: rgba(82, 79, 79, 0.308);
    }
    .iconBtn *{
        display: inline;
        margin:0px 5px;
    }
    #opeartionBar{
        padding-left:20px;
        display: flex;
        font-size:0.8em;
        user-select:none;
    }
    #mutilOpBar{
        opacity:0;
        display:flex;
        padding-left:50px;
    }
    .iconBtnWithoutFrame{
        padding:5px 20px 0px 20px;
        font-size:1.5em;
        color:white;
        text-align: center;
        border-radius: 10px;
        transition: all 100ms;
    }
    .iconBtnWithoutFrame:hover{
        background: rgba(12, 12, 12, 0.253);
    }
    .iconBtnWithoutFrame:active{
        background: rgba(0, 0, 0, 0.459);
    }
    .iconBtnWithoutFrame p{
        font-size:0.1em;
    }
    #content{
        background:white;
        margin-left:4em;
        font-size:15px;
    }
    #filePath{
        padding:5px 30px;
        color:rgb(59, 59, 59);
    }
    #filePath *{
        display: inline;
    }
    #filePath a{
        color:rgb(68, 68, 68);
        text-decoration:none;
    }
    #fileHeader{
        padding:0px 0px 5px 40px;
        border-bottom: 1px solid rgb(236, 236, 236);
        display: grid;
        grid-template-columns: 7fr 0.8fr 2fr;
    }

    .fileCheck{
        top: 50%;
        transform: translate(0,-50%);
        margin-left: -1em;
    }

    .fileIcon{
        margin-top:0.125em;

        font-size:2em;
        text-align: center;
        display:inline-block;
        vertical-align:middle;
        height:100%;
    }

    .fileHeader div{
        display: inline-block;
    }
    #content ul{
        list-style:none;
    }
    .fileItem{
        padding:0px 50px;
        border-bottom: 1px solid rgb(236, 236, 236);
        border-top: 1px solid rgba(236, 236, 236, 0);
        display: grid;
        grid-template-columns: 0.2fr 0.2fr 5fr 3fr 1fr 2fr;
        transition: all 100ms;
    }

    #title-fileName{
        padding:15px;
    }

    #title-fileSize{
        padding:15px;
    }

    #title-fileDate{
        padding:15px;
    }

    .file-fileName{
        padding-left:15px;
        display:inline-block;
        vertical-align:middle;
        height:100%;
    }

    .file-fileSize{
        padding-left:15px;
        display:inline-block;
        vertical-align:middle;
        height:100%;
    }

    .file-fileDate{
        padding-left:15px;
        display:inline-block;
        vertical-align:middle;
        height:100%;
    }

    .file-fileItem:hover{
        background: rgba(133, 212, 248, 0.199);
        border-bottom: 1px solid rgba(133, 212, 248, 0.349);
        border-top: 1px solid rgba(133, 212, 248, 0.349);
    }

    .opBtn{
        opacity: 0;
        display:flex;
    }

    .opBtn div{
        border-radius: 4em;
        padding:15px 15px;
        margin:4px 0px;
    }

    .fileItem:hover .opBtn{
        opacity: 1;
        width:20%
    }

    .opBtn div:hover{
        background: rgba(179, 179, 179, 0.144);
    }

    .opBtn div:active{
        background: rgba(130, 193, 209, 0.411);
    }

    .vertical-middle-align {
        top: 50%;
        transform: translate(0,-50%);
    }

    .file-upload-input {
        position: absolute;
        margin-left: 0;
        left: 0;
        top: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
    }
</style>
