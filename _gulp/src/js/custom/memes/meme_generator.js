function init_meme_generator() {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";

        // Init templates
        init_templates();

        // Add template
        add_template("With_Sign");

        // Load asset
        load_asset("1_Fur");

        // Init left top tools
        init_left_top_tools();

        // Init right top tools
        init_right_top_tools();

        // On click - select template
        $(selector_meme_generator + " .template-button").off("click");
        $(selector_meme_generator + " .template-button").on("click", function () {
            try {
                // Remove clss
                $(selector_meme_generator + " .template-button").removeClass("active");

                // Add class
                $(this).addClass("active");

                // Vars
                var template = $(this).attr("data-template");

                // Add template
                add_template(template);
            } catch (e) {
                // console.error(e);
            }
        });

        // On change - asset type
        $(selector_meme_generator + " [name=asset-type]").off("change");
        $(selector_meme_generator + " [name=asset-type]").on("change", function () {
            try {
                // Vars
                var asset_type = $(this).val();

                // Load asset
                load_asset(asset_type);
            } catch (e) {
                // console.error(e);
            }
        });

        // On click - canvas
        $(selector_meme_generator + " .meme").off("click");
        $(selector_meme_generator + " .meme").on("click", function () {
            try {
                // Init manage layers
                init_manage_layers();
            } catch (e) {
                // console.error(e);
            }
        });

        // Vars
        var accordion_id = $(selector_meme_generator + " .manage-layers .trigger").attr("aria-controls");

        // Open accordion
        open_accordion_by_id(accordion_id);
    } catch (e) {
        // console.error(e);
    }
}

function add_asset(image_src, asset_size) {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";

        // Add image to canvas
        fabric.Image.fromURL(image_src).then((image) => {
            // Remove
            $(selector_meme_generator + " .meme img").remove();

            // Check if
            if (asset_size == "50") {
                // Set attributes
                image.set({
                    hasControls: true,
                    hoverCursor: "auto",
                    left: poncho_json.meme_canvas.width / 2,
                    originX: "center",
                    originY: "center",
                    selectable: true,
                    textAlign: "center",
                    top: poncho_json.meme_canvas.height / 2
                });

                // Scale
                image.scaleToHeight(poncho_json.meme_canvas.height / 2);
                image.scaleToWidth(poncho_json.meme_canvas.width / 2);
            } else {
                // Set attributes
                image.set({
                    hasControls: true,
                    hoverCursor: "auto",
                    selectable: true,
                });

                // Scale
                image.scaleToHeight(poncho_json.meme_canvas.height);
                image.scaleToWidth(poncho_json.meme_canvas.width);
            }

            // Add image
            poncho_json.meme_canvas.add(image);

            // Set active
            poncho_json.meme_canvas.setActiveObject(image);

            // Init manage layers
            init_manage_layers();
        });
    } catch (e) {
        // console.error(e);
    }
}

