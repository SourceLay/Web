class CategoriesTranslator {
    constructor (categories) {
        this.data = {};
        this.original = [];

        for (let a_categories of categories.data) {
            if (a_categories.type == "categories") {
                this.add(a_categories);
            }
        }
    }

    arrayUniquePush (anArray, anItem) {
        for (let i = 0; i < anArray.length; i++) {
            if (anArray[i] === anItem) {
                return;
            }
        }
        anArray.push(anItem);
    }

    add (a_categories) {
        this.original[a_categories.id] = a_categories;

        let path = a_categories.attributes.name.split(".");
        let id = a_categories.id;
    
        let dir = this.data;
        let foot = "";
        for (foot of path) {
            // 直接子板块
            if (typeof dir["children"] === 'undefined'){
                dir.children = [];
            }
    
            // 子版块 （不包括自身）
            if (typeof dir["sub_board"] === 'undefined'){
                dir.sub_board = [];
            }
            
            // 这个分支树上的所有的板块 （包括自身）
            if (typeof dir["board"] === 'undefined'){
                dir.board = [];
            }
            
            // 将当前处理的板块 ID 添加到这个现在的板块树分支上
            dir.sub_board.push(id);
            dir.board.push(id);
            
            // 解析板块路径
            let flag = 0;
            for (let child of dir.children) {
                if (child.name === foot) {
                    dir = child;
                    flag = 1;
                }
            }
            
            // 若解析失败则新建路径
            if (flag === 0) {
                let new_dir = {name:foot, board:[]};
                dir.children.push(new_dir);
                new_dir.parent = dir;
                dir = new_dir;
            }
            
        }
        
        if (typeof dir.id === 'undefined') {
            dir.board.push(id);

            // 翻译信息
            dir.id = id;
            dir.type = a_categories.type;
            dir.icon = a_categories.attributes.icon;
            dir.name = foot;
            dir.fullname = a_categories.attributes.name;
            dir.slogan = a_categories.attributes.description;
            dir.activitiesDaily = a_categories.attributes.activities_daily;

            // 原始信息映射
            dir.original = a_categories;
            this.original[a_categories.id].translated = dir;

            // 备用信息
            // dir.description = a_categories.attributes.description;
            // dir.sort = a_categories.attributes.sort;
            // dir.property = a_categories.attributes.property;
            // dir.thread_count = a_categories.attributes.thread_count;
            // dir.created_at = a_categories.attributes.created_at;
            // dir.updated_at = a_categories.attributes.updated_at;
        } else {
            new Error("存在重复的板块");
        }
    }

}


export default CategoriesTranslator;