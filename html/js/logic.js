/**
 * Global variable for link copying
 * @type {string}
 */
let linkBuilder = "";
let codeStash = "";
let indent = "    ";

/**
 * Everything below should start only when the index page is fully loaded
 */
window.onload = function () {

    /**
     * Protocol
     * @type {string}
     */
    const protocol = "https://";

    /**
     * Code domain which is used in all links
     * @type {string}
     */
    const coreDomain = "icecat.biz/";

    const iceCLog = "iceclog.com/";

    /**
     * Link beginning for jsonCall
     * @type {string}
     */
    const jsonDomain = "live." + coreDomain + "api?";

    /**
     * Link beginning for XML_S3 call
     * @type {string}
     */
    const xmlDomain = "data." + coreDomain + "xml_s3/xml_server3.cgi?";

    /**
     * Link start for dropdowns;
     * @type {string}
     */
    const dataDomain = "data." + coreDomain + "export/";

    /**
     * FO link ending
     * @type {string}
     */
    const foLinkPart = "/p/a/b/desc-";

    /**
     *
     * @type {{
     * checkBoxes: NodeListOf<Element>,
     * appKey: HTMLElement,
     * language: HTMLElement,
     * fields: NodeListOf<Element>
     *     }}
     */
    const inputFields = {
        appKey: document.getElementById("appkey"),
        fields: document.querySelectorAll('input[type=text]'),
        checkBoxes: document.querySelectorAll("input[type=checkbox]"),
        language: document.getElementById("lang")
    };

    /**
     * Radio buttons;
     * @type {{ean: HTMLElement,
     * productId: HTMLElement,
     * mpn: HTMLElement}}
     */
    const radioButtons = {
        mpn: document.getElementById("mpnRadio"),
        ean: document.getElementById("eanRadio"),
        productId: document.getElementById("productIdRadio")
    };

    /**
     * Buttons on the page
     * @type {{
     * output: HTMLElement,
     * liveGranular: HTMLElement,
     * checkAllBoxes: HTMLElement,
     * liveFull: HTMLElement,
     * liveGranularGetCode: HTMLElement,
     * clearButton: HTMLElement,
     * jsonLink: HTMLElement,
     * json: HTMLElement,
     * xmls3: HTMLElement,
     * foButton: HTMLElement,
     * liveFullGetCode: HTMLElement,
     * copyLink: HTMLElement
     * }}
     */
    const buttons = {
        json: document.getElementById("jsoncall"),
        jsonLink: document.getElementById("jsoncall2"),
        xmls3: document.getElementById("xmls3"),
        foButton: document.getElementById("foRequest"),
        liveFull: document.getElementById("liveFullRequest"),
        liveFullGetCode: document.getElementById("LiveFullGetCode"),
        liveGranular: document.getElementById("granularSubmit"),
        liveGranularGetCode: document.getElementById("liveGranularGetCode"),
        copyLink: document.getElementById("copyLinkButton"),
        checkAllBoxes: document.getElementById("selectAllCheck"),
        output: document.getElementById("output"),
        clearButton: document.getElementById("clear")
    };

    /**
     * areas of the page
     * @type {{
     * mainContainer: HTMLElement,
     * refsDropdown: HTMLElement,
     * popUpContent: HTMLElement,
     * popUp: HTMLElement,
     * liveTemplate: Element,
     * share: HTMLElement,
     * indexDropdown: HTMLElement,
     * documentsDropdown: HTMLElement,
     * liveArea: HTMLElement,
     * trash: HTMLElement,
     * getCodeModal : HTMLElement
     * }}
     */
    const areas = {
        liveArea: document.getElementById("content"),
        liveTemplate: document.querySelector("#liveDiv"),
        mainContainer: document.getElementById('content'),
        popUpContent: document.getElementById("popUpContent"),
        popUp: document.getElementById("popUp"),
        share: document.getElementById("shareLink"),
        trash: document.getElementById("copyBox"),
        indexDropdown: document.getElementById("indexDropdown"),
        refsDropdown: document.getElementById("refDropdown"),
        documentsDropdown: document.getElementById("documents"),
        getCodeModal: document.getElementById("getCodeModalBody")
    };

    /**
     * Response strings for popUp messages;
     * @type {{
     * brandOrMpnIsNotSet: string,
     * success: string,
     * idIsNotSet: string,
     * onlyId: string,
     * nullResponse: string,
     * notImplementedYet: string,
     * userNameIsNotSet: string,
     * eanIsNotSet: string
     * }}
     */
    const responses = {
        nullResponse: "No fields set",
        notImplementedYet: "This functionality is under construction",
        success: "Success",
        userNameIsNotSet: "Username is empty",
        idIsNotSet: "Product ID is not set",
        eanIsNotSet: "Product EAN is not set",
        brandOrMpnIsNotSet: "Product Brand or MPN are not set",
        onlyId: "Only call by ID is allowed"
    };

    /**
     *
     * @type {string[]}
     */
    const indexFiles = [
        "files.index.xml.gz",
        "files.index.csv.gz",
        "daily.index.xml.gz",
        "daily.index.csv.gz"
    ];

    const refs = [
        "CampaignsList.xml",
        "CategoriesList.xml.gz",
        "CategoryFeatureIntervalsList.xml",
        "CategoryFeaturesList.xml.gz",
        "DistributorList.xml.gz",
        "FeatureGroupsList.xml.gz",
        "FeatureLogosList.xml.gz",
        "FeatureValuesVocabularyList.xml.gz",
        "FeaturesList.xml.gz",
        "LanguageList.xml.gz",
        "LogisticsDataList.xml",
        "MeasuresList.xml.gz",
        "RelationsList.xml",
        "SupplierProductFamiliesListRequest.xml.gz",
        "SuppliersList.xml.gz"
    ];

    const documentLinks = {
        'XML': 'open-catalog-interface-oci-open-icecat-xml-and-full-icecat-xml-repositories/',
        'XML_S3': 'downloading-individual-product-xmls/',
        'JSON': 'manual-for-icecat-json-product-requests/',
        'Live': 'icecat-live-real-time-product-data-in-your-app/',
        'Live Granular': 'icecat-live-manual-for-granular-call/',
        'Product Story': 'product-story-manual-how-to-embed-rich-content-into-your-website/',
        'CSV': 'icecat-csv/',
        'URL': 'icecat-url-import-implementation-notes/',
        'Digital Asset Types': 'digital-asset-types-as-represented-in-icecats-open-catalog-interfaces/',
        'Push-In API': 'manual-for-icecat-push-api-api-in/',
        'Brand Permission Request': 'permission-required-from-full-icecat-brands-to-see-a-products-rich-media-assets-on-icecat-biz/',
        'Personalized interface': 'manuals-personalized-interface-files-and-catalogs'
    }

    const repository = {
        open: document.getElementById("Open"),
        full: document.getElementById("Full")
    }

    /**
     * Index Dropdown menu listener
     */
    areas.indexDropdown.addEventListener('click', () => {
        dropdownSetter("indexDropdownBody");
    });

    /**
     * Ref files dropdown menu listener
     */
    areas.refsDropdown.addEventListener('click', () => {
        dropdownSetter("refDropdownBody");
    });

    /**
     * Documents dropdown listener
     */
    areas.documentsDropdown.addEventListener('click', () => {
        dropdownSetter("documentsBody");
    })

    /**
     * Checkbox setter/un setter;
     */
    buttons.checkAllBoxes.addEventListener('change', (event) => {
        checkAll(event);
    });

    /**
     * listener for productId radio
     */
    radioButtons.productId.addEventListener('click', () => {
        enableFORequest();
        enableInputFields(['productId']);
    });
    /**
     * listener for mpn radio
     */
    radioButtons.mpn.addEventListener('click', () => {
        disableFORequest();
        enableInputFields(['mpn', 'brand']);
    });
    /**
     * listener for ean radio
     */
    radioButtons.ean.addEventListener('click', () => {
        disableFORequest();
        enableInputFields(['ean']);
    });

    /**
     * Event listener for clear button;
     */
    buttons.clearButton.addEventListener('click', () => {
        document.location.search = "";
    });

    /**
     * Listener for copyLink button
     */
    buttons.copyLink.addEventListener('click', () => {
        if ((linkBuilder == null) || equals(linkBuilder, "")) {
            buildLinkForShare(null);
        }
        copyLink(linkBuilder);
        buttons.copyLink.classList.remove("btn-info");
        buttons.copyLink.classList.add("btn-success");
        buttons.copyLink.innerText = "Link Copied";
        setTimeout(function () {
            buttons.copyLink.classList.remove("btn-success");
            buttons.copyLink.classList.add("btn-info");
            buttons.copyLink.innerText = "Copy Link";
            linkBuilder = "";
        }, 500);
    });

    /**
     * FO request function
     */
    buttons.foButton.addEventListener('click', () => {
        let fields = getInputFieldsValues();
        switch (validateRadio()) {
            case "id":
                let link = protocol + coreDomain
                    + (inputFields.language.value).toLowerCase()
                    + foLinkPart
                    + fields["productId"]
                    + ".html";
                buildLinkForShare("fo");
                window.open(link);
                break;
            case "ean":
            case "brandMpn":
            default:
                popUp(responses.onlyId, 1500);
                break;
        }
    });

    /**
     * JSON request, also granular JSON request is possible;
     * Renders JSON into the same window;
     */
    buttons.json.addEventListener('click', () => {

        let link = jsonLinkBuilder();

        areas.mainContainer.innerHTML = `<div class="container"><div id="json" style="height:100%;"></div></div>`;
        $.getJSON(link, function (result) {
            let jsonViewer = new JSONViewer();
            document.querySelector("#json").appendChild(jsonViewer.getContainer());
            jsonViewer.showJSON(result.data, null, 2);
            buildLinkForShare("json");
        }).then(() => {
            scroll("content")
        }).catch(reason => {
            error(reason);
        });

    });

    /**
     * Open JSON in separate tab listener
     */
    buttons.jsonLink.addEventListener('click', () => {
        let link = jsonLinkBuilder();
        buildLinkForShare("json");
        window.open(link);
    });

    /**
     * XML S3 request. Supports three output formats:
     * Product XML;
     * Product CSV;
     * Meta XML;
     */
    buttons.xmls3.addEventListener('click', () => {

        let fields = getInputFieldsValues();

        let link = protocol;

        link += xmlDomain + "lang=" + (inputFields.language.value) + ";";

        switch (validateRadio()) {
            case "id":
                link += "icecat_id=" + fields["productId"] + ";";
                break;
            case "ean":
                link += "ean_upc=" + fields["ean"] + ";";
                break;
            case "brandMpn":
                link += "prod_id=" + fields["mpn"] + ";" + "vendor=" + fields["brand"] + ";";
                break;
            default:
                return;

        }

        link += "output=" + buttons.output.value;
        buildLinkForShare("xml");
        window.open(link);
    });

    /**
     * Full Live request button listener;
     */
    buttons.liveFull.addEventListener('click', () => {
        let requestLang = inputFields.language.value;
        let requestProperties = getRequestProperties();
        requestProperties['Type'] = 'html';
        clearLiveContainer();
        buildLinkForShare("liveFull");
        liveFullExecute(requestProperties, requestLang);
    });

    buttons.liveGranular.addEventListener('click', () => {
        let requestLang = inputFields.language.value;
        let requestProperties = getRequestProperties();

        let assets = getAssets();

        if (Object.keys(assets).length === 0) {
            popUp(responses.nullResponse, 1500);
        }


        clearLiveContainer();
        buildLinkForShare("liveGranular");
        liveGranularExecute(assets, requestProperties, requestLang);

    });

    /**
     * Listener for code generator
     */
    buttons.liveGranularGetCode.addEventListener('click', () => {
            areas.getCodeModal.innerText = getGranularLiveCode();
        }
    )

    /**
     * Listener for code generator
     */
    buttons.liveFullGetCode.addEventListener('click', () => {
        areas.getCodeModal.innerText = getFullLiveCode();
    });

    function stringifyRequestProperties(requestProperties) {
        let builder = new StringBuilder("");
        for (const [key, value] of Object.entries(requestProperties)) {
            if (key !== 'selectAll') {
                builder.append(indent).append(indent).append(indent)
                    .append(`'`).append(key).append(`': '`).append(value).append(`\',\n`);
            }
        }
        return builder.toString();
    }

//Helper functions

    /**
     * get Assets for Live granular call;
     * @returns {{}}
     */
    function getAssets() {
        let assets = {};
        inputFields.checkBoxes.forEach(function (element) {
            if (element.checked) {
                let key = element.id.replace('Check', '');
                assets[key] = "#" + key;
            }
        });
        return assets;
    }

    /**
     * @returns returns an Object with the list of all text fields on HTML page {{}}
     */
    function getInputFieldsValues() {
        let resultSet = {};
        inputFields.fields.forEach(function (element) {
            resultSet[element.name] = element.value;
        });
        resultSet["appkey"] = document.getElementById("appkey").value;
        return resultSet;
    }

    /**
     * @returns Object with properties for Live call {{}}
     */
    function getRequestProperties() {
        let inputFieldsValues = getInputFieldsValues();
        let requestProperties = {};
        if (notEmpty(inputFieldsValues["username"])) {
            requestProperties['UserName'] = inputFieldsValues['username'];
            switch (validateRadio()) {
                case "id":
                    requestProperties['IcecatProductId'] = inputFieldsValues["productId"];
                    break;
                case "ean":
                    requestProperties['GTIN'] = inputFieldsValues['ean'];
                    break;
                case "brandMpn":
                    requestProperties['Brand'] = inputFieldsValues['brand'];
                    requestProperties['PartCode'] = inputFieldsValues['mpn'];
                    break;
                default:
                    return;
            }
        } else {
            popUp(responses.userNameIsNotSet, 1500);
        }
        return requestProperties;
    }

    /**
     * Function to init dropdown menu
     * @param field string argument which refers to what menu should be initiated;
     */
    function dropdownSetter(field) {

        let targetMenu = $("#" + field);
        let link;

        $.ajax({
            success: function () {
                let lang = inputFields.language.value;
                let header = getRepo() === "freexml/" ? "Open" : "Full";
                targetMenu.html("");
                //targetMenu.append('<div class="dropdown-header">' + header + '</div>');

                if (field === "refDropdownBody") {
                    refs.forEach((ref) => {
                        link = protocol + dataDomain + getRepo() + "refs/" + ref;
                        appendMenuItem(ref);
                    });
                    link = "share/SuppliersList.csv"
                    appendMenuItem("SuppliersList.csv");
                    link = protocol + dataDomain + getRepo() + lang + "/supplier_mapping.xml";
                    appendMenuItem("supplier_mapping.xml");
                } else if (field === "indexDropdownBody") {
                    indexFiles.forEach((file) => {
                        link = protocol + dataDomain + getRepo() + lang + "/" + file;
                        appendMenuItem(file);
                    });
                } else if (field === 'documentsBody') {
                    for (const [key, value] of Object.entries(documentLinks)) {
                        link = protocol + iceCLog + value;
                        appendMenuItem(key);
                    }
                }
            }
        });

        /**
         * Shared function within this scope to prevent code duplication,
         * appends menu item to dropdown
         * @param file string parameter with the file name;
         */
        function appendMenuItem(file) {
            let menuItem = '<a class="dropdown-item" target="_blank" href="' + link + '">' + file + '</a>';
            targetMenu.append(menuItem);
        }

    }

    /**
     * Live full request executor
     * @param requestFields Object with properties (username, product identifiers);
     * @param requestLang lang field, should be predefined;
     */
    function liveFullExecute(requestFields, requestLang) {
        IcecatLive.getDatasheet('#content', requestFields, requestLang).then(() => {
            scroll("icecatLiveMainContainer");
        }).catch(reason => {
            error(reason);
        })
    }

    /**
     * Live granular call executor
     * @param assets Object with granular call assets
     * @param requestFields Object with properties (username, product identifiers);
     * @param requestLang lang fiend, should be predefined;
     */
    function liveGranularExecute(assets, requestFields, requestLang) {
        IcecatLive.getDatasheet(assets, requestFields, requestLang).then(() => {
            scroll("content")
        }).catch(reason => {
            error(reason);
        });
    }

    /**
     * disabler for FO request button
     */
    function disableFORequest() {
        buttons.foButton.disabled = true;
    }

    /**
     * enabler for FO request button
     */
    function enableFORequest() {
        buttons.foButton.disabled = false;
    }

    /**
     * enable\disable input fields depending on passed names
     * @param names
     */
    function enableInputFields(names) {
        inputFields.fields.forEach(field => {
            if (names.includes(field.name)) {
                field.disabled = false;
            } else if (field.name !== 'username') {
                field.disabled = true;
            }
        })
    }

    /**
     * Error message wrapper, used in catch().
     * @param object - reason for error;
     */
    function error(object) {
        let regex = /(<([^>]+)>)/ig;
        let errorMessage = object.responseText.replace(regex, "");
        popUp(errorMessage, 1500);
    }

    /**
     * PopUp wrapper.
     * @param message to be shown;
     * @param timeout the time amount of popUp indication
     */
    function popUp(message, timeout) {
        areas.popUpContent.innerText = message;
        areas.popUp.style.display = "block";
        setTimeout(function () {
            areas.popUp.style.display = "none";
        }, timeout);
    }

    /**
     * Autoscroll to opened content (live, granular live, json);
     * @param id div ID where to scroll to;
     */
    function scroll(id) {
        document.getElementById(id).scrollIntoView(true);
    }

    /**
     * Clears the content div
     */
    function clearLiveContainer() {
        areas.liveArea.innerHTML = "";
        let clone = document.importNode(areas.liveTemplate.content, true);
        areas.liveArea.appendChild(clone);
    }

    /**
     * Radio button validator
     * @returns {string}
     */
    function validateRadio() {
        let fieldsToValidate = getInputFieldsValues();
        if (radioButtons.productId.checked) {
            if (notEmpty(fieldsToValidate["productId"])) {
                return "id";
            } else {
                popUp(responses.idIsNotSet, 1500);
            }
        } else if (radioButtons.ean.checked) {
            if (notEmpty(fieldsToValidate["ean"])) {
                return "ean";
            } else {
                popUp(responses.eanIsNotSet, 1500);
            }
        } else if (radioButtons.mpn.checked) {
            if (notEmpty(fieldsToValidate["brand"]) && notEmpty(fieldsToValidate["mpn"])) {
                return "brandMpn";
            } else {
                popUp(responses.brandOrMpnIsNotSet, 1500)
            }
        }
        return "null";
    }

    /**
     * Helper for JSON granular call;
     * @returns {string}
     */
    function getContent() {
        let content = "";
        inputFields.checkBoxes.forEach(function (element) {
            if (element.checked) {
                let asset = element.id.replace('Check', '');
                if (equals(asset, "videos") || equals(asset, "tours3d")) {
                    if (!content.includes("multimedia")) {
                        content += "multimedia,";
                    }
                } else {
                    content += asset + ",";
                }
            }
        });
        return content;
    }

    /**
     * Helper which is building JSON request link;
     * @returns {string}
     */
    function jsonLinkBuilder() {
        let link = protocol + jsonDomain;
        let fields = getInputFieldsValues();
        if (notEmpty(fields["username"])) {
            link += "shopname=" + fields["username"];
            if (notEmpty(fields["appkey"])) {
                link += "&app_key=" + fields["appkey"];
            }
        } else {
            popUp(responses.userNameIsNotSet, 1500);
            throw new Error(responses.userNameIsNotSet);
        }

        link += "&lang=" + (inputFields.language.value);

        switch (validateRadio()) {
            case "id":
                link += "&icecat_id=" + fields["productId"];
                break;
            case "ean":
                link += "&GTIN=" + fields["ean"];
                break;
            case "brandMpn":
                link += "&Brand=" + fields["brand"] + "&ProductCode=" + fields["mpn"];
                break;
            default:
                return;
        }

        link += "&content=" + getContent();

        return link;
    }

    /**
     * Makes all checkboxes checked\unchecked
     * @param event
     */
    function checkAll(event) {
        inputFields.checkBoxes.forEach(function (element) {
            element.checked = !!event.target.checked;
        });
    }

    /** Radio button validator
     * @returns {string}
     */
    function getRepo() {
        if (repository.open.checked) {
            return "freexml/";
        } else {
            return "level4/";
        }
    }

    /**
     * Checks if object value is empty string;
     * @param object
     * @returns {boolean}
     */
    function notEmpty(object) {
        return object !== "";
    }

    /***
     * Simple equal function, I'd like to suggest usage for string
     * @param object1 first object
     * @param object2 second object
     * @returns {boolean}
     */
    function equals(object1, object2) {
        return object1 === object2;
    }

    /**
     * Function to create the request link, may be shared with others
     * if some requestType button was pressed before copying - requestType will me mentioned in link
     * so, being copied to the browser's address bar you will not only get the same settings for
     * input fields but the same request will be immediately performed.
     *
     * The link is stored in variable linkBuilder;
     */
    function buildLinkForShare(requestType) {

        let radioButton = validateRadio();
        let productIdentifiers = [];
        let values = {};

        inputFields.fields.forEach((element) => {
            values[element.id] = element.value;
        });

        if (!(equals(requestType, "xml"))) {
            if (notEmpty(values.username)) {
                productIdentifiers[productIdentifiers.length] = ["username", values.username].join("=");
            }
            if (notEmpty(inputFields.appKey.value)) {
                productIdentifiers[productIdentifiers.length] = ["app_key", inputFields.appKey.value].join("=");
            }
        }

        switch (radioButton) {
            case "id":
                productIdentifiers[productIdentifiers.length] = ["productId", values.productId].join("=");
                break;
            case "ean":
                productIdentifiers[productIdentifiers.length] = ["ean", values.ean].join("=");
                break;
            case "brandMpn":
                productIdentifiers[productIdentifiers.length] = ["mpn", values.mpn].join("=");
                productIdentifiers[productIdentifiers.length] = ["brand", values.brand].join("=");
                break;
            default:
                inputFields.fields.forEach((element) => {
                    if (notEmpty(element.value)) {
                        productIdentifiers[productIdentifiers.length] = [element.name, element.value].join("=");
                    }
                });
                break;
        }
        productIdentifiers[productIdentifiers.length] = ["lang", inputFields.language.value].join("=");

        let content = "&content=";
        inputFields.checkBoxes.forEach((element) => {
            if (element.checked) {
                let name = element.id.replace("Check", "");
                content += name + ",";
            }
        });

        if (equals(content, "&content=")) {
            content = "";
        }

        linkBuilder = document.location.origin + document.location.pathname;
        linkBuilder += "?";
        linkBuilder += productIdentifiers.join("&");
        linkBuilder += "&radio=" + radioButton;

        if (equals(requestType, 'xml')) {
            linkBuilder += "&output=" + buttons.output.value;
        }

        linkBuilder += content;
        switch (requestType) {
            case "json":
                linkBuilder += "&requestType=json";
                break;
            case "fo":
                linkBuilder += "&requestType=fo";
                break;
            case "xml":
                linkBuilder += "&requestType=xml";
                break;
            case "liveFull":
                linkBuilder += "&requestType=liveFull";
                break;
            case "liveGranular":
                linkBuilder += "&requestType=liveGranular";
                break;
            default:
                break;
        }

    }

    /**
     * Builds text for liveGranularCall
     * @returns {string|*}
     */
    function getGranularLiveCode() {
        let assets = getAssets();
        let code = new StringBuilder(`<!-- Put this into BODY -->\n`);

        if (Object.keys(assets).length > 0) {
            let divs = new StringBuilder("");
            for (const [key, value] of Object.entries(assets)) {
                if (key !== 'selectAll') {
                    divs.append(`<div id="` + value.substring(1) + `"></div>\n`);
                }
            }
            code.append(divs.toString())
                .append(`<script type="text/javascript">\n`)
                .append(indent)
                .append(`window.addEventListener('liveload', function() {\n`)
                .append(indent).append(indent)
                .append(`IcecatLive.getDatasheet(\n`)
                .append(indent).append(indent).append("{\n")
                .append(stringifyRequestProperties(assets));

            code.removeCharAtIndex(code.toString().length - 1);

            code.append(indent).append(indent).append("},\n")
                .append(indent).append(indent).append("{\n")
                .append(stringifyRequestProperties(getRequestProperties()));

            code.removeCharAtIndex(code.toString().length - 1);

            code.append(indent).append(indent).append("}, \"")
                .append(inputFields.language.value)
                .append("\")\n")
                .append(indent).append("});\n")
                .append(`</script>`)
                .append(`\n<script src='https://live.icecat.biz/js/live-current-2.js'></script>\n`);
            codeStash = code.toString();
            return code.toString();
        } else {
            return responses.nullResponse;
        }
    }

    function getFullLiveCode() {
        let requestProperties = getRequestProperties();
        let code = new StringBuilder("");

        code.append(`<!-- Put this into HEAD --> \n`)
            .append(`<script src='https://live.icecat.biz/js/live-current-2.js'></script>\n`)
            .append(`<!-- Put this into BODY -->\n`)
            .append(`<div id="content"></div>\n`)
            .append(`<script type="text/javascript">\n`)
            .append(indent).append(`setTimeout(function(){\n`).append(indent).append(indent)
            .append(`IcecatLive.getDatasheet('#content', {\n`);

        let properties = stringifyRequestProperties(requestProperties);
        code.append(properties);

        code.removeCharAtIndex(code.toString().length - 1);

        code.append(indent).append(indent)
            .append('}, ').append(`"`).append(inputFields.language.value)
            .append('\");\n').append(indent).append(`}, 200);\n`)
            .append(`</script>\n`);
        codeStash = code.toString();
        return code.toString();
    }

    /**
     * Copies linkBuilder's content into the buffer, if variable is not set, buildLinkForShare(null) will be issues first
     */
    function copyLink(text) {
        let textAreaElement = document.createElement("textarea");
        document.body.appendChild(textAreaElement);
        textAreaElement.value = text;
        textAreaElement.select();
        document.execCommand("copy");
        document.body.removeChild(textAreaElement);
    }

    /**
     * Reads shared link and setting up params
     */
    function readParams() {
        const urlParams = new URLSearchParams(window.location.search);
        if (notEmpty(urlParams.toString())) {
            inputFields.fields.forEach((element) => {
                let tempValue = urlParams.get(element.name);
                element.value = tempValue != null ? tempValue : "";
            });

            inputFields.language.value = urlParams.get('lang');

            let content = urlParams.get("content");
            if (content !== null) {
                let assets = {};
                content.split(",").forEach((contentPart) => {
                    switch (contentPart) {
                        case "multimedia":
                            assets["videosCheck"] = "videosCheck";
                            assets["tours3dCheck"] = "tours3dCheck";
                            break;
                        case "description":
                            assets["marketingtextCheck"] = "marketingtextCheck";
                            break;
                        case "generalinfo":
                            assets["generalinfoCheck"] = "generalinfoCheck";
                            break;
                        default:
                            assets[contentPart + "Check"] = contentPart + "Check";
                            break;
                    }
                });
                inputFields.checkBoxes.forEach((element) => {
                    if (element.id === assets[element.id]) {
                        element.checked = true;
                    }
                });
            }
            switch (urlParams.get("radio")) {
                case "ean":
                    radioButtons.ean.checked = true;
                    $(".ean").button('toggle');
                    enableInputFields(['ean']);
                    break;
                case "id":
                    radioButtons.productId.checked = true;
                    $(".prodId").button('toggle');
                    enableFORequest();
                    enableInputFields(['productId']);
                    break;
                case "brandMpn":
                default:
                    radioButtons.mpn.checked = true;
                    $(".mpn").button('toggle');
                    enableInputFields(['mpn', 'brand']);
                    break;
            }
            if (urlParams.get("output") !== null) {
                buttons.output.value = urlParams.get("output");
            }
            if (urlParams.get("app_key") !== null) {
                inputFields.appKey.value = urlParams.get("app_key");
            }
            switch (urlParams.get("requestType")) {
                case "liveFull":
                    buttons.liveFull.click();
                    break;
                case "liveGranular":
                    buttons.liveGranular.click();
                    break;
                case "json":
                    buttons.json.click();
                    break;
                case "fo":
                    buttons.foButton.click();
                    break;
                case "xml":
                    buttons.xmls3.click();
                    break;
                default:
                    break;
            }
        }
    }

    readParams();
    enableInputFields(['mpn', 'brand']);
}

class StringBuilder {
    string;

    constructor(str) {
        this.string = str;
    }

    append(suffix) {
        this.string += suffix;
        return this;
    }

    removeCharAtIndex(index) {
        this.string = this.string.substring(0, index - 1) + this.string.substring(index, this.string.length);
    }

    toString() {
        return this.string;
    }
}