function add_template(template) {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";

        // Remove
        $(selector_meme_generator + " .meme img").remove();

        try {
            // Destroy fabric
            poncho_json.meme_canvas.dispose();
            poncho_json.meme_canvas = "";
        } catch (e) {
            // console.error(e);
        }

        // New fabric canvas
        poncho_json.meme_canvas = new fabric.Canvas("meme_canvas");
        poncho_json.meme_canvas.preserveObjectStacking = true;

        // Defaults
        fabric.InteractiveFabricObject.ownDefaults = {
            ...fabric.InteractiveFabricObject.ownDefaults,
            borderColor: "#ffa51f",
            borderDashArray: [3, 1, 3],
            borderScaleFactor: 3,
            cornerColor: "lightblue",
            cornerDashArray: [2, 2],
            cornerSize: 30,
            cornerStrokeColor: "#1d48ff",
            cornerStyle: "circle",
            padding: 30,
            touchCornerSize: 40,
            transparentCorners: false
        }

        // Check if
        if (!check_value_defined(template)) {
            // Vars
            template = "With_Sign";
        }

        // Set
        poncho_json.template = template;

        // Add image to canvas
        fabric.Image.fromURL("/dist/img/memes/templates/" + template + ".png?v=3").then((image) => {
            // Set fabric dimensions to match image
            poncho_json.meme_canvas.setHeight(image.height);
            poncho_json.meme_canvas.setWidth(image.width);

            // Set attributes
            image.set({
                hasControls: false,
                hoverCursor: "auto",
                selectable: false
            });

            // Add image
            poncho_json.meme_canvas.add(image);

            // Textbox object
            var textbox_object = {
                fill: "#000",
                fontFamily: "pricedown",
                originX: "center",
                paintFirst: "stroke",
                stroke: "#fbffef",
                strokeWidth: 4,
                textAlign: "center",
            };

            // Check if
            if (template == "With_Sign") {
                // Add
                textbox_object["fontSize"] = image.height / 10;
                textbox_object["left"] = image.width / 2;
                textbox_object["top"] = image.height / 6;
                textbox_object["width"] = image.width / 1.5;

                // Textbox
                var text_object = new fabric.Textbox("Create Your\nPoncho Meme", textbox_object);
            } else if (template == "Change_My_Mind") {
                // Add
                textbox_object["fontSize"] = image.height / 13;
                textbox_object["left"] = image.width / 2;
                textbox_object["top"] = image.height / 1.515;
                textbox_object["width"] = image.width / 2;

                // Textbox
                var text_object = new fabric.Textbox("Create Your\nPoncho Meme", textbox_object);
            } else if (template == "Smart") {
                // Add
                textbox_object["fontSize"] = image.height / 13;
                textbox_object["left"] = image.width / 1.282;
                textbox_object["top"] = image.height / 13.5;
                textbox_object["width"] = image.width / 4;

                // Textbox
                var text_object = new fabric.Textbox("Create Your\nPoncho Meme", textbox_object);
            } else if (template == "Drake_Hotline_Bling") {
                // Vars
                var textbox_object_1 = textbox_object;
                var textbox_object_2 = textbox_object;

                // Add
                textbox_object_1["fontSize"] = image.height / 13;
                textbox_object_1["left"] = image.width / 1.315;
                textbox_object_1["top"] = image.height / 6.6;
                textbox_object_1["width"] = image.width / 3;

                // Textbox
                var text_object = new fabric.Textbox("Poncho\nHate", textbox_object_1);

                // Add
                textbox_object_2["fontSize"] = image.height / 13;
                textbox_object_2["left"] = image.width / 1.315;
                textbox_object_2["top"] = image.height / 1.53;
                textbox_object_2["width"] = image.width / 3;

                // Textbox
                var text_object_two = new fabric.Textbox("Poncho\nLike", textbox_object_2);
            } else if (template == "Truck") {
                // Add
                textbox_object["fontSize"] = image.height / 7;
                textbox_object["left"] = image.width / 2.65;
                textbox_object["top"] = image.height / 3.4;
                textbox_object["width"] = image.width / 2;

                // Textbox
                var text_object = new fabric.Textbox("Create Your\nPoncho Meme", textbox_object);
            } else if (template == "Dark_Army") {
                // Add
                textbox_object["fontSize"] = image.height / 10;
                textbox_object["left"] = image.width / 2;
                textbox_object["top"] = image.height / 16;
                textbox_object["width"] = image.width / 1.5;

                // Textbox
                var text_object = new fabric.Textbox("Create Your\nPoncho Meme", textbox_object);
            } else if (template == "Pepe") {
                // Add
                textbox_object["fontSize"] = image.height / 10;
                textbox_object["left"] = image.width / 3.23;
                textbox_object["top"] = image.height / 12;
                textbox_object["width"] = image.width / 2;

                // Textbox
                var text_object = new fabric.Textbox("Create Your\nPoncho Meme", textbox_object);
            } else if (template == "Ponchonator") {
                // Add
                textbox_object["fontSize"] = image.height / 13;
                textbox_object["left"] = image.width / 2;
                textbox_object["top"] = image.height / 1.4;
                textbox_object["width"] = image.width / 1.25;

                // Textbox
                var text_object = new fabric.Textbox("The\nPonchonator", textbox_object);
            } else if (template == "Brain_Jeet_Holder") {
                // Vars
                var textbox_object_1 = textbox_object;
                var textbox_object_2 = textbox_object;

                // Add
                textbox_object_1["fontSize"] = image.height / 10;
                textbox_object_1["left"] = image.width / 4;
                textbox_object_1["top"] = image.height / 6;
                textbox_object_1["width"] = image.width / 3;

                // Textbox
                var text_object = new fabric.Textbox("Jeeter", textbox_object_1);

                // Add
                textbox_object_2["fontSize"] = image.height / 10;
                textbox_object_2["left"] = image.width / 1.33;
                textbox_object_2["top"] = image.height / 6;
                textbox_object_2["width"] = image.width / 3;

                // Textbox
                var text_object_two = new fabric.Textbox("Poncho Holder", textbox_object_2);
            } else if (template == "Brain_Jeet") {
                // Add
                textbox_object["fontSize"] = image.height / 10;
                textbox_object["left"] = image.width / 2;
                textbox_object["top"] = image.height / 6;
                textbox_object["width"] = image.width / 1.5;

                // Textbox
                var text_object = new fabric.Textbox("Jeeter", textbox_object);
            } else if (template == "Brain_Holder") {
                // Add
                textbox_object["fontSize"] = image.height / 10;
                textbox_object["left"] = image.width / 2;
                textbox_object["top"] = image.height / 6;
                textbox_object["width"] = image.width / 1.5;

                // Textbox
                var text_object = new fabric.Textbox("Poncho Holder", textbox_object);
            } else if (template == "Dark_Planet") {
                // Add
                textbox_object["fontSize"] = image.height / 10;
                textbox_object["left"] = image.width / 2;
                textbox_object["top"] = image.height / 1.45;
                textbox_object["width"] = image.width / 1.25;

                // Textbox
                var text_object = new fabric.Textbox("Create Your\nPoncho Meme", textbox_object);
            } else if (
                template == "Gold_Poncho" ||
                template == "Celebration" ||
                template == "McDonalds" ||
                template == "Workout"
            ) {
                // Vars
                var textbox_object_1 = textbox_object;
                var textbox_object_2 = textbox_object;

                // Add
                textbox_object_1["fontSize"] = image.height / 10;
                textbox_object_1["left"] = image.width / 2;
                textbox_object_1["top"] = image.height / 18;
                textbox_object_1["width"] = image.width / 1.25;

                // Textbox
                var text_object = new fabric.Textbox("Top Text", textbox_object_1);

                // Add
                textbox_object_2["fontSize"] = image.height / 10;
                textbox_object_2["left"] = image.width / 2;
                textbox_object_2["top"] = image.height / 1.21;
                textbox_object_2["width"] = image.width / 1.25;

                // Textbox
                var text_object_two = new fabric.Textbox("Bottom Text", textbox_object_2);
            } else {
                // Add
                textbox_object["fontSize"] = image.height / 10;
                textbox_object["left"] = image.width / 2;
                textbox_object["originY"] = "center";
                textbox_object["top"] = image.height / 2;
                textbox_object["width"] = image.width / 1.5;

                // Textbox
                var text_object = new fabric.Textbox("Create Your\nPoncho Meme", textbox_object);
            }

            // Add text
            poncho_json.meme_canvas.add(text_object);
            // poncho_json.meme_canvas.centerObjectH(text_object);
            poncho_json.meme_canvas.setActiveObject(text_object);

            // Check if
            if (text_object_two) {
                // Add text
                poncho_json.meme_canvas.add(text_object_two);
            }

            // Init manage layers
            init_manage_layers();
        });
    } catch (e) {
        // console.error(e);
    }
}

