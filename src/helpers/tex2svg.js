/*************************************************************************
 *
 *  direct/tex2chtml
 *
 *  Uses MathJax v3 to convert a TeX string to an HTML string.
 *
 * ----------------------------------------------------------------------
 *
 *  Copyright (c) 2018 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

//
//  Load the packages needed for MathJax
//
const mathjax = require('mathjax-full/js/mathjax.js').mathjax;
const TeX = require('mathjax-full/js/input/tex.js').TeX;
const SVG = require('mathjax-full/js/output/svg.js').SVG;
const liteAdaptor = require('mathjax-full/js/adaptors/liteAdaptor.js').liteAdaptor;
const RegisterHTMLHandler = require('mathjax-full/js/handlers/html.js').RegisterHTMLHandler;

const AllPackages = require('mathjax-full/js/input/tex/AllPackages.js').AllPackages;

function tex2svg(texContent,
    inline = true, em = 16, ex = 8, width = 80*16,
    packages = AllPackages, /*css = true,*/) {

    texContent = texContent.replace("&lt;", "<"); // escape HTML tag brackets
    texContent = texContent.replace("&gt;", ">"); // escape HTML tag brackets
    
    //
    //  Create DOM adaptor and register it for HTML documents
    //
    const adaptor = liteAdaptor();
    RegisterHTMLHandler(adaptor);

    //
    //  Create input and output jax and a document using them on the content from the HTML file
    //
    const tex = new TeX({packages: packages});
    const svg = new SVG({fontCache: 'local'});
    const html = mathjax.document('', {InputJax: tex, OutputJax: svg});

    //
    //  Typeset the math from the command line
    //
    const node = html.convert(texContent || '', {
        display: !inline,
        em: em,
        ex: ex,
        containerWidth: width
    });

    //
    //  If the --css option was specified, output the CSS,
    //  Otherwise, typeset the math and output the HTML
    //
    return {
        "css": adaptor.textContent(svg.styleSheet(html)),
        "html": adaptor.outerHTML(node)
    }
    /*
    if (css) {
        return (adaptor.textContent(chtml.styleSheet(html)));
    } else {
        return (adaptor.outerHTML(node));
    }
    */

}

export default tex2svg;
