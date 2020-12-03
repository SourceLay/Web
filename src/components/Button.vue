<template>
    <div onClick="onClick">
        <p>{{text}}</p>
    </div>
</template>

<script>
export default {
    name:"Button",
    props:["text","onClick"],
    data:function(){
        return {

        }
    }
}
</script>

