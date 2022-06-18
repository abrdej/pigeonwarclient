var panel = {};

panel.hint_text = null;
panel.hint_rect = null;
panel.text = null;
panel.text_rect = null;

panel.effects = [];

panel.initialize = function (cols, rows, buttons_n) {

    panel.number_of_buttons = buttons_n;

    var x_pos = 2 * field_size + field_size / 2;
    var y_pos = rows * field_size + field_size / 4 + field_size / 2;

    panel.buttons = [];
    panel.icons = [];
    panel.hint_timer = null;

    for (var n = 0; n < buttons_n; n++) {
        var x = x_pos + n * field_size + field_size / 4;
        var y = y_pos;

        var button = game.add.sprite(x + field_size / 2, y, 'Border');
        var icon = game.add.sprite(x + field_size / 2, y);

        button.sendToBack();
        button.inputEnabled = true;
        button.anchor.set(0.5);

        icon.anchor.set(0.5);

        var onOver = function (button, icon, n, object, pointer) {
            button.scale.setTo(1.2);
            icon.scale.setTo(1.2);
            button.bringToTop();
            icon.bringToTop();
            if (panel.hint_timer) {
                 clearTimeout(panel.hint_timer);
                panel.hint_timer = null;
            }
            panel.hint_timer = window.setTimeout(onGetHint.bind(this, n), 1000);
        };

        var onOut = function (button, icon, object, pointer) {
            button.scale.setTo(1);
            icon.scale.setTo(1);
            icon.sendToBack();
            button.sendToBack();
            if (panel.hint_timer) {
                clearTimeout(panel.hint_timer);
                panel.hint_timer = null;
            }
            panel.remove_hint();
        };

        button.events.onInputOver.add(onOver.bind(this, button, icon, n));
        button.events.onInputOut.add(onOut.bind(this, button, icon));
        button.events.onInputDown.add(onButton.bind(this, n));
        button.events.onInputDown.add(onOut.bind(this, button, icon));

        panel.buttons.push(button);
        panel.icons.push(icon);
    }


    end_turn_x = field_size * (cols - 1) - field_size / 4;

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

    panel.effect_slots = [];
    panel.effect_icons = [];

    var n = 0;
    for (var k = 0; k < 5; k++) {
        for (var l = 0; l < 2; l++) {
            var m = n++;

            x = x_pos + 6 * field_size + k * field_size / 2 + field_size / 4;
            y = y_pos - field_size / 4 + l * field_size / 2;

            var slot = game.add.sprite(x + field_size / 2, y, 'Border');
            icon = game.add.sprite(x + field_size / 2, y);

            slot.sendToBack();
            slot.inputEnabled = true;
            slot.anchor.set(0.5);
            // button.events.onInputDown.add(onButton.bind(this, n));

            icon.anchor.set(0.5);

            slot.scale.setTo(0.5);
            icon.scale.setTo(0.5);

            onOver = function (slot, icon, m, object, pointer) {
                slot.scale.setTo(0.6);
                slot.bringToTop();
                icon.scale.setTo(0.6);
                icon.bringToTop();

                if (panel.hint_timer) {
                    clearTimeout(panel.hint_timer);
                    panel.hint_timer = null;
                }
                var onEffect = function (m) {
                    onEffectHint(panel.effects[m])
                };
                panel.hint_timer = window.setTimeout(onEffect.bind(this, m), 100);
            };

            onOut = function (slot, icon, object, pointer) {
                slot.scale.setTo(0.5);
                icon.scale.setTo(0.5);
                icon.sendToBack();
                slot.sendToBack();
                if (panel.hint_timer) {
                    clearTimeout(panel.hint_timer);
                    panel.hint_timer = null;
                }
                panel.remove_hint();
            };

            // onEffect = function (m) {
            //     console.log("effects from slot: " + panel.effects[m]);
            //     console.log(panel.effects);
            //     console.log(m);
            //     onEffectHint(panel.effects[m])
            // };

            slot.events.onInputOver.add(onOver.bind(this, slot, icon, m));
            slot.events.onInputOut.add(onOut.bind(this, slot, icon));
            // slot.events.onInputDown.add(onEffect.bind(this, m));

            panel.effect_slots.push(slot);
            panel.effect_icons.push(icon);
        }
    }

    // x = x_pos + 5 * field_size + field_size / 4;
    // y = y_pos;
    // var shifter = game.add.sprite(x + field_size / 2, y, 'shifter');
    // shifter.anchor.set(0.5);
    // shifter.inputEnabled = true;
    //
    // onOver = function (shifter, object, pointer) {
    //     shifter.scale.setTo(1.2);
    //     shifter.bringToTop();
    // };
    // onOut = function (shifter, object, pointer) {
    //     shifter.scale.setTo(1);
    //     shifter.sendToBack();
    // };
    //
    // shifter.events.onInputOver.add(onOver.bind(this, shifter));
    // shifter.events.onInputOut.add(onOut.bind(this, shifter));

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

        var effects = [];
        for (var i = 0; i < entities_additional_effects.length; i++) {

            console.log("effects iter: " + entities_additional_effects[i][0]);

            if (entity_id == entities_additional_effects[i][0]) {
                effects = entities_additional_effects[i][1];
                break;
            }
        }
        console.log("effects: " + effects);

        for (var j = 0; j < panel.effect_icons.length; j++) {
            panel.effect_icons[j].loadTexture('__default');
        }
        for (j = 0; j < effects.length; j++) {
            panel.effect_icons[j].loadTexture(effects[j]);

            panel.effects[j] = effects[j];
        }

    } else {
        panel.entity_logo.loadTexture('__default');
        panel.entity_name_text.setText("");
        panel.entity_health_text.setText("");
        panel.entity_power_text.setText("");
        panel.entity_logo.events.onInputDown.removeAll();

        for (j = 0; j < panel.effect_icons.length; j++) {
            panel.effect_icons[j].loadTexture('__default');
            panel.effects[j] = "";
        }
    }

    for (i = 0; i < panel.number_of_buttons; i++) {
        if (button_bitmaps[i] !== "") {
            panel.icons[i].loadTexture(button_bitmaps[i]);
            if (!usable[i]) {
                panel.icons[i].blendMode = 12;
                panel.icons[i].tint = 0x424242;
            } else {
                panel.icons[i].blendMode = 0;
                panel.icons[i].tint = 0xFFFFFF;
            }
        } else {
            panel.icons[i].loadTexture('__default');
        }
    }
};

