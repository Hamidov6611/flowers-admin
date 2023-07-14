import React from "react";
import { CKEditor } from "ckeditor4-react";

const CkeEditor = ({ handleFunction, initData }) => {
    return (
        <div>
            <CKEditor
                initData={initData}
                style={{ maxWidth: "850px", margin: "30px auto" }}
                config={{
                    extraPlugins: [
                        "emoji",
                        "justify",
                        "exportpdf",
                        "language",
                        "div",
                        "font",
                        "autolink",
                        "colorbutton",
                        "find",
                        "forms",
                        "link",
                        "liststyle",
                        "newpage",
                        "pagebreak",
                        "magicline",
                        "print",
                        "save",
                        "tableresize",
                        "widget",
                        "uicolor",
                        "smiley",
                        "autogrow",
                        "colordialog",
                        "docprops",
                        "devtools",
                        "copyformatting",
                        "codesnippet",
                        "bidi",
                        "a11yhelp",
                        "autocomplete",
                        "mentions",
                        "indentblock",
                        "panelbutton",
                        "pastefromgdocs",
                        "pastefromlibreoffice",
                        "pastefromword",
                        "pastetools",
                        "preview",
                        "scayt",
                        "selectall",
                        "sharedspace",
                        "showblocks",
                        "specialchar",
                        "stylesheetparser",
                        "table",
                        "tableselection",
                        "tabletools",
                        "templates",
                        "textmatch",
                        "textwatcher",
                        "widget",
                        "clipboard",
                        "codesnippetgeshi",
                        "dialogadvtab",
                        "divarea",
                    ],
                }}
                onChange={handleFunction}
                type="classic"
                // popupHeight="500px"
                onBeforeLoad={(CKEDITOR) => {
                    // Handles beforeLoad event which is fired before an editor instance is created.
                    // CKEDITOR.disableAutoInline = true
                }}
                onInstanceReady={({ editor }) => { }}
            />
        </div>
    );
};

export default React.memo(CkeEditor);
