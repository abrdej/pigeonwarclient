var animation = {};

var last_tween = null;

var is_animation_running = false;

motion_distance = function (from, to) {
    return Math.sqrt(Math.pow(from[0] - to[0], 2) + Math.pow(from[1] - to[1], 2))
};

motion_speed_slow = function (distance) {
    return distance * 200;
};

motion_speed_medium = function (distance) {
    return distance * 150;
};

motion_speed_high = function (distance) {
    return distance * 100;
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
    
    var move_tween = game.add.tween(entity_sprite.position).to(pos_to_real_dimensions(to_pos),
        motion_speed_slow(distance),
        Phaser.Easing.Linear.None);
    move_tween.onComplete.add(function () {
       is_animation_running = false;
    });
    is_animation_running = true;
    move_tween.start();
};

shoot_base_handler = function (animation_data, bullet_bitmap, explosion_bitmap) {
    var from_index = animation_data[1];
    var to_index = animation_data[2];

    var from_pos = index_to_pos(from_index);
    var to_pos = index_to_pos(to_index);

    var distance = motion_distance(from_pos, to_pos);

    var start_x = from_pos[0] * field_size + field_size / 2;
    var start_y = from_pos[1] * field_size + field_size / 2;

    var end_x = to_pos[0] * field_size + field_size / 2;
    var end_y = to_pos[1] * field_size + field_size / 2;

    var bullet = game.add.sprite(start_x, start_y, bullet_bitmap);
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
        if (explosion_bitmap) {
            var explosion = game.add.sprite(end_x, end_y, explosion_bitmap);
            explosion.anchor.set(0.5);
            explosion.scale.x = 0.8;
            explosion.scale.y = 0.8;
            var explosion_tween = game.add.tween(explosion.scale).to({x: 1.2, y: 1.2}, 200);
            explosion_tween.onComplete.add(function () {
                explosion.destroy();
            });
            explosion_tween.start();
            is_animation_running = false;
        } else {
            is_animation_running = false;
        }
    });
    is_animation_running = true;
    bullet_tween.start();
};

move_and_return_base_handler = function (animation_data, specified_return, flush_bitmap, moving_bitmap) {
    var entity_id = animation_data[1];
    var to_index = animation_data[2];

    var entity_sprite = entities[entity_id];

    console.log("entity_id: " + entity_id);
    console.log("entity_sprite: " + entity_sprite);

    var from_pos = entity_sprite.pos;

    var to_pos = index_to_pos(to_index);
    var return_pos = from_pos;

    if (specified_return) {
        var return_index = animation_data[3];
        return_pos = index_to_pos(return_index);
    }

    var distance = motion_distance(from_pos, to_pos);

    entity_sprite.flip(from_pos[0] - to_pos[0] > 0);
    entity_sprite.bringToTop();
    entity_sprite.pos = return_pos; // possible not save solution

    var name = entity_sprite.name;
    var texture_key = entity_sprite.key;

    var move_to_tween = game.add.tween(entity_sprite.position).to(pos_to_real_dimensions(to_pos),
        motion_speed_slow(distance), Phaser.Easing.Linear.None);
    if (moving_bitmap) {
        move_to_tween.onStart.add(function () {
            entity_sprite.loadTexture(moving_bitmap);
        });
    }

    var return_tween = game.add.tween(entity_sprite.position).to(pos_to_real_dimensions(return_pos),
        motion_speed_slow(distance), Phaser.Easing.Linear.None);
    return_tween.onComplete.add(function () {
        entity_sprite.loadTexture(texture_key);
        is_animation_running = false;
    });

    if (flush_bitmap) {
        var flush_bitmap_tween = game.add.tween(entity_sprite.position).to({x: '-0'}, 200);
        flush_bitmap_tween.onStart.add(function () {
            entity_sprite.loadTexture(flush_bitmap);
        });
        flush_bitmap_tween.onComplete.add(function () {
            if (moving_bitmap) {
                entity_sprite.loadTexture(moving_bitmap);
            } else {
                entity_sprite.loadTexture(texture_key);
            }
            return_tween.start();
        });
    }

    move_to_tween.onComplete.add(function () {
        if (flush_bitmap) {
            flush_bitmap_tween.start();
        } else {
            return_tween.start();
        }
    });
    is_animation_running = true;
    move_to_tween.start();
};