panel.set_hint = function (hint) {
    panel.remove_hint();
    if (hint !== "" && panel.hint_timer) {
        var style_for_hint = {
            font: "18px Helvetica", fill: "#FFFFFF", wordWrap:
                true, wordWrapWidth: 0.7 * game.width, align: "center"
        };
        panel.hint_text = game.add.text(game.world.centerX, game.world.centerX, hint, style_for_hint);
        panel.hint_text.anchor.set(0.5);

        var text_height = panel.hint_text.height * 3;

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

panel.show_text = function (text) {
    panel.remove_text();
    if (text !== "") {
        var style_for_text = {
            font: "18px Helvetica", fill: "#FFFFFF", wordWrap:
                true, wordWrapWidth: 0.7 * game.width, align: "center"
        };
        panel.text = game.add.text(game.world.centerX, game.world.centerX, text, style_for_text);
        panel.text.anchor.set(0.5);

        var text_height = panel.text.height * 3;

        console.log("text_height: " + text_height);

        panel.text_rect = game.add.graphics(game.world.centerX, game.world.centerX);
        panel.text_rect.beginFill(0x000000);
        panel.text_rect.anchor.set(0.5);
        panel.text_rect.drawRect(-(0.75 * game.width) / 2, -text_height / 2, 0.75 * game.width, text_height);

        panel.text.bringToTop();
    }
    var removeText = function () {
        panel.remove_text()
    };
    panel.text_timer = window.setTimeout(removeText.bind(this), 4000);
}

panel.remove_text = function () {
    if (panel.text) {
        panel.text.destroy();
        panel.text = null;
    }
    if (panel.text_rect) {
        panel.text_rect.destroy();
        panel.text_rect = null;
    }
    is_animation_running = false
};