function init_emoji_picker() {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";
        var emoji_script = document.createElement("script");
        emoji_script.setAttribute("type", "module");
        emoji_script.setAttribute("id", "emoji_script_id");

        // Code
        var code = `
                import "/dist/emojis/index.js?v=372"
                import insertText from "/dist/emojis/insert-text-at-cursor.js?v=372"
        
                // Windor insertText function
                window.insertText = insertText;
            `;

        try {
            // Append
            emoji_script.appendChild(document.createTextNode(code));
            document.body.appendChild(emoji_script);
        } catch (e) {
            // console.error(e);
        }

        // On click
        $(selector_meme_generator + " .icon").off("click");
        $(selector_meme_generator + " .icon").on("click", function (e) {
            // Var
            var emoji_picker = $(selector_meme_generator + " emoji-picker");

            // Check if
            if (emoji_picker.is(":visible")) {
                // Close
                $(this).removeClass("open");
            } else {
                // Open
                $(this).addClass("open");
            }

            // Toggle
            emoji_picker.toggle("fast");
        });

        // On click
        $("emoji-picker").off("emoji-click");
        $("emoji-picker").on("emoji-click", function (e) {
            // Vars
            var new_textbox = true;
            var active_object = poncho_json.meme_canvas.getActiveObject();

            // Check if
            if (active_object) {
                // Check if
                if (active_object.type == "textbox") {
                    // Vars
                    new_textbox = false;

                    // Add icon
                    active_object.set("text", active_object.text + " " + e.detail.unicode);
                    poncho_json.meme_canvas.renderAll();
                }
            }

            // Check if
            if (new_textbox) {
                // Textbox
                var text_object = new fabric.Textbox(e.detail.unicode, {
                    fontFamily: "pricedown",
                    fontSize: poncho_json.meme_canvas.height / 10,
                    fill: "#000",
                    left: poncho_json.meme_canvas.width / 2,
                    originX: "center",
                    originY: "center",
                    paintFirst: "stroke",
                    stroke: "#fff",
                    strokeWidth: 4,
                    textAlign: "center",
                    top: poncho_json.meme_canvas.height / 2,
                    width: poncho_json.meme_canvas.width / 1.5
                });

                // Add text
                poncho_json.meme_canvas.add(text_object);
                poncho_json.meme_canvas.setActiveObject(text_object);
            }
        });
    } catch (e) {
        // console.error(e);
    }
}