change_health_handler = function (animation_data) {
    var entity_id = animation_data[1];
    var change_amount = animation_data[2];

    var entity = entities[entity_id];

    var color = "";
    if (change_amount < 0) {
        color = "#d2140f";
    } else if (change_amount > 0) {
        color = "#189040";
    } else {
        color = "#1e71b4";
    }

    var x = entity.pos[0];
    var y = entity.pos[1];

    var style = { font: "32px Helvetica", fill: color, wordWrap: true, wordWrapWidth: this.width, align: "center" };
    var change_health = game.add.text(x * field_size + field_size / 2, y * field_size - field_size / 3, change_amount, style);
    change_health.anchor.set(0.5);

    var change_health_tween = game.add.tween(change_health).to({y: '-25'}, 300, Phaser.Easing.Linear.None);
    change_health_tween.onComplete.add(function () {
        entity.changeHealth(change_amount);
        change_health.destroy();
        is_animation_running = false;
    });
    is_animation_running = true;
    change_health_tween.start();
};

change_power_handler = function (animation_data) {
    var entity_id = animation_data[1];
    var change_amount = animation_data[2];

    var entity = entities[entity_id];

    var color = "#1e71b4";

    var style = { font: "32px Helvetica", fill: color, wordWrap: true, wordWrapWidth: this.width, align: "center" };
    var change_power = game.make.text(0, -field_size / 3, change_amount, style);

    var change_power_tween = game.add.tween(change_power).to({y: '-25'}, 300, Phaser.Easing.Linear.None);
    change_power_tween.onStart.add(function () {
        change_power.anchor.set(0.5);
        entity.addChild(change_power);
    });
    change_power_tween.onComplete.add(function () {
        entity.changeHealth(change_amount);
        change_power.destroy();
        is_animation_running = false;
    });
    is_animation_running = true;
    change_power_tween.start();
};

bitmap_flush_base_handler = function (animation_data, flush_bitmap, time, hide_index) {
    var index = animation_data[1];

    var entity_id = 0;
    var entity_sprite = null;

    if (hide_index) {
        entity_id = entity_at(index);
        entity_sprite = entities[entity_id];
    }

    var pos = index_to_pos(index);
    pos.x += 30;
    pos.y += 30;

    var flush = game.add.sprite(pos[0] * field_size + field_size / 2,
        pos[1] * field_size + field_size / 2, flush_bitmap);
    flush.anchor.set(0.5);

    if (hide_index) {
        entity_sprite.visible = false;
    }

    var flush_tween = game.add.tween(flush).to({x: '0'}, time);
    flush_tween.onComplete.add(function () {
        flush.destroy();
        if (hide_index) {
            entity_sprite.visible = true;
        }
        is_animation_running = false;
    });
    is_animation_running = true;
    flush_tween.start();
};

change_bitmap_base_handler = function (animation_data, new_bitmap) {
    var entity_id = animation_data[1];
    entities[entity_id].loadTexture(new_bitmap);
    console.log("hehe");
};

shoot_handler = function (animation_data) {
    return shoot_base_handler(animation_data, 'bullet', 'bum');
};

grenade_handler = function (animation_data) {
    return shoot_base_handler(animation_data, 'grenade', 'detonation');
};

sabers_handler = function (animation_data) {
    return move_and_return_base_handler(animation_data, false, 'sabers_attack');
};

tongue_of_fire_handler = function (animation_data) {
    return shoot_base_handler(animation_data, 'tongue_of_fire');
};

set_invisibility_handler = function (animation_data) {
    return change_bitmap_base_handler(animation_data, 'saberhand_transparency');
};

set_immortality_handler = function (animation_data) {
    return change_bitmap_base_handler(animation_data, 'warrior_immortal');
};

remove_invisibility_handler = function (animation_data) {
    return change_bitmap_base_handler(animation_data, 'Saberhand');
};

start_sorcerer_attack_handler = function (animation_data) {
    return change_bitmap_base_handler(animation_data, 'sorcerer_attack');
};

end_sorcerer_attack_handler = function (animation_data) {
    return change_bitmap_base_handler(animation_data, 'Sorcerer');
};

drain_handler = function (animation_data) {
    return move_and_return_base_handler(animation_data, false, "native_attack");
};

counterattack_handler = function (animation_data) {
    return move_and_return_base_handler(animation_data, false, "native_attack");
};

warrior_blow_handler = function (animation_data) {
    return move_and_return_base_handler(animation_data, false, "warrior_attack");
};

prison_connection_handler = function (animation_data) {
    return bitmap_flush_base_handler(animation_data, 'protection_field', 150, false);
};

sword_blow_handler = function (animation_data) {
    return bitmap_flush_base_handler(animation_data, 'samurai_sword_blow', 150, true);
};

dodge_handler = function (animation_data) {
    return bitmap_flush_base_handler(animation_data, 'dodge', 150, true);
};

claws_handler = function (animation_data) {
    return move_and_return_base_handler(animation_data, false, 'claws');
};

