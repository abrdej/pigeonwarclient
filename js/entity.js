var entities = {};

var colors_for_players = {
    0 : '#b3dbf6',
    1 : '#ffd2c7',
    2 : '#97a27a',
    4294967295 : '#ffffff'
};

Entity = function (game, name, health, power, index) {

    this.name = name;
    this.health = health;
    this.power = power;
    this.pos = index_to_pos(index);
    Phaser.Sprite.call(this, game,
        this.pos[0] * field_size + field_size / 2,
        this.pos[1] * field_size + field_size / 2, name);

    this.isTweening = true;
    this.anchor.setTo(.5);

    if (health !== int_max) {
        var style = { font: "20px Helvetica", fill: "#202020", wordWrap:
                true, wordWrapWidth: this.width, align: "center" };
        this.text = game.make.text(0, -0.6 * field_size, " " + this.health + " ", style);
        this.text.anchor.set(0.5);

        this.color = '#ffffff';

        var bmd = game.add.bitmapData(text_rect_width, text_rect_height);

        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, text_rect_width, text_rect_height);
        bmd.ctx.fillStyle = this.color;
        bmd.ctx.alphe = 0.5;
        bmd.ctx.fill();
        this.text_rect = game.add.sprite(0, -2 * text_rect_height, bmd);
        this.text_rect.anchor.set(0.5);
        this.text_rect.alpha = 0.5;

        this.addChild(this.text_rect);
        this.addChild(this.text);
    }

    game.add.existing(this);
};

Entity.prototype = Object.create(Phaser.Sprite.prototype);
Entity.prototype.constructor = Entity;

Entity.prototype.getSprite = function () {
    return this;
};

Entity.prototype.flip = function (flipped) {
    if (flipped) {
        this.scale.x = -1;
        this.text.scale.x = -1;
    } else {
        this.scale.x = 1;
        this.text.scale.x = 1;
    }
};

Entity.prototype.setHealth = function (health) {
    this.health = health;
    if (this.health !== int_max) {
        this.text.setText(" " + this.health + " ");
    }
};

Entity.prototype.changeHealth = function (amount) {
    this.health += amount;
    if (this.health !== int_max) {
        this.text.setText(" " + this.health + " ");
    }
};

Entity.prototype.setColorForHealth = function (color) {
    if (this.health !== int_max && this.color !== color) {
        this.color = color;
        var bmd = game.add.bitmapData(text_rect_width, text_rect_height);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, text_rect_width, text_rect_height);
        bmd.ctx.fillStyle = color;
        bmd.ctx.alphe = 0.5;
        bmd.ctx.fill();
        this.text_rect.setTexture(bmd.texture);
    }
};

Entity.prototype.changePower = function (amount) {
    this.power += amount;
};

Entity.prototype.setPosition = function (index) {
    this.pos = index_to_pos(index);
    this.x = this.pos[0] * field_size + field_size / 2;
    this.y = this.pos[1] * field_size + field_size / 2;
};

Entity.prototype.setPlayer = function (player_id) {
    this.setColorForHealth(colors_for_players[player_id]);
};

Entity.prototype.getName = function () {
    return this.name;
};

Entity.prototype.healthToTop = function () {
    if (typeof this.text !== 'undefined') {
        this.text.bringToTop();
        game.world.bringToTop(this.text_rect);
    }
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
    var results = Object.keys(entities).find(function (key, index, array) {
        var pos = index_to_pos(board_index);
        if (pos[0] === entities[key].pos[0] &&  pos[1] === entities[key].pos[1]) {
            return true;
        }
    });

    console.log("results: " << results);

    if (results !== -1)
        return results;

    return no_entity_id;
};

bring_entities_to_top = function () {
    Object.keys(entities).forEach(function (key, index, array) {
        entities[key].healthToTop();
    });
};

update_for_entity = function () {
    if (selected_index === no_selected_index) {
        return;
    }

    console.log("selected_index: " + selected_index);

    var entity_id = entity_at(selected_index);

    console.log("entity_id:" + entity_id);

    if (entity_id !== no_entity_id) {

        panel.setForEntity(entity_id);
    }
};
