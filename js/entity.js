var entities = {};

Entity = function (game, name, health, power, index) {

    this.name = name;
    this.health = health;
    this.power = power;
    this.pos = index_to_pos(index);
    Phaser.Sprite.call(this, game, this.pos[0] * field_size, this.pos[1] * field_size, name);

    this.isTweening = true;

    if (health !== int_max) {
        var style = { font: "20px Helvetica", fill: "#202020", wordWrap:
                true, wordWrapWidth: this.width, align: "center" };
        text = game.make.text(field_size / 2, -5, " " + this.health + " ", style);
        text.anchor.set(0.5);

        text_rect = game.make.graphics(0, 0);
        text_rect.beginFill(0xFFFFFF);
        text_rect.anchor.set(0.5);
        text_rect.alpha = 0.5;
        text_rect.drawRect(field_size / 2 - text_rect_width / 2, -text_rect_height + 2,
            text_rect_width, text_rect_height);

        this.addChild(text_rect);
        this.addChild(text);
    }

    game.add.existing(this);
};

Entity.prototype = Object.create(Phaser.Sprite.prototype);
Entity.prototype.constructor = Entity;

Entity.prototype.getSprite = function () {
    return this;
};

Entity.prototype.setHealth = function (health) {
    this.health = health;
    if (health !== int_max) {
        text.setText(" " + this.health + " ");
    }
};

Entity.prototype.setPosition = function (index) {
    // this.pos = index_to_pos(index);
    // this.sprite.x = this.pos[0] * field_size;
    // this.sprite.y = this.pos[1] * field_size;
};

Entity.prototype.getName = function () {
    return this.name;
};

update_healths = function (entities_healths) {
    entities_healths.forEach(function (health_entry) {
        entities[health_entry[0]].setHealth(health_entry[1]);
    });
};

update_positions = function (board_state) {
    for (index = 0; index < board_state.length; index++) {
        board_state[index].forEach(function (entity_id) {
            entities[entity_id].setPosition(index);
        });
    }
};

entity_at = function (board_index) {
    results = Object.keys(entities).find(function (key, index, array) {
        pos = index_to_pos(board_index);
        if (pos[0] === entities[key].pos[0] &&  pos[1] === entities[key].pos[1]) {
            return true;
        }
    });

    if (results !== -1)
        return results;

    return no_entity_id;
};

update_for_entity = function () {
    if (selected_index === no_selected_index) {
        return;
    }

    console.log("selected_index: " + selected_index);

    entity_id = entity_at(selected_index);

    console.log("entity_id:" + entity_id);

    if (entity_id !== no_entity_id) {

        console.log("entity_id !== no_entity_id");

        panel.setForEntity(entity_id);


        // auto this_entity_id = state.board.at(lstate.selected_index);
        // std::string effects;
        // for (auto&& effect : state.entities_additional_effects[this_entity_id]) {
        //     effects += effect;
        //     effects += "\n";
        // }
    }
};