magic_bullet_handler = function (animation_data) {
    var entity_id = animation_data[1];
    var to_index = animation_data[2];
    var to_pos = index_to_pos(to_index);

    var monk_cast_spell_tween_1 = game.add.tween(entities[entity_id]).to({y: '0'}, 100, Phaser.Easing.Linear.None);
    var monk_cast_spell_tween_2 = game.add.tween(entities[entity_id]).to({y: '0'}, 100, Phaser.Easing.Linear.None);
    var monk_cast_spell_tween_3 = game.add.tween(entities[entity_id]).to({y: '0'}, 100, Phaser.Easing.Linear.None);

    monk_cast_spell_tween_1.onStart.add(function () {
        entities[entity_id].loadTexture("monk_use_1");
    });
    monk_cast_spell_tween_2.onStart.add(function () {
        entities[entity_id].loadTexture("monk_use_2");
    });
    monk_cast_spell_tween_2.onStart.add(function () {
        entities[entity_id].loadTexture("monk_use_3");
    });

    monk_cast_spell_tween_1.chain(monk_cast_spell_tween_2);
    monk_cast_spell_tween_2.chain(monk_cast_spell_tween_3);

    monk_cast_spell_tween_3.onComplete.add(function () {
        entities[entity_id].loadTexture("Monk");

        var start_x = to_pos[0] * field_size + field_size / 2;
        var start_y = to_pos[1] * field_size + field_size / 2;
        var magic_bullet = game.add.sprite(start_x, start_y, 'magic_splash');
        magic_bullet.anchor.set(0.5);
        var magic_bullet_tween = game.make.tween(magic_bullet).to({y: '0'}, 150,
            Phaser.Easing.Linear.None);
        magic_bullet_tween.onComplete.add(function () {
            magic_bullet.destroy();
            is_animation_running = false;
        });
        magic_bullet_tween.start();
    });
    is_animation_running = true;
    monk_cast_spell_tween_1.start();
};

blow_the_ax_handler = function (animation_data) {
    return move_and_return_base_handler(animation_data, false);
};

poisoned_missile_handler = function (animation_data) {
    return shoot_base_handler(animation_data, 'poisoned_missile', 'poisoned_missile_explosion');
};

spear_handler = function (animation_data) {
    return move_and_return_base_handler(animation_data, false, 'guardian_attack');
};

poison_handler = function (animation_data) {
    return bitmap_flush_base_handler(animation_data, 'poison_effect', 150, false);
};

power_bullet_handler = function (animation_data) {
    return shoot_base_handler(animation_data, 'power_bullet', 'power_bullet_bum');
};

laser_handler = function (animation_data) {
    return shoot_base_handler(animation_data, 'laser');
};

teleport_handler = function (animation_data) {
    var entity_id = animation_data[1];
    var to_index = animation_data[2];
    var to_pos = index_to_pos(to_index);

    var entity_sprite = entities[entity_id];
    entity_sprite.pos = to_pos;

    var teleport_tween_1 = game.add.tween(entity_sprite).to({y: '0'}, 100, Phaser.Easing.Linear.None);
    var teleport_tween_2 = game.add.tween(entity_sprite).to({y: '0'}, 150, Phaser.Easing.Linear.None);

    teleport_tween_1.onStart.add(function () {
        entity_sprite.loadTexture("teleport");
    });
    teleport_tween_1.onComplete.add(function () {
        entity_sprite.x = to_pos[0] * field_size + field_size / 2;
        entity_sprite.y = to_pos[1] * field_size + field_size / 2;
    });
    teleport_tween_2.onStart.add(function () {
        entity_sprite.loadTexture("teleport");
    });
    teleport_tween_2.onComplete.add(function () {
        entity_sprite.loadTexture("Droid");
        is_animation_running = false;
    });
    teleport_tween_1.chain(teleport_tween_2);
    is_animation_running = true;
    teleport_tween_1.start();
};

sniper_shot_handler = function (animation_data) {
    return shoot_base_handler(animation_data, 'sniper_bullet', 'sniper_bullet_explosion');
};

arrow_handler = function (animation_data) {
    return shoot_base_handler(animation_data, 'arrow_anim');
};

flame_thrower_handler = function (animation_data) {
    return shoot_base_handler(animation_data, 'flame_thrower', 'detonation');
};

rocket_launcher_handler = function (animation_data) {
    return shoot_base_handler(animation_data, 'rocket', 'bum');
};

hypnosis_handler = function (animation_data) {
    return bitmap_flush_base_handler(animation_data, 'hypnosis', 150, false);
};

jaw_spider_handler = function (animation_data) {
    return bitmap_flush_base_handler(animation_data, 'jaw_spider', 150, false);
};

