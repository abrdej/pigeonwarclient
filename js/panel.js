var panel = {};

panel.hint_text = null;
panel.hint_rect = null;

panel.initialize = function (cols, rows, buttons_n) {

    panel.number_of_buttons = buttons_n;

    x_pos = 2 * field_size + field_size / 2;
    y_pos = rows * field_size + field_size / 4 + field_size / 2;

    panel.buttons = [];
    panel.icons = [];
    panel.hint_timers = [];

    for (n = 0; n < buttons_n; n++) {
        x = x_pos + n * field_size + field_size / 4;
        y = y_pos;

        var button = game.add.sprite(x + field_size / 2, y, 'Border');
        var icon = game.add.sprite(x + field_size / 2, y);
        var waiting_for_hint = false;

        button.sendToBack();
        button.inputEnabled = true;
        button.anchor.set(0.5);
        button.events.onInputDown.add(onButton.bind(this, n));

        icon.anchor.set(0.5);

        var hint_timer = null;

        var onOver = function (button, icon, hint_timer, n, object, pointer) {
            button.scale.setTo(1.2);
            button.bringToTop();
            icon.scale.setTo(1.2);
            icon.bringToTop();
            // if (hint_timer) {
            //     clearTimeout(hint_timer);
            //     hint_timer = null;
            // }
            // hint_timer = window.setTimeout(onGetHint.bind(this, n), 1000);
        };

        var onOut = function (button, icon, hint_timer, object, pointer) {
            button.scale.setTo(1);
            icon.scale.setTo(1);
            icon.sendToBack();
            button.sendToBack();
            if (hint_timer) {
                clearTimeout(hint_timer);
                hint_timer = null;
            }
            panel.remove_hint();
        };

        button.events.onInputOver.add(onOver.bind(this, button, icon, hint_timer, n));
        button.events.onInputOut.add(onOut.bind(this, button, icon, hint_timer));

        panel.buttons.push(button);
        panel.icons.push(icon);
        panel.hint_timers.push(hint_timer);
    }


    end_turn_x = field_size * (cols - 1) - field_size / 4;;

    panel.end_turn = game.add.sprite(end_turn_x, y_pos, 'EndTurn');
    panel.end_turn.sendToBack();
    panel.end_turn.anchor.set(0.5);
    panel.end_turn.inputEnabled = true;
    panel.end_turn.events.onInputDown.add(onButton.bind(this, 5));

    panel.end_turn.events.onInputOver.add(function (object, pointer) {
        object.scale.setTo(1.2);
        object.bringToTop();
    });
    panel.end_turn.events.onInputOut.add(function (object, pointer) {
        object.scale.setTo(1);
        object.sendToBack();
    });

    panel.entity_logo = game.add.sprite(field_size / 4, (rows) * field_size + field_size / 8);
    panel.entity_logo.scale.setTo(1.2);
    panel.entity_logo.inputEnabled = true;
    panel.entity_logo.events.onInputOver.add(function (object, pointer) {
        panel.entity_logo.scale.setTo(1.4);
    });
    panel.entity_logo.events.onInputOut.add(function (object, pointer) {
        panel.entity_logo.scale.setTo(1.2);
    });

    var style_for_entity_name = { font: "24px Helvetica", fill: "#FFFFFF", wordWrap:
            true, wordWrapWidth: this.width, align: "center" };
    panel.entity_name_text = game.add.text(field_size + field_size / 1.8,
        rows * field_size + field_size / 4 + field_size, "", style_for_entity_name);
    panel.entity_name_text.anchor.set(0.5);

    var style_for_health = { font: "28px Helvetica", fill: "#32cd32", wordWrap:
            true, wordWrapWidth: this.width, align: "center" };

    panel.entity_health_text = game.add.text(field_size + field_size / 1.8,
        rows * field_size + field_size / 4, "", style_for_health);

    var style_for_power = { font: "28px Helvetica", fill: "#1E90FF", wordWrap:
            true, wordWrapWidth: this.width, align: "center" };

    panel.entity_power_text = game.add.text(field_size + field_size / 1.2,
        rows * field_size + field_size / 1.5, "", style_for_power);
};

panel.setForEntity = function(entity_id) {

    console.log("entity_id: " + entity_id);

    if (entity_id !== no_entity_id) {
        panel.entity_logo.loadTexture(entities[entity_id].name);
        panel.entity_name_text.setText(entities[entity_id].name);

        if (entities[entity_id].health !== int_max) {
            panel.entity_health_text.setText(entities[entity_id].health);
        } else {
            panel.entity_health_text.setText("");
        }
        if (entities[entity_id].power !== int_max) {
            panel.entity_power_text.setText(entities[entity_id].power);
        } else {
            panel.entity_power_text.setText("");
        }

    } else {
        panel.entity_logo.loadTexture('__default');
        panel.entity_name_text.setText("");
        panel.entity_health_text.setText("");
        panel.entity_power_text.setText("");
    }

    for (i = 0; i < panel.number_of_buttons; i++) {
        if (button_bitmaps[i] !== "") {
            panel.icons[i].loadTexture(button_bitmaps[i]);
        } else {
            panel.icons[i].loadTexture('__default');
        }
    }
};

panel.set_hint = function (hint) {
    panel.remove_hint();
    if (hint !== "") {
        var style_for_hint = {
            font: "18px Helvetica", fill: "#FFFFFF", wordWrap:
                true, wordWrapWidth: 0.7 * game.width, align: "center"
        };
        panel.hint_text = game.add.text(game.world.centerX, game.world.centerX, hint, style_for_hint);
        panel.hint_text.anchor.set(0.5);

        var text_height = panel.hint_text.height + 10;

        console.log("text_height: " + text_height);

        panel.hint_rect = game.add.graphics(game.world.centerX, game.world.centerX);
        panel.hint_rect.beginFill(0x000000);
        panel.hint_rect.anchor.set(0.5);
        panel.hint_rect.drawRect(-(0.75 * game.width) / 2, -text_height / 2, 0.75 * game.width, text_height);

        panel.hint_text.bringToTop();
    }
};

panel.remove_hint = function () {
    if (panel.hint_text) {
        panel.hint_text.destroy();
        panel.hint_text = null;
    }
    if (panel.hint_rect) {
        panel.hint_rect.destroy();
        panel.hint_rect = null;
    }
};