function init_left_top_tools() {
    try {
        // Vars
        var canvas = document.getElementById("meme_canvas");
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";

        // On click - reset
        $(selector_meme_generator + " .reset").off("click");
        $(selector_meme_generator + " .reset").on("click", function () {
            try {
                // Add template
                add_template(poncho_json.template);

                // Show messages
                show_messages(poncho_json.messages.meme_generator.reset.success);
            } catch (e) {
                // console.error(e);
            }
        });

        // On click - save
        $(selector_meme_generator + " .edit").off("click");
        $(selector_meme_generator + " .edit").on("click", function () {
            try {
                // Remove
                $(selector_meme_generator + " .meme img").remove();

                // Init manage layers
                init_manage_layers();

                // Show messages
                show_messages(poncho_json.messages.meme_generator.edit.success);
            } catch (e) {
                // console.error(e);
            }
        });

        // On click - save
        $(selector_meme_generator + " .save").off("click");
        $(selector_meme_generator + " .save").on("click", function () {
            try {
                // Remove
                $(selector_meme_generator + " .meme img").remove();

                // Remove active
                poncho_json.meme_canvas.discardActiveObject();
                poncho_json.meme_canvas.renderAll();

                // Canvas to blob
                canvas.toBlob((blob) => {
                    // New image
                    var image = new Image();

                    // URL
                    var url = URL.createObjectURL(blob);

                    // Image source
                    image.src = url;

                    // Append
                    $(selector_meme_generator + " .meme").append(image);

                    // Show messages
                    show_messages(poncho_json.messages.meme_generator.save.success);
                });
            } catch (e) {
                // console.error(e);
            }
        });

        // On click - download
        $(selector_meme_generator + " .download").off("click");
        $(selector_meme_generator + " .download").on("click", function () {
            try {
                // Remove active
                poncho_json.meme_canvas.discardActiveObject();
                poncho_json.meme_canvas.renderAll();

                // Canvas to blob
                canvas.toBlob((blob) => {
                    // URL
                    var url = URL.createObjectURL(blob);

                    // Create link
                    var link = document.createElement("a");
                    link.href = url;
                    link.download = "poncho_meme.png";

                    // Click
                    link.click();
                    link.remove();

                    // Init manage layers
                    init_manage_layers();

                    // Show messages
                    show_messages(poncho_json.messages.meme_generator.download.success);
                });
            } catch (e) {
                // console.error(e);
            }
        });

        // On click - expand
        $(selector_meme_generator + " .expand").off("click");
        $(selector_meme_generator + " .expand").on("click", function () {
            try {
                // Hide
                $(this).hide();

                // Show
                $(selector_meme_generator + " .compress").show();

                // Remove class
                $(selector_meme_generator).removeClass("compress");

                // Add class
                $(selector_meme_generator).addClass("expand");
            } catch (e) {
                // console.error(e);
            }
        });

        // On click - compress
        $(selector_meme_generator + " .compress").off("click");
        $(selector_meme_generator + " .compress").on("click", function () {
            try {
                // Hide
                $(this).hide();

                // Show
                $(selector_meme_generator + " .expand").show();

                // Remove class
                $(selector_meme_generator).removeClass("expand");

                // Add class
                $(selector_meme_generator).addClass("compress");
            } catch (e) {
                // console.error(e);
            }
        });
    } catch (e) {
        // console.error(e);
    }
}

