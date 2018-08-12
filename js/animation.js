var animation = {};

animation.initialize = function () {
    animation.services = {};

    animation.services['move'] = function (animation_data) {
        var from_index = animation_data[1];
        var to_index = animation_data[2];

        var from_pos = index_to_pos(from_index);
        var to_pos = index_to_pos(to_index);

        var distance = Math.sqrt(Math.pow(from_pos[0] - to_pos[0], 2) + Math.pow(from_pos[1] - to_pos[1], 2));

        var entity_id = entity_at(from_index);

        var entity_sprite = entities[entity_id];
        entity_sprite.pos = to_pos;

        entity_sprite.bringToTop();

        var new_x = to_pos[0] * field_size;
        var new_y = to_pos[1] * field_size;

        game.add.tween(entity_sprite.position).to({x: new_x, y: new_y}, distance * 200,
            Phaser.Easing.Linear.None, true, 0);
    };
};

animation.handle = function (animation_data) {
    var animation_name = animation_data[0];
    console.log("animation_name: " + animation_name);

    animation.services[animation_name](animation_data);
};

// auto from_pos = board_index_to_point(from_index);
// auto to_pos = board_index_to_point(to_index);
//
// auto distance = std::sqrt(std::pow(from_pos.x - to_pos.x, 2) + std::pow(from_pos.y - to_pos.y, 2));
//
// auto entity_id = g_state.board.take(from_index);
//
// auto sprite = sprites_manager::drawer_for(entity_id)->sprite;
// sprite->setPriority(100);
//
// sprite->setFlippedX(from_pos.x - to_pos.x > 0);
//
// auto move_tween = sprite->addTween(Actor::TweenPosition(to_pos), distance * 3);
// move_tween->setDoneCallback([sprite](Event* ev) {
//     sprite->setPriority(0);
// });
//
// g_state.board.give_back(entity_id, to_index);
//
// animations_service::set_tween(move_tween);
