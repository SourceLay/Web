<template>
    <div id="content">
        <div id="top">
            <h1>文件分享大厅</h1>
        </div>
        <div id="stream">
            <div class="fileCard" v-for="card in cards" :key="card.id">
                <svg t="1606829000232" class="icon" viewBox="0 0 1185 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16670" width="48" height="48"><path d="M107.789474 0h319.218526A129.347368 129.347368 0 0 1 529.246316 50.176L840.757895 452.715789H0V107.789474a107.789474 107.789474 0 0 1 107.789474-107.789474z" fill="#EB9B00" p-id="16671"></path><path d="M138.186105 183.242105h909.312c48.074105 0 65.482105 5.012211 82.997895 14.389895 17.623579 9.377684 31.420632 23.174737 40.798316 40.744421 9.377684 17.569684 14.389895 35.031579 14.389895 82.997895v564.439579c0 48.074105-5.012211 65.482105-14.389895 82.997894-9.377684 17.623579-23.174737 31.420632-40.744421 40.798316-17.569684 9.377684-35.031579 14.389895-82.997895 14.389895H138.132211c-48.074105 0-65.482105-5.012211-82.997895-14.389895a97.926737 97.926737 0 0 1-40.798316-40.744421C5.012211 951.242105 0 933.834105 0 885.867789V321.374316c0-48.074105 5.012211-65.482105 14.389895-82.997895 9.377684-17.623579 23.174737-31.420632 40.744421-40.798316 17.569684-9.377684 35.031579-14.389895 82.997895-14.389894z" fill="#F8B700" p-id="16672"></path></svg>
                <h1>{{card.filename}}</h1>
            </div>
        </div>
        <div id="bottom">
            
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            cards:[
                {id:0,type:"rar",filename:"hyt搞黄色",downloadLink:""},
                {id:1,type:"rar",filename:"hyt搞黄色",downloadLink:""},
                {id:2,type:"rar",filename:"hyt搞黄色",downloadLink:""},
                {id:3,type:"rar",filename:"hyt搞黄色",downloadLink:""},
                {id:4,type:"rar",filename:"hyt搞黄色",downloadLink:""},
                {id:5,type:"rar",filename:"hyt搞黄色",downloadLink:""},
                {id:6,type:"rar",filename:"hyt搞黄色",downloadLink:""},
                {id:7,type:"rar",filename:"hyt搞黄色",downloadLink:""},
                {id:8,type:"rar",filename:"hyt搞黄色",downloadLink:""},
                {id:9,type:"rar",filename:"hyt搞黄色",downloadLink:""},
                {id:10,type:"rar",filename:"hyt搞黄色",downloadLink:""},
                {id:11,type:"rar",filename:"hyt搞黄色",downloadLink:""},
                {id:12,type:"rar",filename:"hyt搞黄色",downloadLink:""},
                {id:13,type:"rar",filename:"hyt搞黄色",downloadLink:""},
                {id:14,type:"rar",filename:"hyt搞黄色",downloadLink:""},
                {id:15,type:"rar",filename:"hyt搞黄色",downloadLink:""},
                {id:16,type:"rar",filename:"hyt搞黄色",downloadLink:""}
            ]
        }
    }
}
</script>

<style scoped>
#content{
    padding-left:80px;
}
#top{
    height:400px;
}
#top h1{
    padding:100px;
}
#bottom{
    height:400px;
}
.fileCard svg{
    font-size: 2em;
    margin:20px;
}
@media screen and (min-width: 800px) {
    .fileCard{
        padding:20px;
        margin:10px;
        background: RGB(238,238,238);
        border-radius: 4px;
        min-width:300px;
        max-width:320px;
        transition: 100ms all;
        flex-grow: 1;
    }
    .fileCard h1{
        font-size:1em;
        padding-top:10px;
    }
    #stream{
        padding:50px;
        display:flex;
        flex-wrap: wrap;
    }
    .fileCard:hover{
        box-shadow: 0px 0px 10px #0f0f0f48;
        transform : scale(1.02);
    }
}
@media screen and (max-width: 800px) {
    .fileCard{
        padding:20px;
        margin:10px;
        border-bottom:1px solid rgba(128, 128, 128, 0.192);
        width:95%;
        height:100px;
        transition: 100ms all;
        flex-grow: 1;
        display: flex;
        vertical-align: center;
    }
    .fileCard h1{
        margin:auto 0px;
        font-size:1em;
    }
    #stream{
        padding:50px;
        display:flex;
        flex-wrap: wrap;
    }
    .fileCard:active{
        transform : scale(0.98);
    }
}

</style>