function init_right_top_tools() {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";

        // On click - text
        $(selector_meme_generator + " .text").off("click");
        $(selector_meme_generator + " .text").on("click", function () {
            try {
                // Remove
                $(selector_meme_generator + " .meme img").remove();

                // Textbox
                var text_object = new fabric.Textbox("Create Your\nPoncho Meme", {
                    fontFamily: "pricedown",
                    fontSize: poncho_json.meme_canvas.height / 10,
                    fill: "#000",
                    left: poncho_json.meme_canvas.width / 2,
                    originX: "center",
                    originY: "center",
                    paintFirst: "stroke",
                    stroke: "#fff",
                    strokeWidth: 4,
                    textAlign: "center",
                    top: poncho_json.meme_canvas.height / 2,
                    width: poncho_json.meme_canvas.width / 1.5
                });

                // Add textbox
                poncho_json.meme_canvas.add(text_object);
                poncho_json.meme_canvas.setActiveObject(text_object);

                // Init manage layers
                init_manage_layers();
            } catch (e) {
                // console.error(e);
            }
        });

        // Init emoji picker
        init_emoji_picker();

        // On click - shape
        $(selector_meme_generator + " .shape").off("click");
        $(selector_meme_generator + " .shape").on("click", function () {
            try {
                // Remove
                $(selector_meme_generator + " .meme img").remove();

                // Rectangle 
                var rectangle = new fabric.Rect({
                    fill: "#fbffef",
                    height: poncho_json.meme_canvas.height / 2,
                    left: poncho_json.meme_canvas.width / 2,
                    originX: "center",
                    originY: "center",
                    stroke: "#000",
                    strokeWidth: 3,
                    textAlign: "center",
                    top: poncho_json.meme_canvas.height / 2,
                    width: poncho_json.meme_canvas.width / 2
                });

                // Add rectangle
                poncho_json.meme_canvas.add(rectangle);
                poncho_json.meme_canvas.setActiveObject(rectangle);

                // Init manage layers
                init_manage_layers();
            } catch (e) {
                // console.error(e);
            }
        });
    } catch (e) {
        // console.error(e);
    }
}

