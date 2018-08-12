var animation = {};

var next_tween;

motion_distance = function (from, to) {
    return Math.sqrt(Math.pow(from[0] - to[0], 2) + Math.pow(from[1] - to[1], 2))
};

motion_speed_slow = function (distance) {
    return distance * 200;
};

motion_speed_medium = function (distance) {
    return distance * 300;
};

pos_to_real_dimensions = function (pos) {
    return {x: pos[0] * field_size + field_size / 2, y: pos[1] * field_size + field_size / 2};
};

move_handler = function (animation_data) {
    var entity_id = animation_data[1];
    var to_index = animation_data[2];

    var entity_sprite = entities[entity_id];

    var to_pos = index_to_pos(to_index);

    var distance = motion_distance(entity_sprite.pos, to_pos);

    entity_sprite.flip(entity_sprite.pos[0] - to_pos[0] > 0);

    entity_sprite.bringToTop();
    entity_sprite.pos = to_pos; // possible not save solution

    game.add.tween(entity_sprite.position).to(pos_to_real_dimensions(to_pos), motion_speed_slow(distance),
        Phaser.Easing.Linear.None, true, 0);
};

shoot_base_handler = function (animation_data, bullet_key, explosion_key) {
    var from_index = animation_data[1];
    var to_index = animation_data[2];

    var from_pos = index_to_pos(from_index);
    var to_pos = index_to_pos(to_index);

    var distance = motion_distance(from_pos, to_pos);

    var start_x = from_pos[0] * field_size + field_size / 2;
    var start_y = from_pos[1] * field_size + field_size / 2;

    var end_x = to_pos[0] * field_size + field_size / 2;
    var end_y = to_pos[1] * field_size + field_size / 2;

    var bullet = game.add.sprite(start_x, start_y, bullet_key);
    bullet.anchor.set(0.5);

    if (from_pos[0] - to_pos[0] > 0) {
        bullet.scale.x = -1;
    } else {
        bullet.scale.x = 1;
    }

    var bullet_tween = game.add.tween(bullet).to(pos_to_real_dimensions(to_pos), motion_speed_medium(distance),
        Phaser.Easing.Linear.None);
    bullet_tween.onComplete.add(function () {
        bullet.destroy();
        if (explosion_key) {
            var explosion = game.add.sprite(end_x, end_y, explosion_key);
            explosion.anchor.set(0.5);
            explosion.scale.x = 0.8;
            explosion.scale.y = 0.8;
            var explosion_tween = game.add.tween(explosion.scale).to({x: 1.2, y: 1.2}, 200);
            explosion_tween.onComplete.add(function () {
                explosion.destroy();
                if (next_tween instanceof Function) {
                    next_tween();
                }
            });
            explosion_tween.start();
        } else {
            if (next_tween instanceof Function) {
                next_tween();
            }
        }
    });

    bullet_tween.start();
};

shoot_handler = function (animation_data) {
    return shoot_base_handler(animation_data, 'bullet', 'bum');
};

change_health_handler = function (animation_data) {
    var to_index = animation_data[1];
    var entity_id = animation_data[2];
    var change_amount = animation_data[3];

    var entity = entities[entity_id];

    var color = "";
    if (change_amount < 0) {
        color = "#d2140f";
    } else if (change_amount > 0) {
        color = "#189040";
    } else {
        color = "#1e71b4";
    }

    var style = { font: "32px Helvetica", fill: color, wordWrap: true, wordWrapWidth: this.width, align: "center" };
    var change_health = game.make.text(0, -field_size / 3, change_amount, style);
    change_health.anchor.set(0.5);
    entity.addChild(change_health);

    var change_health_tween = game.add.tween(change_health).to({y: '-25'}, 300, Phaser.Easing.Linear.None);
    change_health_tween.onComplete.add(function () {
        change_health.destroy();
        if (next_tween instanceof Function) {
            next_tween();
        }
    });
    change_health_tween.start();
};

animation.initialize = function () {
    animation.services = {};
    animation.services['move'] = move_handler;
    animation.services['shoot'] = shoot_handler;
    animation.services['change_health'] = change_health_handler;
};

animation.handle = function (animation_data) {
    var animation_name = animation_data[0];
    console.log("animation_name: " + animation_name);
    animation.services[animation_name](animation_data);
};

