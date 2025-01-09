function init_manage_layers() {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";
        var selector_manage_layers = ".manage-layers .layers";

        // Empty
        $(selector_meme_generator + " " + selector_manage_layers).empty();

        // Check if
        if (poncho_json.meme_canvas.getObjects().length > 0) {
            // Loop
            poncho_json.meme_canvas.getObjects().forEach(function (object, index) {
                // Vars
                var type = object.type;
                var object_string = "";
                var object_layer_type = "";

                // Check if
                if (type == "image") {
                    // Vars
                    object_layer_type = "Image Layer";
                    var image_src = object._element.src;
                    image_src = image_src.replaceAll("/dist/img/memes/templates/", "/dist/img/memes/templates/small/");

                    // Vars
                    var image_src_array = image_src.split("/");
                    var image_src_title = image_src_array.pop();
                    var image_src_array = image_src_title.split(".");
                    var image_src_title = image_src_array[0];

                    // String
                    object_string = `<div class="object image"><img src="${image_src}" alt="${image_src_title}"></div>`;
                } else if (type == "rect") {
                    // Vars
                    object_layer_type = "Shape Layer";
                    var image_src = "/dist/img/memes/templates/small/Transparent.png?v=3";
                    var image_src_title = "Transparent";
                    // var rect_fill = object.fill;
                    // var rect_stroke = object.stroke;
                    // var rect_width = object.strokeWidth;

                    // String
                    object_string = `
                    <div class="object image">
                        <img src="${image_src}" alt="${image_src_title}">
                        <div class="rect"></div>
                    </div>`;
                } else {
                    // Vars
                    object_layer_type = "Text Layer";
                    var text = object.text;

                    // String
                    object_string = `<div class="object text">${text}</div>`;
                }

                // Vars
                var manage_layers_string = `
                    <li data-layer="${index}" title="${object_layer_type}">
                        <i class="grip fa-solid fa-grip-vertical"></i>
                        <div class="inner flexbox flexbox--vertical">
                            ${object_string}
                            <button class="button--transparent delete" type="button" title="Delete Layer"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                    </li>
                `;

                // Append
                $(selector_meme_generator + " " + selector_manage_layers).append(manage_layers_string);
            });

            // Check if
            if (poncho_json.meme_canvas.getActiveObject()) {
                // Set active object
                set_active_object();
            } else {
                // Set active object front
                set_active_object_front();
            }

            // New sortable
            var sortable = new Sortable(layers, {
                group: "layers",
                sort: true,
                onUpdate: function (event) {
                    // Update layers index
                    update_layers_index();
                },
            });

            // Active layer
            select_active_layer();

            // Delete layer
            delete_layer();
        } else {
            // Vars
            var manage_layers_string = `<li>No layers.</li>`;

            // Append
            $(selector_meme_generator + " " + selector_manage_layers).append(manage_layers_string);

            // Show messages
            show_messages(poncho_json.messages.meme_generator.layers.none.error);
        }
    } catch (e) {
        // console.error(e);
    }
}

function select_active_layer() {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";
        var selector_manage_layers = ".manage-layers .layers";

        // On click - select asset
        $(selector_meme_generator + " " + selector_manage_layers + " li").off("click");
        $(selector_meme_generator + " " + selector_manage_layers + " li").on("click", function () {
            try {
                // Vars
                var data_layer = $(this).attr("data-layer");

                // Remove class
                $(selector_meme_generator + " " + selector_manage_layers + " li").removeClass("active");

                // Set active
                poncho_json.meme_canvas.setActiveObject(poncho_json.meme_canvas._objects[data_layer]);
                poncho_json.meme_canvas.renderAll();

                // Add class
                $(this).addClass("active");
            } catch (e) {
                // console.error(e);
            }
        });
    } catch (e) {
        // console.error(e);
    }
}

function delete_layer() {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";
        var selector_manage_layers = ".manage-layers .layers";

        // On click - select asset
        $(selector_meme_generator + " " + selector_manage_layers + " .delete").off("click");
        $(selector_meme_generator + " " + selector_manage_layers + " .delete").on("click", function () {
            try {
                // Vars
                var data_layer = $(this).closest("li").attr("data-layer");

                // Loop
                poncho_json.meme_canvas.getObjects().forEach(function (object, index) {
                    // Check if
                    if (index == data_layer) {
                        // Delete
                        poncho_json.meme_canvas.remove(object);

                        // Remove
                        $(selector_meme_generator + " .meme img").remove();

                        // Init manage layers
                        init_manage_layers();

                        // Show messages
                        show_messages(poncho_json.messages.meme_generator.layers.delete.success);
                    }
                })
            } catch (e) {
                // console.error(e);
            }
        });
    } catch (e) {
        // console.error(e);
    }
}

function update_layers_index() {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";
        var selector_manage_layers = ".manage-layers .layers";

        // Loop
        poncho_json.meme_canvas.getObjects().forEach(function (object, index) {
            // Vars
            var new_index = $(selector_meme_generator + " " + selector_manage_layers + " li[data-layer=" + index + "]").index();

            // Move
            poncho_json.meme_canvas.moveObjectTo(object, new_index)
        });

        // Init manage layers
        init_manage_layers();
    } catch (e) {
        // console.error(e);
    }
}