function init_templates() {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";

        // Folder
        var folder = "/dist/img/memes/templates/small/";

        // Loop
        $(poncho_json.memes.templates).each(function (index, value) {
            // Vars
            var active = value.state;
            var filename = value.filename;
            var filename_array = filename.split(".");
            var filename_title = filename_array[0];
            filename_title = filename_title.replaceAll("_", " ");
            filename_title = filename_title.replaceAll("&", " & ");
            filename = filename + "." + value.filetype;

            // Vars
            var gallery_string = '<button class="template-button ' + active + '" data-template="' + filename_array[0] + '"  type="button" title="' + filename_title + '"><img src="' + folder + filename + '" alt="' + filename_title + '" loading="lazy"></button>';

            // Append
            $(selector_meme_generator + " .templates .gallery .inner").append(gallery_string);
        });
    } catch (e) {
        // console.error(e);
    }
}

function load_asset(asset_type) {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";
        var folder = "/dist/img/memes/assets/" + asset_type + "/";

        // Check if
        if (!asset_type) {
            // Vars
            asset_type = "1_Fur";
        }

        // Check if
        if (poncho_json.memes.assets[asset_type].length > 0) {
            // Empty
            $(".assets .gallery .inner").empty();

            // Loop
            $(poncho_json.memes.assets[asset_type]).each(function (index, value) {
                // Vars
                var filename_array = value.split(".");
                var filename_title = filename_array[0];
                filename_title = filename_title.replaceAll("_", " ");
                filename_title = filename_title.replaceAll("&", " & ");

                // Vars
                var gallery_string = '<button class="asset-button" type="button" title="' + filename_title + '"><img src="' + folder + value + '" alt="' + filename_title + '" loading="lazy"></button>';

                // Append
                $(selector_meme_generator + " .assets .gallery .inner").append(gallery_string);
            });

            // On click - select asset
            $(selector_meme_generator + " .asset-button").off("click");
            $(selector_meme_generator + " .asset-button").on("click", function () {
                try {
                    // Vars
                    var image = $(this).find("img").attr("src");
                    var asset_size = $(selector_meme_generator + " [name=asset-size]").val();

                    // Add asset
                    add_asset(image, asset_size);
                } catch (e) {
                    // console.error(e);
                }
            });
        }
    } catch (e) {
        // console.error(e);
    }
}

function set_active_object() {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";
        var selector_manage_layers = ".manage-layers .layers";

        // Vars
        var number_objects = poncho_json.meme_canvas.getObjects().length;

        // Remove class
        $(selector_meme_generator + " " + selector_manage_layers + " li").removeClass("active");

        // Check if
        if (number_objects > 0) {
            // Vars
            var object_number = poncho_json.meme_canvas.getObjects().indexOf(poncho_json.meme_canvas.getActiveObject());

            // Add class
            $(selector_meme_generator + " " + selector_manage_layers + " li[data-layer=" + object_number + "]").addClass("active");
        }
    } catch (e) {
        // console.error(e);
    }
}

function set_active_object_front() {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";
        var selector_manage_layers = ".manage-layers .layers";

        // Vars
        var number_objects = poncho_json.meme_canvas.getObjects().length;

        // Remove class
        $(selector_meme_generator + " " + selector_manage_layers + " li").removeClass("active");

        // Check if
        if (number_objects > 0) {
            // Vars
            var object_number = number_objects - 1;

            // Set active
            poncho_json.meme_canvas.setActiveObject(poncho_json.meme_canvas._objects[object_number]);
            poncho_json.meme_canvas.renderAll();

            // Add class
            $(selector_meme_generator + " " + selector_manage_layers + " li[data-layer=" + object_number + "]").addClass("active");
        }
    } catch (e) {
        // console.error(e);
    }
}

