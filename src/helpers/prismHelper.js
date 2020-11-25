import * as Prism from 'prismjs';
import 'prismjs/themes/prism.css'

import 'prismjs/components/prism-actionscript'
import 'prismjs/components/prism-antlr4'
import 'prismjs/components/prism-asm6502'
import 'prismjs/components/prism-aspnet'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-basic'
import 'prismjs/components/prism-batch'
import 'prismjs/components/prism-bbcode'
import 'prismjs/components/prism-brainfuck'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cil'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-css-extras'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-dart'
import 'prismjs/components/prism-erlang'
import 'prismjs/components/prism-git'
import 'prismjs/components/prism-glsl'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-groovy'
import 'prismjs/components/prism-haml'
import 'prismjs/components/prism-hlsl'
import 'prismjs/components/prism-ini'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-javadoclike'
import 'prismjs/components/prism-javadoc'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-javastacktrace'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsdoc'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-json5'
import 'prismjs/components/prism-jsonp'
import 'prismjs/components/prism-jsstacktrace'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-latex'
import 'prismjs/components/prism-lisp'
import 'prismjs/components/prism-lua'
import 'prismjs/components/prism-makefile'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-matlab'
import 'prismjs/components/prism-mongodb'
import 'prismjs/components/prism-nasm'
import 'prismjs/components/prism-nginx'
import 'prismjs/components/prism-objectivec'
import 'prismjs/components/prism-pascal'
import 'prismjs/components/prism-pascaligo'
import 'prismjs/components/prism-pcaxis'
import 'prismjs/components/prism-peoplecode'
import 'prismjs/components/prism-perl'
import 'prismjs/components/prism-php-extras'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-phpdoc'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-plsql'
import 'prismjs/components/prism-powershell'
import 'prismjs/components/prism-regex'
import 'prismjs/components/prism-scheme'
import 'prismjs/components/prism-toml'
import 'prismjs/components/prism-typoscript'
import 'prismjs/components/prism-verilog'
import 'prismjs/components/prism-vhdl'
import 'prismjs/components/prism-vim'
import 'prismjs/components/prism-visual-basic'
import 'prismjs/components/prism-wasm'
import 'prismjs/components/prism-wiki'
import 'prismjs/components/prism-yaml'

// import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
// import 'prismjs/plugins/line-numbers/prism-line-numbers'

// const loadLanguages = require('prismjs/components/index');

// console.log(Prism);

function prismHighLight(language, originalContent) {
    let content = originalContent.replace(/&lt;/g, "<"); // escape HTML tag brackets
    content = content.replace(/&gt;/g, ">"); // escape HTML tag brackets

    //if (typeof(Prism.languages[language]) == "undefined") {
    //    try {
    //        loadLanguages(language);
    //    }
    //    catch (e) {
    //        console.warn(e)
    //        language = "text";
    //    }
    //}

    if (Prism.languages[language])
        return Prism.highlight(content, Prism.languages[language], language);
    
    console.log(language + " not found")
    return originalContent;

}

export default prismHighLight;