destruction_handler = function (animation_data) {
    var index = animation_data[1];
    var pos = index_to_pos(index);

    var destruction = game.add.sprite(pos[0] * field_size + field_size / 2,
        pos[1] * field_size + field_size / 2, 'destruction_1');
    destruction.anchor.set(0.5);

    var destruction_tween_1 = game.add.tween(destruction).to({x: '0'}, 75);
    var destruction_tween_2 = game.add.tween(destruction).to({x: '0'}, 75);
    var destruction_tween_3 = game.add.tween(destruction).to({x: '0'}, 75);
    destruction_tween_2.onStart.add(function () {
        destruction.loadTexture("destruction_2");
    });
    destruction_tween_3.onStart.add(function () {
        destruction.loadTexture("destruction_3");
    });
    destruction_tween_3.onComplete.add(function () {
        destruction.destroy();
        is_animation_running = false;
    });
    destruction_tween_1.chain(destruction_tween_2);
    destruction_tween_2.chain(destruction_tween_3);
    is_animation_running = true;
    destruction_tween_1.start();
};

spider_web_handler = function (animation_data) {
    var from_index = animation_data[1];
    var to_index = animation_data[2];
    var land_index = animation_data[3];

    var from_pos = index_to_pos(from_index);
    var to_pos = index_to_pos(to_index);
    var land_pos = index_to_pos(land_index);

    var enemy_id = entity_at(to_index);

    var distance = motion_distance(from_pos, to_pos);

    var start_x = from_pos[0] * field_size + field_size / 2;
    var start_y = from_pos[1] * field_size + field_size / 2;

    var web = game.add.sprite(start_x, start_y, 'spider_web');
    web.anchor.set(0.5);

    if (from_pos[0] - to_pos[0] > 0) {
        web.scale.x = -1;
    } else {
        web.scale.x = 1;
    }

    var web_tween = game.add.tween(web).to(pos_to_real_dimensions(to_pos), motion_speed_medium(distance),
        Phaser.Easing.Linear.None);
    web_tween.onComplete.add(function () {
        entities[enemy_id].visible = false;
        if (to_index !== land_index) {
            var web_tween_return = game.add.tween(web).to(pos_to_real_dimensions(from_pos), motion_speed_medium(distance),
                Phaser.Easing.Linear.None);
            web_tween_return.onComplete.add(function () {
                entities[enemy_id].x = land_pos[0] * field_size + field_size / 2;
                entities[enemy_id].y = land_pos[1] * field_size + field_size / 2;
                entities[enemy_id].pos = land_pos;
                entities[enemy_id].visible = true;
                web.destroy();
                is_animation_running = false;
            });
            web_tween_return.start();
        } else {
            entities[enemy_id].visible = true;
            web.destroy();
            is_animation_running = false;
        }
    });
    is_animation_running = true;
    web_tween.start();
};

animation.initialize = function () {
    animation.services = {};
    animation.services['move'] = move_handler;
    animation.services['shoot'] = shoot_handler;
    animation.services['change_health'] = change_health_handler;
    animation.services['grenade'] = grenade_handler;
    animation.services['sabers'] = sabers_handler;
    animation.services['tongue_of_fire'] = tongue_of_fire_handler;
    animation.services['set_invisibility'] = set_invisibility_handler;
    animation.services['remove_invisibility'] = remove_invisibility_handler;
    animation.services['drain'] = drain_handler;
    animation.services['counterattack'] = counterattack_handler;
    animation.services['magic_bullet'] = magic_bullet_handler;
    animation.services['change_power'] = change_power_handler;
    animation.services['blow_the_ax'] = blow_the_ax_handler;
    animation.services['warrior_blow'] = warrior_blow_handler;
    animation.services['set_immortality'] = set_immortality_handler;
    animation.services['prison_connection'] = prison_connection_handler;
    animation.services['start_sorcerer_attack'] = start_sorcerer_attack_handler;
    animation.services['end_sorcerer_attack'] = end_sorcerer_attack_handler;
    animation.services['sword_blow'] = sword_blow_handler;
    animation.services['dodge'] = dodge_handler;
    animation.services['poisoned_missile'] = poisoned_missile_handler;
    animation.services['poison'] = poison_handler;
    animation.services['spear'] = spear_handler;
    animation.services['spear'] = spear_handler;
    animation.services['power_bullet'] = power_bullet_handler;
    animation.services['laser'] = laser_handler;
    animation.services['teleport'] = teleport_handler;
    animation.services['sniper_shot'] = sniper_shot_handler;
    animation.services['hypnosis'] = hypnosis_handler;
    animation.services['destruction'] = destruction_handler;
    animation.services['arrow'] = arrow_handler;
    animation.services['jaw_spider'] = jaw_spider_handler;
    animation.services['spider_web'] = spider_web_handler;
    animation.services['flame_thrower'] = flame_thrower_handler;
    animation.services['rocket_launcher'] = rocket_launcher_handler;
    animation.services['spider_web'] = spider_web_handler;
    animation.services['claws'] = claws_handler;
};

animation.handle = function (animation_data) {
    var animation_name = animation_data[0];
    console.log("animation_name: " + animation_name);
    animation.services[animation_name](animation_data);
};