function upload_image(e) {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";

        // File
        var file = e.currentTarget.files[0];

        // File reader
        var reader = new FileReader();

        // Fired when a read has completed, successfully or not.
        reader.onloadend = function () {
            // Image
            fabric.Image.fromURL(reader.result).then((image) => {
                // Remove
                $(selector_meme_generator + " .meme img").remove();

                // Set attributes
                image.set({
                    hasControls: true,
                    hoverCursor: "auto",
                    left: poncho_json.meme_canvas.width / 2,
                    originX: "center",
                    originY: "center",
                    selectable: true,
                    textAlign: "center",
                    top: poncho_json.meme_canvas.height / 2
                });

                // Add image
                image.scaleToHeight(poncho_json.meme_canvas.height / 2);
                image.scaleToWidth(poncho_json.meme_canvas.width / 2);
                poncho_json.meme_canvas.add(image);
                poncho_json.meme_canvas.setActiveObject(image);

                // Init manage layers
                init_manage_layers();
            });
        }

        // Fired when the read failed due to an error.
        reader.onerror = function () {
            // Show messages
            show_messages(poncho_json.messages.meme_generator.upload_iamge.error);
        }

        // Check if
        if (file && (/\.(jpe?g|png)$/i.test(file.name))) {
            // Read the contents of the specified Blob or File
            reader.readAsDataURL(file);
        } else {
            // Show messages
            show_messages(poncho_json.messages.meme_generator.upload_iamge.error);
        }

        // Clear
        $(e.currentTarget).val("");
    } catch (e) {
        // console.error(e);
    }
}

function upload_template(e) {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";

        // File
        var file = e.currentTarget.files[0];

        // File reader
        var reader = new FileReader();

        // Fired when a read has completed, successfully or not.
        reader.onloadend = function () {
            // Remove
            $(selector_meme_generator + " .meme img").remove();

            try {
                // Destroy fabric
                poncho_json.meme_canvas.dispose();
                poncho_json.meme_canvas = "";
            } catch (e) {
                // console.error(e);
            }

            // New fabric canvas
            poncho_json.meme_canvas = new fabric.Canvas("meme_canvas");
            poncho_json.meme_canvas.preserveObjectStacking = true;

            // Defaults
            fabric.InteractiveFabricObject.ownDefaults = {
                ...fabric.InteractiveFabricObject.ownDefaults,
                cornerSize: 30,
                touchCornerSize: 40,
                cornerStrokeColor: "#1d48ff",
                cornerColor: "lightblue",
                cornerStyle: "circle",
                padding: 30,
                transparentCorners: false,
                cornerDashArray: [2, 2],
                borderColor: "#ffa51f",
                borderDashArray: [3, 1, 3],
                borderScaleFactor: 3
            }

            // Add image to canvas
            fabric.Image.fromURL(reader.result).then((image) => {
                // Set fabric dimensions to match image
                poncho_json.meme_canvas.setHeight(image.height);
                poncho_json.meme_canvas.setWidth(image.width);

                // Set attributes
                image.set({
                    hasControls: false,
                    hoverCursor: "auto",
                    selectable: false
                });

                // Add image
                poncho_json.meme_canvas.add(image);

                // Textbox
                var text_object = new fabric.Textbox("Create Your\nPoncho Meme", {
                    fontFamily: "pricedown",
                    fontSize: image.height / 10,
                    left: image.width / 2,
                    originX: "center",
                    originY: "center",
                    textAlign: "center",
                    top: image.height / 2,
                    width: image.width / 1.5
                });

                // Add text
                poncho_json.meme_canvas.add(text_object);
                poncho_json.meme_canvas.setActiveObject(text_object);

                // Init manage layers
                init_manage_layers();
            });
        }

        // Fired when the read failed due to an error.
        reader.onerror = function () {
            // Show messages
            show_messages(poncho_json.messages.meme_generator.upload_template.error);
        }

        // Check if
        if (file && (/\.(jpe?g|png)$/i.test(file.name))) {
            // Read the contents of the specified Blob or File
            reader.readAsDataURL(file);
        } else {
            // Show messages
            show_messages(poncho_json.messages.meme_generator.upload_template.error);
        }

        // Clear
        $(e.currentTarget).val("");
    } catch (e) {
        // console.error(e);
    }
}