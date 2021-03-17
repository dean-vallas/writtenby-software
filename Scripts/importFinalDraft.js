
//entry point to get parsed array of elements and values
//called when file input element changes (gets a file)
function initiateImport(xml) {
    return processXml(xml);
}

window.onload = function () {
    var fileInput = document.getElementById('fileInput')
    fileInput.addEventListener('change', function (e) {
        var file = fileInput.files[0]

        var reader = new FileReader()
        reader.onload = function (e) {
            var xml = reader.result
            initiateImport(xml)
        }
        reader.readAsText(file)
    })
}
//incoming xml argument contains the whole collection of script paragraphs
function processXml(xml) {
    var parser, xmlDoc
    parser = new DOMParser()
    xmlDoc = parser.parseFromString(xml, 'text/xml')
    var paragraphs = xmlDoc.getElementsByTagName('Paragraph')
    let output = [],
        scriptElementType,
        attributeText,
        textAttribArrayForElement

    //the outer loop through the script
    for (let i = 0; i < paragraphs.length; i++) {
        scriptElementType = '',
            attributeText = ''//,

        if (paragraphs[i].getAttributeNode('Type'))
            scriptElementType = paragraphs[i].getAttributeNode('Type')

        if (paragraphs[i].getElementsByTagName('Text')) {
            textAttribArrayForElement = paragraphs[i].getElementsByTagName('Text')
            for (let j = 0; j < textAttribArrayForElement.length; j++) {
                if (textAttribArrayForElement[j].childNodes &&
                    textAttribArrayForElement[j].childNodes.length > 0)
                    attributeText += textAttribArrayForElement[j].childNodes[0].nodeValue
            }
        }

        if (typeof scriptElementType == 'undefined') scriptElementType = "empty";
        if (typeof attributeText == 'undefined') attributeText = "blank";
        output.push(buildString(scriptElementType.nodeValue, attributeText));
    }
    console.log(output)
    return output

}

function buildString(scriptElementType, attributeText) {
    let out = []

    switch (scriptElementType) {
        case 'Scene Heading':
            out.push('Slugline', attributeText)
            break
        case 'Action':
            out.push('Action', attributeText)
            break
        case 'Character':
            out.push('Character Name', attributeText)
            break
        case 'Dialogue':
            out.push('Dialog', attributeText)
            break
        case 'Parenthetical':
            out.push('Parenthetical', attributeText)
            break
        case 'End of Act':
            out.push('Act Break', attributeText)
            break
        case 'General':
            out.push('General', attributeText)
            break
        // default:
        //     try {
        //         out.push(
        //             scriptElementType + ', ' + attributeText
        //         )
        //     } catch {
        //         out.push('Error')
        //     }
        //     break
    }
    return out
}

